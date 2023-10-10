import React, { useEffect, useState } from "react";
import useApiFetch from "../hooks/useApiFetch";
import { Link } from "react-router-dom";
import cartIcon from "../assets/cart.svg";
import { updateCart } from "../helpers/updateCartHelper";

export default function ProductList({
  categorySlug,
  errorHandler,
  handleOrderContext,
}) {
  const url = categorySlug
    ? `http://localhost:5000/api/category/${categorySlug}?limit=20`
    : "";
  const options = { method: "GET" };
  const [products, loading] = useApiFetch(url, options);
  const mouseEnter = (e) => {
    const button = e.currentTarget.querySelector(".product-card-add-to-cart");
    button.classList.remove("hidden");
  };

  const mouseLeave = (e) => {
    const button = e.currentTarget.querySelector(".product-card-add-to-cart");
    button.classList.add("hidden");
  };

  const productList = products.products.map((product) => {
    return (
      <li
        className="product-card-container"
        onMouseEnter={(e) => mouseEnter(e)}
        onMouseLeave={(e) => mouseLeave(e)}
      >
        <Link className="product-link" to={`/product/${product.slug}`}>
          <img
            className="product-card-image"
            src={`http://localhost:5000/api/productImages/${
              product.ProductImages[0].path.split("/")[3]
            }`}
            alt={product.slug}
          />
          <span className="product-cart-title">{product.name}</span>
          <span className="product-card-price">{product.price}</span>
        </Link>
        <button
          key={product.id}
          id={product.id}
          onClick={(e) => {
            updateCart(e.target.id, handleOrderContext, "add", errorHandler);
          }}
          className="product-card-add-to-cart hidden"
        >
          <img id={product.id} alt="cart-icon" src={cartIcon} />
        </button>
      </li>
    );
  });
  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <ul className="product-list">{productList}</ul>
      )}
    </>
  );
}
