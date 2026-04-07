import { useMemo } from "react";

// context 
import { Helmet } from "react-helmet-async";

// functions 
import { formatPriceSummaryMap } from "../../functions/formatPriceSummaryMap";
import { buildPriceSummary } from "../../functions/buildPriceSummary";

// styles 
import styles from "./styles/cartPage.module.css"

// hooks 
import { useNavigate } from "react-router-dom";
import { useCartStore } from "./store/cartStore";
import { useGetCartProducts } from "./hooks/useGetCartProducts";

// components 
import { Button } from "../../shared/ui/Button";
import { SkeletonUI } from "../../shared/ui/Skeleton";
import { SummaryUI } from "../../shared/components/Sumary";
import { RenderCartProductCard } from "./components/cartProductCard";
import { CartControls } from "./components/CartControls";



const CartPage = () => {
    console.log("Cart page Rendered");
    const navigate = useNavigate();
    const { cart, clearCart } = useCartStore();
    const ProductIds = useMemo(() => Object.keys(cart), [Object.keys(cart).length]);

    const { data, loading, error } = useGetCartProducts(ProductIds);


    const summary = useMemo(() => {
        if (!data) return;
        return buildPriceSummary(data, cart);
    }, [data, cart]);

    const priceSummaryMap = useMemo(() => {
        if (!summary) return;
        return formatPriceSummaryMap(summary);
    }, [summary]);


    if (error) {
        return (
            <div className="container my-2">
                <p className="text-center">{error}</p>
            </div>
        )
    }

    return (
        <div className="container my-2">
            <Helmet>
                <title>{`My cart`}</title>
                <meta name="description" content={"My cart"} />
            </Helmet>
            {loading ? (
                <SkeletonUI
                    count={5}
                    direction="vertical"
                />
            ) : (
                data && data.length > 0 ? (
                    <div className={styles.cartContentContainer}>
                        <div style={{ flex: 1 }}>
                            {data.map((item) => (
                                <RenderCartProductCard
                                    key={item?.id}
                                    item={item}
                                    childeren={<CartControls
                                        productId={String(item?.id) || ""}
                                        buttonStyle={{
                                            width: "100%",
                                            textAlign: "center",
                                            justifyContent: "center",
                                        }}
                                    />}
                                />
                            ))}
                        </div>

                        {/* summary  */}
                        <div style={{ flex: 1 }}>
                            <SummaryUI
                                title="Summary"
                                icon={<i className="bi bi-credit-card-fill"></i>}
                                data={priceSummaryMap}
                            />

                            <div style={{ height: "10px" }} />

                            <Button
                                title="Continue to Address"
                                style={{
                                    width: "100%",
                                    justifyContent: "center"
                                }}
                                onClick={() => navigate("/address")}

                            />

                            <div style={{ height: "10px" }} />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }}>
                                <span>Wanna clear cart?</span>
                                <Button
                                    title="Clear"
                                    type="outline"
                                    onClick={() => clearCart()}
                                />
                            </div>

                        </div>
                    </div>
                ) : (
                    <p className="text-center">No products in your cart</p>
                )
            )}
        </div>
    )
}


export default CartPage;