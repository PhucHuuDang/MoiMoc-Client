"use client";

import { FormItemControlRadio } from "@/components/_global-components-reused/form/form-item-control-radio";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { RadioItem } from "@/components/_global-components-reused/form/radio-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckoutSchemaTypes,
  deliveryMethods,
} from "@/safe-types-zod/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const DeliveryMethod = () => {
  const form = useForm<z.infer<typeof CheckoutSchemaTypes>>({
    resolver: zodResolver(CheckoutSchemaTypes),
    defaultValues: {
      method: "standard",
    },
  });

  const onSubmit = (method: z.infer<typeof CheckoutSchemaTypes>) => {
    console.log({ method });
  };

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Delivery Method</CardTitle>
      </CardHeader>
      <CardContent>
        <FormValues form={form} onSubmit={onSubmit}>
          <FormItemControlRadio form={form} name="method">
            {deliveryMethods.map((method) => {
              return (
                <RadioItem
                  key={method.value}
                  value={method.value}
                  label={method.label}
                />
              );
            })}
          </FormItemControlRadio>
          <FormSubmit>Continue</FormSubmit>
        </FormValues>
      </CardContent>
    </Card>
  );
};
