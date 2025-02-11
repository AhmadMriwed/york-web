"use client";
import { fetchContactUsIcons } from "@/lib/action/root_action";
import { links } from "@/utils/user/home/homePageEnums";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsLinkedin, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  const [icons, setIcons] = useState<any[] | []>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchContactUsIcons();
        setIcons(data);
      } catch (error) {
        console.error("Failed to fetch contact us data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="home-footer-bg px-[30px] md:px-[80px] py-[30px] flex items-center justify-around gap-x-[30px] gap-y-[20px] flex-wrap">
      <div className="w-full h-full absolute top-0 left-0 bg-[#13181ec7]" />

      <div className="flex items-center justify-between w-full mb-16 gap-8 flex-wrap">
        {/* Logo and Description */}
        <div className="text-center flex items-center gap-8 flex-col relative md:w-[30%]">
          <Image src={"/logo.png"} alt="Logo" width={240} height={240} />
          <h1 className="text-white leading-8">
            The York British Academy is currently pursuing an ambitious vision
            of transforming the integration of metacognitive and
            self-questioning strategies into developing thinking skills,
            retaining the impact of learning and training, and raising the
            quality level of confidence.
          </h1>
        </div>

        {/* Address */}
        <div className="text-white relative w-full  md:w-[30%]">
          <h3 className="font-bold text-[24px] uppercase">Address</h3>
          <div className="mt-[10px]">
            <p className="text-white">
              YORK BRITISH ACADEMY is a limited liability company based in the
              UK.
            </p>
            <p className="text-white mt-2">
              Our mailing address is: 27 Old Gloucester Street, WC1N 3AX,
              London, United Kingdom
            </p>
            <p className="text-white mt-2">
              Email:{" "}
              <a
                href="mailto:info@yorkbritishacademy.uk"
                className="text-primary-color1 hover:underline"
              >
                info@yorkbritishacademy.uk
              </a>
            </p>
            <p className="text-white mt-2">
              Tel: +442087209292 / +447520619292
            </p>
            <p className="text-white mt-2">
              Website:{" "}
              <a
                href="https://www.yorkbritishacademy.uk"
                className="text-primary-color1 hover:underline"
              >
                www.yorkbritishacademy.uk
              </a>
            </p>
            <p className="text-white mt-2">
              Canada - Ontario | Tel & WhatsApp: +13438000033
            </p>
            <p className="text-white mt-2">
              Netherlands - Amsterdam | Tel: +3197005033557
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-white relative w-full  md:w-[25%] md:mb-40 ">
          <h3 className="font-bold text-[24px] capitalize">Quick links</h3>
          <ul className="list-disc mt-[10px] ml-4">
            {links.map((link) => (
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
        <p className="text-white font-semibold">
          © Copyright 2025. All Rights Reserved by{" "}
          <Link
            href={"#"}
            className="text-primary-color1 hover:no-underline hover:text-primary-color2"
          >
            York British Academy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
