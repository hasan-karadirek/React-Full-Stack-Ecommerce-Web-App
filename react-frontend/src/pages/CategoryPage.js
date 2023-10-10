import React, { useContext } from "react";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";
import { OrderContext } from "../contexts/OrderContext";
import CategoryPageHeader from "../components/CategoryPageHeader";

export default function CategoryPage({ errorHandler }) {
  const { orderContext, handleOrderContext } = useContext(OrderContext);
  const { categorySlug } = useParams();
  return (
    <>
      <CategoryPageHeader categorySlug={categorySlug} />
      <ProductList
        errorHandler={errorHandler}
        handleOrderContext={handleOrderContext}
        categorySlug={categorySlug}
      />
    </>
  );
}
