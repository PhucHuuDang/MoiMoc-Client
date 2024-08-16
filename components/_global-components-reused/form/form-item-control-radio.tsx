"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { FieldValues, Form, Path, UseFormReturn } from "react-hook-form";

interface FormItemControlRadioProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  formSubmit?: React.ReactNode;
  type?: string;
  classNameLabel?: string;
  disabled?: boolean;
  formLabel?: string;
  children: React.ReactNode;
}

export const FormItemControlRadio = <T extends FieldValues, K>({
  form,
  name,
  placeholder,
  label,
  type,
  classNameLabel,
  disabled,
  formLabel,
  children,
}: FormItemControlRadioProps<T, K>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        // console.log({ field, fieldState, formState });
        return (
          <FormItem className="space-y-3">
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <RadioGroup
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                {children}
              </RadioGroup>
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
