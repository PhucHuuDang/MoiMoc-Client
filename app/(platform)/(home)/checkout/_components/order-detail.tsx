"use client";

import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { RainbowButton } from "@/components/magic/rainbow-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfirm } from "@/hooks/use-confirm";
import { useCartStore } from "@/store/use-cart-store";
import { useFromStore } from "@/store/use-from-store";
import { Separator } from "@radix-ui/react-separator";
import { CartItem } from "../../_components/cart-item";
import { TooltipProvider } from "@/components/ui/tooltip";
import { formatCurrency } from "@/handle-transform/formart-currency";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { truncateText } from "@/app/lodash-config/truncate";
import { useEffect, useState } from "react";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash } from "lucide-react";
import { z } from "zod";
import { CheckoutSchemaTypes } from "@/safe-types-zod/checkout";
import Spinner from "@/components/animata/spinner";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderDetailProps<T extends FieldValues, K> {
  onSubmit?: (values: any) => Promise<void>;
  form: UseFormReturn<T>;
  name: Path<T>;

  disabled?: boolean;
}

export const OrderDetail = <T extends FieldValues, K>({
  onSubmit,
  form,
  name,
  disabled,
}: OrderDetailProps<T, K>) => {
  const cart = useFromStore(useCartStore, (state) => state.orders);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state

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
      return setIsLoading(true); // Set loading to false once cart data is available
    }
  }, [cart]);

  const SkeletonOrderDetail = () => {
    return (
      <Card className="w-[700px] border-moi_moc_green">
        <CardHeader>
          <CardTitle className="text-moi_moc_green">
            Chi tiết đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <div className="flex h-[350px] flex-col gap-y-1 overflow-y-auto overflow-x-hidden">
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

          <Separator className="mx-1 my-4 h-0.5 bg-moi_moc_green" />

          <div className="space-y-2">
            {["Subtotal", "Shipping", "Delivery fee"].map((item, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          <Separator className="mx-1 my-4 h-0.5 bg-moi_moc_green" />

          <div className="flex justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>

          <Separator className="mx-1 my-4 h-0.5 bg-moi_moc_green" />

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-4">
              <Skeleton className="h-12 w-56 rounded" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!isLoading) {
    return <SkeletonOrderDetail />;
  }

  return (
    <>
      {/* <ConfirmDialog /> */}
      <Card className="w-[700px] border-moi_moc_green">
        <CardHeader>
          <CardTitle className="text-moi_moc_green">
            Chi tiết đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <div className="flex h-[350px] flex-col gap-y-1 overflow-y-auto overflow-x-hidden">
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
                <Button
                  variant="moiMoc"
                  className="w-[90%] hover:underline transition duration-300 mx-auto group/back"
                >
                  <ArrowBigLeftDash className="size-6 group-hover/back:-translate-x-1 transition duration-300" />{" "}
                  Quay lại mua hàng
                </Button>
              )}
            </TooltipProvider>

            <FormItemsControl type="hidden" name={name} form={form} />
          </div>

          <Separator className="mx-1 my-4 h-0.5 bg-moi_moc_green" />

          <div className="flex justify-between">
            <div>Tổng đơn hàng</div>
            <div>{formatCurrency(total)}</div>
          </div>

          <Separator className="mx-1 my-4 h-0.5 bg-moi_moc_green" />

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-4">
              {/* <FormSubmit variant="moiMoc" className="h-12 w-44">
                Payment
              </FormSubmit> */}
              <FormSubmit asChild disabled={disabled}>
                <RainbowButton
                  className="hover:scale-110 transition duration-300 w-56 bg-moi_moc_green border
                    border-moi_moc_green"
                  // onClick={onSubmit}
                >
                  {disabled ? (
                    <>
                      <Spinner className="size-5" />
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    "Thanh toán"
                  )}
                </RainbowButton>
              </FormSubmit>

              <span className="w-[250px] text-sm font-light italic">
                Nhấn “Đặt hàng” đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                <span className="text-lg font-bold text-moi_moc_green">
                  Chính sách của Môi Mộc
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
