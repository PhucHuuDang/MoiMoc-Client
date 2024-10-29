import Image from "next/image";
import { Star, ShoppingCart, Instagram, Facebook } from "lucide-react";
import { Footer } from "@/components/_global-components-reused/footer";
import DetailPage from "./_components/detail";
import { productDetail } from "@/api/product-data/products-data";
import { ProductDetailTypes } from "@/types/product-detail-types";
import NotFound from "./not-found";
import { Suspense } from "react";
import { ProductDetailSkelton } from "./_components/product-detail-skeleton";

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  // const productDetailData: ProductDetailTypes = await productDetail(productId);

  // console.log({ productDetailData });

  // return productDetailData ? (
  //   <Suspense fallback={<ProductDetailSkelton />}>
  //     <DetailPage productDetailData={productDetailData} productId={productId} />
  //   </Suspense>
  // ) : (

  //   <NotFound />
  // );
  return (
    <Suspense fallback={<ProductDetailSkelton />}>
      <DetailPage productId={productId} />
    </Suspense>
  );
}
