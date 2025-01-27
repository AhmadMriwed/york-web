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
import { Command, CommandInput } from "@/components/ui/command";
import TopBar from "./Topbar";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { Category, Venue } from "@/types/rootTypes/rootTypes";
import { fetchCategories, fetchVenues } from "@/lib/action/root_action";

interface NavItem {
  title: string;
  href: string;
}

export const navItems1: NavItem[] = [
  { title: "Home", href: "/home" },
  { title: "About Us", href: "/about-us" },
];

export const navItems2: NavItem[] = [
  { title: "Certificates", href: "/certificates" },
  { title: "Training Plan", href: "/training-plan" },
  { title: "Contact Us", href: "/contact-us" },
];

const navItems = [...navItems1, ...navItems2];

export function Navbar(): JSX.Element {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [venues, setVenues] = React.useState<Venue[]>([]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
      const venues = await fetchVenues();
      setVenues(venues);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TopBar />
      <NavigationMenu
        className={cn(
          "px-16 fixed  min-w-full z-[1000] py-2 bg-[#13181e] bg-opacity-90 md:p-3 flex justify-between items-center shadow-md w-full transition-all duration-400",
          {
            "bg-[#13181e] bg-opacity-90 top-0": isScrolled,
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
        <Link href="/" className="ml-[22%] md:m-0">
          <Image
            src="/logo.png"
            height={82}
            width={82}
            className="size-16 md:size-20"
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
  return (
    <li>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block text-sm hover:text-primary-color1 hover:font-semibold no-underline hover:no-underline transition-all duration-200 hover:ml-1 rounded-md p-2 capitalize font-medium",
          {
            "text-primary-color1 font-semibold ml-2": path.startsWith(href),
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

const SearchBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button variant="ghost" role="combobox" aria-expanded={open}>
        <Image src="/icons/search.svg" height={24} width={24} alt="search" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[300px] mt-4 p-2 rounded-lg bg-transparent">
      <Command>
        <CommandInput placeholder="Search ..." />
      </Command>
    </PopoverContent>
  </Popover>
);

// Add displayName to resolve the ESLint warning
SearchBar.displayName = "SearchBar";

export default Navbar;
