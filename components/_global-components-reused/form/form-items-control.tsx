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

interface FormItemsControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
  onSubmit?: (data: T) => void;
  label?: string;
  formSubmit?: React.ReactNode;
  type?: string;
  classNameLabel?: string;
  disabled?: boolean;
  classNameInput?: string;
  // value?: string | PathValue<T, Path<T>> | undefined;
  value?: any;
}

export const FormItemsControl = <T extends FieldValues, K>({
  form,
  name,
  placeholder,
  label,
  type = "text",
  classNameLabel,
  disabled,
  classNameInput,
  value,
}: FormItemsControlProps<T, K>) => {
  // console.log({ value });
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        if (value !== undefined && value !== null && field.value !== value) {
          form.setValue(name, value);
        }

        // console.log({ field, fieldState });

        return (
          <FormItem>
            <FormLabel className={cn("text-text-foreground", classNameLabel)}>
              {label}
            </FormLabel>
            <FormControl>
              <Input
                className={cn("", classNameInput)}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                type={type}
              />
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
