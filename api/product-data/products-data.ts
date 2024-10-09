import { serverGetData } from "@/api/actions/get-data-api";

export const productsList = async () => {
  const products = await serverGetData("/products");

  return products;
};

export const productDetail = async (productId: string) => {
  try {
    const product = await serverGetData(`/products/${productId}`);

    if (!product) {
      throw new Error("Empty or invalid response");
    }

    return product;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null; // Handle the error or return a fallback
  }
};
