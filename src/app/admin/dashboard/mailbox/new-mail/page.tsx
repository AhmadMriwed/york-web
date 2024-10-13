"use client";
import OperationAlert from "@/components/Pars/OperationAlert";
import HeaderMail from "@/components/mailbox/HeaderMail";


import dynamic from "next/dynamic";
const NewEmailRequest = dynamic(
  () => import("@/components/mailbox/NewEmailRequest"),
  {
    ssr: false,
  }
);

import { completedRequest } from "@/store/adminstore/slices/mailbox/mailboxSlice";
import { GlobalState } from "@/types/storeTypes";
import { useSelector } from "react-redux";

export default function NewMail() {
  const { status, error } = useSelector((state: GlobalState) => state.mailbox);
  return (
    <main className="py-7 px-5 sm:px-8 relative">
      <OperationAlert
        status={status}
        error={error}
        messageOnSuccess="Email has been sending successfully"
        messageOnError={`An error occurred while sending (${error}) , try again `}
        completedAction={completedRequest}
        navigateTo="/admin/dashboard/mailbox"
      />

      <HeaderMail title="New Request" />
      <NewEmailRequest role="request" />
    </main>
  );
}
