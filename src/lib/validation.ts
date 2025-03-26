import { z } from "zod";

import Cookies from 'js-cookie'

const getMessage = (en: string, ar: string): string => {
  const language = Cookies.get('language');
  return language === 'ar' ? ar : en;
};



// Validation schema for UserForm
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, getMessage("Name must be at least 2 characters.", "يجب أن يكون الاسم على الأقل حرفين."))
    .max(50, getMessage("Name must be at most 50 characters.", "يجب أن يكون الاسم على الأكثر 50 حرفًا.")),
  email: z.string().email(getMessage("Invalid email address.", "عنوان البريد الإلكتروني غير صالح.")),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), {
      message: getMessage("Invalid phone number. Format: +1234567890", "رقم الهاتف غير صالح. التنسيق: +1234567890"),
    }),
});
export const SubscribeValidation = z.object({
  name: z
    .string()
    .min(2, getMessage("Name must be at least 2 characters.", "يجب أن يكون الاسم على الأقل حرفين."))
    .max(50, getMessage("Name must be at most 50 characters.", "يجب أن يكون الاسم على الأكثر 50 حرفًا.")),
  email: z.string().email(getMessage("Invalid email address.", "عنوان البريد الإلكتروني غير صالح.")),
});



export const ContactUsFormValidation = z.object({
  first_name: z
    .string()
    .min(2, getMessage("First name must be at least 2 characters.", "يجب أن يكون الاسم الأول على الأقل حرفين."))
    .max(50, getMessage("First name must be at most 50 characters.", "يجب أن يكون الاسم الأول على الأكثر 50 حرفًا.")),
  last_name: z
    .string()
    .min(2, getMessage("Last name must be at least 2 characters.", "يجب أن يكون الاسم الأخير على الأقل حرفين."))
    .max(50, getMessage("Last name must be at most 50 characters.", "يجب أن يكون الاسم الأخير على الأكثر 50 حرفًا.")),
  email: z.string().email(getMessage("Invalid email address.", "عنوان البريد الإلكتروني غير صالح.")),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, {
      message: getMessage("Invalid phone number format. Must be 10-15 digits.", "تنسيق رقم الهاتف غير صالح. يجب أن يكون من 10 إلى 15 رقمًا."),
    }),
  message: z.string().min(2, getMessage("Message must be at least 2 characters.", "يجب أن تكون الرسالة على الأقل حرفين.")),
});



export const CertificateFormValidation = z.object({
  first_name: z
    .string()
    .min(2, getMessage("First name must be at least 2 characters.", "يجب أن يكون الاسم الأول على الأقل حرفين."))
    .max(50, getMessage("First name must be at most 50 characters.", "يجب أن يكون الاسم الأول على الأكثر 50 حرفًا.")),
  last_name: z
    .string()
    .min(2, getMessage("Last name must be at least 2 characters.", "يجب أن يكون الاسم الأخير على الأقل حرفين."))
    .max(50, getMessage("Last name must be at most 50 characters.", "يجب أن يكون الاسم الأخير على الأكثر 50 حرفًا.")),
  email: z.string().email(getMessage("Invalid email address.", "عنوان البريد الإلكتروني غير صالح.")),
  message: z.string().min(2, getMessage("Message must be at least 2 characters.", "يجب أن تكون الرسالة على الأقل حرفين.")),
  certificate_code: z.string().min(1, getMessage("Certificate code is required.", "رمز الشهادة مطلوب.")),
});



// Define the RegisterationFormValidation for the form
export const RegisterationFormValidation = z.object({
  title: z
    .string()
    .min(1, getMessage("Title is required", "العنوان مطلوب"))
    .max(255, getMessage("Title must be less than 255 characters", "يجب أن يكون العنوان أقل من 255 حرفًا")),
  description: z.string().nullable().optional(),
  fee: z.string().min(1, getMessage("Fee is required", "الرسوم مطلوبة")),
  start_date: z.string().min(1, getMessage("Start date is required", "تاريخ البدء مطلوب")),
  end_date: z.string().min(1, getMessage("End date is required", "تاريخ الانتهاء مطلوب")),
  houres: z.number().min(1, getMessage("Hours are required", "الساعات مطلوبة")),
  language: z.string().min(1, getMessage("Language is required", "اللغة مطلوبة")),
  code: z.string().optional(),
  category_id: z.number().min(1, getMessage("Category ID is required", "معرف الفئة مطلوب")).int(),
  venue_id: z.number().min(1, getMessage("Venue ID is required", "معرف المكان مطلوب")).int(),
  name: z.string().nullable().optional(),
  email: z.string().email(getMessage("Invalid email", "البريد الإلكتروني غير صالح")).nullable().optional(),
  url: z.string().nullable().optional(),
  job_title: z.string().nullable().optional(),
  cv_trainer: z.instanceof(File).optional(),
  selection_training: z
    .object({
      name: z.string().optional(),
      email: z.string().email(getMessage("Invalid email", "البريد الإلكتروني غير صالح")).nullable().optional(),
      functional_specialization: z.string().optional(),
      phone_number: z.string().optional(),
      trainer_id: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  num_people: z.number().min(1, getMessage("Number of people is required", "عدد الأشخاص مطلوب")).int(),
  entity_type: z.string().min(1, getMessage("Entity type is required", "نوع الكيان مطلوب")),
  user_id: z.number().nullable().optional(),
  course_ad_id: z.number().nullable().optional(),
  discount_code: z.string().optional(),
});


export const NewItemFormValidation = z.object({
    title_en: z.string().min(1, "English title is required"),
    description_en: z.string().optional(),
    title_ar: z.string().optional(),
    description_ar: z.string().optional(),
    image: z.any().optional(),
}); 