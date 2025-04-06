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
  onSuccess?: any;
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
  onSuccess,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (status && open) {
      dispatch(completed());
      setOpen(false);
    }
  }, [status, dispatch, setOpen, open, completed]);

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => setOpen(false)}
      size={"md"}
      className={`[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
    >
      <Modal.Header closeButton={true} className="element-center">
        <Modal.Title
          className={`!flex element-center pt-[20px] ${
            mode === "dark" ? "text-light" : "text-dark"
          } font-bold`}
        >
          <CiCircleAlert
            style={{
              fontSize: "38px",
              color: "red",
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p
          className={`mt-[40px] text-[20px] sm:text-[24px] text-center ${
            mode === "dark" ? "text-white" : "text-dark"
          }`}
        >
          {label}
        </p>
      </Modal.Body>
      <Modal.Footer className="!text-center mt-7 mb-2">
        <Button
          className="bg-red-500 text-white element-center py-3 px-5 w-[100px] hover:bg-red-400 hover:text-white"
          onClick={() => dispatch(deleteAction(id))}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
