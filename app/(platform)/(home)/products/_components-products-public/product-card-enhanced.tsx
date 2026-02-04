"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion";
import { ShoppingCart, Heart, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { useCartStore } from "@/store/use-cart-store";
import { ProductItemData } from "@/types/product-types";
import { toast } from "sonner";

interface ProductCardEnhancedProps {
  productId: string | number;
  productName: string;
  mainImage: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  productDescription?: string;
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
  productDescription = "",
  inStock = true,
  className,
  priority = false,
}: ProductCardEnhancedProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addOrder = useCartStore((state) => state.addOrder);

  const displayPrice = discountPrice || price;
  const hasDiscount = !!discountPrice;

  // Transform component props to ProductItemData format for cart
  const transformToCartItem = useCallback((): ProductItemData => {
    return {
      productId: Number(productId),
      id: Number(productId),
      productName,
      productDescription,
      price: price.toString(),
      discountPrice: discountPrice?.toString() || price.toString(),
      discountPercentage: discountPercentage?.toString() || "0",
      quantity: "1",
      mainImage,
      quantityOrder: 1,
    };
  }, [
    productId,
    productName,
    productDescription,
    price,
    discountPrice,
    discountPercentage,
    mainImage,
  ]);

  // Optimized add to cart handler with useCallback
  const handleAddToCart = useCallback(
    async (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isAdding || !inStock) return;

      setIsAdding(true);

      // Simulate async operation for better UX (minimum 400ms for animation)
      await new Promise((resolve) => setTimeout(resolve, 400));

      try {
        const cartItem = transformToCartItem();
        addOrder(cartItem);

        // Show success state
        setShowSuccess(true);
        toast.success("Đã thêm vào giỏ hàng!", {
          description: productName,
          duration: 2000,
        });

        // Reset success state after animation
        setTimeout(() => {
          setShowSuccess(false);
          setIsAdding(false);
        }, 1500);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Không thể thêm vào giỏ hàng");
        setIsAdding(false);
      }
    },
    [isAdding, inStock, transformToCartItem, addOrder, productName],
  );

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleAddToCart(e);
      }
    },
    [handleAddToCart],
  );

  return (
    <motion.div
      className={cn(
        "group/card relative overflow-hidden rounded-2xl bg-white transition-all duration-300 ease-out cursor-pointer",
        "border border-gray-200/60 shadow-sm hover:shadow-2xl hover:border-gray-300/80",
        "hover:-translate-y-2",
        !inStock && "opacity-75",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${productId}`} className="block">
        {/* Image Container with Enhanced Effects */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={mainImage}
            alt={`${productName} - Product Image`}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              isHovered && "scale-110 rotate-1",
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />

          {/* Shimmer Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          />

          {/* Sophisticated Gradient Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Enhanced Discount Badge with Gradient & Animation */}
          {hasDiscount && discountPercentage && (
            <div className="absolute top-0 left-0 z-20">
              <motion.div
                className="flex items-center gap-1.5 rounded-br-2xl rounded-tl-2xl 
                  bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 
                  px-4 py-2.5 text-xs font-bold text-white shadow-xl"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span className="tracking-wide">SALE</span>
                <span className="text-sm font-extrabold">
                  -{discountPercentage}%
                </span>
              </motion.div>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!inStock && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-xl bg-white/95 px-6 py-3 shadow-2xl backdrop-blur-sm">
                <span className="text-sm font-bold text-gray-900">
                  Hết hàng
                </span>
              </div>
            </motion.div>
          )}

          {/* Enhanced Wishlist Button */}
          <motion.button
            className={cn(
              "absolute top-3 right-3 z-20 rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-200",
              isLiked
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-white/95 hover:bg-white hover:shadow-xl",
            )}
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "h-4.5 w-4.5 transition-all duration-200",
                isLiked ? "fill-white text-white scale-110" : "text-gray-700",
              )}
            />
          </motion.button>

          {/* Enhanced Quick Add to Cart Button with Loading & Success States */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-3"
            initial={{ y: 30, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 30,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.button
              className={cn(
                "w-full rounded-xl px-4 py-3 text-sm font-bold text-white shadow-xl",
                "transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm",
                "relative overflow-hidden",
                isAdding || showSuccess
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-r from-moi_moc_green to-emerald-600 hover:shadow-2xl hover:scale-[1.02]",
                !inStock && "opacity-50 cursor-not-allowed",
              )}
              onClick={handleAddToCart}
              onKeyDown={handleKeyDown}
              disabled={isAdding || showSuccess || !inStock}
              whileTap={!isAdding && !showSuccess ? { scale: 0.98 } : {}}
              aria-label="Add to cart"
              tabIndex={0}
            >
              {/* Ripple Effect on Click */}
              <AnimatePresence>
                {isAdding && (
                  <motion.span
                    className="absolute inset-0 bg-white/30 rounded-xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </AnimatePresence>

              {/* Button Content with States */}
              <AnimatePresence mode="wait">
                {showSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-5 w-5" />
                    <span>Đã thêm!</span>
                  </motion.div>
                ) : isAdding ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <ShoppingCart className="h-4.5 w-4.5" />
                    </motion.div>
                    <span>Đang thêm...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                    <span>Thêm vào giỏ hàng</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Product Info Section */}
        <div className="p-5 space-y-3">
          {/* Product Name with Better Typography */}
          <h3
            className="font-bold text-gray-900 leading-tight line-clamp-2 
            group-hover/card:text-moi_moc_green transition-colors duration-200 min-h-[48px]"
          >
            {productName}
          </h3>

          {/* Enhanced Price Display */}
          <div className="flex items-end justify-between pt-2 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {/* Current Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-moi_moc_green tracking-tight">
                  {displayPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>

              {/* Original Price & Savings */}
              {hasDiscount && (
                <div className="flex items-center gap-2">
                  <del className="text-sm font-medium text-gray-400">
                    {price.toLocaleString("vi-VN")}₫
                  </del>
                  <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    Tiết kiệm{" "}
                    {(((price - displayPrice) / price) * 100).toFixed(0)}%
                  </span>
                </div>
              )}
            </div>

            {/* Stock Status Indicator */}
            {inStock && (
              <motion.div
                className="flex items-center gap-1 text-xs font-medium text-emerald-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Còn hàng</span>
              </motion.div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Enhanced Skeleton loader for product cards
 */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200/60">
      {/* Image Skeleton */}
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
          animate-shimmer"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
          <div
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse"
            style={{ animationDelay: "0.1s" }}
          />
        </div>

        {/* Price Skeleton */}
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <div
            className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}
