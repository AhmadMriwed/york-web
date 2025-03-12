import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies } from 'next/headers';


type Locale = "en" | "ar";


export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('language')?.value;

  if (cookieLocale && routing.locales.includes(cookieLocale as Locale)) {
    locale = cookieLocale;
  } else if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  // إرجاع الكائن مع `locale` كنوع `string`
  return {
    locale, // الآن `locale` هو `string` وليس `Promise`
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});