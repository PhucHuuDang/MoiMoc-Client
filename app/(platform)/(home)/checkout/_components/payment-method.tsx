"use client";

import { FormItemControlRadio } from "@/components/_global-components-reused/form/form-item-control-radio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paymentMethods } from "@/safe-types-zod/checkout";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { CreditCard, Wallet, DollarSign, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardStyle } from "@/style/common";

interface PaymentMethodProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

// Icon mapping for payment methods
const paymentIcons: Record<string, React.ElementType> = {
  "receive-order-payment": DollarSign,
  payOs: Wallet,
  stripe: CreditCard,
};

// Payment method descriptions
const paymentDescriptions: Record<string, string> = {
  "receive-order-payment": "Thanh toán khi nhận hàng",
  payOs: "Thanh toán qua PayOS - Nhanh chóng & An toàn",
  stripe: "Thanh toán quốc tế qua Stripe",
};

export const PaymentMethod = <T extends FieldValues>({
  form,
  name,
}: PaymentMethodProps<T>) => {
  const selectedValue = form.watch(name);

  return (
    <Card className={cardStyle}>
      <CardHeader className="pb-4">
        <CardTitle className="text-moi_moc_green flex items-center gap-2 text-lg sm:text-xl">
          <CreditCard className="w-5 h-5" aria-hidden="true" />
          Phương thức thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormItemControlRadio form={form} name={name}>
          <div className="space-y-3">
            {paymentMethods.map(({ value, label }) => {
              const Icon = paymentIcons[value] || CreditCard;
              const isSelected = selectedValue === value;
              const description = paymentDescriptions[value];
              const isOnlinePayment = value !== "receive-order-payment";

              return (
                <label
                  key={value}
                  htmlFor={`payment-${value}`}
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
                    id={`payment-${value}`}
                    value={value}
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
                    <div className="flex items-center gap-1">
                      <p
                        className={cn(
                          "font-semibold text-base sm:text-sm transition-colors duration-300",
                          isSelected ? "text-moi_moc_green" : "text-gray-900",
                        )}
                      >
                        {label}
                      </p>
                      {isOnlinePayment && (
                        <div className="flex items-center gap-1 px-2  bg-green-100 rounded-full">
                          <Shield
                            className="w-3 h-3 text-green-600"
                            aria-hidden="true"
                          />
                          <span className="text-xs text-green-700 font-medium">
                            Bảo mật
                          </span>
                        </div>
                      )}
                    </div>
                    {description && (
                      <p className="text-sm text-gray-600 ">{description}</p>
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
