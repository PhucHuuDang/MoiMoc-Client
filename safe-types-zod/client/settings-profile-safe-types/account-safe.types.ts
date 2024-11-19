import { isValidPhone } from "@/regex-validation/phone-number";
import { z } from "zod";

export const AccountSafeTypes = z.object({
  email: z.string().email().optional().nullable(),
  phone: z
    .string({
      message: "Phone là bắt buộc",
      invalid_type_error: "Phone number must be a string",
    })
    .trim()
    .min(10, {
      message: "Phone phải có ít nhất 10 ký tự",
    })
    .max(12, {
      message: "Phone phải có tối đa 12 ký tự",
    })
    .refine(isValidPhone, {
      message: "Số điện thoại không hợp lệ",
    })
    .optional()
    .nullable(),
});
