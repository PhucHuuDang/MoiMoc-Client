"use client";

import { AddAddress } from "@/app/(platform)/(admin)/dashboard/payment-methods/_components-payments-methods/add-address";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface ReceivingInformationProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  // phon: Path<T>;
  address: Path<T>;
  // name: Path<T>;
  phone: Path<T>;
  name: Path<T>;
}

export const ReceivingInformation = <T extends FieldValues>({
  form,
  // name,
  address,
  phone,
  name,
}: ReceivingInformationProps<T>) => {
  const [updatedAddress, setUpdatedAddress] = useState(form.getValues(address));

  // Use useEffect to watch for address changes and update the state
  useEffect(() => {
    const subscription = form.watch((value) => {
      const newAddress = form.getValues(address);
      setUpdatedAddress(newAddress);
    });
    return () => subscription.unsubscribe(); // Cleasnup on unmount
  }, [form, address]);

  return (
    <Card className="w-[500px] border-moi_moc_green">
      <CardHeader>
        <CardTitle className="text-moi_moc_green">Địa chỉ giao hàng</CardTitle>
        {/* <AddAddress /> */}
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-y-1">
          <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
            <Phone className="size-6 font-bold text-moi_moc_green" /> Thông tin
            liên hệ
          </h1>
          <div className="flex flex-col space-y-1">
            <span>Tên: {form.getValues(name)}</span>
            {/* <FormItemsControl
              form={form}
              type="hidden"
              // value="Dang Huu Phuc"
              // name={`${address}.name` as Path<T>}
              name={name as Path<T>}
            /> */}
            <span>SDT: {form.getValues(phone)}</span>

            <FormItemsControl
              form={form}
              type="hidden"
              // name={`${address}.phone` as Path<T>}
              name={phone as Path<T>}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
              <MapPin className="size-6 font-bold text-moi_moc_green" /> Địa chỉ
              nhận hàng
            </h1>
            <AddAddress name={address} parentForm={form} />
          </div>
          <span>
            {updatedAddress || "Chưa có địa chỉ được chọn"}
            <FormItemsControl
              form={form}
              type="hidden"
              // value=" Vinhomes Grandpark, Tòa s503, Nguyễn Xiển, phường Long Thạnh Mỹ,
              // Thành phố Thủ Đức"
              // name={`${address}.addressShipping` as Path<T>}
              name={address}
            />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
