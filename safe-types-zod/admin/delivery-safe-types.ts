import { z } from "zod";

export const DeliverySafeTypes = z.object({
  method: z.string({
    message: "Delivery method is required",
    invalid_type_error: "Delivery method must be a string",
  }),
  price: z
    .union([z.string(), z.number()]) // Accept string or number
    .transform((value) =>
      typeof value === "string" ? parseFloat(value) : value,
    )
    .refine((val) => val > 0, { message: "Price must be a positive number" }),
  estimatedDays: z.string({
    message: "Estimated days is required",
    invalid_type_error: "Estimated days must be a string",
  }),
});
