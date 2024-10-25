import { z } from "zod";

export const AboutMoiMocSafeTypes = z.object({
  // imageUrls: z
  //   .array(z.string())
  //   .min(1, { message: "Please upload at least 1 image" }),

  story: z
    .string({
      message: "Please enter the story of Moi Moc",
    })
    .min(10, { message: "Story must be at least 10 characters" }),

  vision: z
    .string({
      message: "Please enter the vision of Moi Moc",
    })
    .min(10, { message: "Vision must be at least 10 characters" }),

  mission: z
    .string({
      message: "Please enter the mission of Moi Moc",
    })
    .min(10, { message: "Mission must be at least 10 characters" }),
});
