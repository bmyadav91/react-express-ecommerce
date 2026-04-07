import styles from "./styles/account.module.css"
import { Link } from "react-router-dom";

// context 
import { Helmet } from "react-helmet-async";

// hooks 
import { useNavigate } from "react-router-dom";
import { useAccount } from "./hooks/useAccount";

// components 
import { SectionTitle } from "../../shared/components/SectionTitle";
import { SkeletonUI } from "../../shared/ui/Skeleton";


const AccountPage = () => {
    const navigate = useNavigate();
    const { data, loading, error, LogOut } = useAccount();

    const handleLogout = () => {
        LogOut();
        navigate("/")
    }

    if (error && !data) return <p className="text-center text-danger my-5">{error}</p>;

    return (
        <section className="container my-2">
            <Helmet>
                <title>{`My account | ${data?.name || ""}`}</title>
                <meta name="description" content={"My prfoile"} />
            </Helmet>
            {loading ? (
                <SkeletonUI
                    count={1}
                    height={500}
                    direction="vertical"
                />

            ) : (
                <>
                    <div className={styles.profileContainer}>
                        <i className={`bi bi-person-circle`}></i>
                        <strong className={styles.name}>{data?.name}</strong>
                    </div>

                    <div style={{ height: "15px" }} />

                    <SectionTitle>Menu</SectionTitle>

                    <div style={{ height: "15px" }} />

                    <ul className={styles.menuList}>
                        <li>
                            <Link to={"/orders"}>
                                <span className="text">My orders</span>
                            </Link>
                        </li>

                        <li>
                            <span className="text-danger" style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</span>
                        </li>
                    </ul>
                </>
            )}
        </section>
    )
}


export default AccountPage;