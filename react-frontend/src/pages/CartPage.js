import React, { useContext } from "react";

import { OrderContext } from "../contexts/OrderContext";
import UpdateCartButton from "../components/UpdateCartButton";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { orderContext, handleOrderContext } = useContext(OrderContext);
  console.log(orderContext, "sds");
  let totalQuantity = 0;
  const cartItems = orderContext
    ? orderContext.Products.map((product) => {
        totalQuantity += product.OrderDetail.quantity;
        return (
          <div className="cart-item">
            {console.log(product.ProductImages[0])}
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
              </div>
            </div>
            <span className="cart-product-price">{product.price}</span>
          </div>
        );
      })
    : [];

  return orderContext ? (
    <div className="cart-items">
      {cartItems}
      <div className="cart-total-container">
        <div className="cart-total">
          <span>Subtotal({`${totalQuantity} products`})</span>
          <span>({`${orderContext.order_total}$`})</span>
        </div>
        <div className="to-checkout-button-container">
          <Link to="/checkout" className="to-checkout-button">
            <button>Go to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <p>loading</p>
  );
}
