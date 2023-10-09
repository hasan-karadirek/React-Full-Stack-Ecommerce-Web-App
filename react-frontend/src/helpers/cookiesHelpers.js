import Cookies from "js-cookie";

export const setCookie = (cookieName, CookieValue) => {
  Cookies.set(cookieName, CookieValue, { expires: 7 }); // Expires in 7 days
};

export const getCookie = (name) => {
  const value = Cookies.get(name);
  return value;
};

export const deleteCookie = (name) => {
  Cookies.remove(name);
};
