import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Message, useToaster } from "rsuite";
export default function OperationAlert({
   status,
   error,
   messageOnError,
   messageOnSuccess,
   completedAction,
   closeAdd,
   closeEdit,
   closeDelete,
   navigateTo,
}: {
   status: boolean;
   error: any;
   messageOnError: string;
   messageOnSuccess: string;
   completedAction: any;
   closeAdd?: any;
   closeEdit?: any;
   closeDelete?: any;
   navigateTo?: string;
}) {
   const message = useMemo(() => {
      return (
         <Message
            showIcon
            type={error ? "error" : "success"}
            closable
            className="text-[16px]"
         >
            {error ? messageOnError : messageOnSuccess}
         </Message>
      );
   }, [error, messageOnError, messageOnSuccess]);

   const toaster = useToaster();
   const router = useRouter();
   const dispatch: any = useDispatch();

   useEffect(() => {
      if (status) {
         toaster.push(message, {
            placement: "bottomStart",
            duration: 7000,
         });
         dispatch(completedAction());
         if (closeAdd || closeEdit || closeDelete) {
            if (!error) {
               closeAdd(false);
               closeDelete(false);
               closeEdit(false);
            }
         }
         navigateTo && !error && router.push(navigateTo);
      }
   }, [
      status,
      error,
      dispatch,
      toaster,
      message,
      completedAction,
      closeAdd,
      closeDelete,
      closeEdit,
      navigateTo,
      router,
   ]);

   return <div></div>;
}
