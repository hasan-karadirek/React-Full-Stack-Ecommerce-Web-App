import { getCookie, setCookie } from "./cookiesHelpers";
import { fetchApi } from "./fetchHelper";

export function updateCart(
  productId,
  handleOrderContext,
  action,
  errorHandler
) {
  let guestCustomerId = getCookie("guestCustomerId");
  const fetchUrl = `http://localhost:5000/api/cart/${action}`;

  if (!guestCustomerId) {
    guestCustomerId = JSON.stringify(Date.now()).slice(-9);
    setCookie("guestCustomerId", guestCustomerId);
  }

  const body = {
    productId: parseInt(productId),
    quantity: 1,
    guestCustomerId: parseInt(guestCustomerId),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    body: JSON.stringify(body),
  };
  fetchApi(fetchUrl, options)
    .then((res) => {
      console.log(JSON.stringify(res.order));
      setCookie("order", JSON.stringify(res.order));
      handleOrderContext();
    })
    .catch((err) => errorHandler(err));
}
