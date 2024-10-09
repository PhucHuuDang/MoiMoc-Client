"use client";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Ingredient } from "@/types/product-detail-types";

interface ProductDetailContentProps {
  productDetailContentData: {
    ingredients: Ingredient[];
    details: string;
    usage: string;
  };
}

export const ProductDetailContent = ({
  productDetailContentData,
}: ProductDetailContentProps) => {
  return (
    <TabsContent value="details" className="mt-6">
      <Card>
        <CardContent className="p-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Các thành phần trong sản phẩm
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {productDetailContentData.ingredients.map((ingredient) => {
                return (
                  <li key={ingredient.ingredientId}>
                    {ingredient.ingredientName}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="my-4">
            <h3 className="text-xl font-semibold mb-4">Chi tiết sản phẩm</h3>
            <span>{productDetailContentData.details}</span>
          </div>

          <div className="my-4">
            <h3 className="text-xl font-semibold mb-4">Cách sử dụng</h3>

            <span>{productDetailContentData.usage}</span>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
