"use client";

import { Logo } from "@/components/_global-components-reused/logo";
import { Separator } from "@/components/ui/separator";

export const CheckoutHeader = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Logo height={60} className="hoverAnimate" />

      <Separator className="h-12 w-0.5 bg-green-950" orientation="vertical" />

      <h1 className="text-5xl font-bold text-moi_moc_green">Thanh toán</h1>
    </div>
  );
};
