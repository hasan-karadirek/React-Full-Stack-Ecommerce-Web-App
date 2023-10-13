import React, { useContext, useEffect, useState } from "react";
import { deleteCookie } from "../helpers/cookiesHelpers";
import { fetchApi } from "../helpers/fetchHelper";
import { OrderInProcessContext } from "../contexts/OrderInProcessContext";
import loadingBar from "../assets/loading-svgrepo-com.svg";
import { apiServer } from "../environmentVariables";

export default function PaymentReturnPage({ errorHandler }) {
  const { orderContext, handleOrderContext } = useContext(
    OrderInProcessContext
  );
  const [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchApi(`${apiServer}/api/checkout/status/${orderContext.id}`)
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
            <div className="cart-item-left">
              <img
                className="cart-product-image"
                src={`${apiServer}/api/productImages/${
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
    <>
      <div className="navbar-space"></div>
      <div className="order-detail">
        <p>Thank you for your shopping...</p>
        <p>{`Order Id: ${orderContext.id}`}</p>
        <p>{orderContext.GuestCustomer.firstName}</p>
        <p>{orderContext.GuestCustomer.lastName}</p>
      </div>
      <div className="cart-items">
        {cartItems}
        <div className="cart-total-container">
          <div className="cart-total">
            <span>Total ({`${totalQuantity} products`})</span>
            <span>({`${orderContext.order_total}$`})</span>
          </div>
          <p className="payment-status">Payment status</p>
          <br />
          <p className="payment-status">
            {" "}
            {orderStatus === "pending" ? (
              <img class="loading-bar" src={loadingBar} alt="loading-bar" />
            ) : (
              orderStatus
            )}
          </p>
        </div>
      </div>
    </>
  );
}
