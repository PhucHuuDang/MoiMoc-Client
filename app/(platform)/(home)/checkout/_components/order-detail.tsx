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
import { useEffect } from "react";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash } from "lucide-react";
import { z } from "zod";
import { CheckoutSchemaTypes } from "@/safe-types-zod/checkout";
import Spinner from "@/components/animata/spinner";

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
  // const [ConfirmDialog, confirm] = useConfirm(
  //   "Payment",
  //   "Are you sure you want to pay?",
  // );

  const cart = useFromStore(useCartStore, (state) => state.orders);

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

  // const handlePayment = async () => {
  //   const ok = await confirm();
  //   if (ok) {
  //     //* do success payment
  //     try {
  //     } catch (error) {}
  //   }
  // };

  // console.log({ cart });

  // useEffect(() => {
  //   if (!products) {
  //     toast.info("Có vẻ như giỏ hàng của bạn đang trống");
  //     return;
  //   } else {
  //     form.setValue(name, products as PathValue<T, Path<T>>);
  //   }
  // }, [form, products]);

  return (
    <>
      {/* <ConfirmDialog /> */}
      <Card className="w-[700px] border-moi_moc_green">
        <CardHeader>
          <CardTitle className="text-moi_moc_green">Order Detail</CardTitle>
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

              {/* <div className=""> */}
              {/* </div> */}
            </TooltipProvider>

            <FormItemsControl type="hidden" name={name} form={form} />
          </div>

          <Separator className="mx-1 my-4 h-0.5 bg-moi_moc_green" />

          <div>
            <div className="flex justify-between">
              <div>Subtotal</div>
              <div>$100</div>
            </div>
            <div className="flex justify-between">
              <div>Shipping</div>
              <div>$10</div>
            </div>
            <div className="flex justify-between">
              <div>Delivery fee</div>
              <div>$10</div>
            </div>
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
