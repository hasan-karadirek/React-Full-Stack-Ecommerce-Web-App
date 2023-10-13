import React, { useContext, useEffect } from "react";
import useApiFetch from "../hooks/useApiFetch";
import { Link } from "react-router-dom";
import cartIcon from "../assets/cart.svg";
import { OrderContext } from "../contexts/OrderContext";
import { setCookie } from "../helpers/cookiesHelpers";
import { CategoryContext } from "../contexts/CategoryContext";
import { apiServer } from "../environmentVariables";

export default function Navbar({ errorHandler }) {
  const { orderContext, handleOrderContext } = useContext(OrderContext);
  const { categoryContext, handleCategoryContext } =
    useContext(CategoryContext);
  const orderQuantity = orderContext
    ? orderContext.Products.reduce((acc, product) => {
        return (acc += product.OrderDetail.quantity);
      }, 0)
    : 0;
  const [result, loading] = useApiFetch(
    `${apiServer}/api/category/all`,
    {},
    errorHandler
  );
  const categoriesArr = result && result.categories ? result.categories : [];
  useEffect(() => {
    setCookie("categories", JSON.stringify(categoriesArr));
    handleCategoryContext();
  }, [categoriesArr]);

  const categoryList = categoriesArr
    ? categoriesArr.map((category) => {
        return (
          <li key={category.slug} className="navbar-item">
            <Link className="navbar-link" to={`/category/${category.slug}`}>
              {category.name}
            </Link>
          </li>
        );
      })
    : [];

  return loading ? (
    <p>loading</p>
  ) : (
    <div className="navbar">
      <ul className="navbar-items">
        <div className="navbar-items-left">{categoryList}</div>
        <div className="navbar-items-right">
          <Link className="navbar-cart-button" to={"/cart"}>
            <button
              className="cart-button"
              style={{
                backgroundColor: orderQuantity !== 0 ? "#58ba54" : "",
              }}
            >
              <img alt="cart-icon" src={cartIcon} />
              <span className="cart-quantity">{orderQuantity}</span>
              <input placeholder="Search" className="search-input" />
            </button>
          </Link>
        </div>
      </ul>
    </div>
  );
}
