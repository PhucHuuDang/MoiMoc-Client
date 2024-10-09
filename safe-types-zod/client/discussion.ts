import { z } from "zod";

export const DiscussionSafeTypes = z.object({
  content: z.string({
    message: "Content is required",
  }),
});
