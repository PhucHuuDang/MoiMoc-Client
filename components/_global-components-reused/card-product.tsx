"use client";

// import { GlareCard } from "@/components/glare-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import { formatCurrency } from "@/handle-transform/formatCurrency";
import { removeMarks } from "@/handle-transform/remove-marks";
// import { useCartStore } from "@/hooks/use-cart-store";
import { handleRouter } from "@/lib/handle-router";
import { ProductProps } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

import { ProductItemEffectHoverEffectHover } from "./navbar-svg-components/product-item-effect-hover";

interface CardProductProps {
  // product: Product;
  product: ProductProps;
}

export const CardProduct = forwardRef<HTMLDivElement, CardProductProps>(
  ({ product }, ref) => {
    // const addToCart = useCartStore((state) => state.addToCart);
    const router = useRouter();

    const MAX_LENGTH = 54;

    // const handleAddToCart = (e: any, product: ProductApiProps) => {
    //   e.stopPropagation();
    //   addToCart(product);
    // };

    return (
      <div
        className="group col-span-1 cursor-pointer"
        onClick={() => handleRouter(product.productName, product.id, router)}
        ref={ref}
      >
        <ProductItemEffectHoverEffectHover product={product} />
      </div>
    );
  },
);

CardProduct.displayName = "CardProduct";

export const CardProductSkeleton = () => {
  return (
    <div className="group col-span-1 cursor-pointer">
      <div className="relative flex w-full flex-col gap-2">
        <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full bg-slate-400/50 object-cover" />
        </div>
        <Skeleton className="min-h-[56px] bg-slate-400/50 text-lg font-semibold" />
        <Skeleton className="h-[65px] bg-slate-400/50 font-light" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16 bg-slate-400/50" />
          <Skeleton className="size-10 rounded-lg bg-slate-400/50 p-1 text-slate-600" />
        </div>
      </div>
    </div>
  );
};
