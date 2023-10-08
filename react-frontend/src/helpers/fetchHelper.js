export const fetchApi = async (url, options) => {
  const res = await fetch(url, options);
  const resText = await res.text();
  return JSON.parse(resText);
};
