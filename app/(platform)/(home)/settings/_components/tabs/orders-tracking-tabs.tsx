"use client";

import React from "react";

import { PurchaseOrder } from "../purchase-order";
import { purchaseOrderData } from "../../db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { clientGetData } from "@/api/actions/get-data-api";
import { useAuthContext } from "@/provider/auth-provider";
import { PurchaseOrderSkeleton } from "../skeletons/purchase-order-skeleton";
import { PurchaseOrderProps } from "../../interface/purchase.interface";
import { PackageOpenIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderTrackingTabsProps {
  value: string;
}

export default function OrderTrackingTabs({
  value,
}: OrderTrackingTabsProps): JSX.Element {
  const auth = useAuthContext();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["purchase-order"],
    queryFn: async () =>
      clientGetData("/manage-orders/user-orders", auth?.token),
  });

  const EmptyPurchaseOrder = (): JSX.Element => {
    return (
      <div
        className="w-full h-full flex items-center justify-center border border-1 border-black p-2
          rounded-md bg-white"
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-x-1">
            <PackageOpenIcon className="size-20 text-neutral-600 font-light" />
            <h2 className="font-bold text-lg text-neutral-600">
              Có vẻ như bạn chưa có đơn hàng nào!
            </h2>
          </div>

          <div className="flex items-end justify-end gap-x-1 mt-2">
            <Button asChild>
              <Link href="/products">
                <PlusIcon className="size-4 mr-1" /> Quay lại mua hàng
              </Link>
            </Button>

            {/* TODO: add button to do */}
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="text-center font-bold text-lg">Something went wrong!</div>
    );
  }

  return (
    <ScrollArea className="w-full h-[500px]">
      {!isLoading ? (
        data.length > 0 ? (
          data.map((order: PurchaseOrderProps): JSX.Element => {
            return <PurchaseOrder key={order.orderDetailId} {...order} />;
          })
        ) : (
          <EmptyPurchaseOrder />
        )
      ) : (
        <PurchaseOrderSkeleton />
      )}
    </ScrollArea>
  );
}
