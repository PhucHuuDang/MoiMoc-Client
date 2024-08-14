"use client";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioItemProps {
  value: string;
  label: string;
  classNameFormItem?: string;
  classNameFormLabel?: string;
}

export const RadioItem = ({
  value,
  label,
  classNameFormItem,
  classNameFormLabel,
}: RadioItemProps) => {
  return (
    <FormItem
      className={cn(
        "item-center flex space-x-3 space-y-0 text-moi_moc_green",
        classNameFormItem,
      )}
    >
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel className={cn("text-moi_moc_green", classNameFormLabel)}>
        {label}
      </FormLabel>
    </FormItem>
  );
};
