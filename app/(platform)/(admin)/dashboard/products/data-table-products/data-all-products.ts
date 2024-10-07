import { serverGetData } from "@/api/actions/get-data-api";

type AllProductsTable = {
  id: number;
  image: string;
  name: string;
  status: "Draft" | "Processing" | "Publish" | "Active" | "Failed";
  quantity: number;
  price: number;
  discountPercent?: number;
  discountPrice?: number;
  totalSales: number;
  createdAt: string;
};

const productsList = async () => {
  const products = await serverGetData("/products");

  return products;
};
