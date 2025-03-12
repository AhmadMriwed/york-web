import Image from "next/image";
import Link from "next/link";
import { BsLinkedin, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import Switcher from "../review/Switcher";

export default function TopBar() {
  const icons = [
    {
      url: "https://www.facebook.com/yorkbretishacademy/",
      type: "https://www.facebook.com/yorkbretishacademy",
    },
    {
      url: "https://wa.me/447520619292",
      type: "https://api.whatsapp.com/send/?phone=447520619292&text&type=phone_number&app_absent=0",
    },
    {
      url: "https://www.youtube.com/channel/UCMfucRm8mVpNQipjSEpXWbA",
      type: "www.youtube.com/@yorkacademy4212",
    },
    {
      url: "https://www.linkedin.com/company/york-british-academy/mycompany/?viewAsMember=true",
      type: "https://www.linkedin.com/company/york-british-academy",
    },
  ];

  return (
    <div className=" bg-[#0b2426] opacity-100 z-50 text-white py-4  md:block relative">
      <div className="container mx-auto px-4 w-full flex items-center justify-between ">
        {/* Contact Info */}
        <div className="flex  space-x-6 text-sm  w-fit">
          <div className="flex items-center space-x-2 text-primary-color2">
            <Image src={"/icons/mail.svg"} width={16} height={16} alt="email" />
            <span className="text-xs max-w-24 truncate md:text-base">
              info@yorkbritishacademy.uk
            </span>
          </div>

          <div className="flex items-center space-x-2 text-primary-color2 ">
            <Image
              src={"/icons/phone.svg"}
              width={16}
              height={16}
              alt="email"
            />
            <span className="text-xs max-w-24  md:text-base w-28 md:w-fit truncate">
              +442087209292 / +447520619292
            </span>
          </div>
          <div className="hidden md:block">
            <ul className="flex gap-4 items-center w-fit mx-auto mt-1 ">
              {icons.map((icon) => (
                <Link href={icon.url || ""} key={icon.url}>
                  <li className=" group  transition-all  duration-100 justify-center text-white">
                    {icon.type.includes("facebook") ? (
                      <FaFacebook className="text-primary-color1" />
                    ) : icon.type.includes("whatsapp") ? (
                      <BsWhatsapp className="text-primary-color1" />
                    ) : icon.type.includes("linkedin") ? (
                      <BsLinkedin className="text-primary-color1" />
                    ) : icon.type.includes("youtube") ? (
                      <BsYoutube className=" text-primary-color1" />
                    ) : null}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <Switcher />
      </div>
    </div>
  );
}
