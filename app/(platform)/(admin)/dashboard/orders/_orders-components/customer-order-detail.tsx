"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { ProductProps } from "@/types";
import { CartItem } from "@/app/(platform)/(home)/_components/cart-item";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

const productsDemo: ProductProps[] = [
  {
    id: "13",
    name: "Smart Thermostat",
    productName: "Thermostat",
    price: 179.99,
    productDescription:
      "Smart thermostat that learns your schedule and adjusts the temperature automatically.",
    imageUrl: "/about-moi-moc-images/son-duong-product.png",
    quantityOrder: 4,
  },
  {
    id: "6",
    name: "Digital Camera",
    productName: "Camera",
    price: 749.99,
    productDescription:
      "24MP digital camera with 4K video recording, interchangeable lenses, and Wi-Fi connectivity.",
    imageUrl: "/about-moi-moc-images/son-duong-product.png",
    quantityOrder: 1,
  },
  {
    id: "7",
    name: "Wireless Charger",
    productName: "Wireless Charger",
    price: 29.99,
    productDescription:
      "Fast wireless charger compatible with all Qi-enabled devices.",
    imageUrl: "/about-moi-moc-images/son-duong-product.png",
    quantityOrder: 1,
  },
  {
    id: "8",
    name: "Noise-Cancelling Earbuds",
    productName: "Earbuds",
    price: 149.99,
    discountPrice: 119.99,
    discountPercent: 20,
    productDescription:
      "Premium noise-cancelling earbuds with superior sound quality and long battery life.",
    imageUrl: "/about-moi-moc-images/son-duong-product.png",
    quantityOrder: 1,
  },
  {
    id: "9",
    name: "Smart Home Hub",
    productName: "Home Hub",
    price: 89.99,
    productDescription:
      "Central hub for controlling smart home devices with voice commands and a touch screen.",
    imageUrl: "/about-moi-moc-images/son-duong-product.png",
    quantityOrder: 1,
  },
  {
    id: "11",
    name: "Air Purifier",
    productName: "Air Purifier",
    price: 129.99,
    productDescription:
      "High-efficiency air purifier with a HEPA filter, suitable for rooms up to 500 sq ft.",
    imageUrl: "/about-moi-moc-images/son-duong-product.png",
    quantityOrder: 2,
  },
  {
    id: "10",
    name: "Electric Toothbrush",
    productName: "Toothbrush",
    price: 59.99,
    discountPrice: 49.99,
    discountPercent: 17,
    productDescription:
      "Electric toothbrush with multiple brushing modes and a two-minute timer.",
    imageUrl: "/about-moi-moc-images/son-duong-product.png",
    quantityOrder: 2,
  },
];

export const CustomerOrderDetail = () => {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order Oe31b70H
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: November 23, 2023</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3 h-[400px] overflow-y-auto overflow-x-hidden p-1">
            <TooltipProvider delayDuration={200}>
              {productsDemo.map((product) => {
                return (
                  <CartItem key={product.id} product={product} dashboard />
                );
              })}
            </TooltipProvider>
          </ul>

          <Separator className="my-2" />

          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping (express)</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$25.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>$329.00</span>
            </li>
          </ul>
        </div>

        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>Liam Johnson</span>
              <span>1234 Main St.</span>
              <span>Anytown, CA 12345</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>Liam Johnson</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">liam@acme.com</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div>
          </dl>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>

      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};
