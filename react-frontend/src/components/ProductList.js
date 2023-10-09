import React, { useEffect, useState } from "react";
import useApiFetch from "../hooks/useApiFetch";
import { Link } from "react-router-dom";

export default function ProductList({ categorySlug }) {
  const url = categorySlug
    ? `http://localhost:5000/api/category/${categorySlug}?limit=20`
    : "";
  const options = { method: "GET" };
  const [products, loading] = useApiFetch(url, options);

  const productList = products.products.map((product) => {
    return (
      <li className="product-card-container">
        <Link className="product-link" to={`/product/${product.slug}`}>
          <img
            className="product-card-image"
            src={`http://localhost:5000/api/productImages/${
              product.ProductImages[0].path.split("/")[3]
            }`}
            alt={product.slug}
          />
          <span>{product.name}</span>
          <span>{product.price}</span>
        </Link>
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
