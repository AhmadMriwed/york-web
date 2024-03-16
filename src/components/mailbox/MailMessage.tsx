import { MailType } from "@/types/adminTypes/mailbox/mailboxTypes";
import Image from "next/image";
import Link from "next/link";
import { LuFiles } from "react-icons/lu";
import dfualtImage from "../../../public/avatar.png";

export default function MailMessage({ mail }: { mail: MailType }) {
   // const row: MailType = {
   //    id: 1,
   //    request_type: "request type",
   //    send_user: {
   //       id: 1,
   //       about_me: "",
   //       account_type: "account type",
   //       email: "email@example.com",
   //       first_name: "first",
   //       last_name: "last",
   //       user_id: 100243,
   //       user_name: "user name",
   //       phone_number: "00099147645",
   //       image: "image",
   //       gender: "",
   //    },
   //    show_date: "21/2/2024  9:14 AM",
   //    sub_title:
   //       "sub title sub title sub title sub title sub title sub title sub title sub title sub title sub title ",
   //    title: "title title title title",
   //    count_filse: 2,
   //    count_replay_boxes: 4,
   //    files: [],
   //    recived_user: {
   //       id: 1,
   //       about_me: "",
   //       account_type: "account type",
   //       email: "email@example.com",
   //       first_name: "first",
   //       last_name: "last",
   //       user_id: 100243,
   //       user_name: "user name",
   //       phone_number: "00099147645",
   //       image: "image",
   //       gender: "",
   //    },
   //    replay_boxes: [],
   // };

   return (
      <Link
         className="flex items-center gap-x-2 gap-y-3 sm:gap-x-6 basis-full text-inherit hover:text-inherit flex-wrap cursor-pointer pb-3 border-[#bbb] mt-1 pt-2"
         href={{
            pathname: `/admin-dashboard/mailbox/preview-request/${mail.id}`,
            query: {
               sendTo:
                  mail.recived_user?.first_name +
                  " " +
                  mail.recived_user?.last_name,
               requestType: mail.request_type,
            },
         }}
      >
         <div className="flex  gap-4 w-[200px] ">
            <div className="min-w-[30px]">
               {mail.recived_user?.image && (
                  <Image
                     src={mail.recived_user?.image}
                     alt="photo"
                     width={30}
                     height={30}
                     className="rounded-[50%]"
                  />
               )}
            </div>

            <div>
               <p className="font-semibold m-0 text-[15px] text-inherit">
                  {mail.recived_user?.first_name +
                     " " +
                     mail.recived_user?.last_name}
               </p>
               {mail.recived_user?.email && (
                  <p className=" font-normal text-[12px] m-0 lowercase max-w-[145px] break-words text-wrap">
                     {mail.recived_user?.email}
                  </p>
               )}
            </div>
         </div>
         <div className="min-w-fit lg:w-[50%]">
            <p className="font-semibold m-0 text-[15px]">{mail.title}</p>
            <p className=" font-normal text-[12px] m-0 lowercase hidden sm:block w-[240px] lg:w-full">
               {mail.sub_title}
            </p>

            <p className="text-[var(--primary-color2)]  text-[12px] m-0">
               {mail.request_type}
               {mail.count_replay_boxes
                  ? mail.count_replay_boxes > 0 && (
                       <span className="ms-2 cursor-pointer">
                          {" "}
                          {mail.count_replay_boxes} reply
                       </span>
                    )
                  : ""}
            </p>
         </div>{" "}
         <div className="flex items-center gap-6 justify-between w-[200px] ">
            <div>
               <LuFiles
                  style={{
                     color: "var(--primary-color2)",
                     fontSize: "20px",
                     margin: "0px auto",
                  }}
               />
               <p className="text-[14px] text-center text-[var(--primary-color2)] mt-[3px]">
                  {mail.count_filse} files
               </p>
            </div>
            <p className=" font-normal text-[14px]">{mail.show_date}</p>
         </div>
      </Link>
   );
}
