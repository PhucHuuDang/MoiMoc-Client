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
import { FieldValues, Path, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { DeliveryMethod } from "./delivery-method";
import { CheckoutSchemaTypes } from "@/safe-types-zod/checkout";

interface PaymentMethodProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

export const PaymentMethod = <T extends FieldValues>({
  form,
  name,
}: PaymentMethodProps<T>) => {
  return (
    <Card className="w-full border-moi_moc_green">
      <CardHeader>
        <CardTitle className="text-moi_moc_green">
          Phương thức thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* <FormValues form={form} onSubmit={onSubmit}> */}
        <FormItemControlRadio form={form} name={name}>
          {paymentMethods.map(({ value, label }) => {
            return <RadioItem key={value} value={value} label={label} />;
          })}
        </FormItemControlRadio>
        {/* </FormValues> */}
      </CardContent>
    </Card>
  );
};
