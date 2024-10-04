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
  disabled?: boolean;
}

export const FormPassword = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  type,
  classNameLabel,
  disabled,
}: FormItemsControlProps<T>) => {
  const [typeInput, setTypeInput] = useState<string>("password");

  const onToggleType = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setTypeInput((prev) => (prev === "text" ? "password" : "text"));
  };

  const formError = form.formState.errors[""];

  const getErrorMessage = (error: unknown): string | undefined => {
    if (typeof error === "object" && error !== null && "message" in error) {
      return (error as { message?: string }).message;
    }
    return undefined;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        // console.log({ fieldState });
        // console.log({ formState });
        const errorMessage =
          getErrorMessage(fieldState.error) || getErrorMessage(formError);
        // console.log({ errorMessage });
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
                disabled={disabled}
                className="h-10"
                placeholder={placeholder}
              />
            </FormControl>
            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
