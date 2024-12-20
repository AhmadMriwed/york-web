"use client";
import { Suspense } from "react";  // استيراد Suspense من React
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
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function NewReply() {
  // const searchParams = useSearchParams();

  // const data = {
  //   sendTo: searchParams.get("sendTo") || "",
  //   requestType: searchParams.get("requestType") || "",
  //   requestId: searchParams.get("requestId") || "",
  // };
  const { status, error } = useSelector((state: GlobalState) => state.mailbox);

  return (
    <main className="py-7 px-5 sm:px-8">
      <HeaderMail title="New Reply" />
      {/* <NewEmailRequest role="reply" replayData={data} /> */}

        {/* تغليف useSearchParams داخل Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
        <NewReplyContent />
      </Suspense>
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
function NewReplyContent() {
  const searchParams = useSearchParams();

  const data = {
    sendTo: searchParams.get("sendTo") || "",
    requestType: searchParams.get("requestType") || "",
    requestId: searchParams.get("requestId") || "",
  };
  // const { status, error } = useSelector((state: GlobalState) => state.mailbox);

  return <NewEmailRequest role="reply" replayData={data} />;
}

// "use client";
// import OperationAlert from "@/components/Pars/OperationAlert";
// import HeaderMail from "@/components/mailbox/HeaderMail";

// import dynamic from "next/dynamic";
// const NewEmailRequest = dynamic(
//   () => import("@/components/mailbox/NewEmailRequest"),
//   {
//     ssr: false,
//   }
// );


// import { completedRequest } from "@/store/adminstore/slices/mailbox/mailboxSlice";
// import { GlobalState } from "@/types/storeTypes";
// import { useSearchParams } from "next/navigation";
// import { useSelector } from "react-redux";

// export default function NewReply() {
//   const searchParams = useSearchParams();

//   const data = {
//     sendTo: searchParams.get("sendTo") || "",
//     requestType: searchParams.get("requestType") || "",
//     requestId: searchParams.get("requestId") || "",
//   };
//   const { status, error } = useSelector((state: GlobalState) => state.mailbox);

//   return (
//     <main className="py-7 px-5 sm:px-8">
//       <HeaderMail title="New Reply" />
//       <NewEmailRequest role="reply" replayData={data} />
//       <OperationAlert
//         status={status}
//         error={error}
//         messageOnSuccess="Email has been sending successfully"
//         messageOnError={`An error occurred while sending (${error}) , try again `}
//         completedAction={completedRequest}
//         navigateTo="/admin/dashboard/mailbox"
//               />
//     </main>
//   );
// }
