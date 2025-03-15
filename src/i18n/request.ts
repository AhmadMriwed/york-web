import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies } from 'next/headers';


type Locale = "en" | "ar";


export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('language')?.value;


  if (cookieLocale) {
    locale = cookieLocale;
  } else  {
    locale = routing.defaultLocale;
  }

  return {
    locale, 
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});