import { z } from "zod";

type DeliveryType = ["standard", "express"];

const deliveryTypes = ["standard", "express"] as const;

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

export const CheckoutSchemaTypes = z.object({
  method: z.enum(deliveryTypes, {
    required_error: "You need to select a delivery method.",
    invalid_type_error: "Invalid notification type.",
  }),
});
