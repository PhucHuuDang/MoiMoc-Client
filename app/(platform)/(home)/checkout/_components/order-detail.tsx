"use client";

import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

export const OrderDetail = () => {
  return (
    <Card className="w-[500px] border-moi_moc_green">
      <CardHeader>
        <CardTitle>Order Detail</CardTitle>
      </CardHeader>
      <CardContent className="h-96 ">
        <div className="flex flex-col h-[150px] gap-y-1 overflow-y-auto ">
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

        <Separator className="my-4 h-0.5 mx-1 bg-moi_moc_green" />

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

        <Separator className="my-4 h-0.5 mx-1 bg-moi_moc_green" />

        <div className="flex justify-between">
          <div>Total</div>
          <div>$120</div>
        </div>

        <Separator className="my-4 h-0.5 mx-1 bg-moi_moc_green" />

        <div className="flex items-center justify-between ">
          <span className="font-light text-lg italic w-[250px]">
            Nhấn “Đặt hàng” đồng nghĩa với việc bạn đồng ý tuân theo{" "}
            <span className="font-bold text-lg text-moi_moc_green">
              Chính sách của Môi Mộc
            </span>
          </span>
          <FormSubmit variant="moiMoc" className="w-44 h-12">
            Payment
          </FormSubmit>
        </div>
      </CardContent>
    </Card>
  );
};
