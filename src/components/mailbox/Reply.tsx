import { ReplyType } from "@/types/adminTypes/mailbox/mailboxTypes";
import Image from "next/image";
import { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import FilesMenue from "./FilesMenue";

export default function Reply({ reply }: { reply: ReplyType }) {
  const [open, setOpen] = useState(false);

  console.log(reply);
  return (
    <div className="bg-[#cfcfcf] rounded-[10px] py-5 px-5 mb-5">
      <div className="flex justify-between items-center flex-wrap   mb-5 ">
        <div className=" flex gap-2 items-center">
          {reply.send_user?.image && (
            <Image
              src={reply.send_user.image}
              alt="photo"
              width={25}
              height={25}
              className="rounded-[50%]"
            />
          )}

          {reply.send_user?.first_name ? (
            <p className="font-bold m-0 text-[14px] text-black">
              {reply.send_user?.first_name + " " + reply.send_user?.last_name}
            </p>
          ) : (
            <p>no name </p>
          )}
        </div>
        <p className="text-[#555] font-normal text-[12px] m-0 lowercase">
          {reply.send_user?.email}
        </p>
      </div>

      <div className=" grid grid-cols-12   ">
        <div className=" col-span-12 sm:col-span-10 ">
          <p className="font-bold text-black text-[7.74px]  lg:text-[18px] ">{reply.title}</p>
          <p className=" text-black text-[6.68px]  lg:text-[18px] ">
            {reply.sub_title && reply.sub_title.length > 99
              ? reply.sub_title?.slice(0, 100) + " ..."
              : reply.sub_title || ""}
          </p>
        </div>
        <div
          onClick={() => setOpen(true)}
          className=" col-span-12 sm:col-span-2 sm:justify-self-end pr-5"
        >
          <MdAttachFile
            style={{
              fontSize: "28px",
              color: "var(--primary-color1)",
              cursor: "pointer",
            }}
          />

          <p
            className=" mt-[5px] text-[12px] cursor-pointer  text-black"
            onClick={() => setOpen(true)}
          >
            {reply.files.length} files
          </p>
        </div>
      </div>

      <FilesMenue open={open} setOpen={setOpen} files={reply.files} />
    </div>
  );
}
