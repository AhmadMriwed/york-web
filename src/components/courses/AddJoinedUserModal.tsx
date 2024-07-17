import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../Pars/ThemeContext";
import {
  addClient,
  addTrainee,
  addTrainer,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import { GlobalState } from "@/types/storeTypes";
import { InputPicker, Loader, Modal } from "rsuite";

const AddJoinedUserModal = ({
  modalOpen,
  setModalOpen,
  userType,
  courseId,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  userType: "trainer" | "trainee" | "client";
  courseId: number;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [permission_id, setPermission_id] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { operationLoading } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const {
    isLoading: endUserLoading,
    error: endUserError,
    coursePermissions,
    trainees,
    trainers,
    clients,
  } = useSelector((state: GlobalState) => state.endUser);

  const dispatch = useDispatch<any>();

  const permissionsList = coursePermissions.map((p) => ({
    label: p.name,
    value: p.id,
  }));
  const trainersList = trainers.map((t) => ({
    label: t.first_name + " " + t.last_name,
    value: t.user_id,
  }));
  const traineesList = trainees.map((t) => ({
    label: t.first_name + " " + t.last_name,
    value: t.user_id,
  }));
  const clientsList = clients.map((t) => ({
    label: t.first_name + " " + t.last_name,
    value: t.user_id,
  }));

  const handleAdd = () => {
    const data: any = {
      permission_courses_id: permission_id,
      courses_id: courseId,
    };

    switch (userType) {
      case "client":
        dispatch(addClient({ ...data, client_id: selectedId }));
        break;
      case "trainee":
        dispatch(addTrainee({ ...data, user_id: selectedId }));
        break;
      case "trainer":
        dispatch(addTrainer({ ...data, trainers_id: selectedId }));
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
          {`Add ${
            userType === "client"
              ? "Client"
              : userType === "trainee"
              ? "Trainee"
              : "Trainer"
          }`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="user" className="text-[12px] font-[500]">
              {`Select ${userType} :`}
            </label>
            <InputPicker
              className="!text-[#000] !w-full"
              id="user"
              data={
                userType === "trainer"
                  ? trainersList
                  : userType === "trainee"
                  ? traineesList
                  : clientsList
              }
              placeholder={
                userType === "trainer"
                  ? "Trainers"
                  : userType === "trainee"
                  ? "Trainees"
                  : "Clients"
              }
              searchable
              value={selectedId}
              onChange={(value: number) => setSelectedId(value)}
              renderMenu={(menu) => {
                if (endUserLoading) {
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

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="permission" className="text-[12px] font-[500]">
              Select permission :
            </label>
            <InputPicker
              className="!text-[#000] !w-full"
              id="permission"
              data={permissionsList}
              placeholder="Permissions"
              value={permission_id}
              onChange={(value: number) => setPermission_id(value)}
              renderMenu={(menu) => {
                if (endUserLoading) {
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
        </div>
        <div className="flex items-center gap-2 mt-4 self-end">
          <button className="outlined-btn" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button className="colored-btn" onClick={handleAdd}>
            {operationLoading ? <Loader /> : `Add ${userType}`}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddJoinedUserModal;
