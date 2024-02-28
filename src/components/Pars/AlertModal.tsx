import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Loader, Modal } from "rsuite";
import { CiCircleAlert } from "react-icons/ci";
import { ThemeContext } from "./ThemeContext";

interface ModalType {
  open: boolean;
  setOpen: any;
  requestType: "delete";
  label: string;
  deleteAction: any;
  completed: any;
  id?: number;
  status?: boolean;
  deleteLoading?: boolean;
  exitPath?: string;
}

export default function AlertModal({
  open,
  setOpen,
  requestType,
  label,
  deleteAction,
  completed,
  id,
  status,
  deleteLoading,
  exitPath,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (status && open) {
      dispatch(completed());
      setOpen(false);
      if (exitPath) router.push(exitPath);
    }
  }, [status, dispatch, setOpen, open, completed, router, exitPath]);

  return (
    <Modal
      backdrop={true}
      open={open}
      size="sm"
      onClose={() => setOpen(false)}
      className={`[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[16px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
    >
      <Modal.Header closeButton={true} />
      <Modal.Body className="flex flex-col justify-center items-center gap-3">
        <CiCircleAlert
          style={{
            fontSize: "40px",
            color: "red",
          }}
        />
        <p
          className={`text-[20px] sm:text-[24px] text-center max-w-md ${
            mode === "dark" ? "text-white" : "text-dark"
          }`}
        >
          {label}
        </p>
      </Modal.Body>
      <Modal.Footer className="!text-center mt-7 mb-3">
        <Button
          className="bg-red-500 text-white hover:text-white py-3 px-6 rounded-[8px] hover:bg-red-400"
          onClick={() => dispatch(deleteAction(id))}
        >
          {deleteLoading ? <Loader /> : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
