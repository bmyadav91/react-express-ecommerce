import styles from "../styles/products.module.css"
import type { Product } from "../../types/product"

// hook 
import { Link } from "react-router-dom"

// components 
import { PriceDisplay } from "../components/PriceDisplay"
import { RatingDisplay } from "../components/RatingDisplay"



export const ProductCard = ({
    product,
    children,
}: {
    product: Product;
    children?: React.ReactNode;
}) => {
    const image =
        product?.images && product?.images?.length > 0
            ? product.images[0]
            : "";

    return (
        <Link
            to={`/products/${product.id}`}
            className={styles.Product}
            style={{ textDecoration: "none", color: "inherit" }}
            itemScope
            itemType="https://schema.org/Product"
        >
            <div className={styles.ImageParent}>
                <img
                    src={image}
                    alt={product.title}
                    className={styles.thumbnail}
                    itemProp="image"
                />
            </div>

            <RatingDisplay rating={product.rating || 0} />

            <h2 className={styles.title} itemProp="name">
                {product.title}
            </h2>

            <PriceDisplay
                price={product?.price || 0}
                discountPercent={product.discountPercentage}
            />

            {children}
        </Link>
    );
};

type Props = {
    products: Product[];
    renderActions?: (product: Product) => React.ReactNode;
};

export const ProductList = ({ products, renderActions }: Props) => {
    return (
        <div className={styles.ProductParent}>
            {products.map((item) => (
                <ProductCard key={item.id} product={item}>
                    {renderActions?.(item)}
                </ProductCard>
            ))}
        </div>
    );
};