"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  Home,
  Heart,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Footer } from "@/components/_global-components-reused/footer";
import { ProductDetailTypes } from "@/types/product-detail-types";
import { formatCurrency } from "@/handle-transform/formart-currency";
import { useCartStore } from "@/store/use-cart-store";
import StatusButton from "@/components/animata/status-button";
import { toast } from "sonner";
import { ProductItemData } from "@/types/product-types";
import { capitalize } from "lodash";

interface ProductDetailContentProps {
  productDetailData: ProductDetailTypes;
}
export const ProductInfo = ({
  productDetailData,
}: ProductDetailContentProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addOrder = useCartStore((state) => state.addOrder);

  const productOrder: ProductItemData = {
    id: productDetailData.productId,
    productId: productDetailData.productId,
    productName: productDetailData.productName,
    productDescription: productDetailData.description,
    price: productDetailData.price,
    discountPrice: productDetailData.discountPrice,
    discountPercentage: productDetailData.discountPercentage,
    mainImage: productDetailData?.productImages[0].imageUrl,
    quantity: productDetailData.quantity,
    quantityOrder: quantity,
  };

  const productImages = productDetailData.productImages.map(
    (image) => image.imageUrl,
  );

  const discountPercentageToNumber = Number(
    productDetailData.discountPercentage,
  );

  const handleAddToCart = (e: React.MouseEvent, product: ProductItemData) => {
    e.stopPropagation();
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");

    addOrder(product);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-8 max-w-7xl mx-auto">
      {/* Product images */}
      <div className="md:w-1/2">
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
          <Image
            src={productImages[currentImage]}
            alt={productImages[currentImage]}
            // layout="fill"
            fill
            // objectFit="cover"
            style={{ objectFit: "cover" }}
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
        <h2 className="text-3xl font-bold mb-2">
          {productDetailData.productName}
        </h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-sm">(4.9)</span>
        </div>

        <div className="text-md mt-3 flex flex-row items-center gap-1">
          {discountPercentageToNumber && discountPercentageToNumber > 0 ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold text-[#ff6347] text-2xl">
                  {/* {formatCurrency(product.discountPrice)} */}
                  {/* discount price */}
                  {formatCurrency(Number(productDetailData.discountPrice))}
                </span>
              </div>

              <h1 className="text-xl font-semibold text-neutral-500">|</h1>

              <div className="flex flex-row items-center gap-2">
                <del className="font-light text-[#ed9080] text-xl">
                  {formatCurrency(Number(productDetailData.price))}
                </del>{" "}
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <div className="font-bold text-[#ff6347] text-2xl">
                {formatCurrency(Number(productDetailData.price))}
              </div>{" "}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Các thành phần của sản phẩm</h3>
          <div className="flex space-x-2">
            {productDetailData.ingredients.map((item) => (
              <TooltipProvider key={item.ingredientId}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="moiMoc">
                      {capitalize(item.ingredientName)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="font-semibold">{item.ingredientName}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
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
          <StatusButton
            handleAddToCart={(e) => handleAddToCart(e, productOrder)}
            className="w-full bg-[#438a60] transition duration-200 hover:scale-110 hover:bg-[#326a49]
              text-white"
            classNameIcon="size-8 text-slate-100"
            label="Thêm vào giỏ hàng"
          />

          <Button variant="outline" className="py-4">
            <Heart className="size-5" />
          </Button>
        </div>

        <Badge variant="outline" className="text-red-500 border-red-500">
          Last 1 left - make it yours!
        </Badge>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Miêu tả</h3>
          <span className="text-gray-600">{productDetailData.description}</span>
        </div>
      </div>
    </div>
  );
};
