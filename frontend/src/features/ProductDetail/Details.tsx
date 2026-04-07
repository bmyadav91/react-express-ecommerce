import { useState, useEffect } from "react";

// context 
import { Helmet } from "react-helmet-async";

// styles 
import styles from "./styles/ProductDetail.module.css"

// hooks 
import { useParams } from "react-router-dom";
import { useProductDetail } from "./hooks/useProductDetail";
import { useSimilarProductsByCategory } from "./hooks/useSimilarProductsByCategory";

// features 
import { CartControls } from "../cart/components/CartControls";

// components 
import { SectionTitle } from "../../shared/components/SectionTitle";
import { SkeletonUI } from "../../shared/ui/Skeleton";
import { PriceDisplay } from "../../shared/components/PriceDisplay";
import { RatingDisplay } from "../../shared/components/RatingDisplay";
import { ProductList } from "../../shared/product/Products";


const ProductDetailPage = () => {
    console.log("ProductPage reRendered");
    const { id } = useParams<{ id: string }>();
    if (!id) return <div>Invalid product</div>;

    const { data, loading, error } = useProductDetail(id);
    const [selectedImage, setSelectedImage] = useState<string | undefined>();

    useEffect(() => {
        if (data?.images && data?.images?.length > 0) {
            setSelectedImage(data?.images[0]);
        }
    }, [data]);

    // get similar product 
    const category = data?.category;
    const { data: similarData, loading: similarLoading } = useSimilarProductsByCategory(
        category || "",
        10
    );
    const filteredSimilar = similarData?.filter((p) => String(p.id) !== String(id)) || [];

    if (error) return <p className="text-center">{error}</p>

    if (loading) {
        return (
            <div className="container my-2">
                <SkeletonUI
                    count={1}
                    height={"700px"}
                    direction="horizontal"
                    style={{
                        justifyContent: "center"
                    }}
                />
            </div>
        )
    }


    return (
        <div className="container my-2">
            <Helmet>
                <title>{data ? `${data.title}` : "Loading Product..."}</title>
                <meta name="description" content={data?.description || "Product details"} />

                {/* Social Media (Open Graph) - This makes sharing look great! */}
                <meta property="og:title" content={data?.title} />
                <meta property="og:description" content={data?.description} />
                <meta property="og:image" content={selectedImage} />
                <meta property="og:type" content="product" />
            </Helmet>

            {/* product details | review | specifications  */}
            <section itemScope itemType="https://schema.org/Product">

                {/* top bar  */}
                <div className={styles.topBar}>

                    {/* left side  */}
                    <div className={styles.leftSide}>

                        <div className={styles.thumbnailParent}>
                            <div className={styles.thumbnailParent}>
                                <img src={selectedImage} alt={data?.title} itemProp="image" />
                            </div>
                        </div>

                        {/* gap  */}
                        <div style={{ height: "5px" }}></div>

                        {/* all images  */}
                        {data?.images && data?.images?.length > 0 && (
                            <div className={styles.images}>
                                {data?.images?.map((im) => (
                                    <div
                                        key={im}
                                        className={styles.imageParent}
                                        onClick={() => setSelectedImage(im)}
                                    >
                                        <img src={im} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* gap  */}
                        <div style={{ height: "5px" }}></div>

                        <CartControls
                            productId={id}
                            buttonStyle={{
                                width: "100%",
                                textAlign: "center",
                                justifyContent: "center"
                            }}
                        />

                    </div>

                    {/* right side  */}
                    <div className={styles.rightSide}>

                        <h1 className={styles.title} itemProp="name">
                            {data?.title}
                        </h1>

                        <RatingDisplay
                            rating={data?.rating || 0}
                            size={20}
                            style={{
                                justifyContent: "flex-start"
                            }}
                        />

                        <PriceDisplay
                            price={data?.price || 0}
                            discountPercent={data?.discountPercentage}
                            size={25}
                            style={{
                                justifyContent: "flex-start"
                            }}
                        />

                        {/* gap  */}
                        <div style={{ height: "5px" }}></div>

                        <p className={styles.shortDescription} itemProp="description">
                            {data?.description}
                        </p>

                        {/* gap  */}
                        <div style={{ height: "5px" }}></div>

                        {/* more information  */}

                        <section>
                            <h2 className={styles.h2Title}>More information</h2>

                            <dl>

                                {data?.category && (
                                    <>
                                        <dt className={styles.infoChildHeading}>Category</dt>
                                        <dd
                                            className={styles.infoChildValue}
                                            itemProp="category"
                                        >
                                            {data.category}
                                        </dd>
                                    </>
                                )}

                                {data?.brand && (
                                    <div
                                        itemProp="brand"
                                        itemScope
                                        itemType="https://schema.org/Brand"
                                    >
                                        <dt className={styles.infoChildHeading}>Brand</dt>
                                        <dd
                                            className={styles.infoChildValue}
                                            itemProp="name"
                                        >
                                            {data.brand}
                                        </dd>
                                    </div>
                                )}

                                {data?.warrantyInformation && (
                                    <>
                                        <dt className={styles.infoChildHeading}>Warranty Information</dt>
                                        <dd className={styles.infoChildValue}>
                                            {data.warrantyInformation}
                                        </dd>
                                    </>
                                )}

                                {data?.returnPolicy && (
                                    <>
                                        <dt className={styles.infoChildHeading}>Return Policy</dt>
                                        <dd className={styles.infoChildValue}>
                                            {data.returnPolicy}
                                        </dd>
                                    </>
                                )}

                                {data?.minimumOrderQuantity && (
                                    <>
                                        <dt className={styles.infoChildHeading}>Minimum Order</dt>
                                        <dd className={styles.infoChildValue}>
                                            {data.minimumOrderQuantity}
                                        </dd>
                                    </>
                                )}

                            </dl>
                        </section>

                    </div>

                </div>

            </section>

            {/* similar products  */}
            <section className={styles.similarProductContainer}>
                {similarLoading ? (
                    <SkeletonUI
                        count={5}
                        width={"200px"}
                        direction="horizontal"
                        style={{
                            justifyContent: "space-evenly"
                        }}
                    />
                ) : filteredSimilar && filteredSimilar?.length > 0 && (
                    <>
                        <SectionTitle>Similar Products</SectionTitle>

                        <ProductList
                            products={filteredSimilar}
                            renderActions={(item) => (
                                <CartControls productId={item?.id || ""} />
                            )}
                        />
                    </>
                )}
            </section>

        </div>
    )
}


export default ProductDetailPage;