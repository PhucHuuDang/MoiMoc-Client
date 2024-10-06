"use client";

import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PlusCircle } from "lucide-react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface StockProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name?: Path<T>;
  stockProps: {
    quantity: Path<T> | string;
    discountPercent: Path<T> | string;
    price: Path<T> | string;
    discountPrice: Path<T> | string;
  };
}

export const Stock = <T extends FieldValues, K>({
  form,
  name,
  stockProps,
}: StockProps<T, K>) => {
  const typeFormItemControl = "number";

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Số lượng sản phẩm</CardTitle>
        <CardDescription>Số lượng sản phẩm còn trong kho</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">SKU</TableHead> */}
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount (%)</TableHead>
              <TableHead>Discount Price</TableHead>
              {/* <TableHead className="w-[100px]">Size</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="h-[100px]">
                  <FormItemsControl
                    type={typeFormItemControl}
                    name={stockProps.quantity as Path<T>}
                    form={form}
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="h-[100px]">
                  <FormItemsControl
                    type={typeFormItemControl}
                    name={stockProps.price as Path<T>}
                    form={form}
                    // value={20}
                    placeholder="Enter the price for product..."
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="h-[100px]">
                  <FormItemsControl
                    type={typeFormItemControl}
                    name={stockProps.discountPercent as Path<T>}
                    form={form}
                    placeholder="Set discount percentage..."
                    // value={20}
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="h-[100px]">
                  <FormItemsControl
                    type={typeFormItemControl}
                    name={stockProps.discountPrice as Path<T>}
                    form={form}
                    disabled
                    // value={form.watch(
                    //   stockProps.discountPrice as PathValue<T, Path<T>>,
                    // )}
                    // value={50}
                    placeholder="Calculated..."
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      {/* <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter> */}
    </Card>
  );
};
