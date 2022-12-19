import axios from "axios";

export const fetchProducts = async () => {
  const result = await axios.get("https://dummyjson.com/products");
  return result;
};
