"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormSelectControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  formSubmit?: React.ReactNode;
  type?: string;
  classNameFormItem?: string;
  classNameLabel?: string;
  disabled?: boolean;
  formLabel?: string;
  children: React.ReactNode;
}

export const FormSelectControl = <T extends FieldValues, K>({
  form,
  name,
  placeholder,
  label,
  type,
  classNameFormItem,
  classNameLabel,
  disabled,
  formLabel,
  children,
}: FormSelectControlProps<T, K>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        // console.log({ field });

        return (
          <FormItem className={cn("", classNameFormItem)}>
            <FormLabel className={cn("", classNameLabel)}>
              {formLabel}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger disabled={disabled}>
                  <SelectValue
                    placeholder={placeholder}
                    className="text-green-300"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{children}</SelectContent>
            </Select>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
