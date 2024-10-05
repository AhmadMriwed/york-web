import { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { Modal } from "rsuite";

const RejectionCauseModal = ({
  modalOpen,
  setModalOpen,
  adminCause,
  trainerCause,
}: any) => {
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
          className={`${mode === "dark" ? "text-[#FFF]" : "text-[#000]"}`}
        >
          Rejection Cause
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <p>{adminCause && adminCause}</p>
        <p>{trainerCause && trainerCause}</p>
      </Modal.Body>
    </Modal>
  );
};

export default RejectionCauseModal;
