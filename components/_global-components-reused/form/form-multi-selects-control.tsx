"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormMultiSelectControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: React.ReactNode;
}

export const FormMultiSelectControl = <T extends FieldValues, K>({
  form,
  name,
  children,
}: FormMultiSelectControlProps<T, K>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState, fieldState }) => {
        const errorMessage = fieldState.error?.message;

        return (
          <FormItem>
            <FormControl>{children}</FormControl>

            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
