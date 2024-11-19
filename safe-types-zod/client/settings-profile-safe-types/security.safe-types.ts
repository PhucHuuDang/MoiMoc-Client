import { isEqual } from "lodash";
import { z } from "zod";

export const SecuritySafeTypes = z
  .object({
    password: z
      .string({
        message: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(50, {
        message: "Password must be at most 50 characters",
      })
      .optional()
      .nullable(),
    newPassword: z
      .string({
        message: "New password is required",
        invalid_type_error: "New password must be a string",
      })
      .min(8, {
        message: "New password must be at least 8 characters",
      })
      .max(50, {
        message: "New password must be at most 50 characters",
      })
      .optional()
      .nullable(),
    confirmPassword: z
      .string({
        message: "Confirm password is required",
        invalid_type_error: "Confirm password must be a string",
      })
      .min(8, {
        message: "Confirm password must be at least 8 characters",
      })
      .max(50, {
        message: "Confirm password must be at most 50 characters",
      })
      .optional()
      .nullable(),
  })
  .refine(
    (value) => {
      if (isEqual(value.newPassword, value.confirmPassword)) {
        return true;
      }
    },
    {
      message: "Mật khẩu mới và mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    },
  );
