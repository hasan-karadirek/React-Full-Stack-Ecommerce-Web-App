import React, { createContext, useState } from "react";
import { getCookie } from "../helpers/cookiesHelpers";
const cookieOrderInProcess = getCookie("orderInProcess");
const orderInProcess = cookieOrderInProcess
  ? JSON.parse(cookieOrderInProcess)
  : "";
export const OrderInProcessContext = createContext(orderInProcess);

export function useOrderInProcessContext() {
  const [orderContext, setOrderContext] = useState(orderInProcess);

  const handleOrderInProcessContext = () => {
    const order = JSON.parse(getCookie("order"));
    setOrderContext(order);
  };
  return { orderContext, handleOrderInProcessContext };
}

export function OrderInProcessContextProvider({ children }) {
  const { orderContext, handleOrderContext } = useOrderInProcessContext();
  return (
    <OrderInProcessContext.Provider
      value={{ orderContext, handleOrderContext }}
    >
      {children}
    </OrderInProcessContext.Provider>
  );
}
