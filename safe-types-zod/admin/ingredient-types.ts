import { z } from "zod";
export const IngredientSafeTypes = z.object({
  ingredient: z
    .string({
      required_error: "Ingredient is required",
    })
    .min(5, "Ingredient is required"),
});
