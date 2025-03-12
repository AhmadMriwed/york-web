"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";
import { ListItem, NavItem } from "./Navbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category, Venue } from "@/types/rootTypes/rootTypes";
import { useLocale } from "next-intl";

const MobileNav = ({
  isMobileMenuOpen,
  setMobileMenuOpen,
  isScrolled,
  venues,
  categories,
}: {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  isScrolled: boolean;
  venues: Venue[];
  categories: Category[];
}) => {
  const locale = useLocale();

  const navItems1: NavItem[] = [
    {
      title: locale === "en" ? "Home" : "الرئيسية",
      href: "/home",
    },
    {
      title: locale === "en" ? "About Us" : "معلومات عنا",
      href: "/about-us",
    },
  ];

  const navItems2: NavItem[] = [
    {
      title: locale === "en" ? "Certificates" : "الشهادات",
      href: "/certificates",
    },
    {
      title: locale === "en" ? "Training Plan " : "الخطط التدريبية",
      href: "/training-plan",
    },
    {
      title: locale === "en" ? "Contact Us" : "تواصل معنا",
      href: "/contact-us",
    },
  ];
  return (
    <Collapsible open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <CollapsibleTrigger asChild>
        <button className="md:hidden">
          <Image
            src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/bars.svg"}
            height={24}
            width={24}
            alt="Menu Toggle"
          />
        </button>
      </CollapsibleTrigger>

      <div
        className={cn(
          "fixed top-32 bg-gray-200 max-h-[38%] md:hidden overflow-y-scroll overflow-x-hidden ease-linear left-0 w-full z-50 transition-[height] duration-300 rounded-md",
          {
            "h-0": !isMobileMenuOpen,
            "h-[48%]": isMobileMenuOpen,
            "top-20": isScrolled,
          }
        )}
      >
        {navItems1.map((item) => (
          <Link
            key={item.title}
            href={`/${locale}/${item.href}`}
            passHref
            className={cn("hover:no-underline ", locale === "ar" && "text-end")}
            onClick={() => setMobileMenuOpen(false)}
          >
            <p className="p-3 font-semibold hover:text-primary-color1 text-black transition-all duration-200 text-xs uppercase border-b border-gray-200">
              {item.title}
            </p>
          </Link>
        ))}

        <Accordion type="single" collapsible>
          <AccordionSection
            title={locale == "ar" ? "الفئات" : "Categories"}
            items={categories}
            basePath={`/${locale}/categories`}
            setMobileMenuOpen={setMobileMenuOpen}
            locale={locale}
          />
          <AccordionSection
            title={locale == "ar" ? "المدن" : "Venues"}
            items={venues}
            basePath={`/${locale}/venues`}
            setMobileMenuOpen={setMobileMenuOpen}
            locale={locale}
          />
        </Accordion>

        {navItems2.map((item) => (
          <Link
            key={item.title}
            href={`/${locale}/${item.href}`}
            passHref
            className={cn("hover:no-underline ", locale === "ar" && "text-end")}
            onClick={() => setMobileMenuOpen(false)}
          >
            <p className="p-3 font-semibold hover:text-primary-color1 text-black transition-all duration-200 text-xs uppercase border-b border-gray-200">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </Collapsible>
  );
};

export default MobileNav;

/* Accordion Section for Mobile Menu */
const AccordionSection = ({
  title,
  items,
  basePath,
  setMobileMenuOpen,
  locale,
}: {
  title: string;
  items: Category[] | Venue[];
  basePath: string;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  locale?: string;
}) => (
  <AccordionItem value={title.toLowerCase()}>
    <AccordionTrigger
      className={cn(
        "hover:no-underline flex  w-full justify-between",
        locale === "ar" && "flex-row-reverse"
      )}
    >
      <p className="font-semibold hover:text-primary-color1  mx-2 transition-all duration-200">
        {title}
      </p>
    </AccordionTrigger>
    <AccordionContent>
      <ul className="pl-4">
        {items?.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            href={`${basePath}/${index + 1}`}
            onClick={() => setMobileMenuOpen(false)}
          />
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
);
