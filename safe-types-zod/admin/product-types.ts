import { z } from "zod";

export const AddProductSafeTypes = z.object({
  productName: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" })
    .max(50, { message: "Product name must be at most 50 characters" }),

  productDescription: z
    .string()
    .min(10, {
      message: "Product description must be at least 10 characters",
    })
    .max(500, {
      message: "Product description must be at most 500 characters",
    }),
});
