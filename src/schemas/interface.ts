import { z } from "zod";

export const EditValidation = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Invalid URL").optional(),
  image: z.any().optional(),
  files: z.array(z.any()).optional(),
});