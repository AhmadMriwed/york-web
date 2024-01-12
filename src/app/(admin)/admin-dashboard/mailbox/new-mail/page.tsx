import NewEmailRequest from "@/components/mailbox/NewEmailRequest";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";

export default function NewMail() {
   return (
      <main className="py-7 px-5 sm:px-8 relative">
         <header className="flex justify-between items-center flex-wrap gap-x-2 gap-y-7">
            <div className="flex gap-5">
               <IoArrowBackSharp
                  style={{
                     marginTop: "14px",
                     fontSize: "28px",
                     color: "var(--primary-color1)",
                  }}
               />
               <div>
                  <p className="text-[var(--primary-color1)] text-[28px] font-bold">
                     New Request
                  </p>
                  <p className="m-0">Schedule all mails in one place</p>
               </div>
            </div>
            <Link
               href={"/new-mail"}
               className="element-center gap-7 py-2 px-3 w-[150px] rounded-[4px] text-[18px] text-white bg-[var(--primary-color1)]"
            >
               Send
            </Link>
         </header>
         <NewEmailRequest />
      </main>
   );
}
