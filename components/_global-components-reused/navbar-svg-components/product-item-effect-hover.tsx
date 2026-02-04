"use client";

import { truncateText } from "@/app/lodash-config/truncate";
import StatusButton from "@/components/animata/status-button";
import { formatCurrency } from "@/handle-transform/formart-currency";
import { useCartStore } from "@/store/use-cart-store";
import { ProductProps } from "@/types";
import { ProductItemData } from "@/types/product-types";
import { ShoppingCart, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductItemEffectHoverProps {
  product: ProductItemData;
}

export const ProductItemEffectHover = ({
  product,
}: ProductItemEffectHoverProps) => {
  const addOrder = useCartStore((state) => state.addOrder);

  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent, product: ProductItemData) => {
    e.stopPropagation();
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    addOrder(product);
  };

  const discountPercentageToNumber = Number(product?.discountPercentage);

  const MAX_LENGTH = 54;

  return (
    <div
      className="group/card relative flex w-full cursor-pointer flex-col gap-3 p-5 rounded-2xl bg-white
        border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-gray-300/80
        transition-all duration-300 ease-out hover:-translate-y-1"
    >
      {/* Enhanced Sale Badge with Gradient and Animation */}
      {+discountPercentageToNumber! > 0 && discountPercentageToNumber && (
        <div
          className="absolute right-0 top-0 z-10 flex items-center gap-1.5 rounded-bl-xl
            rounded-tr-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 
            px-3 py-2 text-xs font-bold text-white shadow-lg
            animate-in fade-in slide-in-from-top-2 duration-500"
        >
          <Sparkles className="size-3.5 animate-pulse" />
          <span className="tracking-wide">SALE</span>
          <span className="text-sm">{`-${discountPercentageToNumber}%`}</span>
        </div>
      )}

      {/* Enhanced Image Container with Overlay Effect */}
      <div
        className="relative aspect-square h-full w-full overflow-hidden rounded-xl 
          bg-gray-100 cursor-pointer"
        onClick={() => router.push(`/${product.productId}`)}
      >
        <Image
          fill
          alt={`${product.productName} - Product Image`}
          src={product.mainImage}
          className="h-full w-full object-cover transition-all duration-500 ease-out
            group-hover/card:scale-110 group-hover/card:rotate-1"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Subtle Overlay on Hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
          opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Product Name with Better Typography */}
      <div
        className="min-h-[56px] text-lg font-bold text-gray-900 leading-tight
          group-hover/card:text-rose-600 transition-colors duration-200"
        onClick={() => router.push(`/${product.productId}`)}
      >
        {product.productName}
      </div>

      {/* Description with Better Contrast */}
      <div className="h-[65px] text-sm font-normal text-gray-600 leading-relaxed">
        {truncateText(product.productDescription, MAX_LENGTH)}
      </div>

      {/* Enhanced Price and CTA Section */}
      <div className="flex items-end justify-between mt-2 pt-3 border-t border-gray-100">
        <div className="flex flex-col gap-1.5">
          {discountPercentageToNumber && discountPercentageToNumber > 0 ? (
            <>
              {/* Discounted Price - Prominent */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-rose-600 tracking-tight">
                  {formatCurrency(Number(product.discountPrice))}
                </span>
                <span className="text-xs font-medium text-gray-500 bg-rose-50 px-2 py-0.5 rounded-full">
                  Save {discountPercentageToNumber}%
                </span>
              </div>

              {/* Original Price - Subtle */}
              <div className="flex items-center gap-2">
                <del className="text-sm font-medium text-gray-400">
                  {formatCurrency(Number(product.price))}
                </del>
              </div>
            </>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                {formatCurrency(Number(product.price))}
              </span>
            </div>
          )}
        </div>

        {/* Enhanced Add to Cart Button */}
        <StatusButton
          handleAddToCart={(e) => handleAddToCart(e, product)}
          className="w-11 h-11 shadow-md hover:shadow-lg transition-shadow duration-200"
        />
      </div>
    </div>
  );
};
