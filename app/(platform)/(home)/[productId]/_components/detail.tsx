"use client";
import Image from "next/image";
import { ElementRef, useRef, useState } from "react";
import {
  Star,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  User,
  ThumbsUp,
  MessageCircle,
  Info,
  ChevronRight as ChevronRightIcon,
  Home,
  Heart,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Footer } from "@/components/_global-components-reused/footer";
import { ProductInfo } from "./product-infor";
import { Discussion } from "./tabs-comunity/discussion";
import { ProductDetailContent } from "./tabs-comunity/product-detail-content";
import { RatingReviews } from "./tabs-comunity/rating-reviews";
import { ProductDetailTypes } from "@/types/product-detail-types";
import { LipBalm } from "../../products/_components-products-public/lip-balm";
import { useQuery } from "@tanstack/react-query";
import { productDetail } from "@/api/product-data/products-data";
import NotFound from "../not-found";
import { ProductDetailSkelton } from "./product-detail-skeleton";

interface DetailPageProps {
  productId: string;
}
export default function DetailPage({ productId }: DetailPageProps) {
  const lipBalmRef = useRef<ElementRef<"div">>(null);

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

  const {
    data: productDetailData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: async (): Promise<ProductDetailTypes> =>
      await productDetail(productId),
  });

  const productDetailContentData = {
    ingredients: productDetailData?.ingredients!,
    details: productDetailData?.details!,
    usage: productDetailData?.usage!,
  };

  if (isLoading) return <ProductDetailSkelton />;

  return productDetailData ? (
    <div className="min-h-screen bg-main_background_color py-20 text-foreground">
      <div className="bg-gray-900 text-white px-2 text-center text-sm">
        Đăng ký để được giảm giá 20% ngay đơn hàng đàu tiên của bạn.{" "}
        <span className="underline">Đăng ký ngay</span>
      </div>

      {/* Improved Breadcrumbs */}
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
            {/* <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Improved Product details */}
      <ProductInfo productDetailData={productDetailData!} />

      {/* Tabs */}
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
        <RatingReviews productId={productDetailData?.productId!} />
        <Discussion
          productId={productDetailData?.productId!}
          discussions={productDetailData?.discussion!}
        />
      </Tabs>

      {/* Related Products */}
      <div className="p-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h3>
        <LipBalm ref={lipBalmRef} productDetail />
      </div>

      {/* <LipBalm ref={lipBalmRef} productDetail /> */}

      {/* Footer */}
      <Footer />
    </div>
  ) : (
    <NotFound />
  );
}
