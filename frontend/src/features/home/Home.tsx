import { useEffect } from "react";

import { useProducts } from "./hooks/useProducts";
import { ProductList } from "../../shared/product/Products";

import { SectionTitle } from "../../shared/components/SectionTitle";

// hooks 
import { useSearchParams } from "react-router-dom";

// features 
import { CartControls } from "../cart/components/CartControls";

// components external 
import { SkeletonUI } from "../../shared/ui/Skeleton";
import { Button } from "../../shared/ui/Button";

const HomePage = () => {
    console.log("HomePage re rendered");
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const {
        data,
        loading,
        error,
        query,
        setQuery,
        loadMore,
        hasMore,
    } = useProducts(searchQuery);

    useEffect(() => {
        if (searchQuery !== query) {
            setQuery(searchQuery);
        }
    }, [searchQuery]);

    if (error) {
        alert(error);
    };

    if (loading && data.length === 0) {
        return (
            <div className="container mt-3 mb-2">
                <SkeletonUI
                    count={20}
                    width={"200px"}
                    direction="horizontal"
                    style={{
                        justifyContent: "space-evenly"
                    }}
                />
            </div>
        )
    };


    // if data loaded then show main UI 
    return (
        <div className="container my-2">
            <SectionTitle>
                {searchQuery ? `Search: ${searchQuery}` : "Featured Products"}
            </SectionTitle>

            <>
                {data.length > 0 ? (
                    <ProductList
                        products={data}
                        renderActions={(product) => (
                            <CartControls productId={product?.id || ""} />
                        )}
                    />
                ) : (
                    <p style={{ textAlign: "center" }} className="my-2">No data found</p>
                )}
            </>

            {hasMore && (
                <div style={{ margin: "16px auto", width: "fit-content" }}>
                    <Button
                        title="Load more"
                        isProcessing={loading}
                        onClick={loadMore}
                    />
                </div>
            )}
        </div>
    )
}


export default HomePage;