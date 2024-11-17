import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className=" bg-[#0b2426] opacity-100 z-50 text-white py-4  md:block relative">
      <div className="container mx-auto px-4 w-full">
        {/* Contact Info */}
        <div className="flex  space-x-6 text-sm ml-auto w-fit">
          <div className="flex items-center space-x-2 text-primary-color2">
            <Image src={"/icons/mail.svg"} width={16} height={16} alt="email" />
            <span className="text-xs md:text-base">
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
            <span className="text-xs md:text-base">
              +442087209292 / +447520619292
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
