import {
  fetchContactUsIcons,
  fetchFooterDetails,
  fetchFooterIcons,
} from "@/lib/action/root_action";
import {
  ContactUs,
  FooterDetails,
  FooterIcons,
} from "@/types/rootTypes/rootTypes";

import { LinkIcon, Map, MapPinHouseIcon, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsLinkedin, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { address } from "@/utils/user/home/homePageEnums";

const Footer = async () => {
  let icons: FooterIcons[] = [];
  let footerData: any[] = [];

  const cookieStore = cookies();
  const language = cookieStore.get("language")?.value || "en";
  const t = await getTranslations("Footer");

  try {
    const data = await fetchFooterDetails(language);
    footerData = data;
    const data2 = await fetchFooterIcons(language);
    icons = data2;
  } catch (error) {
    console.error("Error fetching footer data:", error);
  }

  const email = footerData.find((item) => item.type === "email")?.content;
  const address = footerData.find((item) => item.type === "address")?.content;
  const phones = footerData.filter((item) => item.type === "phone");
  const description = footerData.find(
    (item) => item.section === "about"
  )?.content;
  const copyright = footerData.find(
    (item) => item.type === "copy_right"
  )?.content;

  const links: address[] = [
    {
      id: 1,
      title: language == "ar" ? "الرئيسية" : "Home",
      url: `/${language}/home`,
    },
    {
      id: 2,
      title: language == "ar" ? "معلومات عنا" : "About Us",
      url: `/${language}/about-us`,
    },
    {
      id: 3,
      title: language == "ar" ? "تواصل معنا " : "Contact Us",
      url: `/${language}/contact-us`,
    },
  ];

  return (
    <footer className="home-footer-bg px-[30px] md:px-[80px] py-[30px] flex items-center justify-around gap-x-[30px] gap-y-[20px] flex-wrap">
      <div className="w-full h-full absolute top-0 left-0 bg-[#13181ec7]" />

      <div className="flex items-center justify-between w-full mb-16 gap-8 flex-wrap">
        {/* Logo and Description */}
        <div className="text-center flex items-center gap-8 flex-col relative md:w-[30%]">
          <Image src={"/logo.png"} alt="Logo" width={240} height={240} />
          <h1 className="text-white leading-8">{description}</h1>
        </div>

        {/* Address */}
        <div className="text-white relative w-full  md:w-[30%]">
          <h3 className="font-bold text-[24px] text-center uppercase">
            {t("title")}
          </h3>
          <div className="mt-[10px]">
            <h1 className="text-white text-center leading-6 mb-6">
              {t("paragraph")}
            </h1>
            <div
              className={cn(
                "flex items-center gap-4",
                language === "ar" && " flex-row-reverse "
              )}
            >
              <MapPinHouseIcon className="text-gray-300" />
              <div>
                <p
                  className={cn(
                    "-mb-1 text-lg",
                    language == "ar" && "text-end"
                  )}
                >
                  {t("icons.office")}
                </p>
                <p className="text-white mt-2">{address}</p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center gap-4",
                language === "ar" && " flex-row-reverse "
              )}
            >
              <MdEmail className="text-gray-300 size-6" />
              <div>
                <p
                  className={cn(
                    "-mb-1 mt-2 text-lg",
                    language == "ar" && "text-end"
                  )}
                >
                  {t("icons.email")}{" "}
                </p>
                <p className="text-white mt-2">{email}</p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center gap-4",
                language === "ar" && " flex-row-reverse "
              )}
            >
              <PhoneCall className="text-gray-300 size-6" />
              <div>
                <p
                  className={cn(
                    "-mb-1 mt-2 text-lg",
                    language == "ar" && "text-end"
                  )}
                >
                  {t("icons.phone")}
                </p>
                {phones?.map((phone, index) => (
                  <p key={index} className="text-white mt-2">
                    {phone.title}: {phone.content}
                  </p>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "flex items-center gap-4",
                language === "ar" && " flex-row-reverse "
              )}
            >
              <LinkIcon className="text-gray-300 size-6" />
              <div>
                <p
                  className={cn(
                    "-mb-1 mt-4 text-lg",
                    language == "ar" && "text-end"
                  )}
                >
                  {t("icons.website")}
                </p>
                <a
                  href="https://www.yorkbritishacademy.uk"
                  className="text-primary-color1 mt-4 text-base hover:underline"
                >
                  www.yorkbritishacademy.uk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-white relative w-full md:w-[25%] md:mb-40">
          <h3 className="font-bold text-[24px] capitalize text-center">
            {language == "ar" ? ": روابط مباشرة" : "Quick Links : "}
          </h3>
          <ul
            className={`list-disc mt-[10px] ${
              language === "ar" ? "mr-4" : "ml-4"
            }`}
            style={{ direction: language === "ar" ? "rtl" : "ltr" }}
          >
            {links?.map((link) => (
              <li
                key={link.id}
                className="mt-[3px] cursor-pointer hover:translate-x-1 hover:text-primary-color2 transition-all duration-300"
              >
                <Link
                  href={link.url}
                  className="hover:no-underline hover:text-primary-color2 no-underline text-white"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* icons */}
      <div className="w-[100vw] h-18 text-center">
        <ul className="flex gap-4 items-center w-fit mx-auto">
          {icons?.map((icon) => (
            <Link href={icon.url || ""} key={icon.url}>
              <li className="h-12 w-12 group rounded-full border transition-all hover:border-primary-color2 duration-100 flex items-center justify-center text-white">
                {icon.type.type.includes("facebook") ? (
                  <FaFacebook className="group-hover:text-primary-color2" />
                ) : icon.type.type.includes("whatsapp") ? (
                  <BsWhatsapp className="group-hover:text-primary-color2" />
                ) : icon.type.type.includes("linkedin") ? (
                  <BsLinkedin className="group-hover:text-primary-color2" />
                ) : icon.type.type.includes("youtube") ? (
                  <BsYoutube className="group-hover:text-primary-color2" />
                ) : null}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* copyright */}
      <div className="border-t-gray-50 p-8 w-full">
        <p className="text-white font-semibold">{copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
