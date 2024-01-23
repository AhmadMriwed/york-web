"use client";
import { MdReplyAll } from "react-icons/md";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import HeaderMail from "@/components/mailbox/HeaderMail";
import Image from "next/image";
import { useContext, useState } from "react";
import photo from "../../../../../../public/avatar.png";
import Reply from "@/components/mailbox/Reply";
import Link from "next/link";
import { RiFolderDownloadFill } from "react-icons/ri";
import FilesMenue from "@/components/mailbox/FilesMenue";

export default function Preview() {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const data = { sendTo: "Dalila Ouldcott", requestType: "request type" };
   const [open, setOpen] = useState(false);

   return (
      <main className="py-5 px-5 sm:px-8">
         <header className="flex justify-between items-center flex-wrap gap-2">
            <HeaderMail title="Preview Request">
               <Link
                  className="flex justify- items-center gap-7 py-1 px-5 w-[210px] rounded-[4px] text-[16px] text-white bg-[var(--primary-color1)]"
                  href={{
                     pathname: "/admin-dashboard/mailbox/new-reply",
                     query: data,
                  }}
               >
                  <span className="text-[22px]">+</span>Create A Reply
               </Link>
            </HeaderMail>
         </header>
         <div
            className={`mt-5 rounded-xl px-[25px] pb-[20px]
            ${mode === "dark" ? "bg-light" : "bg-white"}`}
         >
            <header className="py-4 flex justify-between items-center flex-wrap gap-y-2  gap-2  relative">
               <div className="flex items-center gap-2">
                  <Image
                     src={photo}
                     alt="photo"
                     width={40}
                     height={40}
                     className="rounded-[50%]"
                  />
                  <div>
                     <p className="font-bold m-0 text-[15px] text-black">
                        Dalila Ouldcott
                     </p>
                     <p className="text-[#555] font-normal text-[12px] m-0 lowercase">
                        dalidaOuldcott@gmail.com
                     </p>
                  </div>
               </div>
               <p className="text-black">09:58 AM</p>
               <span className="absolute bottom-0 left-[50%] translate-x-[-50%] h-[1px] w-[calc(100%_-_50px)]  bg-[#55555540]" />
            </header>
            <div className="flex gap-1 justify-between flex-wrap flex-col md:flex-row">
               <div className=" flex-1 max-w-[600px]">
                  <p className="text-black font-bold text-[20px] m-0 mt-3">
                     User friendly value added application
                  </p>
                  <p className="text-[#777] m-0">
                     User friendly value added application{" "}
                  </p>
                  <p className="mt-[20px] text-black">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
               </div>
               <div className="md:h-[200px] flex items-start md:items-center flex-col mt-4 md:mt-0 w-auto  md:px-5">
                  <p
                     className="text-[18px] font-bold mt-3 mb-4 text-[var(--primary-color1)] cursor-pointer"
                     onClick={() => setOpen(true)}
                  >
                     Attatched Fiels{" "}
                  </p>
                  <div onClick={() => setOpen(true)}>
                     <RiFolderDownloadFill
                        style={{
                           fontSize: "28px",
                           color: "var(--primary-color1)",
                           cursor: "pointer",
                        }}
                     />
                  </div>
                  <p
                     className=" text-black mt-[5px] text-[12px] cursor-pointer"
                     onClick={() => setOpen(true)}
                  >
                     3 files (75 MB)
                  </p>
               </div>
               <FilesMenue open={open} setOpen={setOpen} />
            </div>

            <div>
               <div className="cursor-pointer">
                  <p className="text-[var(--primary-color2)] text-[18px] flex gap-3 items-center my-2">
                     <MdReplyAll
                        style={{
                           fontSize: "20px",
                           color: "var(--primary-color2)",
                           cursor: "pointer",
                        }}
                     />
                     Replies :
                  </p>
               </div>
               <div className="max-w-[600px] max-h-[125px] overflow-y-auto pe-3 ">
                  <Reply />
                  <Reply />
                  <Reply />
                  <Reply />
               </div>
            </div>
         </div>
      </main>
   );
}
