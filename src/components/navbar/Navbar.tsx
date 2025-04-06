"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command } from "@/components/ui/command";
import TopBar from "./Topbar";
import { usePathname, useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { Category, Venue } from "@/types/rootTypes/rootTypes";
import {
  fetchCategories,
  fetchFooterDetails,
  fetchVenues,
} from "@/lib/action/root_action";
import { useLocale } from "next-intl";

export interface NavItem {
  title: string;
  href: string;
}

export function Navbar(): JSX.Element {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [venues, setVenues] = React.useState<Venue[]>([]);
  const [data, setData] = React.useState<any>([]);

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
  const navItems = [...navItems1, ...navItems2];

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const fetch = async () => {
      const categories = await fetchCategories(locale);
      setCategories(categories);
      const venues = await fetchVenues(locale);
      setVenues(venues);
      const res = await fetchFooterDetails(locale);
      setData(res);
    };
    fetch();
  }, []);

  return (
    <div>
      <TopBar phone={data[1]?.content} email={data[0]?.content} />
      <NavigationMenu
        className={cn(
          "px-16 fixed max-h-24 min-w-full max-w-full z-[500] bg-[#13181e] bg-opacity-90 md:p-3 flex justify-between items-center shadow-md w-full transition-all duration-400",
          {
            "bg-[#13181e] bg-opacity-90 top-0": isScrolled,
            "flex-row-reverse": locale === "ar",
          }
        )}
      >
        {/* Mobile menu */}
        <MobileNav
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isScrolled={isScrolled}
          venues={venues}
          categories={categories}
        />

        {/* Logo */}
        <Link
          href="/"
          className={cn("ml-[22%] md:m-0", {
            "ml-0 mr-[22%]": locale === "ar",
          })}
        >
          <Image
            src="/logo.png"
            height={150}
            width={150}
            className="size-20 md:size-52 mt-3 inline-block"
            alt="logo"
          />
        </Link>

        {/* Desktop Menu */}
        <DesktopNav
          navItems={navItems}
          venues={venues}
          categories={categories}
        />

        {/* Search Bar */}
        <SearchBar open={searchOpen} setOpen={setSearchOpen} />
      </NavigationMenu>
    </div>
  );
}

export const ListItem = React.forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    title: string;
    onClick?: () => void;
  }
>(({ href, title, onClick }, ref) => {
  const path = usePathname();
  const locale = useLocale();
  return (
    <li>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block text-sm text-black relative hover:bg-gradient-to-b from-[#246c84] to-[#02B5A0] hover:text-white navEffect hover:bg-blue-200 hover:font-semibold no-underline hover:no-underline transition-all duration-200 hover:ml-1 rounded-md p-3 capitalize font-medium navEffect",
          {
            "font-semibold ml-2 bg-gradient-to-b text-white": path === href,
            "text-end": locale === "ar",
          }
        )}
        onClick={onClick}
      >
        {title}
      </Link>
    </li>
  );
});

ListItem.displayName = "ListItem";

export const SearchBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = React.useState("");
  const router = useRouter();
  const locale = useLocale();
  const handleSearch = () => {
    if (!title.trim()) return;
    router.push(`/courses/SearchResult?code=${encodeURIComponent(title)}`);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" role="combobox" aria-expanded={open}>
          <Image src="/icons/search.svg" height={24} width={24} alt="search" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] ml-8 mt-8 p-4 rounded-xl bg-gray-600 shadow-lg">
        <Command>
          <div className="flex items-center bg-gray-600">
            <Image
              src="/icons/search.svg"
              height={24}
              width={24}
              alt="search"
              className="mr-2 p-2 size-8 cursor-pointer"
              onClick={() => handleSearch()}
            />
            <input
              placeholder={
                locale == "en"
                  ? "Search by course code  ..."
                  : "ابحث باستخدام الكود الخاص بالكورس"
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-600 outline-none placeholder:text-gray-100 text-white"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Add displayName to resolve the ESLint warning
SearchBar.displayName = "SearchBar";

export default Navbar;
