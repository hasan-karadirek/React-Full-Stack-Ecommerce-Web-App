import React, { useState, useEffect } from "react";
import { fetchApi } from "../helpers/fetchHelper";

export default function useApiFetch(url, option, errorHandler) {
  const urlArr = url.split(",");

  const [result, setResult] = useState({ products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promises = urlArr.map((url) => fetchApi(url, option));

    Promise.all(promises)
      .then((res) => {
        setResult(res[0]);
        setLoading(false);
      })
      .catch((err) => errorHandler(err));
  }, [url]);
  return [result, loading];
}
