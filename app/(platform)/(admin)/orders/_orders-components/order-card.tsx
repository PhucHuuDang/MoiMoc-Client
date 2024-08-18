"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerOrdersData } from "../db/data";
import { CustomerOrder } from "./customer-order";

export const OrderCard = () => {
  const [idSelected, setIdSelected] = useState<number>();

  const onActive = (id: number) => {
    setIdSelected(id);
  };

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          {CustomerOrdersData.map((order) => {
            return (
              <CustomerOrder
                {...order}
                key={order.id}
                isActive={idSelected === order.id}
                onActive={onActive}
              />
            );
          })}
        </Table>
      </CardContent>
    </Card>
  );
};
