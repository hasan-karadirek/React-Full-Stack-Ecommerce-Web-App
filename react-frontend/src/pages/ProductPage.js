import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useApiFetch from "../hooks/useApiFetch";
import { OrderContext } from "../contexts/OrderContext";
import UpdateCartButton from "../components/UpdateCartButton";
import footIcon from "../assets/feature-reinforced-heel-and-toe.svg";
import materialIcon from "../assets/material-combed-cotton.svg";
import logo from "../assets/logo-hs.svg";
import productDetailBannerBlue from "../assets/blue-smile.svg";
import productDetailBannerPink from "../assets/pink-icon.svg";
import productDetailBannerLightBlue from "../assets/light-blue-smile.svg";
import { apiServer } from "../environmentVariables";

export default function ProductPage({ errorHandler }) {
  const { orderContext, handleOrderContext } = useContext(OrderContext);
  const { productSlug } = useParams();
  const url = productSlug ? `${apiServer}/api/products/${productSlug}` : "";

  const [result, loading] = useApiFetch(url, null, errorHandler);

  const productExtraInfo = (
    <ul>
      <li key="extra-info-1" className="info-label">
        <img className="info-icon" src={footIcon} alt="info" />{" "}
        <span>Reinforced heel and toes</span>
      </li>
      <li key="extra-info-2" className="info-label">
        <img className="info-icon" src={materialIcon} alt="info" />{" "}
        <span>Combed cotton</span>
      </li>
      <li key="extra-info-3" className="info-label">
        <img className="info-icon" src={logo} alt="info" />{" "}
        <span>86% Cotton, 12% Polyamide, 2% Elastane</span>
      </li>
    </ul>
  );
  const productDetailBanner = (
    <div className="product-detail-banner-container">
      <div className="product-detail-banner-image-box">
        <img src={productDetailBannerBlue} alt="product-detail-banner" />
        <p>Unexpected designs</p>
      </div>
      <div className="product-detail-banner-image-box">
        <img src={productDetailBannerPink} alt="product-detail-banner" />
        <p>Made for everyone</p>
      </div>
      <div className="product-detail-banner-image-box">
        <img src={productDetailBannerLightBlue} alt="product-detail-banner" />
        <p>Good quality</p>
      </div>
    </div>
  );

  const productImages = result.product ? (
    result.product.ProductImages.map((image) => {
      return (
        <img
          className="product-detail-image"
          src={`${apiServer}/api/productImages/${
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
    <>
      <div className="navbar-space"></div>
      <div className="product-container">
        <div className="product-detail-left">
          <div className="product-detail-images">{productImages}</div>
        </div>
        <div className="product-detail-right">
          <div className="product-info">
            <h1>{result.product.name}</h1>
            <span className="product-detail-price">
              {result.product.price}$
            </span>
            <br></br>
            <UpdateCartButton
              handleOrderContext={handleOrderContext}
              productId={result.product.id}
              action="add"
              textContent="Add To Cart"
              errorHandler={errorHandler}
            />
            <div className="product-detail-desc">
              <h2>Description</h2>
              <p>{result.product.description}</p>
            </div>
            {productExtraInfo}
            {productDetailBanner}
          </div>
        </div>
      </div>
    </>
  );
}
