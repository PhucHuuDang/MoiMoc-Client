"use client";

import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { BadgePercent, Tag } from "lucide-react";
import { cardStyle } from "@/style/common";

interface DiscountCodeProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

export const DiscountCode = <T extends FieldValues>({
  form,
  name,
}: DiscountCodeProps<T>) => {
  const discountValue = form.watch(name);

  return (
    <Card className={cardStyle}>
      <CardHeader className="pb-4">
        <CardTitle className="text-moi_moc_green flex items-center gap-2 text-lg sm:text-xl">
          <Tag className="w-5 h-5" aria-hidden="true" />
          Mã giảm giá
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <FormItemsControl
            form={form}
            name={name}
            label="Nhập mã giảm giá của bạn"
            placeholder="VD: MOIMOC2024"
            classNameLabel="flex items-center gap-2 text-sm font-medium text-gray-700"
            icon={<BadgePercent className="w-4 h-4 text-moi_moc_green" />}
          />

          {discountValue && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <BadgePercent
                className="w-4 h-4 text-green-600"
                aria-hidden="true"
              />
              <p className="text-sm text-green-700">
                Mã giảm giá{" "}
                <span className="font-semibold">{discountValue}</span> đã được
                áp dụng
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500 italic">
            * Mã giảm giá sẽ được áp dụng khi thanh toán
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
