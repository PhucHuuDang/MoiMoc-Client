import { serverGetData } from "@/api/actions/get-data-api";

const productsList = async () => {
  const products = await serverGetData("/products");

  console.log({ products });

  return products;
};
