"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardEnhancedProps {
  productId: string | number;
  productName: string;
  mainImage: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  inStock?: boolean;
  className?: string;
  priority?: boolean;
}

export function ProductCardEnhanced({
  productId,
  productName,
  mainImage,
  price,
  discountPrice,
  discountPercentage,
  inStock = true,
  className,
  priority = false,
}: ProductCardEnhancedProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const displayPrice = discountPrice || price;
  const hasDiscount = !!discountPrice;

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1",
        !inStock && "opacity-75",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${productId}`}>
        {/* Image Container with Glassmorphism Overlay */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={productName}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-110",
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />

          {/* Glassmorphism Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Discount Badge */}
          {hasDiscount && discountPercentage && (
            <div className="absolute top-3 left-3 z-10">
              <motion.div
                className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                -{discountPercentage}%
              </motion.div>
            </div>
          )}

          {/* Out of Stock Badge */}
          {!inStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="text-sm font-semibold text-white">Hết hàng</span>
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600",
              )}
            />
          </motion.button>

          {/* Quick Add to Cart Button (appears on hover) */}
          <motion.div
            className="absolute bottom-3 left-3 right-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="w-full rounded-lg bg-moi_moc_green px-4 py-2 text-sm font-medium text-white
                transition-all hover:bg-moi_moc_green/90 flex items-center justify-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Thêm vào giỏ
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="mb-2 font-medium text-gray-900 line-clamp-2 group-hover:text-moi_moc_green transition-colors">
            {productName}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-moi_moc_green">
              {displayPrice.toLocaleString("vi-VN")}₫
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {price.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Skeleton loader for product cards
 */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="aspect-square animate-pulse bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}
