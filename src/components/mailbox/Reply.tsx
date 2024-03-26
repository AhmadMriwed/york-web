import React from "react";
import photo from "../../../public/avatar.png";
import Image from "next/image";
import { ReplyType } from "@/types/adminTypes/mailbox/mailboxTypes";

export default function Reply({ reply }: { reply: ReplyType }) {
   // const text: string =
   //    "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit";

   return (
      <div className="bg-[#cfcfcf] rounded-[10px] py-3 px-3 mb-2">
         <div className="flex justify-between items-center flex-wrap gap-y-2  gap-2 ">
            <div className="mb-1">
               <p className="font-bold m-0 text-[14px] text-black">
                  {reply.send_user && "no name"}
               </p>
               <p className="text-[#555] font-normal text-[12px] m-0 lowercase">
                  dalidaOuldcott@gmail.com
               </p>
            </div>
            <p className="text-black">{reply.show_date}</p>
         </div>
         <p className="text-black">{reply.title} </p>
         <p className="text-black">
            {reply.sub_title && reply.sub_title.length > 99
               ? reply.sub_title?.slice(0, 100) + " ..."
               : reply.sub_title}
         </p>
      </div>
   );
}
