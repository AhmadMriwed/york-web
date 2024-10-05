import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "@/components/pars/ThemeContext";
import { replySubmitCourse } from "@/store/adminstore/slices/courses/submit-courses/submitCoursesSlice";
import {
  acceptRequest,
  rejectRequest,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import {
  acceptCourseRequest,
  rejectCourseRequest,
} from "@/store/adminstore/slices/courses/course-requests/courseRequestsSlice";
import { GlobalState } from "@/types/storeTypes";
import { Input, InputPicker, Loader, Modal } from "rsuite";

const CauseModal = ({
  role,
  loc,
  id,
  modalOpen,
  setModalOpen,
}: {
  role: "accept" | "reject";
  loc: "submit" | "join-request" | "course-request";
  id?: number;
  modalOpen?: boolean;
  setModalOpen?: any;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [cause, setCause] = useState("");
  const [permission_id, setPermission_id] = useState<number | null>(null);

  const { operationLoading: submitLoading } = useSelector(
    (state: GlobalState) => state.submitCourses
  );
  const { operationLoading: joinedUserLoading } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );
  const { operationLoading: requestLoading } = useSelector(
    (state: GlobalState) => state.courseRequests
  );

  const {
    isLoading: permissionLoading,
    error: permissionError,
    coursePermissions,
  } = useSelector((state: GlobalState) => state.endUser);

  const dispatch = useDispatch<any>();

  const handleReply = () => {
    if (loc === "submit" && id) {
      dispatch(replySubmitCourse({ id: id, type: "rejected", cause: cause }));
    }

    if (loc === "join-request") {
      if (role === "accept" && id) {
        dispatch(acceptRequest({ id: id, permission: permission_id }));
      }

      if (role === "reject" && id) {
        dispatch(rejectRequest({ id: id, cause: cause }));
      }
    }

    if (loc === "course-request") {
      if (role === "accept" && id) {
        dispatch(acceptCourseRequest(id));
      }

      if (role === "reject" && id) {
        dispatch(rejectCourseRequest({ id: id, cause: cause }));
      }
    }
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
        <div className="flex flex-col gap-4 p-2">
          {role === "reject" && (
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="cause" className="text-[12px] font-[500]">
                Cause
              </label>
              <Input
                as="textarea"
                rows={3}
                id="cause"
                name="cause"
                placeholder="Enter Cause here..."
                onChange={(value: string) => setCause(value)}
              />
            </div>
          )}

          {loc === "join-request" && role === "accept" && (
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="permission" className="text-[12px] font-[500]">
                Select permission :
              </label>
              <InputPicker
                className="!text-[#000] !w-full"
                id="permission"
                data={coursePermissions.map((p) => ({
                  label: p.name,
                  value: p.id,
                }))}
                placeholder="Permissions"
                value={permission_id}
                onChange={(value: number) => setPermission_id(value)}
                renderMenu={(menu) => {
                  if (permissionLoading) {
                    return (
                      <p
                        style={{
                          padding: 10,
                          color: "#999",
                          textAlign: "center",
                        }}
                      >
                        <Loader />
                      </p>
                    );
                  }
                  return menu;
                }}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-4 self-end">
          <button className="outlined-btn" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button className="colored-btn" onClick={handleReply}>
            {submitLoading || joinedUserLoading || requestLoading ? (
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
