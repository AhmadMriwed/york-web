"use client";
import HeaderMail from "@/components/mailbox/HeaderMail";
import NewEmailRequest from "@/components/mailbox/NewEmailRequest";
import { useSearchParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function NewReply() {
   const searchParams = useSearchParams();
   const pathname = usePathname();

   useEffect(() => {
      const url = `${searchParams}`;
      console.log(url);
      // You can now use the current URL
      // ...
   }, [pathname, searchParams]);
   return (
      <main className="py-7 px-5 sm:px-8">
         <HeaderMail title="New Reply" />
         <NewEmailRequest role="reply" />
      </main>
   );
}
