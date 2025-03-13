// "use client";

// import React, { useEffect, useState } from "react";
// import ReactCountryFlag from "react-country-flag";
// import { SelectPicker } from "rsuite";
// import { routing, usePathname, useRouter } from "@/i18n/routing";
// import Cookies from "js-cookie";
// import { useLocale } from "next-intl";

// type Props = {};

// const Switcher = (props: Props) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const locale = useLocale();

//   const Languages = [
//     { name: "English", countryCode: "us", value: "en" },
//     { name: "Arabic", countryCode: "sa", value: "ar" },
//   ];

//   const LanguageOptions = Languages.map((language) => ({
//     label: (
//       <div className="flex items-center gap-2">
//         <ReactCountryFlag countryCode={language.countryCode} svg />
//         <span className="text-sm">{language.name}</span>
//       </div>
//     ),
//     value: language.value,
//   }));

//   const [selectedLanguage, setSelectedLanguage] = useState(
//     Cookies.get("language") || locale
//   );

//   const handleLanguageChange = (newLocale: string) => {
//     Cookies.set("language", newLocale, { expires: 7 });
//     setSelectedLanguage(newLocale);

//     const pathnameWithoutLocale =
//       pathname
//         .replace(new RegExp(`^/(${routing.locales.join("|")})`), "")
//         .replace(/^\/+/, "/") || "/";
//     router.replace({ pathname: pathnameWithoutLocale }, { locale: newLocale });
//   };

//   useEffect(() => {
//     const languageFromCookie = Cookies.get("language");
//     if (languageFromCookie && languageFromCookie !== selectedLanguage) {
//       setSelectedLanguage(languageFromCookie);
//     }
//   }, [selectedLanguage]);

//   return (
//     <div>
//       <p className="sr-only">Change language :</p>
//       <SelectPicker
//         data={LanguageOptions}
//         placement="bottom"
//         className="w-full absolute z-[1000]"
//         searchable={false}
//         id="language"
//         name="language"
//         placeholder="Select Language"
//         value={selectedLanguage}
//         onChange={(value) => handleLanguageChange(value as string)}
//         cleanable={false}
//       />
//     </div>
//   );
// };

// export default Switcher;

"use client";

import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { usePathname, useRouter } from "@/i18n/routing";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {};

const Switcher = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const Languages = [
    { name: "English", countryCode: "US", value: "en" },
    { name: "العربية", countryCode: "SA", value: "ar" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(
    Cookies.get("language") || locale
  );

  const handleLanguageChange = (newLocale: string) => {
    Cookies.set("language", newLocale, { expires: 7 });
    setSelectedLanguage(newLocale);

    // Remove the current locale from the pathname
    const pathnameWithoutLocale =
      pathname
        .replace(new RegExp(`^/(en|ar)`), "") // Replace only the current locale
        .replace(/^\/+/, "/") || "/";

    // Navigate to the new locale
    router.replace(
      {
        pathname: pathnameWithoutLocale,
      },
      { locale: newLocale }
    );
  };

  useEffect(() => {
    const languageFromCookie = Cookies.get("language");
    if (languageFromCookie && languageFromCookie !== selectedLanguage) {
      setSelectedLanguage(languageFromCookie);
    }
  }, [selectedLanguage]);

  return (
    <div>
      <Select
        value={selectedLanguage}
        onValueChange={(value) => handleLanguageChange(value)}
      >
        <SelectTrigger className=" w-12 md:w-[108px] bg-gray-200 text-black">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent
          className={cn(
            "absolute   md:left-0 z-[1000]",
            locale == "ar" ? "left-4" : "right-0"
          )}
        >
          {Languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              <div className="flex items-center gap-2">
                <ReactCountryFlag
                  countryCode={language.countryCode}
                  svg
                  style={{ width: "1.2em", height: "1.2em" }}
                />
                <span className="text-sm">{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Switcher;
