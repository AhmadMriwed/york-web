import React from "react";
import photo from "../../../public/avatar.png";
import Image from "next/image";

export default function Reply() {
   const text: string =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit";
   return (
      <div className="bg-[#cfcfcf] rounded-[10px] py-3 px-3 mb-2">
         <div className="flex justify-between items-center flex-wrap gap-y-2  gap-2 ">
            <div className="flex items-center gap-2">
               <Image
                  src={photo}
                  alt="photo"
                  width={25}
                  height={25}
                  className="rounded-[50%]"
               />
               <div>
                  <p className="font-bold m-0 text-[14px] text-black">
                     Dalila Ouldcott
                  </p>
                  <p className="text-[#555] font-normal text-[12px] m-0 lowercase">
                     dalidaOuldcott@gmail.com
                  </p>
               </div>
            </div>
            <p className="text-black">09:58 AM</p>
         </div>
         <p className="text-black">{text.slice(0, 100) + " ..."}</p>
      </div>
   );
}
