"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { ImageUpload } from "../image-upload";
import { useFromStoreImagesProduct } from "@/store/use-from-store-images-product";
import { useImagesProductStore } from "@/store/use-images-product-store";
import { useEffect } from "react";

interface FormImagesProductControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: React.ReactNode;
}

export const FormImagesProductControl = <T extends FieldValues, K>({
  form,
  name,
  children,
}: FormImagesProductControlProps<T, K>) => {
  const imagesProductStore = useFromStoreImagesProduct(
    useImagesProductStore,
    (state) => state,
  );

  useEffect(() => {
    if (imagesProductStore?.images.length! > 0) {
      form.setValue(name, imagesProductStore?.images as PathValue<T, Path<T>>);
    }
  }, [imagesProductStore?.images]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorCondition = fieldState.error?.message;

        return (
          <FormItem>
            <Card>
              <FormLabel asChild>
                <CardHeader className="space-y-4">
                  <CardTitle
                    className={`${!!errorCondition && "text-rose-700"}`}
                  >
                    Product Images
                  </CardTitle>
                  <CardDescription>
                    Add more product images to showcase your product
                  </CardDescription>
                  <FormMessage>{fieldState.error?.message}</FormMessage>

                  <ImageUpload />
                </CardHeader>
              </FormLabel>

              <FormControl>
                <CardContent>{children}</CardContent>
              </FormControl>
            </Card>
          </FormItem>
        );
      }}
    />
  );
};
