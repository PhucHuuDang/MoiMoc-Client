import { z } from "zod";

export const PaymentMethodsSafeTypes = z.object({
  type: z
    .string({
      message: "Payment method type is required",
      invalid_type_error: "Payment method type must be a string",
    })
    .max(50, { message: "Payment method type must be at most 50 characters" }),

  fee: z
    .string({
      message: "Payment method fee is required",
      invalid_type_error: "Payment method fee must be a string",
    })
    .max(50, { message: "Payment method fee must be at most 50 characters" }),

  method: z.string({
    message: "Payment method name is required",
    invalid_type_error: "Payment method name must be a string",
  }),
});
