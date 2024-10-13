"use client";
import OperationAlert from "@/components/Pars/OperationAlert";
import HeaderMail from "@/components/mailbox/HeaderMail";
import NewEmailRequest from "@/components/mailbox/NewEmailRequest";
import { completedRequest } from "@/store/adminstore/slices/mailbox/mailboxSlice";
import { GlobalState } from "@/types/storeTypes";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function NewReply() {
  const searchParams = useSearchParams();

  const data = {
    sendTo: searchParams.get("sendTo") || "",
    requestType: searchParams.get("requestType") || "",
    requestId: searchParams.get("requestId") || "",
  };
  const { status, error } = useSelector((state: GlobalState) => state.mailbox);

  return (
    <main className="py-7 px-5 sm:px-8">
      <HeaderMail title="New Reply" />
      <NewEmailRequest role="reply" replayData={data} />
      <OperationAlert
        status={status}
        error={error}
        messageOnSuccess="Email has been sending successfully"
        messageOnError={`An error occurred while sending (${error}) , try again `}
        completedAction={completedRequest}
        navigateTo="/admin/dashboard/mailbox"
              />
    </main>
  );
}
