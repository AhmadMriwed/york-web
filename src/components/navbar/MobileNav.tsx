import React, { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";
import { ListItem, navItems1, navItems2 } from "./Navbar";
import Link from "next/link";
import { categories, venues } from "@/constants";
import { cn } from "@/lib/utils";

const MobileNav = ({
  isMobileMenuOpen,
  setMobileMenuOpen,
  isScrolled,
}: {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  isScrolled: boolean;
}) => {
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
            "h-[45%]": isMobileMenuOpen,
            "top-20": isScrolled,
          }
        )}
      >
        {navItems1.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            passHref
            className="hover:no-underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            <p className="p-3 font-semibold hover:text-primary-color1 text-black transition-all duration-200 text-xs uppercase border-b border-gray-200">
              {item.title}
            </p>
          </Link>
        ))}

        <Accordion type="single" collapsible>
          <AccordionSection
            title="Categories"
            items={categories}
            basePath="/categories"
          />
          <AccordionSection title="Venues" items={venues} basePath="/venues" />
        </Accordion>

        {navItems2.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            passHref
            className="hover:no-underline"
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
}: {
  title: string;
  items: { id?: number; title: string; image: string; description?: string }[];
  basePath: string;
}) => (
  <AccordionItem value={title.toLowerCase()}>
    <AccordionTrigger className="ml-2">
      <p className="font-semibold hover:text-primary-color1 transition-all duration-200">
        {title}
      </p>
    </AccordionTrigger>
    <AccordionContent>
      <ul className="pl-4">
        {items.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            href={`${basePath}/${index + 1}`}
          />
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
);
