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

export const ProductDetailContent = () => {
  return (
    <TabsContent value="details" className="mt-6">
      <Card>
        <CardContent className="p-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Các thành phần trong sản phẩm
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Premium quality blazer jacket</li>
              <li>Material: 80% wool, 20% polyester</li>
              <li>Fully lined with inner pockets</li>
              <li>Suitable for both formal and casual occasions</li>
              <li>Dry clean only</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Chi tiết sản phẩm</h3>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              aliquam, purus sit amet
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Cách sử dụng</h3>

            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              aliquam, purus sit amet
            </span>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
