"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormItemsControlProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  formSubmit?: React.ReactNode;
  type?: string;
  classNameLabel?: string;
}

export const FormItemsControl = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  type,
  classNameLabel,
}: FormItemsControlProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        console.log({ field });
        return (
          <FormItem>
            <FormLabel className={cn("text-moi_moc_green", classNameLabel)}>
              {label}
            </FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} type={type} />
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
