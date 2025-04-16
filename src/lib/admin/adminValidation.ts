import { z } from "zod";
import Cookies from 'js-cookie'

export const getMessage = (en: string, ar: string): string => {
    const language = Cookies.get('language');
    return language === 'ar' ? ar : en;
  };
  

  export const AdminFormValidation = z.object({
    first_name: z.string().min(2).max(50).optional(),
last_name: z.string().min(2).max(50).optional(),
user_name: z.string().optional(),
email: z.string().email().optional(),
phone_number: z.string().optional(),
about_me: z.string().max(500).optional(),
job_type: z.string().optional(),
gender: z.string().optional(),
birth_date: z.date().optional(),
  });
