import { isValidPhone } from "@/regex-validation/phone-number";
import { z } from "zod";

type DeliveryType = ["standard", "express"];

const deliveryTypes = ["standard", "express"] as const;
const paymentMethodsTypes = [
  "receive-order-payment",
  "payOs",
  "stripe",
] as const;

export const deliveryMethods = [
  {
    value: "standard",
    label: "Standard",
  },

  {
    value: "express",
    label: "Express",
  },
];

export const paymentMethods = [
  {
    value: "receive-order-payment",
    label: "Receive order payment",
  },
  {
    value: "payOs",
    label: "Banking app",
  },

  {
    value: "stripe",
    label: "Credit card",
  },
];

export const CheckoutSchemaTypes = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().optional().nullable(),
    phoneAuth: z.string(),
    avatar: z.string().optional().nullable(),
    role: z.string(),
    designation: z.string().optional().nullable(),
  }),

  address: z.string({
    message: "Address is required",
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

  method: z.enum(deliveryTypes, {
    required_error: "You need to select a delivery method.",
    invalid_type_error: "Invalid notification type.",
  }),
  paymentMethod: z.enum(paymentMethodsTypes, {
    required_error: "You need to select a payment method.",
    invalid_type_error: "Invalid notification type.",
  }),
  discountCode: z.string().optional(),

  products: z
    .array(
      z.object({
        productId: z.number(),
        price: z.string(),
        discountPrice: z.string().optional().nullable(),
        productName: z.string(),
        discountPercent: z.number().optional().nullable(),
        productDescription: z.string(),
        imageUrl: z.string(),
        quantityOrder: z.number().optional(),
      }),
    )
    .min(1, {
      message: "You need to add at least one product to checkout.",
    }),
});

export const PaymentMethodSchemaTypes = z.object({
  paymentMethod: z.enum(paymentMethodsTypes, {
    required_error: "You need to select a payment method.",
    invalid_type_error: "Invalid notification type.",
  }),
});

export const DiscountCodeSchemaTypes = z.object({
  discountCode: z.string().optional(),
});

export const Checkout = CheckoutSchemaTypes.merge(
  PaymentMethodSchemaTypes,
).merge(DiscountCodeSchemaTypes);
