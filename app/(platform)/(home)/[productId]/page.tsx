import Image from "next/image";
import { Star, ShoppingCart, Instagram, Facebook } from "lucide-react";
import { Footer } from "@/components/_global-components-reused/footer";
import DetailPage from "./_components/detail";
import { productDetail, productsList } from "@/api/product-data/products-data";
import { ProductDetailTypes } from "@/types/product-detail-types";
import NotFound from "./not-found";
import { Suspense } from "react";
import { ProductDetailSkelton } from "./_components/product-detail-skeleton";
import { Metadata } from "next";
import { ProductReturnedTypes } from "@/types/product-types";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chi tiết sản phẩm",
    description:
      "Trang chi tiết sản phẩm giúp bạn có cái nhìn tổng quan hơn khi thảm khảo sản phẩm",
  };
}

export async function generateStaticParams() {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 },
  });

  if (!products.ok) {
    return [];
  }

  const data = await products.json();

  return data.map((product: ProductReturnedTypes) => {
    return {
      productId: String(product.id),
    };
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const productId = (await params).productId;

  const productDetailData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    { cache: "no-store" },
  );

  if (!productDetailData.ok) {
    return <div className="font-bold text-red-500 mx-auto pt-20">no data</div>;
  }

  const testData = await productDetailData.json();

  console.log({ testData });

  return (
    // <div className="text-red-500 pt-20 mx-auto">
    //   <div>{testData.productId}</div>

    //   <div>{testData.productName}</div>
    //   <div>{testData.description}</div>
    //   <div>{testData.details}</div>
    // </div>
    <Suspense fallback={<ProductDetailSkelton />}>
      <DetailPage productId={productId} />
    </Suspense>
  );
}
