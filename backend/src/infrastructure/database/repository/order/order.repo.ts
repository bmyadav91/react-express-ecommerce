import { prisma } from "../../../../config/db";
import { OrderType, orderStatusType } from "../../../../types/order";

export const OrderRepo = {
  createOrder: async (data: OrderType) => {
    return await prisma.order.create({
      data: {
        total_amount: data.total_amount!,
        status: data.status as orderStatusType,
        user_id: data.user_id!,

        // JSON field
        data: data.data as any,
      },
    });
  },

  updateOrderStatu: async (id: string, newStatus: orderStatusType) => {
    return await prisma.order.update({
        where: { id: id },
        data: {
            status: newStatus,
        }
    });
  },

  getOrderDetail: async (id: string) => {
    return await prisma.order.findUnique({
      where: {
        id: id,
      }
    })
  },

  getOrderListForUser: async (user_id: string, last_id: string | null, limit: number = 10, asc: boolean = false) => {
    return await prisma.order.findMany({
      where: {
        user_id: user_id
      },
      take: limit,
      skip: last_id ? 1 : 0,
      cursor: last_id ? { id: last_id } : undefined,
      orderBy: {
        created_at: asc ? "asc" : "desc"
      }
    })
  },
  
};