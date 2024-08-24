"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormTextareaControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  classNameLabel?: string;
  classNameTextArea?: string;
  disabled?: boolean;
  formDescription?: string;
  classNameDescription?: string;
}

export const FormTextareaControl = <T extends FieldValues, K>({
  form,
  name,
  label,
  placeholder,
  classNameLabel,
  classNameTextArea,
  disabled,
  formDescription,
  classNameDescription,
}: FormTextareaControlProps<T, K>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem>
            <FormLabel className={cn("text-moi_moc_green", classNameLabel)}>
              {label}
            </FormLabel>
            <FormControl>
              <Textarea
                className={cn("resize-none", classNameTextArea)}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <FormDescription
              className={cn("text-moi_moc_green", classNameDescription)}
            >
              {formDescription}
            </FormDescription>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
