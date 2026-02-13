"use client";

import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { RainbowButton } from "@/components/magic/rainbow-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/use-cart-store";
import { useFromStore } from "@/store/use-from-store";
import { Separator } from "@radix-ui/react-separator";
import { CartItem } from "../../_components/cart-item";
import { TooltipProvider } from "@/components/ui/tooltip";
import { formatCurrency } from "@/handle-transform/formart-currency";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeftDash,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Spinner from "@/components/animata/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cardStyle } from "@/style/common";

interface OrderDetailProps<T extends FieldValues, K> {
  onSubmit?: (values: any) => Promise<void>;
  form: UseFormReturn<T>;
  name: Path<T>;
  disabled?: boolean;

  isSubmitting: boolean;
}

export const OrderDetail = <T extends FieldValues, K>({
  onSubmit,
  form,
  name,
  disabled,

  isSubmitting,
}: OrderDetailProps<T, K>) => {
  const cart = useFromStore(useCartStore, (state) => state.orders);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true); // For mobile collapse

  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc +
        (Number(product.discountPercentage!) > 0
          ? Number(product?.discountPrice) * (product.quantityOrder as number)
          : Number(product.price) * (product.quantityOrder as number)),
      0,
    );
  }

  useEffect(() => {
    if (cart) {
      return setIsLoading(true);
    }
  }, [cart]);

  if (!isLoading) {
    return <SkeletonOrderDetail />;
  }

  return (
    <>
      <Card className={cardStyle}>
        <CardHeader className="pb-4">
          {/* Mobile: Collapsible Header */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-between w-full lg:cursor-default"
            aria-expanded={!isCollapsed}
            aria-controls="order-detail-content"
          >
            <CardTitle className="text-moi_moc_green flex items-center gap-2 text-lg sm:text-xl">
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              Chi tiết đơn hàng
              <span className="text-sm font-normal text-gray-600">
                ({cart?.length || 0} sản phẩm)
              </span>
            </CardTitle>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-moi_moc_green transition-transform duration-300 lg:hidden",
                !isCollapsed && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        </CardHeader>

        <CardContent
          id="order-detail-content"
          className={cn(
            "space-y-4 transition-all duration-300",
            isCollapsed && "hidden lg:block",
          )}
        >
          {/* Product List */}
          <div className="flex flex-col gap-y-2 max-h-[350px] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-moi_moc_green scrollbar-track-gray-100">
            <TooltipProvider delayDuration={200}>
              {cart && cart.length > 0 ? (
                cart.map((product) => {
                  return (
                    <CartItem
                      key={product.id}
                      product={product}
                      dashboard
                      checkout
                    />
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <ShoppingCart
                    className="w-16 h-16 text-gray-300"
                    aria-hidden="true"
                  />
                  <p className="text-gray-500 text-center">
                    Giỏ hàng của bạn đang trống
                  </p>
                  <Button asChild variant="moiMoc" className="group/back">
                    <Link href="/products">
                      <ArrowBigLeftDash className="w-5 h-5 group-hover/back:-translate-x-1 transition duration-300" />
                      Quay lại mua hàng
                    </Link>
                  </Button>
                </div>
              )}
            </TooltipProvider>

            <FormItemsControl type="hidden" name={name} form={form} />
          </div>

          <Separator className="h-0.5 bg-moi_moc_green" />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tạm tính</span>
              <span className="text-base font-medium">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Phí vận chuyển</span>
              <span className="text-base font-medium text-green-600">
                Miễn phí
              </span>
            </div>
          </div>

          <Separator className="h-0.5 bg-moi_moc_green" />

          {/* Total */}
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold text-gray-900">
              Tổng cộng
            </span>
            <span className="text-2xl font-bold text-moi_moc_green">
              {formatCurrency(total)}
            </span>
          </div>

          <Separator className="h-0.5 bg-moi_moc_green" />

          {/* Submit Button */}
          <div className="flex flex-col items-center justify-center gap-4 pt-2">
            <FormSubmit
              asChild
              disabled={disabled || !cart || cart.length === 0}
            >
              <RainbowButton
                className="hover:scale-105 transition duration-300 w-full sm:w-64 bg-moi_moc_green border
                  border-moi_moc_green h-12 text-base font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="w-5 h-5" />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  "Thanh toán ngay"
                )}
              </RainbowButton>
            </FormSubmit>

            <p className="text-xs text-gray-500 text-center max-w-[280px] italic">
              Nhấn "Thanh toán ngay" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
              <Link
                href="/terms"
                className="text-moi_moc_green font-semibold hover:underline"
              >
                Chính sách của Môi Mộc
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const SkeletonOrderDetail = () => {
  return (
    <Card className="w-full max-w-[700px] border-moi_moc_green/20 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-moi_moc_green flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" aria-hidden="true" />
          Chi tiết đơn hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-y-2 max-h-[350px] overflow-y-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-2">
              <Skeleton className="h-16 w-16 rounded" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>

        <Separator className="h-0.5 bg-moi_moc_green" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <Separator className="h-0.5 bg-moi_moc_green" />

        <div className="flex items-center justify-center">
          <Skeleton className="h-12 w-56 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};
