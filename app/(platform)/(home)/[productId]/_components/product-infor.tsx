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

export const ProductInfo = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    "/images/alchemistry.png",
    "/images/demo-product-1.png",
    "/images/demo-product-2.png",
    "/images/demo-product-3.png",
  ];
  return (
    <div className="flex flex-col md:flex-row p-4 gap-8 max-w-7xl mx-auto">
      {/* Product images */}
      <div className="md:w-1/2">
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
          <Image
            src={productImages[currentImage]}
            alt="Blazer Jacket"
            layout="fill"
            objectFit="cover"
          />
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2
              shadow-md"
            onClick={() =>
              setCurrentImage(
                (prev) =>
                  (prev - 1 + productImages.length) % productImages.length,
              )
            }
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2
              shadow-md"
            onClick={() =>
              setCurrentImage((prev) => (prev + 1) % productImages.length)
            }
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {productImages.map((image, index) => (
            <button
              key={index}
              className={`aspect-square relative rounded-md overflow-hidden
              ${index === currentImage ? "ring-2 ring-primary" : ""}`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-2">Blazer Jacket</h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-sm">(4.9)</span>
        </div>
        <p className="text-3xl font-bold mb-4">$2500</p>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Available Size</h3>
          <div className="flex space-x-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <TooltipProvider key={size}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-10 h-10 rounded-full"
                    >
                      {size}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Size {size}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Available Color</h3>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="w-10 h-10 rounded-full bg-gray-800" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Black</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="w-10 h-10 rounded-full bg-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gray</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-xl font-semibold">{quantity}</span>
          <Button variant="outline" onClick={() => setQuantity(quantity + 1)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button variant="moiMoc" className="flex-1 py-6">
            Add to cart
          </Button>
          <Button variant="outline" className="py-6">
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        <Badge variant="outline" className="text-red-500 border-red-500">
          Last 1 left - make it yours!
        </Badge>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Product Description</h3>
          <p className="text-gray-600">
            Elevate your style with our premium Blazer Jacket. Crafted from
            high-quality materials, this versatile piece seamlessly transitions
            from office to evening wear. Its tailored fit and classic design
            make it a timeless addition to any wardrobe.
          </p>
        </div>
      </div>
    </div>
  );
};
