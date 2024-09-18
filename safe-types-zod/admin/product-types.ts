import { z } from "zod";

// export const AddProductSafeTypes = z.object({
//   productName: z
//     .string()
//     .min(3, { message: "Product name must be at least 3 characters" })
//     .max(50, { message: "Product name must be at most 50 characters" }),

//   productDescription: z
//     .string()
//     .min(10, {
//       message: "Product description must be at least 10 characters",
//     })
//     .max(500, {
//       message: "Product description must be at most 500 characters",
//     }),

//   quantity: z
//     .string()
//     .min(1, { message: "Quantity must be at least 1" })
//     .transform((value) => parseInt(value))
//     .refine((value) => value > 0, {
//       message: "Quantity must be a positive number",
//     }),

//   price: z
//     .string() // Accept string first from input
//     .min(1)
//     .transform((value) => parseFloat(value)) // Transform it to a number
//     .refine((val) => val > 0, { message: "Price must be a positive number" }),

//   discountPercent: z
//     .string()
//     .min(1, { message: "Discount must be at least 0" })
//     // .transform((value) => (value ? parseInt(value) : undefined))
//     .transform((value) => parseInt(value))
//     .refine((value) => value <= 0, {
//       message: "Discount must be a positive number",
//     })
//     .optional(),

//   discountPrice: z
//     .string()

//     .min(50, {
//       message: "Discount price must be at least 50",
//     })
//     // .transform((value) => (value ? parseFloat(value) : undefined))
//     .transform((value) => parseFloat(value))
//     .refine((value) => value <= 0, {
//       message: "Discount price must be a positive number",
//     })
//     .optional(),

//   // category: z
//   //   .string()
//   //   .min(3, { message: "Category must be at least 3 characters" }),
// });

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

  discountPercent: z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value === "string" ? parseInt(value) : value))
    .refine((value) => value >= 0, {
      message: "Discount must be a positive number",
    })
    .optional(),

  discountPrice: z
    .union([z.string(), z.number()])
    .transform((value) =>
      typeof value === "string" ? parseFloat(value) : value,
    )
    .refine((value) => value > 0, {
      message: "Discount price must be a positive number",
    })
    .optional(),

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
  imagesProduct: z
    .array(z.string(), {
      required_error: "Images product must be entered",
    })
    .min(1, { message: "Images product must be at least 1" }),
  // imagesProduct: z.string().array(),
});

export type test = z.infer<typeof AddProductSafeTypes>;
