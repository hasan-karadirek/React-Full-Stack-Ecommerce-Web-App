import React from "react";

import { updateCart } from "../helpers/updateCartHelper";

export default function UpdateCartButton({
  productId,
  handleOrderContext,
  action,
  textContent,
}) {
  const button = (
    <button
      id={productId}
      onClick={(e) => {
        updateCart(e.target.id, handleOrderContext, action);
      }}
    >
      {textContent}
    </button>
  );
  return button;
}
