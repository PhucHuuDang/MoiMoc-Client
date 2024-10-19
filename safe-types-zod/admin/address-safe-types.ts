import { z } from "zod";

export const AddressSafeTypes = z.object({
  address: z
    .string({
      message: "Hãy nhập địa chỉ nhận hàng",
    })
    .min(3, { message: "Address must be at least 3 characters" }),
});
