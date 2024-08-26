"use client";

import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { FormTextareaControl } from "@/components/_global-components-reused/form/form-textarea-control";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface ProductDetailProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  productName: Path<T>;
  descriptionName: Path<T>;
}

export const ProductDetailCard = <T extends FieldValues, K>({
  form,
  productName,
  descriptionName,
}: ProductDetailProps<T, K>) => {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle className="text-primary">Product Details</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            {/* <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue="Gamer Gear Pro Controller"
            /> */}

            <FormItemsControl
              form={form}
              name={productName}
              placeholder="Name of product"
              label="Name"
            />
          </div>
          <div className="grid gap-3">
            {/* <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
              className="min-h-32"
            /> */}
            <FormTextareaControl
              form={form}
              name={descriptionName}
              label="Description"
              placeholder="Let's describe the product's useful, durable, quality, etc...!"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
