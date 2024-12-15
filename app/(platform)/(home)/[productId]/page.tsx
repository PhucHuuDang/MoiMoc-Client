import Image from "next/image";
import { Star, ShoppingCart, Instagram, Facebook } from "lucide-react";
import { Footer } from "@/components/_global-components-reused/footer";
import DetailPage from "./_components/detail";
import { productDetail } from "@/api/product-data/products-data";
import { ProductDetailTypes } from "@/types/product-detail-types";
import NotFound from "./not-found";
import { Suspense } from "react";
import { ProductDetailSkelton } from "./_components/product-detail-skeleton";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata(): Promise<{
  title: string;
  description: string;
}> {
  return {
    title: "Chi tiết sản phẩm",
    description:
      "Trang chi tiết sản phẩm giúp bạn có cái nhìn tổng quan hơn khi thảm khảo sản phẩm",
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { productId } = await params;

  return (
    <Suspense fallback={<ProductDetailSkelton />}>
      <DetailPage productId={productId} />
    </Suspense>
  );
}
