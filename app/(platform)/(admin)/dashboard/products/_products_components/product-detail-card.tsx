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
import { useFormStatus } from "react-dom";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface ProductDetailProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  productName: Path<T>;
  descriptionName: Path<T>;

  usage: Path<T>;
  details: Path<T>;

  disabled?: boolean;
}

export const ProductDetailCard = <T extends FieldValues, K>({
  form,
  productName,
  descriptionName,
  usage,
  details,
  disabled,
}: ProductDetailProps<T, K>) => {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle className="text-primary">Chi tiết sản phẩm</CardTitle>
        <CardDescription>Hãy miêu tả chi tiết sản phẩm của bạn</CardDescription>
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
              label="Tên sản phẩm"
              disabled={disabled}
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
              label="Miêu tả sản phẩm"
              formDescription="Hãy miêu tả sản phẩm"
              placeholder="Let's describe the product's useful, durable, quality, etc...!"
              disabled={disabled}
            />
          </div>

          <div className="grid gap-3">
            <FormTextareaControl
              form={form}
              name={details}
              label="Chi tiết sản phẩm"
              formDescription="Chi tiết của sản phẩm"
              placeholder="Let's describe the product's useful, durable, quality, etc...!"
              disabled={disabled}
            />
          </div>

          <div className="grid gap-3">
            <FormTextareaControl
              form={form}
              name={usage}
              label="Cách sử dung và khuyên dùng"
              formDescription="Cách sử dụng và khuyên dùng sản phẩm"
              placeholder="Let's describe the product's useful, durable, quality, etc...!"
              disabled={disabled}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
