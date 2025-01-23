import { address, addresses, links } from "@/utils/user/home/homePageEnums";
import Image from "next/image";
import React from "react";

type Props = {};

const Footer = () => {
  return (
    <footer className="home-footer-bg   px-[30px] md:px-[80px] py-[30px] flex items-center gap-x-[40px] gap-y-[20px] flex-wrap">
      <div className="w-full h-full absolute top-0 left-0  bg-[#13181ec7] text-center bg-blue-400" />
      <div className=" w-full text-center md:w-[400px]  max-w-[calc(100%_-_60px)] flex items-center gap-3 flex-col relative mx-auto">
        <Image src={"/logo.png"} alt="Logo" width={130} height={130} />
        <p className="text-[#ddd]">
          The York Academy is currently pursuing an ambitious vision of
          transforming the integration of metacognitive and self-questioning
          strategies into developing thinking skills, retaining the impact of
          learning and training, and raising the quality level of confidence.
        </p>
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
    </footer>
  );
};

export default Footer;
