"use client";

import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface FormMultiSelectControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: React.ReactNode;
  // selectedIngredients: K[];
}

export const FormMultiSelectControl = <T extends FieldValues, K>({
  form,
  name,
  children,
  // selectedIngredients,
}: FormMultiSelectControlProps<T, K>) => {
  // useEffect(() => {
  //   if (selectedIngredients.length > 0) {
  //     form.setValue(name, selectedIngredients as PathValue<T, Path<T>>);
  //     form.trigger(name);
  //   }
  // }, [selectedIngredients]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState, fieldState }) => {
        // console.log({ fieldState });
        const errorMessage = fieldState.error?.message;

        // console.log("multi select error: ", errorMessage);

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
