"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { IoArrowBackSharp } from "react-icons/io5";

export default function HeaderMail({
   children,
   title,
}: {
   title: string;
   children?: ReactNode;
}) {
   const router = useRouter();
   return (
      <>
         <div className="flex gap-5">
            <IoArrowBackSharp
               style={{
                  marginTop: "14px",
                  fontSize: "28px",
                  color: "var(--primary-color1)",
                  cursor: "pointer",
               }}
               onClick={() => router.back()}
            />
            <div>
               <p className="text-[var(--primary-color1)] text-[28px] font-bold">
                  {title}
               </p>
               <p className="m-0">Schedule all mails in one place</p>
            </div>
         </div>
         {children}
      </>
   );
}
