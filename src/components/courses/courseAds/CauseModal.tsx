import React, { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";

import { Input, Modal } from "rsuite";

const CauseModal = ({
  role,
  modalOpen,
  setModalOpen,
}: {
  role: "accept" | "reject";
  modalOpen: boolean;
  setModalOpen: any;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      size="sm"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-[var(--dark-bg-color)] [&>div>*]:text-[var(--dark-text-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--light-text-color)]"
      }`}
    >
      <Modal.Header className="flex items-center mt-1">
        <Modal.Title
          className={`${
            mode === "dark"
              ? "text-[var(--light-color)]"
              : "text-[var(--dark-color)]"
          }`}
        >
          {`${role === "accept" ? "Accept" : "Reject"} Course Request`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <div>
          <p className="mb-2">
            {`Do you want to ${
              role === "accept" ? "Accept" : "Reject"
            } the request with id: #12255 ?`}
          </p>
          <Input
            as="textarea"
            rows={3}
            id="cause"
            name="cause"
            placeholder={`Enter the ${
              role === "accept" ? "acception" : "rejection"
            } cause`}
            onChange={(value: string) => console.log(value)}
          />
        </div>
        <div className="flex items-center gap-2 mt-4 self-end">
          <button className="outlined-btn" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button className="colored-btn">{`${
            role === "accept" ? "Accept" : "Reject"
          }`}</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CauseModal;
