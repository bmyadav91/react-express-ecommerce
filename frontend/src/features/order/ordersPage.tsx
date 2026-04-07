
import styles from "./styles/orderList.module.css"

// context 
import { Helmet } from "react-helmet-async";

// hooks 
import { useOrderList } from "./hooks/useOrderList";

// function 
import { formateDate } from "../../functions/formateDate";

// components 
import { SkeletonUI } from "../../shared/ui/Skeleton";
import { Button } from "../../shared/ui/Button";

const OrderPage = () => {
    const { loading, data, error, hasNext, fetchData, paginationLoading } = useOrderList();

    if (error && !data) return <p className="text-center text-danger my-5">{error}</p>;

    return (
        <div className="container my-2">
            <Helmet>
                <title>{`My orders`}</title>
                <meta name="description" content={"My orders"} />
            </Helmet>
            {loading ? (
                <SkeletonUI
                    count={1}
                    height={500}
                    direction="vertical"
                />
            ) : (
                <>
                    {data?.length > 0 ? (
                        <>
                            {data.map((item) => (
                                <div className={styles.productItem} key={item?.id}>
                                    <div className={styles.header}>
                                        <i className="bi bi-box"></i>
                                        <div className={styles.rightContent}>
                                            <strong className={styles.orderStatus}>{item?.status}</strong>
                                            <span className={styles.text}>
                                                {formateDate(item?.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className={styles.itemBody}>
                                        {item?.data?.items.slice(0, 3).map((product) => (
                                            <li key={product?.id}>
                                                {product?.title} &mdash; ({product?.quantity || 1})
                                            </li>
                                        ))}

                                        {item?.data?.items && item.data.items.length > 3 && (
                                            <li className={styles.moreItems}>
                                                ...and {item.data.items.length - 3} more
                                            </li>
                                        )}
                                    </ul>

                                    <div className={styles.footer}>
                                        <strong className={styles.price}>₹{item?.total_amount}</strong>
                                    </div>
                                </div>
                            ))}
                            {hasNext && (
                                <div className={styles.paginationContainer}>
                                    <Button
                                        title="Load more"
                                        isDisabled={paginationLoading}
                                        isProcessing={paginationLoading}
                                        onClick={() => fetchData()}
                                    />
                                </div>
                            )}
                        </>

                    ) : (
                        <p className="text-center">No any order yet.</p>
                    )}
                </>
            )}
        </div>
    )
}

export default OrderPage;