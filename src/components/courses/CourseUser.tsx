import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "@/components/pars/ThemeContext";
import {
  courseUserOperationCopmleted,
  deleteClient,
  deleteTrainee,
  deleteTrainer,
  updateJoinedUser,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import {
  clientType,
  traineeType,
} from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import {
  Dropdown,
  IconButton,
  Input,
  InputPicker,
  Loader,
  Modal,
} from "rsuite";
import Image from "next/image";
import AlertModal from "../pars/AlertModal";
import UserReportModal from "./UserReportModal";
import { More } from "@rsuite/icons";

const UpdateModal = ({
  modalOpen,
  setModalOpen,
  op,
  userType,
  userId,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  op: string;
  userType: string;
  userId: number;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [permission_id, setPermission_id] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [rejectCause, setRejectCause] = useState("");

  const {
    isLoading: permissionLoading,
    error: permissionError,
    coursePermissions,
  } = useSelector((state: GlobalState) => state.endUser);

  const { operationLoading } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const dispatch = useDispatch<any>();

  const handleUpdate = () => {
    const type =
      userType === "trainer"
        ? "trainer_course"
        : userType === "trainee"
        ? "trainee_course"
        : "clientcourse";

    switch (op) {
      case "permission":
        dispatch(
          updateJoinedUser({
            id: userId,
            type: type,
            data: { permission_courses_id: permission_id },
          })
        );
        break;
      case "status":
        dispatch(
          updateJoinedUser({
            id: userId,
            type: type,
            data: { status: newStatus, cause: rejectCause },
          })
        );
        break;
      default:
        break;
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
          {`Update User ${op === "status" ? "Status" : "Permission"}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <div className="p-7 element-center w-full">
          {op === "permission" && (
            <div className="flex flex-col gap-1 w-full">
              <p className="text-[12px] font-[500]">
                Select new permission : *
              </p>
              <InputPicker
                className="!text-[#000] !w-full"
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

          {op === "status" && (
            <div className="p-7 flex-col gap-4 element-center w-full">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-[12px] font-[500]">Select new status : *</p>
                <InputPicker
                  className="!text-[#000] !w-full"
                  data={[
                    { label: "Accepted", value: "Accepted" },
                    { label: "Rejected", value: "Rejected" },
                  ]}
                  placeholder="Status"
                  value={newStatus}
                  onChange={(value: string) => setNewStatus(value)}
                />
              </div>

              {newStatus === "Rejected" && (
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[12px] font-[500]">
                    Enter rejection cause :
                  </p>
                  <Input
                    as="textarea"
                    rows={2}
                    placeholder="Cause"
                    value={rejectCause}
                    onChange={(value: string) => setRejectCause(value)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4 self-end">
          <button className="outlined-btn" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button
            className="colored-btn disabled:opacity-[0.5]"
            onClick={handleUpdate}
            disabled={op === "permission" ? !permission_id : !newStatus}
          >
            {operationLoading ? (
              <Loader />
            ) : op === "permission" ? (
              "Change permission"
            ) : (
              "Change status"
            )}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const CourseUser = ({
  user,
  userType,
}: {
  user: clientType | traineeType;
  userType: "trainer" | "trainee" | "client";
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [reportOpen, setReportOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [op, setOp] = useState("");

  const { status } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="md"
        circle
        className={`${
          mode === "dark"
            ? "!text-[var(--light-bg-color)]"
            : "!text-[var(--dark-color)]"
        } !bg-transparent`}
      />
    );
  };

  return (
    <>
      <div
        className={`flex justify-between items-center mt-4 p-3 rounded-md ${
          mode === "dark" ? "bg-[var(--dark-bg-color)]" : "bg-white text-[#000]"
        }`}
      >
        <UserReportModal
          modalOpen={reportOpen}
          setModalOpen={setReportOpen}
          userData={user}
        />
        <UpdateModal
          modalOpen={updateModal}
          setModalOpen={setUpdateModal}
          op={op}
          userType={userType}
          userId={user.id}
        />
        <AlertModal
          open={deleteModal}
          setOpen={setDeleteModal}
          requestType="delete"
          label={`Are you sure you want to delete "${
            user &&
            user?.user &&
            user?.user?.first_name &&
            user?.user?.last_name &&
            user.user.first_name + " " + user.user.last_name
          }" ?`}
          deleteAction={
            userType === "trainer"
              ? deleteTrainer
              : userType === "trainee"
              ? deleteTrainee
              : deleteClient
          }
          completed={courseUserOperationCopmleted}
          id={user.id}
          status={status}
        />

        <div>
          <div className="flex items-start gap-2">
            {user?.user?.image && (
              <Image
                src={user.user.image}
                width={40}
                height={40}
                alt="user image"
                className="rounded-full"
              />
            )}

            <div>
              <p className="font-bold">
                {user?.user &&
                  `${user?.user && user?.user?.user_id}. ${
                    user?.user?.first_name &&
                    user?.user?.last_name &&
                    user.user.first_name + " " + user.user.last_name
                  }`}
              </p>

              <div className="mt-1 flex items-center flex-wrap gap-2">
                <p className="m-0 text-[12px]">
                  {user?.user &&
                    user?.user?.phone_number &&
                    user.user.phone_number}
                </p>
                <span>|</span>
                <p className="m-0 text-[12px]">
                  {user?.user && user?.user?.email && user.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-2">
          <div>
            <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
              <Dropdown.Item
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={() => setReportOpen(true)}
              >
                View Report
              </Dropdown.Item>
              <Dropdown.Item
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={() => {
                  setOp("status");
                  setUpdateModal(true);
                }}
              >
                Edit Status
              </Dropdown.Item>
              <Dropdown.Item
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={() => {
                  setOp("permission");
                  setUpdateModal(true);
                }}
              >
                Edit Validity
              </Dropdown.Item>
              <Dropdown.Item
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </Dropdown.Item>
            </Dropdown>
          </div>

          <div className="mt-1 flex items-center flex-wrap gap-2">
            <p className="m-0 text-[12px]">{user?.status && user.status}</p>
            <span>|</span>
            <p className="m-0 text-[12px]">
              {user?.permission_courses &&
                user?.permission_courses?.name &&
                user.permission_courses.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseUser;
