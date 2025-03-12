"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ListItem } from "./Navbar";
import { Category, Venue } from "@/types/rootTypes/rootTypes";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";

/* Dropdown Section for Desktop Menu */
const DropdownSection = ({
  title,
  items,
  basePath,
}: {
  title: string;
  items: Venue[] | Category[];
  basePath: string;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="uppercase text-xs font-semibold text-white">
      {title}
    </NavigationMenuTrigger>
    <NavigationMenuContent className="p-4">
      <ul className="flex flex-col my-auto overflow-y-scroll p-1 max-h-[400px] md:w-[300px]">
        {items.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            href={`${basePath}/${item.id}`}
          />
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

interface NavItem {
  title: string;
  href: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
  categories: Category[];
  venues: Venue[];
}

export default function DesktopNav({
  navItems,
  categories,
  venues,
}: DesktopNavProps) {
  const path = usePathname();
  const locale = useLocale();
  return (
    <NavigationMenuList className="space-x-6 hidden md:flex">
      {navItems.map((item) => (
        <NavigationMenuItem key={item.title}>
          <Link href={`/${locale}/${item.href}`} legacyBehavior>
            <NavigationMenuLink
              className={cn(
                `text-white hover:no-underline cursor-pointer ${
                  path.startsWith(item.href) ? "text-primary-color1" : ""
                }`,
                navigationMenuTriggerStyle()
              )}
            >
              {item.title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}

      {/* Dropdowns for Categories and Venues */}
      {categories.length > 0 && (
        <DropdownSection
          title={locale === "en" ? "Categories" : "الفئات"}
          items={categories}
          basePath={`/${locale}/categories`}
        />
      )}
      {venues.length > 0 && (
        <DropdownSection
          title={locale === "en" ? "Venues" : "المدن"}
          items={venues}
          basePath={`/${locale}/venues`}
        />
      )}
    </NavigationMenuList>
  );
}
