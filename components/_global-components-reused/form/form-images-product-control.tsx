"use client";

import {
  Card,
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
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ImageUpload } from "../image-upload";

interface FormImagesProductControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: React.ReactNode;
}

export const FormImagesProductControl = <T extends FieldValues, K>({
  form,
  name,
}: FormImagesProductControlProps<T, K>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        form.setValue(name, field.value);
        return (
          <FormItem>
            <Card>
              <FormLabel asChild>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Add more product images to showcase your product
                  </CardDescription>

                  <ImageUpload />
                </CardHeader>
              </FormLabel>

              <FormControl></FormControl>

              <FormMessage>{fieldState.error?.message}</FormMessage>
            </Card>
          </FormItem>
        );
      }}
    />
  );
};
