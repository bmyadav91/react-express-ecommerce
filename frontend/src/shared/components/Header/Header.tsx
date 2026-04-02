import { useState } from "react";
// libs 
import { Link, useNavigate } from "react-router-dom";

// styles 
import styles from "../../styles/Header.module.css";

// hooks 
import { useCartStore } from "../../../features/cart/store/cartStore";
import { useAuthStore } from "../../../features/auth/store/userStore";

// components 
import { Button } from "../../ui/Button";
import { SearchUI } from "./SearchUI";

export const Header = () => {
    console.log("header re rendered");
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const { cart } = useCartStore();
    const { token } = useAuthStore();


    const totalItems = Object.values(cart).reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const isLoggedIn = !!token;

    return (
        <header
            className={styles.Header}
        >
            <div
                className={styles.headerContentContainer}
            >
                {/* Left: Branding */}
                <Link
                    to="/"
                    style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    MyStore
                </Link>

                {/* Right: Actions */}
                <div className={styles.rightActionContainer}>

                    {/* search icon  */}
                    <Button
                        title=""
                        type="outline"
                        icon={
                            <i className="bi bi-search"></i>
                        }
                        onClick={() => setShowSearch(!showSearch)}
                    />

                    {/* Cart */}
                    <div style={{ position: "relative", cursor: "pointer" }}>
                        <Button
                            title=""
                            icon={
                                <i className="bi bi-cart"></i>
                            }
                            type="outline"
                            onClick={() => navigate("/cart")}
                        />

                        {totalItems > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-8px",
                                    background: "red",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    fontSize: "12px",
                                    padding: "2px 6px",
                                }}
                            >
                                {totalItems}
                            </span>
                        )}
                    </div>

                    {/* Auth */}
                    {isLoggedIn ? (
                        <Button
                            title=""
                            icon={
                                <i className="bi bi-person-fill"></i>
                            }
                            onClick={() => navigate("/profile")}
                        />
                    ) : (
                        <Button
                            title="Login"
                            icon={
                                <i className="bi bi-box-arrow-in-right"></i>
                            }
                            onClick={() => navigate("/login")}
                        />
                    )}
                </div>
            </div>

            {showSearch && (
                <SearchUI />
            )}
        </header>
    );
};