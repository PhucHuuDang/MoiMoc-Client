"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TableHeaderOrder = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Customer</TableHead>
        <TableHead className="hidden sm:table-cell">Type</TableHead>
        <TableHead className="hidden sm:table-cell">Status</TableHead>
        <TableHead className="hidden md:table-cell">Date</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
  );
};
