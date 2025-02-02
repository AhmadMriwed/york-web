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



export const RegisterationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fee: z.number().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  hours: z.number().min(1, "Hours are required"),
  language: z.string().min(1, "Language is required"),
  venue_id: z.number().min(1, "Venue ID is required"),
  category_id: z.number().min(1, "Category ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  url: z.string().min(1, "URL is required"),
  job_title: z.string().min(1, "Job title is required"),
  cv_trainer: z.string().min(1, "CV trainer is required"),
  course_ad_id: z.number().optional(),
  num_people: z.number().min(1, "Number of people is required").optional(),
  selection_training: z
    .object({
      name: z.string().optional(),
      email: z.string().email("Invalid email").optional(),
      functional_specialization: z.string().optional(),
      phone_number: z.string().optional(),
      trainer_id: z.number().optional(),
    })
    .optional(),
});



