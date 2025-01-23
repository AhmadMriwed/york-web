import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ContactUsImageKey = "Phone" | "Mail" | "Address";

export const contactUsImage: Record<ContactUsImageKey, string> = {
  Phone: "/icons/smart-phone.svg",
  Mail: "/icons/email-full.svg",
  Address: "/icons/address-location.svg",
};

export function isContactUsImageKey(value: string): value is ContactUsImageKey {
  return Object.keys(contactUsImage).includes(value);
}