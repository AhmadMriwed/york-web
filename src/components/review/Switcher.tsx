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
import { useParams } from "next/navigation";

type Props = {};

const Switcher = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const Languages = [
    { name: "English", countryCode: "US", value: "en" },
    { name: "العربية", countryCode: "SA", value: "ar" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(locale);

  const handleLanguageChange = (newLocale: string) => {
    Cookies.set("language", newLocale, { expires: 7 });
    setSelectedLanguage(newLocale);

    // Remove the current locale from the pathname
    const pathnameWithoutLocale =
      pathname
        .replace(new RegExp(`^/(en|ar)`), "") // Replace only the current locale
        .replace(/^\/+/, "/") || "/";

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
        //@ts-expect-error
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
