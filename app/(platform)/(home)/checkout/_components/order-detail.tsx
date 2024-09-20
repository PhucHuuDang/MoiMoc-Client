"use client";

import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

interface OrderDetailProps<T> {
  onSubmit?: (data: T) => void;
}

export const OrderDetail = () => {
  return (
    <Card className="w-[700px] border-moi_moc_green">
      <CardHeader>
        <CardTitle className="text-moi_moc_green">Order Detail</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        <div className="flex h-[250px] flex-col gap-y-1 overflow-y-auto">
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
          <div>1. Son duong ABC</div>
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

        <div className="flex items-center justify-between">
          <span className="w-[250px] text-lg font-light italic">
            Nhấn “Đặt hàng” đồng nghĩa với việc bạn đồng ý tuân theo{" "}
            <span className="text-lg font-bold text-moi_moc_green">
              Chính sách của Môi Mộc
            </span>
          </span>
          <FormSubmit variant="moiMoc" className="h-12 w-44">
            Payment
          </FormSubmit>
        </div>
      </CardContent>
    </Card>
  );
};
