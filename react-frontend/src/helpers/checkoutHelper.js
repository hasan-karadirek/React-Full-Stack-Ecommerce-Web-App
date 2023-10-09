import { OrderInProcessContext } from "../contexts/OrderInProcessContext";
import { deleteCookie, getCookie, setCookie } from "./cookiesHelpers";
import { fetchApi } from "./fetchHelper";

export function checkout(formData, errorHandler) {
  let guestCustomerId = getCookie("guestCustomerId");

  const guestFirstName = formData.firstName;
  const guestLastName = formData.lastName;
  const guestEmail = formData.email;
  delete formData.firstName;
  delete formData.lastName;
  delete formData.email;

  const fetchUrl = `http://localhost:5000/api/checkout`;

  if (!guestCustomerId) {
    guestCustomerId = Date.now();
    setCookie("guestCustomerId", guestCustomerId);
  }
  const reqBody = {
    paymentMethod: "mollie",
    returnUrl: "http://localhost:3000/checkout/return",
    guestCustomerId: parseInt(guestCustomerId.slice(-9)),
    guestFirstName: guestFirstName,
    guestLastName: guestLastName,
    guestEmail: guestEmail,
    address: formData,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    body: JSON.stringify(reqBody),
  };
  fetchApi(fetchUrl, options)
    .then((res) => {
      setCookie("orderInProcess", JSON.stringify(res.order));
      deleteCookie("order");

      window.location.href = res.redirectUrl;
      //setCookie("order", JSON.stringify(res.order));
    })
    .catch((err) => errorHandler(err));
}
