import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutHeader } from "./_components/checkout-header";
import { MapPin, Phone } from "lucide-react";
import { DeliveryMethod } from "./_components/delivery-method";
import { ReceivingInformation } from "./_components/receiving-information";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="py-10">
        <CheckoutHeader />
      </div>
      <div>
        {/* <Card className="w-[300px] space-y-8 border-moi_moc_green">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col gap-y-1">
              <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
                <Phone className="size-6 font-bold text-moi_moc_green" />{" "}
                Contact Information
              </h1>
              <div className="flex flex-col space-y-1">
                <span>Name: Dang Huu Phuc</span>
                <span>SDT: +84 81.459.3739</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <h1 className="item-center flex gap-x-1 text-lg font-bold text-moi_moc_green">
                <MapPin className="size-6 font-bold text-moi_moc_green" />{" "}
                Shipping Address
              </h1>
              <div className="flex flex-col space-y-1">
                <span>Name: Dang Huu Phuc</span>
                <span>SDT: +84 81.459.3739</span>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <ReceivingInformation />

        <DeliveryMethod />
      </div>
    </div>
  );
};

export default CheckoutPage;
