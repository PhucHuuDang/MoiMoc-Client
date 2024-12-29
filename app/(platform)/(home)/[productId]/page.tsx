import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Instagram,
  Facebook,
  ChevronRightIcon,
  Home,
  Info,
  MessageCircle,
} from "lucide-react";
import { Footer } from "@/components/_global-components-reused/footer";
import DetailPage from "./_components/detail";
import { productDetail, productsList } from "@/api/product-data/products-data";
import { ProductDetailTypes } from "@/types/product-detail-types";
import NotFound from "./not-found";
import { Suspense } from "react";
import { ProductDetailSkelton } from "./_components/product-detail-skeleton";
import { Metadata } from "next";
import { ProductReturnedTypes } from "@/types/product-types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductInfo } from "./_components/product-infor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDetailContent } from "./_components/tabs-comunity/product-detail-content";
import { RatingReviews } from "./_components/tabs-comunity/rating-reviews";
import { Discussion } from "./_components/tabs-comunity/discussion";
import { LipBalm } from "../products/_components-products-public/lip-balm";

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
    throw new Error("Failed to fetch products");
  }

  const data = await products.json();

  return data.map((product: ProductReturnedTypes) => {
    return {
      productId: String(product.id),
    };
  });
}

const TABS_TRIGGER = [
  {
    value: "details",
    label: "Chi tiết sản phẩm",
    icon: <Info className="w-4 h-4 mr-2" />,
  },
  {
    value: "ratings",
    label: "Đánh giá & Nhận xét",
    icon: <Star className="w-4 h-4 mr-2" />,
  },
  {
    value: "discussion",
    label: "Thảo luận",
    icon: <MessageCircle className="w-4 h-4 mr-2" />,
  },
];

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const productId = (await params).productId;
  const productDetailData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!productDetailData.ok) {
    return <NotFound />;
  }

  const detailData = await productDetailData.json();

  const productDetailContentData = {
    ingredients: detailData.ingredients,
    details: detailData.details,
    usage: detailData.usage,
  };

  return (
    <div className="min-h-screen bg-main_background_color py-20 text-foreground">
      <div className="bg-gray-900 text-white px-2 text-center text-sm">
        Đăng ký để được giảm giá 20% ngay đơn hàng đàu tiên của bạn.{" "}
        <span className="underline">Đăng ký ngay</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
                <span className="sr-only">Trang chủ</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">
                Chi tiết sản phẩm
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <ProductInfo productDetailData={detailData} />

      <Tabs defaultValue="details" className="p-4 max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          {TABS_TRIGGER.map((tab) => {
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <ProductDetailContent
          productDetailContentData={productDetailContentData!}
        />
        <RatingReviews productId={detailData.productId} />
        <Discussion
          productId={detailData.productId}
          discussions={detailData.discussion}
        />
      </Tabs>

      <div className="p-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h3>
        <LipBalm productDetail />
      </div>

      <Footer />
    </div>

    // <Suspense fallback={<ProductDetailSkelton />}>
    //   <DetailPage productId={productId} />
    // </Suspense>
  );
}
