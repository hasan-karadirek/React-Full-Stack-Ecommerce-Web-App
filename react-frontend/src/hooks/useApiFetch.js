import React, { useState, useEffect } from "react";
import { fetchApi } from "../helpers/fetchHelper";

export default function useApiFetch(url, option) {
  const urlArr = url.split(",");

  const [result, setProducts] = useState({ products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(url);
    const promises = urlArr.map((url) => fetchApi(url, option));

    Promise.all(promises).then((res) => {
      console.log(res);
      setProducts(res[0]);
      setLoading(false);
    });
  }, [url]);
  return [result, loading];
}
