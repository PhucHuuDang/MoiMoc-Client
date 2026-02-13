"use client";

import { AddAddress } from "@/app/(platform)/(admin)/dashboard/payment-methods/_components-payments-methods/add-address";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { cardStyle } from "@/style/common";
import { formatPhoneNumber } from "@/utils/format";
import { Separator } from "@/components/ui/separator";

interface ReceivingInformationProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  address: Path<T>;
  phone: Path<T>;
  name: Path<T>;
}

export const ReceivingInformation = <T extends FieldValues>({
  form,
  address,
  phone,
  name,
}: ReceivingInformationProps<T>) => {
  const [updatedAddress, setUpdatedAddress] = useState(form.getValues(address));
  const [updateName, setUpdateName] = useState(form.getValues(name));

  // Use useEffect to watch for address changes and update the state
  useEffect(() => {
    const subscription = form.watch((value) => {
      const newAddress = form.getValues(address);
      setUpdatedAddress(newAddress);
    });
    const nameSubscription = form.watch((value) => {
      const phoneValue = form.getValues(name);
      setUpdateName(phoneValue);
    });

    return () => {
      subscription.unsubscribe();
      nameSubscription.unsubscribe();
    }; // Cleanup on unmount
  }, [form, address, name]);

  return (
    <Card className={cardStyle}>
      <CardHeader className="pb-4">
        <CardTitle className="text-moi_moc_green flex items-center gap-2 text-lg sm:text-xl">
          <User className="w-5 h-5" aria-hidden="true" />
          Địa chỉ giao hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information Section */}
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-moi_moc_green">
            <Phone className="w-5 h-5" aria-hidden="true" />
            Thông tin liên hệ
          </h2>

          <div className="flex items-center  gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 ">
              <span className="text-sm font-medium text-gray-700 min-w-[60px]">
                Tên:
              </span>
              <span className="text-sm sm:text-base font-normal text-gray-900 text-ellipsis font-mono underline italic">
                {updateName || "Chưa có thông tin"}
              </span>
            </div>

            <Separator orientation="vertical" className="h-5 mx-4" />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 ">
              <span className="text-sm font-medium text-gray-700 min-w-[60px]">
                SĐT:
              </span>
              <span className="text-sm sm:text-base font-normal text-gray-900  text-ellipsis font-mono underline italic ">
                {phone
                  ? formatPhoneNumber(form.getValues(phone))
                  : "Chưa có số điện thoại"}
              </span>
              <FormItemsControl
                form={form}
                type="hidden"
                name={phone as Path<T>}
              />
            </div>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-moi_moc_green">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              Địa chỉ nhận hàng
            </h2>
            <AddAddress name={address} parentForm={form} />
          </div>

          <div className="pl-7">
            <p
              className={cn(
                "text-sm sm:text-base text-gray-900 bg-gray-50 px-3 py-2 rounded-md border border-gray-200 min-h-[44px] flex items-center",
                !updatedAddress && "text-gray-500 italic",
              )}
            >
              {updatedAddress ||
                "Chưa có địa chỉ được chọn. Vui lòng thêm địa chỉ giao hàng."}
            </p>
            <FormItemsControl form={form} type="hidden" name={address} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
