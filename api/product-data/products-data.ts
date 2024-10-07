import { serverGetData } from "@/api/actions/get-data-api";

export const productsList = async () => {
  const products = await serverGetData("/products");


  return products;
};
