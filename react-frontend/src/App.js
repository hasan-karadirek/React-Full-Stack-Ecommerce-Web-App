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
import { CategoryContextProvider } from "./contexts/CategoryContext";

function App() {
  const [apiError, setApiError] = useState();
  const errorHandler = (err) => setApiError(err);
  return (
    <Router>
      <Routes>
        <Route
          path="/category/:categorySlug"
          element={
            !apiError ? (
              <CategoryContextProvider>
                <OrderContextProvider>
                  <Navbar />
                  <CategoryPage errorHandler={errorHandler} />
                </OrderContextProvider>
              </CategoryContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/product/:productSlug"
          element={
            !apiError ? (
              <CategoryContextProvider>
                <OrderContextProvider>
                  <Navbar />

                  <ProductPage errorHandler={errorHandler} />
                </OrderContextProvider>
              </CategoryContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/cart"
          element={
            !apiError ? (
              <CategoryContextProvider>
                <OrderContextProvider>
                  <Navbar />

                  <CartPage errorHandler={errorHandler} />
                </OrderContextProvider>
              </CategoryContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/checkout"
          element={
            !apiError ? (
              <CategoryContextProvider>
                <OrderContextProvider>
                  <Navbar />

                  <CheckoutPage errorHandler={errorHandler} />
                </OrderContextProvider>
              </CategoryContextProvider>
            ) : (
              <div>Something went wrong Error:{apiError.message} </div>
            )
          }
        />
        <Route
          path="/checkout/return"
          element={
            !apiError ? (
              <CategoryContextProvider>
                <OrderInProcessContextProvider>
                  <Navbar />

                  <PaymentReturnPage errorHandler={errorHandler} />
                </OrderInProcessContextProvider>
              </CategoryContextProvider>
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
