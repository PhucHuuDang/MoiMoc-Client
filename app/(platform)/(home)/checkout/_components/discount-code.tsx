"use client";

import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscountCodeSchemaTypes } from "@/safe-types-zod/checkout";
import { FieldValues, Path, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface DiscountCodeProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

export const DiscountCode = <T extends FieldValues>({
  form,
  name,
}: DiscountCodeProps<T>) => {
  return (
    <Card className="w-[500px] border-moi_moc_green">
      <CardHeader>
        <CardTitle className="text-moi_moc_green">Discount Code</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <FormValues form={form} onSubmit={onSubmit}> */}
        <FormItemsControl
          form={form}
          name={name}
          label="Add your discount code"
          placeholder="Enter your discount code"
        />
        {/* </FormValues> */}
      </CardContent>
    </Card>
  );
};
