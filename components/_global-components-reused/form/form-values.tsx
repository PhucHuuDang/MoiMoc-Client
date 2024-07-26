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
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FormItemsControl } from "./form-items-control";

interface FormValuesProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  formSubmit: React.ReactNode;
  formItems: React.ReactNode;
}

export const FormValues = <T extends FieldValues>({
  form,
  onSubmit,
  name,
  placeholder,
  label,
  formSubmit,
  formItems,
}: FormValuesProps<T>) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name={name}
          render={({ field, fieldState, formState }) => {
            console.log({ field });
            return (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        <FormItemsControl
          form={form}
          name={name}
          placeholder={placeholder}
          label={label}
          formSubmit={formSubmit}
        />
        {/* <FormSubmit>Submit</FormSubmit> */}
        {formSubmit}
      </form>
    </Form>
  );
};
