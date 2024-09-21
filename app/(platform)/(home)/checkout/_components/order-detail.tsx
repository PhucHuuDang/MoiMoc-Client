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

interface OrderDetailProps<T> {
  onSubmit?: (data: T) => void;
}

export const OrderDetail = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Payment",
    "Are you sure you want to pay?",
  );

  const cart = useFromStore(useCartStore, (state) => state.orders);

  const handlePayment = async () => {
    const ok = await confirm();

    if (ok) {
      //* do success payment
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Card className="w-[700px] border-moi_moc_green">
        <CardHeader>
          <CardTitle className="text-moi_moc_green">Order Detail</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="flex h-[300px] flex-col gap-y-1 overflow-y-auto">
            <TooltipProvider delayDuration={200}>
              {cart?.map((product) => {
                return (
                  <CartItem
                    key={product.id}
                    product={product}
                    dashboard
                    checkout
                  />
                );
              })}
            </TooltipProvider>
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
            <div>Total</div>
            <div>$120</div>
          </div>

          <Separator className="mx-1 my-4 h-0.5 bg-moi_moc_green" />

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-4">
              {/* <FormSubmit variant="moiMoc" className="h-12 w-44">
              Payment
            </FormSubmit> */}

              <RainbowButton
                className="hover:scale-110 transition duration-300 w-56 bg-moi_moc_green border
                  border-moi_moc_green"
                onClick={handlePayment}
              >
                Payment
              </RainbowButton>

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
