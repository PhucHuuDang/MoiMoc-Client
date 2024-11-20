import { z } from "zod";

export const PersonalSafeTypes = z.object({
  name: z.string().min(1).max(50),
  // phoneAuth: z.string().min(1).max(50),
  address: z.string().max(150).optional().nullable(),
  email: z.string().max(150).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  website: z.string().url().optional().nullable(),
  designation: z.string().max(150).optional().nullable(),
});
