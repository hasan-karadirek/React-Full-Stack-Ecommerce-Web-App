import React, { useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "../helpers/cookiesHelpers";
import { OrderContext } from "../contexts/OrderContext";
import { fetchApi } from "../helpers/fetchHelper";
import { OrderInProcessContext } from "../contexts/OrderInProcessContext";

export default function PaymentReturnPage({ errorHandler }) {
  const { orderContext, handleOrderContext } = useContext(
    OrderInProcessContext
  );
  const [orderStatus, setOrderStatus] = useState("pending");
  console.log(orderContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchApi(`http://localhost:5000/api/checkout/status/${orderContext.id}`)
        .then((res) => {
          console.log(res);
          if (res.order_status === "closed") {
            setOrderStatus(res.payment_status);
            deleteCookie("orderInProcess");
            clearInterval(intervalId);
          }
        })
        .catch((err) => errorHandler(err));
    }, 5000);
  }, []);
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

                <span>{product.OrderDetail.quantity}</span>
              </div>
            </div>
            <span className="cart-product-price">{product.price}</span>
          </div>
        );
      })
    : [];

  return (
    <div className="cart-items">
      {cartItems}
      <div className="cart-total-container">
        <div className="cart-total">
          <span>Subtotal({`${totalQuantity} products`})</span>
          <span>({`${orderContext.order_total}$`})</span>
          <span> Payment {orderStatus}</span>
        </div>
      </div>
    </div>
  );
}
