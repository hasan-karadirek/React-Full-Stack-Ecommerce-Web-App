import React, { useContext } from "react";

import { OrderContext } from "../contexts/OrderContext";
import UpdateCartButton from "../components/UpdateCartButton";

export default function CartPage() {
  const { orderContext, handleOrderContext } = useContext(OrderContext);
  console.log(orderContext, "sds");
  const cartItems = orderContext
    ? orderContext.Products.map((product) => {
        return (
          <div className="cart-item">
            {console.log(product.ProductImages[0])}
            <img
              className="cart-product-image"
              src={`http://localhost:5000/api/productImages/${
                product.ProductImages[0].path.split("/")[3]
              }`}
              alt={product.name}
            />
            <p>{product.name}</p>

            <UpdateCartButton
              handleOrderContext={handleOrderContext}
              productId={258}
              action="remove"
              textContent="-"
            />
            <span>{product.OrderDetail.quantity}</span>
            <UpdateCartButton
              handleOrderContext={handleOrderContext}
              productId={258}
              action="add"
              textContent="+"
            />
            <p>{product.price}</p>
          </div>
        );
      })
    : [];
  return orderContext ? (
    <div className="cart-items">{cartItems}</div>
  ) : (
    <p>loading</p>
  );
}
