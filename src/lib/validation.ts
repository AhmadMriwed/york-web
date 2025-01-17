import { z } from "zod";

// Validation schema for UserForm
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), {
      message: "Invalid phone number. Format: +1234567890",
    }),
});

// Validation schema for RegistrationForm
export const RegistrationFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), {
      message: "Invalid phone number. Format: +1234567890",
    }),
  address: z
    .string()
    .min(2, "Address must be at least 2 characters.")
    .max(50, "Address must be at most 50 characters.")
    .optional(),
  notes: z
    .string()
    .min(2, "Notes must be at least 2 characters.")
    .max(50, "Notes must be at most 50 characters.")
    .optional(),
});
