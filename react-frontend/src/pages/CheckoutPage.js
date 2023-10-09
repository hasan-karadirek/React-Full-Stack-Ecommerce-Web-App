import React from "react";

import CheckoutForm from "../components/CheckoutForm";
import { getCookie } from "../helpers/cookiesHelpers";

export default function CheckoutPage({ errorHandler }) {
  const order = getCookie("order") ? JSON.parse(getCookie("order")) : null;

  return order ? (
    order.order_total !== 0 ? (
      <div>
        <CheckoutForm errorHandler={errorHandler} />
      </div>
    ) : (
      <div>Your cart is empty</div>
    )
  ) : (
    <div>Your cart is empty</div>
  );
}
