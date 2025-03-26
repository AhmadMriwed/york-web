// // import {
// //   fetchContactUsIcons,
// //   fetchFooterDetails,
// //   fetchFooterIcons,
// // } from "@/lib/action/root_action";
// // import {
// //   ContactUs,
// //   FooterDetails,
// //   FooterIcons,
// // } from "@/types/rootTypes/rootTypes";

// // import { LinkIcon, Map, MapPinHouseIcon, PhoneCall } from "lucide-react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { BsLinkedin, BsWhatsapp, BsYoutube } from "react-icons/bs";
// // import { FaFacebook } from "react-icons/fa";
// // import { MdEmail } from "react-icons/md";
// // import { cookies } from "next/headers";
// // import { getTranslations } from "next-intl/server";
// // import { cn } from "@/lib/utils";
// // import { address } from "@/utils/user/home/homePageEnums";

// // const Footer = async () => {
// //   let icons: FooterIcons[] = [];
// //   let footerData: any[] = [];

// //   const cookieStore = cookies();
// //   const language = cookieStore.get("language")?.value || "en";
// //   const t = await getTranslations("Footer");

// //   try {
// //     const data = await fetchFooterDetails(language);
// //     footerData = data;
// //     const data2 = await fetchFooterIcons(language);
// //     icons = data2;
// //   } catch (error) {
// //     console.error("Error fetching footer data:", error);
// //   }

// //   const email = footerData.find((item) => item.type === "email")?.content;
// //   const address = footerData.find((item) => item.type === "address")?.content;
// //   const phones = footerData.filter((item) => item.type === "phone");
// //   const description = footerData.find(
// //     (item) => item.section === "about"
// //   )?.content;
// //   const copyright = footerData.find(
// //     (item) => item.type === "copy_right"
// //   )?.content;

// //   const links: address[] = [
// //     {
// //       id: 1,
// //       title: language == "ar" ? "الرئيسية" : "Home",
// //       url: `/${language}/home`,
// //     },
// //     {
// //       id: 2,
// //       title: language == "ar" ? "معلومات عنا" : "About Us",
// //       url: `/${language}/about-us`,
// //     },
// //     {
// //       id: 3,
// //       title: language == "ar" ? "تواصل معنا " : "Contact Us",
// //       url: `/${language}/contact-us`,
// //     },
// //   ];

// //   return (
// //     <footer className="home-footer-bg fixed bottom-0 w-full mx-auto px-[30px] md:px-[80px] py-[30px] flex flex-col gap-y-8 ">
// //       <div className="w-full h-full absolute top-0 left-0 bg-[#13181ec7]" />
// //       <div className="flex items-start justify-around md:flex-row flex-col gap-y-4 px-2">
// //         {/* Logo and Description */}
// //         <div className="text-center flex items-center md:-mt-12 gap-2 flex-col relative md:w-[30%]">
// //           <Image src={"/logo.png"} alt="Logo" width={240} height={240} />
// //           <h1 className="text-white leading-8">{description}</h1>
// //         </div>

// //         {/* Address */}
// //         <div className="text-white relative w-full  md:w-[30%]">
// //           <h3 className="font-bold text-[24px] text-center uppercase">
// //             {t("title")}
// //           </h3>
// //           <div className="mt-[10px]">
// //             <h1 className="text-white text-center leading-6 mb-6">
// //               {t("paragraph")}
// //             </h1>
// //             <div className={cn("flex items-center gap-4")}>
// //               <MapPinHouseIcon className="text-gray-300" />
// //               <div>
// //                 <p className={cn("-mb-1 text-lg")}>{t("icons.office")}</p>
// //                 <p className="text-white mt-2">{address}</p>
// //               </div>
// //             </div>

// //             <div className={cn("flex items-center gap-4")}>
// //               <MdEmail className="text-gray-300 size-6" />
// //               <div>
// //                 <p className={cn("-mb-1 mt-2 text-lg")}>{t("icons.email")} </p>
// //                 <p className="text-white mt-2">{email}</p>
// //               </div>
// //             </div>

// //             <div className={cn("flex items-center gap-4")}>
// //               <PhoneCall className="text-gray-300 size-6" />
// //               <div>
// //                 <p className={cn("-mb-1 mt-2 text-lg")}>{t("icons.phone")}</p>
// //                 {phones?.map((phone, index) => (
// //                   <p key={index} className="text-white mt-2">
// //                     {phone.title}: {phone.content}
// //                   </p>
// //                 ))}
// //               </div>
// //             </div>
// //             <div className={cn("flex items-center gap-4")}>
// //               <LinkIcon className="text-gray-300 size-6" />
// //               <div>
// //                 <p className={cn("-mb-1 mt-4 text-lg")}>{t("icons.website")}</p>
// //                 <a
// //                   href="https:www.yorkbritishacademy.uk"
// //                   className="text-primary-color1 mt-4 text-base hover:underline"
// //                 >
// //                   www.yorkbritishacademy.uk
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* quick links  */}
// //         <div className="text-white relative w-full md:w-[25%] md:mb-40">
// //           <h3 className="font-bold text-[24px] capitalize ">
// //             {language == "ar" ? " روابط مباشرة :" : "Quick Links : "}
// //           </h3>
// //           <ul className={`list-disc mt-[10px] `}>
// //             {links?.map((link) => (
// //               <li
// //                 key={link.id}
// //                 className="mt-[3px] cursor-pointer hover:translate-x-1 hover:text-primary-color2 transition-all duration-300"
// //               >
// //                 <Link
// //                   href={link.url}
// //                   className="hover:no-underline hover:text-primary-color2 no-underline text-white"
// //                 >
// //                   {link.title}
// //                 </Link>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>

// //       {/* icons */}
// //       <div className="w-fit mx-auto h-18 text-center">
// //         <ul className="flex gap-4 items-center w-fit mx-auto">
// //           {icons?.map((icon) => (
// //             <Link href={icon.url || ""} key={icon.url}>
// //               <li className="h-12 w-12 group rounded-full border transition-all hover:border-primary-color2 duration-100 flex items-center justify-center text-white">
// //                 {icon.type.type.includes("facebook") ? (
// //                   <FaFacebook className="group-hover:text-primary-color2" />
// //                 ) : icon.type.type.includes("whatsapp") ? (
// //                   <BsWhatsapp className="group-hover:text-primary-color2" />
// //                 ) : icon.type.type.includes("linkedin") ? (
// //                   <BsLinkedin className="group-hover:text-primary-color2" />
// //                 ) : icon.type.type.includes("youtube") ? (
// //                   <BsYoutube className="group-hover:text-primary-color2" />
// //                 ) : null}
// //               </li>
// //             </Link>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* copyright */}
// //       <div className="border-t-gray-500 border-t-1 p-8 w-full">
// //         <p className="text-white font-semibold">{copyright}</p>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

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
            <div className="text-center flex items-center md:-mt-12 gap-2 flex-col relative md:w-[80%]">
              <Image src={"/logo.png"} alt="Logo" width={340} height={340} />
              <p className="text-white leading-8 w-full">{description}</p>
            </div>
          </div>

          <div className="space-y-4 ">
            <h3 className="text-xl font-bold my-5 uppercase">
              York britch academys
            </h3>
            <div className="space-y-2">
              <p className="text-white">Company: YORK BRITISH ACADEMY LTD</p>
              <p className="text-white">Street: 27 Old Gloucester Street </p>
              <p className="text-white">City: LONDON </p>
              <p className="text-white">Postcode: WC1N 3AX </p>
              <p className="text-white">D-U-N-S® Number: 225232758</p>
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

          <p className=" text-center md:text-right">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
