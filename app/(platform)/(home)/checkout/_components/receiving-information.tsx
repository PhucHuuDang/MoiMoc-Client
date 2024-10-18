"use client";

import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
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
  return (
    <Card className="w-[500px] border-moi_moc_green">
      <CardHeader>
        <CardTitle className="text-moi_moc_green">Shipping Address</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-y-1">
          <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
            <Phone className="size-6 font-bold text-moi_moc_green" /> Contact
            Information
          </h1>
          <div className="flex flex-col space-y-1">
            <span>Name: {form.getValues(name)}</span>
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
          <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
            <MapPin className="size-6 font-bold text-moi_moc_green" /> Receiving
            Information
          </h1>
          <span>
            {form.getValues(address)}
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
