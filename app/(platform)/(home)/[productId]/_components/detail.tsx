"use client";
import Image from "next/image";
import { useState } from "react";
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

interface DetailPageProps {
  productDetailData: ProductDetailTypes;
}
export default function DetailPage({ productDetailData }: DetailPageProps) {
  const TABS_TRIGGER = [
    {
      value: "details",
      label: "The Details",
      icon: <Info className="w-4 h-4 mr-2" />,
    },
    {
      value: "ratings",
      label: "Ratings & Reviews",
      icon: <Star className="w-4 h-4 mr-2" />,
    },
    {
      value: "discussion",
      label: "Discussion",
      icon: <MessageCircle className="w-4 h-4 mr-2" />,
    },
  ];

  console.log({ productDetailData });

  return (
    <>
      <div className="min-h-screen bg-main_background_color pt-20 text-foreground">
        <div className="bg-gray-900 text-white px-2 text-center text-sm">
          Sign up and GET 20% OFF for your first order.{" "}
          <span className="underline">Sign up now</span>
        </div>

        {/* Improved Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products/women">Women</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Blazer Jacket</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Improved Product details */}
        <ProductInfo productDetailData={productDetailData} />

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

          <ProductDetailContent />
          <RatingReviews />
          <Discussion />
        </Tabs>

        {/* Related Products */}
        <div className="p-4 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Related Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Autumn Dress", price: "$85", originalPrice: "$124" },
              { name: "Casual Shirt", price: "$29", originalPrice: "$39" },
              { name: "Leather Coat", price: "$35" },
              { name: "Long Coat Outer", price: "$12" },
            ].map((product, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-2">
                    <Image
                      src="/placeholder.svg"
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    {index < 2 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs">
                        SALE
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <div className="flex items-center">
                    <span className="font-bold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
