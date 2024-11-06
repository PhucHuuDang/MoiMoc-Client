import { z } from "zod";

export const FeedBacksSafeTypes = z.object({
  content: z.string({
    message: "Hãy điền nội dung bạn muốn đánh giá!",
  }),

  rating: z.number({
    message: "Hãy Đánh giá sản phẩm!",
  }),
});
