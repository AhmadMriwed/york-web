import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { title: "Home", href: "/", active: pathname.startsWith("/home") },
      {
        title: "About Us",
        href: "/about-us",
        active: pathname.startsWith("/about-us"),
      },
      {
        title: "Certificates",
        href: "/certificates",
        active: pathname.startsWith("/certificates"),
      },
      {
        title: "Training Plan",
        href: "/training-plan",
        active: pathname.startsWith("/training-plan"),
      },
      {
        title: "Contact Us",
        href: "/contact-us",
        active: pathname.startsWith("/contact-us"),
      },
      {
        title: "Categories",
        href: "#categories",
        active: pathname.startsWith("/categories"),
      },
      {
        title: "Venues",
        href: "#venues",
        active: pathname.startsWith("venues"),
      },
    ],
    [pathname]
  );
  return links;
};
