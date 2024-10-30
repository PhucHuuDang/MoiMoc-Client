"use client";

import { IngredientSafeTypes } from "@/safe-types-zod/admin/ingredient-types";
import { FormValues } from "../_global-components-reused/form/form-values";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormItemsControl } from "../_global-components-reused/form/form-items-control";
import { DialogModal } from "../_global-components-reused/form/dialog-modal";
import { useIngredientModal } from "@/hooks/use-ingredient-modal";
import { Button } from "../ui/button";
import { FormSubmit } from "../_global-components-reused/form/form-submit";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const IngredientModal = () => {
  const form = useForm<z.infer<typeof IngredientSafeTypes>>({
    resolver: zodResolver(IngredientSafeTypes),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ingredientModal = useIngredientModal();

  const client = useQueryClient();

  const onSubmit = async (values: z.infer<typeof IngredientSafeTypes>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ingredients`,
        values,
      );

      if (response.status !== 201) {
        toast.error("Failed to add ingredient");
        return;
      }
      client.invalidateQueries({ queryKey: ["ingredients"] });
      form.reset({ ingredient: "" });
      ingredientModal.onClose();
      toast.success("Ingredient added successfully");
    } catch (error) {
      toast.error("Failed to add ingredient");
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const header = (
    <div>
      <DialogHeader>
        <DialogTitle>Add More Ingredient</DialogTitle>
        <DialogDescription>Add more ingredient to the list</DialogDescription>
      </DialogHeader>
    </div>
  );

  const body = (
    <FormValues form={form} onSubmit={onSubmit}>
      <FormItemsControl
        form={form}
        name="ingredient"
        label="Ingredient"
        placeholder="Ingredient"
        disabled={false}
      />

      <div className="flex items-center justify-end gap-x-2">
        <DialogClose asChild>
          <Button className="w-24" variant="outline">
            Cancel
          </Button>
        </DialogClose>

        <FormSubmit
          disabled={isLoading}
          className="w-24 text-end"
          variant="moiMoc"
        >
          Create
        </FormSubmit>
      </div>
    </FormValues>
  );

  return (
    <DialogModal
      header={header}
      body={body}
      isOpen={ingredientModal.isOpen}
      onClose={ingredientModal.onClose}
    />
  );
};
