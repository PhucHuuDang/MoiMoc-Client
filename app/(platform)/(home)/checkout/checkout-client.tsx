"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutHeader } from "./_components/checkout-header";
import { MapPin, Phone } from "lucide-react";
import { DeliveryMethod } from "./_components/delivery-method";
import { ReceivingInformation } from "./_components/receiving-information";
import { PaymentMethod } from "./_components/payment-method";
import { OrderDetail } from "./_components/order-detail";
import { Footer } from "@/components/_global-components-reused/footer";
import { Separator } from "@/components/ui/separator";
import { DiscountCode } from "./_components/discount-code";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { z } from "zod";
import { Checkout, CheckoutSchemaTypes } from "@/safe-types-zod/checkout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const CheckoutClient = () => {
  const form = useForm<z.infer<typeof CheckoutSchemaTypes>>({
    resolver: zodResolver(CheckoutSchemaTypes),
    defaultValues: {
      method: "standard",
      paymentMethod: "receive-order-payment",
      address: {
        name: "Harry Dang", //** we can set default in here
      },
    },
  });

  const onSubmit = (values: z.infer<typeof CheckoutSchemaTypes>) => {
    console.log({ values });
  };

  return (
    <div className="h-full overflow-x-hidden pt-20">
      <div className="flex items-center justify-center py-10 pt-20">
        <CheckoutHeader />
      </div>
      <FormValues form={form} onSubmit={onSubmit}>
        <div className="my-5 flex justify-center gap-x-8">
          <div className="flex flex-col items-center gap-y-8">
            <ReceivingInformation form={form} address="address" />

            <DeliveryMethod form={form} name="method" />

            <PaymentMethod form={form} name="paymentMethod" />
            <DiscountCode form={form} name="discountCode" />
          </div>

          <OrderDetail />
        </div>
      </FormValues>
      <Separator className="mx-1 my-16 h-0.5 bg-moi_moc_green" />

      <div className="py-8">
        <Footer />
      </div>
    </div>
  );
};
