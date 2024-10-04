import { z } from "zod";
import { isValidPhone } from "@/regex-validation/phone-number";

export const LoginSchemaTypes = z.object({
  // phone: z
  //   .string({
  //     message: "Phone number is required",
  //     invalid_type_error: "Phone number must be a string",
  //   })
  //   .transform((value) => {
  //     console.log({ value });
  //     return value.replace(/\s+/g, "");
  //   })
  //   .pipe(
  //     zm
  //       .string()
  //       .min(10, {
  //         message: "Phone number must be at least 10 characters",
  //       })
  //       .max(12, {
  //         message: "Phone number must be at most 10 characters",
  //       })
  //       .refine(isValidPhone, {
  //         message: "Invalid phone number",
  //       }),
  //   ),
  phone: z
    .string({
      message: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .trim()
    .min(10, {
      message: "Phone number must be at least 10 characters",
    })
    .max(12, {
      message: "Phone number must be at most 10 characters",
    })
    .refine(isValidPhone, {
      message: "Invalid phone number",
    }),
  password: z
    .string({
      message: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .trim()
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const RegisterSchemaTypes = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters",
    }),
    phoneAuth: z
      .string({
        message: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
      })
      .trim()
      .min(10, {
        message: "Phone number must be at least 10 characters",
      })
      .max(12, {
        message: "Phone number must be at most 10 characters",
      })
      .refine(isValidPhone, {
        message: "Invalid phone number",
      }),
    password: z
      .string({
        message: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters",
      }),

    confirmPassword: z
      .string({
        message: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password and confirm password must be the same",
    path: ["confirmPassword"],
  });

export const ContactSchemaTypes = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  phone: z
    .string({
      message: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .trim()
    .min(10, {
      message: "Phone number must be at least 10 characters",
    })
    .max(12, {
      message: "Phone number must be at most 10 characters",
    })
    .refine(isValidPhone, {
      message: "Invalid phone number",
    }),
  email: z
    .string({
      message: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Invalid email address",
    }),
  askContent: z.string().min(5, {
    message: "Content must be at least 5 characters",
  }),
});
