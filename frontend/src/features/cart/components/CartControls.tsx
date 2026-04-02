import { useCartStore } from "../store/cartStore";
import { Button } from "../../../shared/ui/Button";

interface Props {
    productId: string | number;
    style?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
}

export const CartControls = ({
    productId,
    style,
    buttonStyle
}: Props) => {
    const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();

    const id = String(productId);
    const qty = cart[id]?.quantity || 0;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: "8px 0",
                ...style,
            }}
        >
            {qty === 0 ? (
                <Button
                    title="Add"
                    type="primary"
                    onClick={() => addToCart(id)}
                    style={buttonStyle}
                />
            ) : (
                <>
                    <Button
                        title="-"
                        type="outline"
                        onClick={() => decreaseQty(id)}
                        style={buttonStyle}
                    />

                    <span
                        style={{ fontWeight: 500 }}
                    >
                        {qty}
                    </span>

                    <Button
                        title="+"
                        type="outline"
                        onClick={() => increaseQty(id)}
                        style={buttonStyle}
                    />
                </>
            )}
        </div>
    );
};