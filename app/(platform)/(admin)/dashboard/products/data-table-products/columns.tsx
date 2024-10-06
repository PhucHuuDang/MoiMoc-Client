"use client";

import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Actions } from "./actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { vietnameseDate } from "@/handle-transform/format-date-vietnam";

export type AllProductsColumns = {
  id: number;
  productName: string;
  image: string;
  price: string;
  discountPercentage: string;
  discountPrice: string;
  quantity: string;
  createdAt: string;
  productType: string;
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
    accessorKey: "productName",
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
      return (
        <div className="text-primary font-bold">
          {row.getValue("productName")}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "productType",
    header: () => <div className="">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          <Badge variant="outline">{row.getValue("productType")}</Badge>
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
      return <div className="">{row.getValue("quantity")}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const discountPrice = row.getValue("discountPrice");

      // console.log({ discountPrice });

      return !discountPrice ? (
        <div className="">{row.getValue("price")}</div>
      ) : (
        <del className="text-rose-500">{row.getValue("price")}</del>
      );
    },
  },
  {
    accessorKey: "discountPercentage",
    header: () => <div className="">Discount Percent</div>,
    cell: ({ row }) => {
      const discountPercent = row.getValue("discountPercentage") as number;

      return (
        <div className="text-orange-600">
          {discountPercent ? discountPercent + "%" : null}
        </div>
      );
    },
  },
  {
    accessorKey: "discountPrice",
    header: () => <div className="">Discount Price</div>,
    cell: ({ row }) => {
      const discountPercent = row.getValue("discountPercentage");

      return (
        <div className="text-sky-600 font-bold">
          {row.getValue("discountPrice")}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "totalSales",
  //   header: () => <div className="">Total Sales</div>,
  //   cell: ({ row }) => {
  //     return <div className="text-green-400">{row.getValue("totalSales")}</div>;
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: () => <div className="">Created At</div>,
    cell: ({ row }) => {
      return (
        <div className="">{vietnameseDate(row.getValue("createdAt"))}</div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original.id;

      return <Actions id={row.original.id} />;
    },
  },
];
