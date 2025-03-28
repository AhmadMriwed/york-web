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
import SubscribeForm from "../forms/SubscribeForm";

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

  const policyLinks = [
    { title: "Wellness Policy", url: "#" },
    { title: "Privacy & Disclaimer", url: "#" },
    { title: "Terms & Conditions of Registration", url: "#" },
    { title: "Cancellation Policy", url: "#" },
  ];

  return (
    <footer className="home-footer-bg text-white w-full mx-auto px-[30px] md:px-[80px] py-[50px]">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Information - Left Column */}
          <div className="space-y-4">
            <div className="text-center flex items-center md:-mt-12 flex-col relative md:w-[80%]">
              <Image src={"/logo.png"} alt="Logo" width={280} height={280} />
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>

          <div className="space-y-4 ">
            <h3 className="text-xl font-bold my-5 uppercase">York academy</h3>
            <div className="space-y-2">
              <p className="text-white">Company: YORK ACADEMY LTD</p>
            </div>
          </div>

          {/* Newsletter and Quick Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Subscribe to our Newsletter
              </h3>
              <SubscribeForm />
            </div>
          </div>

          {/* About and Policies */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">
                {language == "ar" ? " روابط مباشرة :" : "Quick Links : "}
              </h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-white hover:text-blue-600 transition"
                    >
                      &gt; {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">POLICIES</h3>
              <ul className="space-y-2">
                {policyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-white hover:text-blue-600 transition"
                    >
                      &gt; {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social media and copyright */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {icons?.map((icon) => (
              <Link href={icon.url || ""} key={icon.url}>
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary-color1 hover:text-white transition">
                  {icon.type.type.includes("facebook") ? (
                    <FaFacebook className="text-xl" />
                  ) : icon.type.type.includes("whatsapp") ? (
                    <BsWhatsapp className="text-xl" />
                  ) : icon.type.type.includes("linkedin") ? (
                    <BsLinkedin className="text-xl" />
                  ) : icon.type.type.includes("youtube") ? (
                    <BsYoutube className="text-xl" />
                  ) : null}
                </div>
              </Link>
            ))}
          </div>

          <div
            className=" text-center md:text-right"
            dangerouslySetInnerHTML={{ __html: copyright }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
