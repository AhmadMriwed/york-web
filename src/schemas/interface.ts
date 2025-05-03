
import { z } from "zod";

export const EditValidation = z.object({
  title: z.string().min(1, "Title is required"),
  sub_title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  image: z.any().optional().nullable(), // Adjust based on your image handling
  files: z.array(z.any()).optional(), // Adjust based on your file handling
  
    show_configration: z.number().min(0).max(1).default(0),
    show_condition: z.number().min(0).max(1).default(0),
});
export const EditValidationEnd = z.object({
  title: z.string().min(1, "Title is required"),
  sub_title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  image: z.any().optional().nullable(), // Adjust based on your image handling
  files: z.array(z.any()).optional(), // Adjust based on your file handling
  url: z.string()
  .regex(
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    "Please enter a valid URL"
  )
  .optional()
  .or(z.literal(""))
});