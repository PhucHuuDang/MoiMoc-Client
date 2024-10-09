import Image from "next/image";
import { Star, ShoppingCart, Instagram, Facebook } from "lucide-react";
import { Footer } from "@/components/_global-components-reused/footer";
import DetailPage from "./_components/detail";
import { productDetail } from "@/api/product-data/products-data";
import { ProductDetailTypes } from "@/types/product-detail-types";
import NotFound from "./not-found";

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const productDetailData: ProductDetailTypes = await productDetail(productId);

  console.log({ productDetailData });

  return productDetailData ? (
    <DetailPage productDetailData={productDetailData} />
  ) : (
    // <div className="flex items-center justify-center min-h-screen bg-red-500">
    //   Product Not Found
    // </div>
    <NotFound />
  );
}
