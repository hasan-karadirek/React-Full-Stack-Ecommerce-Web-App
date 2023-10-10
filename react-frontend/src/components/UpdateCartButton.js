import React from "react";

import { updateCart } from "../helpers/updateCartHelper";

export default function UpdateCartButton({
  productId,
  handleOrderContext,
  action,
  textContent,
  errorHandler,
}) {
  const button = (
    <button
      className="add-to-cart-button"
      id={productId}
      onClick={(e) => {
        updateCart(e.target.id, handleOrderContext, action, errorHandler);
      }}
    >
      {textContent}
    </button>
  );
  return button;
}
