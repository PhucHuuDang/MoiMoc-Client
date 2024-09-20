"use client";

import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Actions } from "./actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type AllProductsColumns = {
  id: number;
  image: string;
  name: string;
  status: "Draft" | "Processing" | "Publish" | "Active" | "Failed";
  quantity: number;
  price: number;
  discountPercent?: number;
  discountPrice?: number;
  totalSales: number;
  createdAt: string;
};

export const columns: ColumnDef<AllProductsColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: () => <div className="">Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("image");

      return (
        <Image
          height={100}
          width={100}
          src={image as string}
          alt="Product Image"
          className="object-cover size-[100px] rounded-lg hover:scale-110 duration-200"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          <Badge variant="outline">{row.getValue("status")}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        // onClick={() => console.log("quantity")}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("quantity")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("price")}</div>;
    },
  },
  {
    accessorKey: "discountPercent",
    header: () => <div className="text-right">Discount Percent</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">{row.getValue("discountPercent")}</div>
      );
    },
  },
  {
    accessorKey: "discountPrice",
    header: () => <div className="text-right">Discount Price</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("discountPrice")}</div>;
    },
  },
  {
    accessorKey: "totalSales",
    header: () => <div className="text-right">Total Sales</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("totalSales")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("createdAt")}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original.id;

      return <Actions id={productId} />;
    },
  },
];
