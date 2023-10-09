import React, { createContext, useState } from "react";
import { getCookie } from "../helpers/cookiesHelpers";
const cookieOrder = getCookie("order");
const order = cookieOrder ? JSON.parse(cookieOrder) : "";
export const OrderContext = createContext(order);

export function useOrderContext() {
  const [orderContext, setOrderContext] = useState(order);

  const handleOrderContext = () => {
    const order = JSON.parse(getCookie("order"));

    setOrderContext(order);
  };
  return { orderContext, handleOrderContext };
}

export function OrderContextProvider({ children }) {
  const { orderContext, handleOrderContext } = useOrderContext();
  return (
    <OrderContext.Provider value={{ orderContext, handleOrderContext }}>
      {children}
    </OrderContext.Provider>
  );
}
