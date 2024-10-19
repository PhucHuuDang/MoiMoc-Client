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
import { FieldValues, Path, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

interface DeliveryMethodProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  // onSubmit: (data: T) => void;
}

export const DeliveryMethod = <T extends FieldValues>({
  form,
  name,
  // onSubmit,
}: DeliveryMethodProps<T>) => {
  // const form = useForm<z.infer<typeof CheckoutSchemaTypes>>({
  //   resolver: zodResolver(CheckoutSchemaTypes),
  //   defaultValues: {
  //     method: "standard",
  //   },
  // });

  // const onSubmit = (method: z.infer<typeof CheckoutSchemaTypes>) => {
  //   console.log({ method });
  // };

  return (
    <Card className="w-[500px] border-moi_moc_green">
      <CardHeader>
        <CardTitle className="text-moi_moc_green">
          Phương thức vận chuyển
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* <FormValues form={form} onSubmit={onSubmit}> */}
        <FormItemControlRadio form={form} name={name}>
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
        {/* </FormValues> */}
      </CardContent>
    </Card>
  );
};
