import React from "react";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  return (
    <>
      <ProductList categorySlug={categorySlug} />
    </>
  );
}
