"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import photo from "../../../../../public/avatar.png";
import { LuFiles } from "react-icons/lu";
import { MdOutgoingMail } from "react-icons/md";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { RiFolderDownloadFill } from "react-icons/ri";
import Link from "next/link";
import HeaderMail from "@/components/mailbox/HeaderMail";

const AdminMailbox = () => {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const [isOutgoingMail, setIsOutgoingMail] = useState(true);
   const [isReceivedgMail, setIsReceivedMail] = useState(false);

   const handleReceivedMail = () => {
      if (!isReceivedgMail) {
         setIsReceivedMail(true);
         setIsOutgoingMail(false);
      }
   };
   const handleOutgoingMail = () => {
      if (!isOutgoingMail) {
         setIsReceivedMail(false);
         setIsOutgoingMail(true);
      }
   };

   const data = [
      {
         id: "1",
         name: "Dalila Ouldcott",
         email: "dalidaOuldcott@gmail.com",
         subject: "User friendly value added application",
         description: "User friendly value added application",
         requestType: "file upload",
         replyNumber: 2,
         fileNumber: "3 files",
         date: "09:58 AM",
      },
      {
         id: "2",
         name: "Dalila Ouldcott",
         email: "dalidaOuldcott@gmail.com",
         subject: "User friendly value added application",
         description: "User friendly value added application",
         fileNumber: "3 files",
         date: "09:58 AM",
      },
      {
         id: "3",
         name: "Dalila Ouldcott",
         email: "dalidaOuldcott@gmail.com",
         subject: "User friendly value added application",
         description: "User friendly value added application",
         requestType: "file upload",
         replyNumber: 1,
         fileNumber: "3 files",
         date: "5 Sep 2024",
      },
   ];

   const columns: any = [
      {
         onclick: () => {
            console.log("onclick");
         },
         selector: (row: any): any => (
            <div className="flex justify-between items-center gap-5 basis-full flex-wrap">
               <div className="flex items-center gap-2">
                  <Image
                     src={photo}
                     alt="photo"
                     width={30}
                     height={30}
                     className="rounded-[50%]"
                  />
                  <div>
                     <p className="font-bold m-0 text-[15px]">{row.name}</p>
                     <p className="text-[#555] font-normal text-[12px] m-0 lowercase">
                        {row.email}
                     </p>
                  </div>
               </div>
               <div className="min-w-fit w-[300px]">
                  <p className="font-bold m-0 text-[15px]">{row.subject}</p>
                  <p className="text-[#555] font-normal text-[12px] m-0 lowercase">
                     {row.description}
                  </p>
                  {row.replyNumber > 0 && (
                     <p className="text-[var(--primary-color2)]  text-[12px] m-0">
                        {row.requestType}
                        <span className="ms-2 cursor-pointer">
                           {" "}
                           {row.replyNumber} reply
                        </span>{" "}
                     </p>
                  )}
               </div>{" "}
               <div className="flex items-center gap-6 w-[200px] ">
                  <div>
                     <LuFiles
                        style={{
                           color: "var(--primary-color2)",
                           fontSize: "20px",
                           margin: "0px auto",
                        }}
                     />
                     <p className="text-[14px] text-[var(--primary-color2)] mt-[3px]">
                        {row.fileNumber}
                     </p>
                  </div>
                  <p className="text-[#555] font-normal text-[14px]">
                     {row.date}
                  </p>
               </div>
            </div>
         ),
         wrap: true,
         width: "100%",
         maxWidth: "none",
         grow: "1",
      },
   ];

   const customStyles: any = {
      rows: {
         style: {
            backgroundColor: mode === "dark" ? "#dadee7" : "white",
            borderColor: "#777",
            paddingBlock: "10px",
            flexWrap: "wrap",
            gap: "20px",
            padding: "10px",
         },
      },
      columns: {
         style: {
            minWidth: "fitContent",
         },
      },
      cells: {
         style: {
            padding: "0px 5px",
            paddingInlineEnd: "10px",
            minWidth: "fit-content !important",
            fontSize: "16px",
            width: "100%",
         },
      },
   };

   return (
      <main className="py-8 px-5 sm:px-8 overflow-x-auto max-w-full">
         <header className="flex justify-between items-center flex-wrap gap-2">
            <HeaderMail title="Mailbox">
               <Link
                  href={"/admin-dashboard/mailbox/new-mail"}
                  className="flex justify- items-center gap-7 py-1 px-5 w-[210px] rounded-[4px] text-[16px] text-white bg-[var(--primary-color1)]"
               >
                  <span className="text-[22px]">+</span>Create New
               </Link>
            </HeaderMail>
         </header>
         <div className="flex items-center gap-2 mt-5 flex-wrap">
            <button
               className={`element-center gap-2 p-3 rounded-lg text-[16px] text-white transition-all duration-200 ${
                  isOutgoingMail ? "bg-[var(--primary-color2)]" : "bg-btnColor"
               } `}
               onClick={handleOutgoingMail}
            >
               <MdOutgoingMail
                  style={{
                     color: `${
                        isOutgoingMail ? "white" : "var(--primary-color2)"
                     } `,
                     fontSize: "20px",
                     margin: "0px auto",
                  }}
               />{" "}
               Outgoing Orders (138)
            </button>
            <button
               className={`element-center gap-2 p-3 rounded-lg text-[16px] text-white transition-all duration-200 ${
                  isReceivedgMail ? "bg-[var(--primary-color2)]" : "bg-btnColor"
               } `}
               onClick={handleReceivedMail}
            >
               <RiFolderDownloadFill
                  style={{
                     color: `${
                        isReceivedgMail ? "white" : "var(--primary-color2)"
                     } `,
                     fontSize: "20px",
                     margin: "0px auto",
                  }}
               />{" "}
               Requests Received (57)
            </button>
         </div>
         <div
            className={`pt-[20px] pr-[40px] ps-2 rounded-[0px_40px_0px_0px] relative mt-[38px] ${
               mode === "dark" ? "bg-light" : "bg-white"
            }`}
         >
            <span className="w-[50%] h-[38px] absolute top-0 left-0 translate-y-[-100%] bg-inherit rounded-[0px_20px_0px_0px]" />
            <DataTable
               columns={columns}
               data={data}
               customStyles={customStyles}
               noHeader
               noTableHead
               className="capitalize !rounded-none [&>div>div>div>div>div>div]:!basis-full"
               responsive
            />
         </div>
      </main>
   );
};

export default AdminMailbox;
