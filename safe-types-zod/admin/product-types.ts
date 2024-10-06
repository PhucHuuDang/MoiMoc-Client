import { z } from "zod";

export const AddProductSafeTypes = z.object({
  productName: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" })
    .max(50, { message: "Product name must be at most 50 characters" }),

  productDescription: z
    .string()
    .min(10, { message: "Product description must be at least 10 characters" })
    .max(500, {
      message: "Product description must be at most 500 characters",
    }),

  quantity: z
    .union([z.string(), z.number()]) // Allow both string and number
    .transform((value) => (typeof value === "string" ? parseInt(value) : value))
    .refine((value) => value > 0, {
      message: "Quantity must be a positive number",
    }),

  price: z
    .union([z.string(), z.number()]) // Accept string or number
    .transform((value) =>
      typeof value === "string" ? parseFloat(value) : value,
    )
    .refine((val) => val > 0, { message: "Price must be a positive number" }),

  discountPercentage: z
    .union([z.string(), z.number()])
    .optional()
    .transform((value) =>
      value === "" || value === undefined
        ? undefined
        : typeof value === "string"
          ? parseInt(value)
          : value,
    )
    .refine((value) => value === undefined || (value >= 1 && value <= 90), {
      message: "Discount must be between 1 and 90",
    }),

  discountPrice: z
    .union([z.string(), z.number()])
    .optional()

    .transform((value) =>
      value === "" || value === undefined
        ? undefined
        : typeof value === "string"
          ? parseInt(value)
          : value,
    ),
  // .refine((value) => value === undefined, {
  //   message: "Discount must be between 1 and 90",
  // }),

  productTypeId: z
    .union([
      z.string({
        required_error: "Product type is must be entered",
      }),
      z.number({
        required_error: "Product type is must be entered",
      }),
    ])
    .transform((value) => (typeof value === "string" ? parseInt(value) : value))
    .refine((value) => value > 1, {
      message: "Product type id must be at least 1",
    }),
  imageUrl: z
    .array(z.string(), {
      required_error: "Images product must be entered",
    })
    .min(1, { message: "Images product must be at least 1" }),
  // imagesProduct: z.string().array(),

  ingredients: z
    .array(
      z
        .union([
          z.string({
            required_error: "Ingredients must be entered",
          }),
          z.number({
            required_error: "Ingredients must be entered",
          }),
        ])
        .transform((value) =>
          typeof value === "string" ? parseInt(value) : value,
        ),
    )
    .min(1, { message: "Ingredients must be at least 1" }),

  usage: z
    .string({
      required_error: "Usage must be entered",
    })
    .min(10, { message: "Usage must be at least 10 characters" }),

  details: z
    .string({
      required_error: "Detail must be entered",
    })
    .min(10, { message: "Detail must be at least 10 characters" }),
});

export type test = z.infer<typeof AddProductSafeTypes>;
