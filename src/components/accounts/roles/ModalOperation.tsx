import { Modal, Button } from "rsuite";
import RoleGroup from "./RoleGroup";
import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext } from "react";

interface ModalType {
   open: boolean;
   setOpen: any;
   requestType: string;
   operation: string;
   serviceId?: any;
}

export default function ModalOperation({
   open,
   setOpen,
   requestType,
   operation,
}: ModalType) {
   const handleOperation = () => {
      console.log("clicked");
   };

   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   return (
      <Modal
         backdrop={true}
         open={open}
         onClose={() => setOpen(false)}
         className={`[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] w-[calc(1000px)] h-auto ${
            mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
         }`}
      >
         <Modal.Header closeButton={true}>
            <Modal.Title
               className={`${
                  mode === "dark" ? "text-light" : "text-dark"
               } font-bold`}
            >
               {requestType}
            </Modal.Title>
         </Modal.Header>

         <Modal.Body
            className={`${mode === "dark" ? "text-light" : "text-dark"}`}
         >
            <label className="block">Name</label>
            <input
               type="text"
               className="w-[calc(100%_-_12px)] max-w-[880px] border-none outline-none px-2 py-1 my-1 mr-3 rounded-[4px]"
               placeholder="role name"
            />
            <div className="flex mt-5 gap-[20px] flex-wrap ">
               <RoleGroup />
               <RoleGroup />
               <RoleGroup />
               <RoleGroup />
               <RoleGroup />
               <RoleGroup />
            </div>

            {operation !== "visible" && (
               <div className="element-center flex-col gap-3 mt-3">
                  <p className="capitalize text-red-500 p-2">
                     you have to check / un check fields exept the old checked
                     fields
                  </p>
                  <Button
                     onClick={() => handleOperation}
                     className="w-fit py-[6px] px-[25px] text-center rounded-[6px] text-white bg-[#3c417c]"
                  >
                     {operation}
                  </Button>
               </div>
            )}
         </Modal.Body>
         {/* <Modal.Footer className="flex justify-center items-center gap-[25px] pb-[20px]">
        
         </Modal.Footer> */}
      </Modal>
   );
}
