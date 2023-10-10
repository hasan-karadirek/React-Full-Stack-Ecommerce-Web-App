import React, { createContext, useState } from "react";
import { getCookie } from "../helpers/cookiesHelpers";

export const CategoryContext = createContext();

export function useCategoryContext() {
  const [categoryContext, setCategoryContext] = useState();

  const handleCategoryContext = () => {
    const categories = getCookie("categories")
      ? JSON.parse(getCookie("categories"))
      : [];
    setCategoryContext(categories);
  };
  return { categoryContext, handleCategoryContext };
}

export function CategoryContextProvider({ children }) {
  const { categoryContext, handleCategoryContext } = useCategoryContext();
  return (
    <CategoryContext.Provider
      value={{ categoryContext, handleCategoryContext }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
