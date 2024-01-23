import HeaderMail from "@/components/mailbox/HeaderMail";
import NewEmailRequest from "@/components/mailbox/NewEmailRequest";

export default function NewMail() {
   return (
      <main className="py-7 px-5 sm:px-8">
         <HeaderMail title="New Request" />
         <NewEmailRequest role="request" />
      </main>
   );
}
