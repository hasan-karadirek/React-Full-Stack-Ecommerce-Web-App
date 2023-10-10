import React from "react";

import CheckoutForm from "../components/CheckoutForm";
import { getCookie } from "../helpers/cookiesHelpers";

export default function CheckoutPage({ errorHandler }) {
  const order = getCookie("order") ? JSON.parse(getCookie("order")) : null;

  return order ? (
    order.order_total !== 0 ? (
      <>
        <div className="navbar-space"></div>
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
        <div>
          <CheckoutForm errorHandler={errorHandler} />
        </div>
      </>
    ) : (
      <>
        <div className="navbar-space"></div>
        <div>Your cart is empty</div>
      </>
    )
  ) : (
    <>
      <div className="navbar-space"></div>
      <div>Your cart is empty</div>
    </>
  );
}
