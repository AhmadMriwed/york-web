import Image from "next/image";
import { Modal, Placeholder } from "rsuite";
import photo from "../../../public/avatar.png";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function ModalNote({
   open,
   setOpen,
   mode,
}: {
   open: boolean;
   setOpen: any;
   mode: string;
}) {
   const handleClose = () => setOpen(false);

   const Notification = () => {
      return (
         <div className="flex justify-between items-center gap-4 flex-wrap p-3 pb-7 border-b border-b-[var(--primary-color1)]">
            <div className="grow flex items-center gap-3">
               <Image
                  src={photo}
                  alt="photo"
                  width={40}
                  height={40}
                  className="min-w-[40px] rounded-[50%]"
               />
               <div>
                  <p className="leading-[1.2] text-[18px] font-semibold">
                     Notification Title
                  </p>
                  <p className="text-[14px] mt-[5px]">
                     notification subtitle lorem ipsum{" "}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-2 self-end text-[#777] text-[14px]">
               <FaRegCalendarAlt className="text-[14px]" /> September 04 - 22:83
               AM{" "}
            </div>
         </div>
      );
   };

   return (
      <Modal
         open={open}
         onClose={handleClose}
         className={`${
            mode === "dark"
               ? "[&>div>*]:!bg-dark text-light"
               : "[&>div>*]:!bg-light text-dark"
         }
         
         `}
         size={"sm"}
      >
         <Modal.Header>
            <Modal.Title
               className={`${mode === "dark" ? "text-light" : "text-dark"}`}
            >
               Notification{" "}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body className="">
            <Notification />
         </Modal.Body>
      </Modal>
   );
}
