"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Circle,
  Truck,
  Package,
  CreditCard,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vietnameseDate } from "@/handle-transform/format-date-vietnam";
import { PurchaseOrderProps } from "../interface/purchase.interface";



export function PurchaseOrder({
  userId,
  orderDetailId,
  orderDetail,
}: PurchaseOrderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getOrderStatus = () => {
    const orderDate = new Date(orderDetail.createdAt);
    const currentDate = new Date();
    const daysSinceOrder = Math.floor(
      (currentDate.getTime() - orderDate.getTime()) / (1000 * 3600 * 24),
    );

    if (daysSinceOrder < 1) return "Processing";
    if (daysSinceOrder < 2) return "Shipped";
    if (daysSinceOrder < 3) return "Out for Delivery";
    return "Delivered";
  };

  const status = getOrderStatus();

  const timelineSteps = [
    {
      label: "Order Placed",
      icon: Package,
      date: formatDate(orderDetail.createdAt),
    },
    { label: "Processing", icon: Circle, date: "In progress" },
    { label: "Shipped", icon: Circle, date: "Pending" },
    { label: "Out for Delivery", icon: Truck, date: "Pending" },
    { label: "Delivered", icon: Circle, date: "Pending" },
  ];

  return (
    <Card className="w-full max-w-screen-2xl shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-3xl font-bold">
              Order #{orderDetailId}
            </CardTitle>
            <CardDescription>
              Placed on {vietnameseDate(new Date(orderDetail.createdAt))}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg py-1 px-3">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-4 mb-6 overflow-x-auto pb-4">
          {timelineSteps.map((step, index) => {
            const isActive =
              index <= timelineSteps.findIndex((s) => s.label === status);
            const Icon = isActive ? CheckCircle2 : step.icon;
            return (
              <div
                key={step.label}
                className="flex flex-col items-center min-w-[100px]"
              >
                <Icon
                  className={`h-8 w-8 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <div
                  className={`text-sm mt-2 text-center ${isActive ? "font-semibold" : ""}`}
                >
                  {step.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {step.date}
                </div>
              </div>
            );
          })}
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <div className="space-y-6 mt-4">
              {orderDetail.orderProducts.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image
                      src={
                        product.productImages[0]?.imageUrl || "/placeholder.svg"
                      }
                      alt={product.productName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.productName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="summary">
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>
                  $
                  {(
                    orderDetail.totalAmount - orderDetail.deliveryMethod.price
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Delivery Fee ({orderDetail.deliveryMethod.method})</span>
                <span>
                  ${orderDetail.deliveryMethod.price.toLocaleString()}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-xl">
                <span>Total</span>
                <span>${orderDetail.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-bold">Payment: </span>
                <span className="text-base">
                  {orderDetail.paymentMethod.method}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="font-bold">Delivery: </span>
                <span className="text-base">
                  {orderDetail.deliveryMethod.method}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-bold">Est. Delivery: </span>
                <span className="text-base">
                  {orderDetail.deliveryMethod.estimatedDays} days
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-secondary/20">
        <div className="w-full flex justify-between items-center">
          <Button variant="outline">Contact Support</Button>
          <Button>Track Order</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
