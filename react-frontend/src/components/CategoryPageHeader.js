import React, { useContext } from "react";
import { getCookie } from "../helpers/cookiesHelpers";
import { CategoryContext } from "../contexts/CategoryContext";

export default function CategoryPageHeader({ categorySlug }) {
  const { categoryContext } = useContext(CategoryContext);
  const category = categoryContext
    ? categoryContext.filter((category) => category.slug === categorySlug)
    : {};
  return (
    <div className="category-page-header">
      <div className="category-page-header-left">
        <h1>{category[0] ? category[0].name : ""}</h1>
        <p>{category[0] ? category[0].description : ""}</p>
      </div>
      <div className="category-page-header-right">
        <img
          className="category-page-header-image"
          src="https://a.storyblok.com/f/54304/1440x960/3b8613098c/fw23-brand-launch-720x480_0005_listing-page-hero-adult.jpg/m/1440x0/filters:quality(60)"
          alt="category-header-image"
        />
      </div>
    </div>
  );
}
