"use client";
import { useContext, useEffect, useState } from "react";
import { MdOutgoingMail } from "react-icons/md";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { RiFolderDownloadFill } from "react-icons/ri";
import Link from "next/link";
import HeaderMail from "@/components/mailbox/HeaderMail";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";

import { MailType } from "@/types/adminTypes/mailbox/mailboxTypes";
import Loading from "@/components/Pars/Loading";
import { Badge, Pagination } from "rsuite";
import MailMessage from "@/components/mailbox/MailMessage";
import {
  getRecivedMail,
  getSendMail,
  getlMailboxInfo,
} from "@/store/adminstore/slices/mailbox/mailboxSlice";






const AdminMailbox = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [isOutgoingMail, setIsOutgoingMail] = useState(true);
  const [isReceivedgMail, setIsReceivedMail] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const { isLoading, error, mails, mailInfo, initalLoading, perPage, total } =
    useSelector((state: GlobalState) => state.mailbox);

  const dispatch: any = useDispatch();

  const handleReceivedMail = () => {
    if (!isReceivedgMail) {
      setIsReceivedMail(true);
      setIsOutgoingMail(false);
      setActivePage(1);
    }
  };
  const handleOutgoingMail = () => {
    if (!isOutgoingMail) {
      setIsReceivedMail(false);
      setIsOutgoingMail(true);
      setActivePage(1);
    }
  };

  useEffect(() => {
    if (isOutgoingMail) {
      dispatch(getSendMail(activePage));
    } else if (isReceivedgMail) {
      dispatch(getRecivedMail(activePage));
    }
  }, [isOutgoingMail, isReceivedgMail, dispatch, activePage]);

  useEffect(() => {
    dispatch(getlMailboxInfo());
  }, [dispatch]);

  console.log("mails", mails);

  return (
    <main className="py-8 px-5 sm:px-8 overflow-x-auto max-w-full">
      <header className="flex justify-between items-center flex-wrap gap-2">
        <HeaderMail title="Mailbox">
          <Link
            href={"/admin/dashboard/mailbox/new-mail"}
            className="flex items-center justify-center h-10 px-5 rounded-[4px]  text-white hover:!text-white bg-[var(--primary-color1)]"
          >
            <span className="text-[15px] lg:text-[20px] " >+ Create New </span> 
          </Link>



        </HeaderMail>
      </header>

      {/* {isLoadingPage && <Loading />} */}

      {initalLoading && <Loading  backdrop={true} />}
      {!initalLoading &&
        (mailInfo.count_recived_boxes === 0 ||
          mailInfo.count_send_boxes === 0) &&
        !isLoading &&
        mails.length === 0 && (
          <div className="h-[250px] mt-5 element-center text-[22px] capitalize flex-col">
            there is no mail available
            <Link
              href={"/admin/dashboard/mailbox/new-mail"}
              className="text-[var(--primary-color1)] cursor-pointer hover:text-[var(--primary-color2)] lowercase text-[16px] mt-1"
            >
              create one
            </Link>
          </div>
        )}

      {!initalLoading &&
        (mailInfo.count_recived_boxes > 0 || mailInfo.count_send_boxes > 0) && (
          <>
            <div className="flex items-center gap-4 mt-5 flex-wrap relative z-40 translate-y-[50%]">
              <Badge
                content={mailInfo.count_new_send_boxes}
                className="cursor-pointer"
              >
                <button
                  className={`element-center gap-2 p-3 rounded-lg text-[9px] lg:text-[18px] text-white transition-all duration-200 ${
                    isOutgoingMail
                      ? "bg-[var(--primary-color2)]"
                      : "bg-[#03071c]"
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
                  Outgoing Orders ({`${mailInfo.count_send_boxes}`})
                </button>
              </Badge>

              <Badge
                content={mailInfo.count_new_recived_boxes}
                className="cursor-pointer"
              >
                <button
                  className={`element-center gap-2 p-3 rounded-lg text-[9px] lg:text-[18px] text-white transition-all duration-200 ${
                    isReceivedgMail
                      ? "bg-[var(--primary-color2)]"
                      : "bg-[#03071c]"
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
                  Requests Received ({`${mailInfo.count_recived_boxes}`})
                </button>
              </Badge>
            </div>

            <div
              className={`pt-[20px] pr-2 md:pr-[40px] ps-5 sm:rounded-[0px_40px_0px_0px] relative mt-[38px] min-h-[120px]  [&>a:not(:last-child)]:border-b ${
                mode === "dark"
                  ? "bg-[#212A34] text-white"
                  : "bg-light text-[#656565]"
              }`}
            >
              <span className="w-[50%] h-[38px] absolute top-0 left-0 translate-y-[-100%] bg-inherit rounded-[0px_20px_0px_0px] hidden sm:inline" />

              {isLoading && <Loading backdrop={true}  />}
              {!isLoading && mails.length > 0 && (
                <>
                
                  {mails.map((mail: MailType) => (
                    <MailMessage key={mail.id} mail={mail} />
                  ))}
                </>
              )}
            </div>
            {!isLoading && mails.length > 0 && total > perPage && (
              <Pagination
                prev
                next
                size="sm"
                total={total}
                limit={perPage}
                maxButtons={3}
                activePage={activePage}
                onChangePage={setActivePage}
                className="my-[30px] w-max  mx-auto 
               [&>div_.rs-pagination-btn]:!bg-white
               [&>div_.rs-pagination-btn]:!text-[var(--primary-color2)]
               [&>div_.rs-pagination-btn]:!mx-[5px]
               [&>div_.rs-pagination-btn]:!rounded-[50%]
               [&>div_.rs-pagination-btn]:!border-none
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!bg-[var(--primary-color2)]
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!text-white
               "
              />
            )}
          </>
        )}
    </main>
  );
};

export default AdminMailbox;
