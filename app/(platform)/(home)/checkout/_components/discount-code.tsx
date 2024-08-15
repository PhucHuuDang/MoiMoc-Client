"use client";

import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscountCodeSchemaTypes } from "@/safe-types-zod/checkout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const DiscountCode = () => {
  const form = useForm<z.infer<typeof DiscountCodeSchemaTypes>>({
    resolver: zodResolver(DiscountCodeSchemaTypes),
  });

  const onSubmit = (code: z.infer<typeof DiscountCodeSchemaTypes>) => {
    console.log({ code });
  };

  return (
    <Card className="w-[300px] border-moi_moc_green">
      <CardHeader>
        <CardTitle>Discount Code</CardTitle>
      </CardHeader>
      <CardContent>
        <FormValues form={form} onSubmit={onSubmit}>
          <FormItemsControl
            form={form}
            name="discountCode"
            label="Add your discount code"
          />
        </FormValues>
      </CardContent>
    </Card>
  );
};
