"use client";

import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldValues, Path, UseFormReturn, useForm } from "react-hook-form";
import { BadgePercent } from "lucide-react";

interface DiscountCodeProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

export const DiscountCode = <T extends FieldValues>({
  form,
  name,
}: DiscountCodeProps<T>) => {
  return (
    <Card className="w-full border-moi_moc_green">
      <CardHeader>
        <CardTitle className="text-moi_moc_green">Mã giảm giá</CardTitle>
      </CardHeader>
      <CardContent>
        <FormItemsControl
          form={form}
          name={name}
          label="Thêm mã giảm giá của bạn"
          placeholder="Nhập mã giảm giá của bạn"
          classNameLabel="flex items-center gap-x-1"
          icon={<BadgePercent className="size-5" />}
        />
      </CardContent>
    </Card>
  );
};
