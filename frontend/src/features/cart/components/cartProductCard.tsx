
// styles 
import styles from "../styles/cartProductCard.module.css"

// hooks 
import { Link } from "react-router-dom"

// types 
import type { Product } from "../../../types/product"

// components 
import { RatingDisplay } from "../../../shared/components/RatingDisplay"
import { PriceDisplay } from "../../../shared/components/PriceDisplay"

interface Props {
    item: Product,
    childeren: React.ReactNode
}

export const RenderCartProductCard = ({ item, childeren }: Props) => {

    return (
        <Link to={"/products/" + item?.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className={styles.cardParent}>

                <div className={styles.imageParent}>
                    <img src={item?.thumbnail ?? (item?.images && item?.images.length ? item?.images[0] : "")} alt={item?.title} />
                </div>

                <div className={styles.meta}>
                    <h2 className={styles.title}>
                        {item?.title}
                    </h2>

                    <RatingDisplay
                        rating={item?.rating || 0}
                        style={{
                            justifyContent: "flex-start"
                        }}
                    />

                    <PriceDisplay
                        price={item?.price || 0}
                        discountPercent={item?.discountPercentage}
                        style={{
                            justifyContent: "flex-start"
                        }}
                    />

                    {childeren}

                </div>
            </div>
        </Link>
    )
}