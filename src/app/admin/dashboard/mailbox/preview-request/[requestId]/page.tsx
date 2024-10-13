"use client";
import { MdReplyAll } from "react-icons/md";
import { ThemeContext } from "@/components/Pars/ThemeContext";

import HeaderMail from "@/components/mailbox/HeaderMail";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Reply from "@/components/mailbox/Reply";
import Link from "next/link";
import { RiFolderDownloadFill } from "react-icons/ri";
import FilesMenue from "@/components/mailbox/FilesMenue";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSingleReqest } from "@/store/adminstore/slices/mailbox/mailboxSlice";
import { GlobalState } from "@/types/storeTypes";
import Loading from "@/components/Pars/Loading";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import { MdAttachFile } from "react-icons/md";

export default function Preview() {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const { requestId } = useParams();
  const searchParams = useSearchParams();

  const data = {
    sendTo: searchParams.get("sendTo"),
    requestType: searchParams.get("requestType"),
    requestId,
  };

  console.log("params", requestId);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getSingleReqest(requestId));
  }, [dispatch, requestId]);

  const { isLoading, error, request } = useSelector(
    (state: GlobalState) => state.mailbox
  );

  console.log("request api", request);

  return (
    <main className="py-5 px-5 sm:px-8">
      <header className="flex justify-between items-center flex-wrap gap-2">
        <HeaderMail title="Preview Request">
          <Link
            className="flex justify- items-center gap-7 py-1 px-5 w-[210px] rounded-[4px] text-[16px] text-white hover:text-white bg-[var(--primary-color1)]"
            href={{
              pathname: "/admin/dashboard/mailbox/new-reply",
              query: data,
            }}
          >
            <span className="text-[22px]">+</span>Create A Reply
          </Link>
        </HeaderMail>
      </header>
      <div></div>
      {isLoading && <Loading backdrop={true} />}
      {!isLoading && !error && (
        <div
          className={`mt-5 rounded-xl px-[25px] pb-[20px]
            ${
              mode === "dark"
                ? "bg-[#212A34] text-white"
                : "bg-light text-[#656565]"
            }`}
        >
          <header className="py-4 flex justify-between items-center flex-wrap gap-y-2  gap-2  relative">
            <div className="flex items-center gap-2">
              {request.recived_user?.image && (
                <Image
                  src={request.recived_user?.image}
                  alt="photo"
                  width={40}
                  height={40}
                  className="rounded-[50%]"
                />
              )}
              <div>
                <p className="font-semibold m-0 text-[15px]">
                  {request.recived_user
                    ? request.recived_user.first_name +
                      " " +
                      request.recived_user.last_name
                    : ""}
                </p>
                <p className="text-[#777] font-normal text-[12px] m-0 lowercase">
                  {request.recived_user && request.recived_user.email}
                </p>
              </div>
            </div>
            {request.show_date && (
              <p className="text-[#777]">{request.show_date}</p>
            )}

            <span className="absolute bottom-0 left-[50%] translate-x-[-50%] h-[1px] w-[calc(100%_-_50px)]  bg-[#55555540]" />
          </header>
          <div className="flex gap-1 justify-between flex-wrap flex-col md:flex-row">
            <div className=" flex-1 max-w-[600px]">
              <p className="font-bold text-[11.68px]  lg:text-[18px] m-0 mt-3">{request.title}</p>

              {request.sub_title && (
                <p
                  className="mt-[2px] text-[7.74px]  lg:text-[17px]"
                  dangerouslySetInnerHTML={{
                    __html: request.sub_title || "",
                  }}
                />
              )}
            </div>
            {request.files && request.files.length > 0 && (
              <>
                <div className="md:h-[200px] flex items-start md:items-center flex-col mt-4 md:mt-0 w-auto  md:px-5">
                  <p
                    className="text-[18px] font-bold mt-3 mb-4 text-[var(--primary-color1)] cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    Attatched Fiels{" "}
                  </p>
                  <div onClick={() => setOpen(true)}>
                    <MdAttachFile
                      style={{
                        fontSize: "28px",
                        color: "var(--primary-color1)",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <p
                    className=" mt-[5px] text-[12px] cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    {request.files.length} files
                  </p>
                </div>
                <FilesMenue
                  open={open}
                  setOpen={setOpen}
                  files={request.files}
                />
              </>
            )}
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
                Replies{" "}
                {request.replay_boxes &&
                  "(" + request.replay_boxes.length + ") "}
                :
              </p>
            </div>
            <div className="pe-3 ">
              {request.replay_boxes?.map((reply) => {
                return <Reply key={reply.id} reply={reply} />;
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
