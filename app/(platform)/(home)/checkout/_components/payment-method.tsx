"use client";

import { FormItemControlRadio } from "@/components/_global-components-reused/form/form-item-control-radio";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { RadioItem } from "@/components/_global-components-reused/form/radio-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  paymentMethods,
  PaymentMethodSchemaTypes,
} from "@/safe-types-zod/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DeliveryMethod } from "./delivery-method";
import { CheckoutSchemaTypes } from "@/safe-types-zod/checkout";

export const PaymentMethod = () => {
  const form = useForm<z.infer<typeof PaymentMethodSchemaTypes>>({
    resolver: zodResolver(PaymentMethodSchemaTypes),
    defaultValues: {
      paymentMethod: "receive-order-payment",
    },
  });

  const onSubmit = (values: z.infer<typeof PaymentMethodSchemaTypes>) => {
    console.log({ values });
  };

  return (
    <Card className="w-[300px] border-moi_moc_green">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <FormValues form={form} onSubmit={onSubmit}>
          <FormItemControlRadio form={form} name="paymentMethod">
            {paymentMethods.map(({ value, label }) => {
              return <RadioItem key={value} value={value} label={label} />;
            })}
          </FormItemControlRadio>
        </FormValues>
      </CardContent>
    </Card>
  );
};
