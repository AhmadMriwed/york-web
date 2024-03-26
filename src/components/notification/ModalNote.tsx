import { Modal, Placeholder } from "rsuite";

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
   return (
      <Modal
         open={open}
         onClose={handleClose}
         className={`${
            mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
         }
         
         `}
         size={"xs"}
      >
         <Modal.Header>
            <Modal.Title
               className={`${mode === "dark" ? "text-light" : "text-dark"}`}
            >
               Notification{" "}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body className="text-red-400">
            <Placeholder.Paragraph />
         </Modal.Body>
      </Modal>
   );
}
