import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { replySubmitCourse } from "@/store/adminstore/slices/courses/submit-courses/submitCoursesSlice";
import { GlobalState } from "@/types/storeTypes";

import { Input, Loader, Modal } from "rsuite";

const CauseModal = ({
  role,
  submitId,
  modalOpen,
  setModalOpen,
}: {
  role: "accept" | "reject";
  submitId?: number;
  modalOpen?: boolean;
  setModalOpen?: any;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const { operationLoading } = useSelector(
    (state: GlobalState) => state.submitCourses
  );

  const dispatch = useDispatch<any>();

  const [cause, setCause] = useState("");

  const handleReply = () => {
    const type = role === "accept" ? "accept" : "rejected";
    if (submitId)
      dispatch(replySubmitCourse({ id: submitId, type: type, cause: cause }));
  };

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
            onChange={(value: string) => setCause(value)}
          />
        </div>
        <div className="flex items-center gap-2 mt-4 self-end">
          <button className="outlined-btn" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button className="colored-btn" onClick={handleReply}>
            {operationLoading ? (
              <Loader />
            ) : role === "accept" ? (
              "Accept"
            ) : (
              "Reject"
            )}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CauseModal;
