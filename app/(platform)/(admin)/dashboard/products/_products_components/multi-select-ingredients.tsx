"use client";

import { FormImagesProductControl } from "@/components/_global-components-reused/form/form-images-product-control";
import { FormMultiSelectControl } from "@/components/_global-components-reused/form/form-multi-selects-control";
import { MultiSelect } from "@/components/multiple-selects/multiple-selects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface MultiSelectsIngredientsProps<T extends FieldValues, K> {
  ingredients: { value: string; label: string }[];
  form: UseFormReturn<T>;
  name: Path<T>;
}

export const MultiSelectsIngredients = <T extends FieldValues, K>({
  ingredients,
  form,
  name,
}: MultiSelectsIngredientsProps<T, K>) => {
  const values = form.getValues(name)?.map((item: number) => item.toString());

  // console.log({ values });
  // console.log(values?.toString());
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    values ?? [],
  );

  // console.log({ selectedIngredients });

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      form.setValue(name, selectedIngredients as PathValue<T, Path<T>>);
    }
  }, [selectedIngredients, form, name]);

  const handleChange = (values: string[]) => {
    setSelectedIngredients(values);
    form.setValue(name, values as PathValue<T, Path<T>>); // Update form value
    form.trigger(name); // Trigger validation
  };

  return (
    <FormMultiSelectControl
      form={form}
      name={name}
      // selectedIngredients={selectedIngredients}
    >
      <Card x-chunk="dashboard-07-chunk-3">
        <CardHeader>
          <CardTitle>Thành phần sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-semibold">Select Ingredients</span>

            <MultiSelect
              options={ingredients}
              // onValueChange={setSelectedIngredients}
              onValueChange={handleChange}
              defaultValue={selectedIngredients}
              placeholder="Select ingredients"
              maxCount={7}
              animation={2}
              variant="dynamic"
              // variant="inverted"
            />
          </div>
        </CardContent>
      </Card>
    </FormMultiSelectControl>
  );
};
