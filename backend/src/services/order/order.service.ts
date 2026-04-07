import { OrderRepo } from "../../infrastructure/database/repository/order/order.repo";
import { AppError } from "../../utils/AppError";
import type { CartItem } from "../../types/cart";
import { getItems } from "./get_item";

export const createOrderService = async (userId: string, cart: Record<string, CartItem>) => {

    const productIds = Object.keys(cart);
    if (productIds.length === 0) {
        throw new AppError("Cannot create order: Cart is empty", 400);
    }

    try {

        const liveItems = await getItems(productIds);

        if (!liveItems || liveItems.length !== productIds.length) {
            throw new AppError("One or more products in your cart are no longer available", 404);
        }

        // Calculate Totals
        let grandTotal = 0;
        const itemsToStore = liveItems.map(item => {
            const quantity = cart[item.id].quantity;
            const subTotal = item.price * quantity;
            grandTotal += subTotal;

            return { ...item, quantity, subTotal: parseFloat(subTotal.toFixed(2)) };
        });

        const newOrder = await OrderRepo.createOrder({
            user_id: userId,
            total_amount: parseFloat(grandTotal.toFixed(2)),
            status: "PENDING",
            data: { items: itemsToStore }
        });

        if (!newOrder) {
            throw new AppError("Failed to initialize order in database", 500);
        }

        return newOrder;

    } catch (error: any) {

        if (error instanceof AppError) throw error;

        console.error("Order Creation Crash:", error.message);
        throw new AppError(`Order creation failed: ${error.message}`, 500);
    }
};


export const getOrderDetailService = async (order_id: string, user_id: string) => {

    if (!order_id) throw new AppError("Order ID is required", 400);

    const order = await OrderRepo.getOrderDetail(order_id);

    if (!order) {
        throw new AppError("Order not found", 404);
    }

    if (order.user_id !== user_id) {
        throw new AppError("You do not have permission to view this order", 403);
    }

    return order;
};

export const getOrderListForUserService = async (user_id: string, last_id: string | null, limit: number = 10, asc: boolean = false) => {
    if (!user_id) throw new AppError("User ID is required", 400);

    const orders = await OrderRepo.getOrderListForUser(
        user_id,
        last_id,
        limit,
        asc,
    )

    const NextCursor = orders.length === limit ? orders[orders.length - 1].id : null;

    return {
        data: orders,
        pagination: {
            next_cursor: NextCursor,
            has_more: !!NextCursor,
        }
    }
}