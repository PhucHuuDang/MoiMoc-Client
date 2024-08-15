import { z } from "zod";

type DeliveryType = ["standard", "express"];

const deliveryTypes = ["standard", "express"] as const;
const paymentMethodsTypes = ["receive-order-payment", "momo"] as const;

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
    value: "momo",
    label: "Momo",
  },
];

export const CheckoutSchemaTypes = z.object({
  method: z.enum(deliveryTypes, {
    required_error: "You need to select a delivery method.",
    invalid_type_error: "Invalid notification type.",
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
