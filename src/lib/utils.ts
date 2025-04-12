
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import confetti from 'canvas-confetti'
import { FlexibleTranslatedText, TranslatedText } from "@/types/adminTypes/courses/coursesTypes";

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


export const shootRelisticConfetti = ()=>{
  const count = 200;
const defaults = {
  origin: { x:0.5, y: 0.5 }
};

function fire(particleRatio:any, opts:any) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}


export function extractOrigin(value: string | { origin?: string; ar?: string | null; en?: string | null } | undefined): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (value && typeof value === 'object') {
    return value.origin || value.en || value.ar || '';
  }

  return ''; // Default return value if input is undefined or invalid
}

export function getTranslatedText(text: FlexibleTranslatedText | undefined, lang: keyof TranslatedText = 'origin'): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang] || text.origin || '';
}

export function getFlexibleText(text: FlexibleTranslatedText | undefined, lang: keyof TranslatedText): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang] || '';
}
