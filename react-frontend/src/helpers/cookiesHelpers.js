import Cookies from "js-cookie";

export const setCookie = (cookieName, CookieValue) => {
  Cookies.set(cookieName, CookieValue, { expires: 7 }); // Expires in 7 days
};

// Function to get a cookie
export const getCookie = (name) => {
  const value = Cookies.get(name);
  return value;
};

// Function to delete a cookie
export const deleteCookie = () => {
  Cookies.remove("myCookieName");
};
