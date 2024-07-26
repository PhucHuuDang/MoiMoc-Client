"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormInput } from "./form-input";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

export const FormPassword = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  type,
  classNameLabel,
}: FormItemsControlProps<T>) => {
  const [typeInput, setTypeInput] = useState<string>("text");

  const onToggleType = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setTypeInput((prev) => (prev === "text" ? "password" : "text"));
  };

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
              {/* <Input placeholder={placeholder} {...field} type={type} /> */}
              <FormInput
                id={name}
                typeInputPassword={typeInput}
                onToggle={onToggleType}
                field={field}
                className="h-10"
                placeholder={placeholder}
              />
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
