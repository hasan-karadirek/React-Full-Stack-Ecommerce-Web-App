import "./App.css";
import CategoryPage from "./pages/CategoryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { OrderContextProvider } from "./contexts/OrderContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route
          path="/product/:productSlug"
          element={
            <OrderContextProvider>
              <ProductPage />
            </OrderContextProvider>
          }
        />
        <Route
          path="/cart"
          element={
            <OrderContextProvider>
              <CartPage />
            </OrderContextProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
