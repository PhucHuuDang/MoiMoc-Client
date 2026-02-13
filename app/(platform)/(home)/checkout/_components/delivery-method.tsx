"use client";

import { FormItemControlRadio } from "@/components/_global-components-reused/form/form-item-control-radio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deliveryMethods } from "@/safe-types-zod/checkout";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Truck, Zap, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardStyle } from "@/style/common";

interface DeliveryMethodProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

// Icon mapping for delivery methods
const deliveryIcons: Record<string, React.ElementType> = {
  standard: Truck,
  express: Zap,
  economy: Package,
};

// Delivery time estimates
const deliveryEstimates: Record<string, string> = {
  standard: "3-5 ngày làm việc",
  express: "1-2 ngày làm việc",
  economy: "5-7 ngày làm việc",
};

export const DeliveryMethod = <T extends FieldValues>({
  form,
  name,
}: DeliveryMethodProps<T>) => {
  const selectedValue = form.watch(name);

  return (
    <Card className={cardStyle}>
      <CardHeader className="pb-4">
        <CardTitle className="text-moi_moc_green flex items-center gap-2 text-lg sm:text-xl">
          <Truck className="w-5 h-5" aria-hidden="true" />
          Phương thức vận chuyển
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormItemControlRadio form={form} name={name}>
          <div className="space-y-3">
            {deliveryMethods.map((method) => {
              const Icon = deliveryIcons[method.value] || Truck;
              const isSelected = selectedValue === method.value;
              const estimate = deliveryEstimates[method.value];

              return (
                <label
                  key={method.value}
                  htmlFor={`delivery-${method.value}`}
                  className={cn(
                    "flex items-center gap-4 p-2 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                    "hover:border-moi_moc_green/50 hover:bg-moi_moc_green/5",
                    isSelected
                      ? "border-moi_moc_green bg-moi_moc_green/10 shadow-md"
                      : "border-gray-200 bg-white",
                  )}
                >
                  <input
                    type="radio"
                    id={`delivery-${method.value}`}
                    value={method.value}
                    {...form.register(name)}
                    className="sr-only"
                  />

                  <div
                    className={cn(
                      "flex items-center justify-center size-8 p-2 rounded-full transition-colors duration-300",
                      isSelected
                        ? "bg-moi_moc_green text-white"
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>

                  <div className="flex-1">
                    <p
                      className={cn(
                        "font-semibold text-base sm:text-sm transition-colors duration-300",
                        isSelected ? "text-moi_moc_green" : "text-gray-900",
                      )}
                    >
                      {method.label}
                    </p>
                    {estimate && (
                      <p className="text-sm text-gray-600 mt-0.5">{estimate}</p>
                    )}
                  </div>

                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      isSelected
                        ? "border-moi_moc_green bg-moi_moc_green"
                        : "border-gray-300 bg-white",
                    )}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </FormItemControlRadio>
      </CardContent>
    </Card>
  );
};
