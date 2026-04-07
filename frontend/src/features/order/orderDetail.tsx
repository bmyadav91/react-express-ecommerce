// context 
import { Helmet } from "react-helmet-async";

const OrderDetail = () => {
    return (
        <>
            <Helmet>
                <title>{`Order details`}</title>
                <meta name="description" content={"Order details"} />
            </Helmet>
            <div>Order details</div>
        </>
    )
}


export default OrderDetail;