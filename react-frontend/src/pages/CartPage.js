import React, { useContext, useState } from "react";

import { OrderContext } from "../contexts/OrderContext";
import UpdateCartButton from "../components/UpdateCartButton";
import { Link } from "react-router-dom";

export default function CartPage({ errorHandler }) {
  const { orderContext, handleOrderContext } = useContext(OrderContext);

  let totalQuantity = 0;
  const cartItems = orderContext
    ? orderContext.Products.map((product) => {
        totalQuantity += product.OrderDetail.quantity;
        return (
          <div className="cart-item">
            <div className="cart-item-left">
              <img
                className="cart-product-image"
                src={`http://localhost:5000/api/productImages/${
                  product.ProductImages[0].path.split("/")[3]
                }`}
                alt={product.name}
              />
              <div className="cart-update">
                <p>{product.name}</p>

                <UpdateCartButton
                  handleOrderContext={handleOrderContext}
                  productId={product.id}
                  action="remove"
                  textContent="-"
                  errorHandler={errorHandler}
                />
                <span>{product.OrderDetail.quantity}</span>
                <UpdateCartButton
                  handleOrderContext={handleOrderContext}
                  productId={product.id}
                  action="add"
                  textContent="+"
                  errorHandler={errorHandler}
                />
              </div>
            </div>
            <span className="cart-product-price">{product.price}$</span>
          </div>
        );
      })
    : [];

  return orderContext ? (
    <>
      <div className="navbar-space"></div>
      <div>
        <div className="cart-nav">
          <p
            className={
              window.location.pathname === "/cart" ? "cart-nav-active" : ""
            }
          >
            Cart
          </p>
          <p
            className={
              window.location.pathname === "/checkout" ? "cart-nav-active" : ""
            }
          >
            Address
          </p>
          <p
            className={
              window.location.pathname === "/payment" ? "cart-nav-active" : ""
            }
          >
            Payment
          </p>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-item">No product in the cart.</div>
          ) : (
            cartItems
          )}
          <div className="cart-total-container">
            <div className="cart-total">
              <span>Total ({`${totalQuantity} products`})</span>
              <span>({`${orderContext.order_total}$`})</span>
            </div>
            <div className="to-checkout-button-container">
              <Link to="/checkout" className="to-checkout-link">
                <button className="to-checkout-button">Go to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="cart-items">
      <div className="cart-item">no product in the cart</div>
    </div>
  );
}
