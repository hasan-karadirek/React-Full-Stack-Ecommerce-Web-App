import React from "react";
import useApiFetch from "../hooks/useApiFetch";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [result, loading] = useApiFetch(
    "http://localhost:5000/api/category/all"
  );
  const categoriesArr = result.categories;
  const categoryList = categoriesArr
    ? categoriesArr.map((category) => {
        return (
          <li key={category.slug}>
            <Link to={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        );
      })
    : [];

  return loading ? <p>loading</p> : <ul>{categoryList}</ul>;
}
