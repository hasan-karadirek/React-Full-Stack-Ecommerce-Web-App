import React, { useEffect, useState } from "react";
import UpdateCartButton from "./UpdateCartButton";

export default function CartItems({
  orderContext,
  errorHandler,
  handleOrderContext,
  handleTotalQuantity,
}) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    let totalQuantity = 0;
    const cartItemsArr = orderContext
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
    setCartItems(cartItemsArr);

    handleTotalQuantity(totalQuantity);
  }, []);

  return cartItems;
}
