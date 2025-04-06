import Image from "next/image";

import Switcher from "../review/Switcher";

export default function TopBar({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  return (
    <div className=" bg-[#0b2426] opacity-100 min-w-full z-50 text-white py-4  md:block relative">
      <div className="container mx-auto px-4 w-full flex items-center justify-between ">
        {/* Contact Info */}
        <div className="flex  space-x-6 text-sm  w-fit">
          <div className="flex items-center space-x-2 text-white">
            <Image src={"/icons/mail.svg"} width={16} height={16} alt="email" />
            <span className="text-xs max-w-24 md:max-w-full truncate md:text-base">
              <div dangerouslySetInnerHTML={{ __html: email }} />
            </span>
          </div>

          <div className="flex items-center space-x-2 text-white ">
            <Image
              src={"/icons/phone.svg"}
              width={16}
              height={16}
              alt="email"
            />
            <span className="text-xs max-w-24 md:max-w-full  md:text-base w-28 md:w-fit truncate">
              <div dangerouslySetInnerHTML={{ __html: phone }} />
            </span>
          </div>
        </div>
        <Switcher />
      </div>
    </div>
  );
}
