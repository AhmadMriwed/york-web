
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


export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};


export const formatDateToYYYYMMDD = (date: Date | undefined): string | null => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};