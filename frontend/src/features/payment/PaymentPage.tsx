import { useMemo, useState } from "react";

// styles 
import styles from "./styles/PaymentPage.module.css"

// types 
import type { RadioField } from "../../types/formField";

// functions 
import { formatPriceSummaryMap } from "../../functions/formatPriceSummaryMap";
import { buildPriceSummary } from "../../functions/buildPriceSummary";

// hooks 
import { useCartStore } from "../cart/store/cartStore";
import { useGetCartProducts } from "../cart/hooks/useGetCartProducts";
import { useAuthStore } from "../auth/store/userStore";
import { useNavigate } from "react-router-dom";

// components 
import { Button } from "../../shared/ui/Button";
import { SkeletonUI } from "../../shared/ui/Skeleton";
import { SummaryUI } from "../../shared/components/Sumary";
import { RadioSelectionUI } from "../../shared/components/RadioSelection";


const paymentOption: RadioField[] = [
    {
        name: "cod",
        label: "Cash on Delivery",
    },
    {
        name: "upi",
        label: "UPI",
    },
    {
        name: "card",
        label: "Credit/Debit Card",
    },
]


const PaymentPage = () => {
    console.log("payment page re rendered");
    const navigate = useNavigate();
    const { cart } = useCartStore();
    const ProductIds = useMemo(() => Object.keys(cart), [Object.keys(cart).length]);
    const { token } = useAuthStore();
    const isAuthenticated = !!token;


    const { data, loading, error } = useGetCartProducts(ProductIds);
    const [selectedPayment, setSelectedPayment] = useState("cod");


    const summary = useMemo(() => {
        if (!data) return;
        return buildPriceSummary(data, cart);
    }, [data, cart]);

    const priceSummaryMap = useMemo(() => {
        if (!summary) return;
        return formatPriceSummaryMap(summary);
    }, [summary]);

    const processCheckPlaceOrder = () => {
        let dataToSend = {
            "payment_method": selectedPayment,
            "products": ProductIds
        }

        console.log("Data to send on server => ", dataToSend)
    }

    const handleClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        processCheckPlaceOrder();
    };

    if (error) {
        return (
            <div className="container my-2">
                <p className="text-center">{error}</p>
            </div>
        )
    }

    return (
        <div className="container my-2">
            {loading ? (
                <SkeletonUI
                    count={1}
                    height={500}
                    direction="vertical"
                />
            ) : (
                data && data.length > 0 ? (
                    <div className={styles.PaymentContentContainer}>

                        <RadioSelectionUI
                            data={paymentOption}
                            selected={selectedPayment}
                            onChange={setSelectedPayment}
                        />


                        {/* summary  */}
                        <div style={{ flex: 1 }}>
                            <SummaryUI
                                title="Summary"
                                icon={<i className="bi bi-credit-card-fill"></i>}
                                data={priceSummaryMap}
                            />

                            <div style={{ height: "10px" }} />

                            <Button
                                title={isAuthenticated ? "Place Order" : "Login to Place Order"}
                                style={{
                                    width: "100%",
                                    justifyContent: "center"
                                }}
                                onClick={handleClick}
                            />

                        </div>
                    </div>
                ) : (
                    <p className="text-center">No products in your cart</p>
                )
            )}
        </div>
    )
}


export default PaymentPage;