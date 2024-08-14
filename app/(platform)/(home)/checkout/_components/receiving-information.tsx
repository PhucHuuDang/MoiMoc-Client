"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";

export const ReceivingInformation = () => {
  return (
    <Card className="w-[300px] border-moi_moc_green">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-y-1">
          <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
            <Phone className="size-6 font-bold text-moi_moc_green" /> Contact
            Information
          </h1>
          <div className="flex flex-col space-y-1">
            <span>Name: Dang Huu Phuc</span>
            <span>SDT: +84 81.459.3739</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
            <MapPin className="size-6 font-bold text-moi_moc_green" /> Receiving
            Information
          </h1>
          <span>
            Vinhomes Grandpark, Tòa s503, Nguyễn Xiển, phường Long Thạnh Mỹ,
            Thành phố Thủ Đức
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
