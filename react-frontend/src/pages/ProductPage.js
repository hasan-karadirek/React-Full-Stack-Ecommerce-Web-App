import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useApiFetch from "../hooks/useApiFetch";
import { OrderContext } from "../contexts/OrderContext";
import UpdateCartButton from "../components/UpdateCartButton";

export default function ProductPage() {
  const { orderContext, handleOrderContext } = useContext(OrderContext);
  const { productSlug } = useParams();
  const url = productSlug
    ? `http://localhost:5000/api/products/${productSlug}`
    : "";

  const [result, loading] = useApiFetch(url);

  const productImages = result.product ? (
    result.product.ProductImages.map((image) => {
      return (
        <img
          className="product-detail-image"
          src={`http://localhost:5000/api/productImages/${
            result.product.ProductImages[
              result.product.ProductImages.indexOf(image)
            ].path.split("/")[3]
          }`}
          alt={result.product.name}
        />
      );
    })
  ) : (
    <></>
  );

  return loading ? (
    <p>loading</p>
  ) : (
    <div className="product-container">
      <Link to="/cart">cart</Link>
      <div className="product-detail-left">
        <div className="product-detail-images">{productImages}</div>
      </div>
      <div className="product-detail-right">
        <div className="product-info">
          <h1>{result.product.name}</h1>
          <span>{result.product.price}$</span>
          <br></br>
          <UpdateCartButton
            handleOrderContext={handleOrderContext}
            productId={result.product.id}
            action="add"
            textContent="Add To Cart"
          />
          <div className="product-detail-desc">
            <h2>Description</h2>
            <p>{result.product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
