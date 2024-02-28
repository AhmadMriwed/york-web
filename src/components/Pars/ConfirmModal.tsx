import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "./ThemeContext";
import { CiCircleAlert, CiCircleCheck } from "react-icons/ci";
import { Modal } from "rsuite";

interface ModalType {
  open: boolean;
  setOpen: any;
  successMsg?: string;
  failMsg?: string;
  status?: boolean;
  error?: any;
  completed?: any;
}

export default function ConfirmModal({
  open,
  setOpen,
  successMsg,
  failMsg,
  status,
  error,
  completed,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const dispatch: any = useDispatch();

  useEffect(() => {
    if ((status && !open) || (error && !open)) setOpen(true);
  }, [status, error, open, setOpen]);

  return (
    <Modal
      backdrop={true}
      open={open}
      size="sm"
      animationTimeout={0}
      onClose={() => {
        setOpen(false);
        dispatch(completed());
      }}
      className={`[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[16px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
    >
      asc/Z
      <Modal.Header closeButton={true} />
      <Modal.Body className="flex flex-col justify-center items-center gap-3">
        {status ? (
          <CiCircleCheck
            style={{
              fontSize: "35px",
              color: "green",
            }}
          />
        ) : (
          <CiCircleAlert
            style={{
              fontSize: "35px",
              color: "red",
            }}
          />
        )}
        <p
          className={`text-[18px] text-center max-w-xs ${
            mode === "dark" ? "text-white" : "text-dark"
          }`}
        >
          {status ? successMsg : failMsg}
        </p>
      </Modal.Body>
    </Modal>
  );
}
