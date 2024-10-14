"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSubmit } from "./form-submit";
import {
  UseFormReturn,
  FieldValues,
  Path,
  UseFormWatch,
} from "react-hook-form";
import { FormItemsControl } from "./form-items-control";
import { ZodType } from "zod";
import { cn } from "@/lib/utils";

interface FormValuesProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  classNameForm?: string;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  name?: Path<T>;
  placeholder?: string;
  label?: string;
  formSubmit?: React.ReactNode;
  formItems?: React.ReactNode;
}

export const FormValues = <T extends FieldValues>({
  form,
  onSubmit,
  name,
  placeholder,
  label,
  formSubmit,
  formItems,
  children,
  classNameForm,
}: FormValuesProps<T>) => {
  const onSubmitError = (errors: any) => {
    console.log("Form Errors: ", errors); // This will log validation errors, if any
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
        className={cn("space-y-5", classNameForm)}
      >
        {children}
      </form>
    </Form>
  );
};
