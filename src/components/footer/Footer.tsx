import {
  fetchContactUsDataWithId,
  fetchContactUsIcons,
} from "@/lib/action/root_action";
import { address, addresses, links } from "@/utils/user/home/homePageEnums";
import { Item } from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = async () => {
  const data = await fetchContactUsDataWithId(1);
  const icons = await fetchContactUsIcons();
  return (
    <footer className="home-footer-bg   px-[30px] md:px-[80px] py-[30px] flex items-center gap-x-[40px] gap-y-[20px] flex-wrap">
      <div className="w-full h-full absolute top-0 left-0  bg-[#13181ec7] text-center bg-blue-400" />
      <div className=" w-full text-center md:w-[400px]  max-w-[calc(100%_-_60px)] flex items-center gap-3 flex-col relative mx-auto">
        <Image src={"/logo.png"} alt="Logo" width={130} height={130} />
        <p className="text-[#ddd]">{data.content}</p>
      </div>

      <div className="text-white h-[170px] relative">
        <h3 className="font-bold text-[24px] uppercase">Address</h3>
        <ul className="list-disc ms-[18px] mt-[10px]">
          {addresses.map((address: address) => {
            return (
              <li
                key={address.id}
                className="mt-[3px] capitalize cursor-pointer hover:translate-x-1 hover:text-[var(--primary-color2)] transition-all duration-300"
              >
                {address.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="text-white h-[170px] relative ">
        <h3 className="font-bold text-[24px] capitalize">Quick links</h3>
        <ul className="list-disc ms-[18px] mt-[10px]">
          {links.map((link: address) => {
            return (
              <li
                key={link.id}
                className="mt-[3px] cursor-pointer hover:translate-x-1 hover:text-[var(--primary-color2)] transition-all duration-300"
              >
                {link.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-[100vw] h-18 text-center mt-4  ">
        <ul className="flex gap-4 items-center w-fit mx-auto ">
          {icons.map((icon) => (
            <Link href={icon.url}>
              <li className="h-12 w-12 rounded-full border transition-all hover:border-primary-color2 duration-100 flex items-center justify-center text-white">
                h
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="border-t-gray-50  p-8 w-full ">
        <p className="text-white font-semibold">
          {" "}
          © Copyright 2025. All Rights Reserved by{" "}
          <Link href={"#"} className="text-primary-color1">
            York British Academy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
