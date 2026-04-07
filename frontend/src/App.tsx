import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { FullscreenLoader } from "./shared/components/loader";
import { MainLayout } from "./layouts/MainLayout";

const HomePage = lazy(() => import("./features/home/Home"));
const ProductDetailPage = lazy(() => import("./features/ProductDetail/Details"));
const CartPage = lazy(() => import("./features/cart/CartPage"));
const AddressPage = lazy(() => import("./features/address/AddressPage"));
const PaymentPage = lazy(() => import("./features/payment/PaymentPage"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const AccountPage = lazy(() => import("./features/account/AccountPage"));
const OrderPage = lazy(() => import("./features/order/ordersPage"));
const OrderDetail = lazy(() => import("./features/order/orderDetail"));



function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div style={{ position: "relative", height: "100vh" }}>
              <FullscreenLoader />
            </div>
          }
        >
          <Routes>

            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/address" element={<AddressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<AccountPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;