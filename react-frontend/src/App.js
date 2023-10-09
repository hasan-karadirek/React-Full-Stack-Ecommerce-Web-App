import "./App.css";
import CategoryPage from "./pages/CategoryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { OrderContextProvider } from "./contexts/OrderContext";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentReturnPage from "./pages/PaymentReturnPage";
import { OrderInProcessContextProvider } from "./contexts/OrderInProcessContext";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [apiError, setApiError] = useState();
  const errorHandler = (err) => setApiError(err);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/category/:categorySlug"
          element={
            !apiError ? (
              <OrderContextProvider>
                <CategoryPage errorHandler={errorHandler} />
              </OrderContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/product/:productSlug"
          element={
            !apiError ? (
              <OrderContextProvider>
                <ProductPage errorHandler={errorHandler} />
              </OrderContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/cart"
          element={
            !apiError ? (
              <OrderContextProvider>
                <CartPage errorHandler={errorHandler} />
              </OrderContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/checkout"
          element={
            !apiError ? (
              <OrderContextProvider>
                <CheckoutPage errorHandler={errorHandler} />
              </OrderContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/checkout/return"
          element={
            !apiError ? (
              <OrderInProcessContextProvider>
                <PaymentReturnPage errorHandler={errorHandler} />
              </OrderInProcessContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
