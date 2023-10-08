import { getCookie, setCookie } from "./cookiesHelpers";
import { fetchApi } from "./fetchHelper";

export function updateCart(productId, handleOrderContext, action) {
  let guestCustomerId = getCookie("guestCustomerId");
  const fetchUrl = `http://localhost:5000/api/cart/${action}`;

  if (!guestCustomerId) {
    guestCustomerId = Date.now();
    setCookie("guestCustomerId", guestCustomerId);
  }

  const body = {
    productId: parseInt(productId),
    quantity: 1,
    guestCustomerId: parseInt(guestCustomerId.slice(-9)),
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
      setCookie("order", JSON.stringify(res.order));
      handleOrderContext();
    })
    .catch((err) => console.log(err));
}
