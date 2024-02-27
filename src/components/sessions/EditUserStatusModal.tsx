import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserStatus } from "@/store/adminstore/slices/sessions/joinedUsersSlice";
import { ThemeContext } from "../Pars/ThemeContext";
import { joinedUserType } from "@/types/adminTypes/sessions/sessionsTypes";
import { Modal, Radio, RadioGroup } from "rsuite";

const RadioLabel = ({ children }: any) => (
  <label style={{ padding: 7 }}>{children}</label>
);

const EditUserStatusModal = ({
  modalOpen,
  setModalOpen,
  userData,
  sessionId,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  userData: joinedUserType;
  sessionId: number;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch: any = useDispatch();

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onEnter={() => setSelectedStatus(userData.status)}
      size="sm"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-dark [&>div>*]:text-[var(--light-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--dark-color)]"
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
          Edit User Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex justify-center items-center">
        <RadioGroup
          name="userStatus"
          inline
          style={{
            color: `${
              mode === "dark"
                ? "text-[var(--light-color)]"
                : "text-[var(--dark-color)]"
            }`,
          }}
          value={selectedStatus}
          onChange={(value: any, event): void => setSelectedStatus(value)}
        >
          <RadioLabel>Status: </RadioLabel>
          <Radio value="Joint">Joint</Radio>
          <Radio value="Expelled">Expelled</Radio>
        </RadioGroup>
      </Modal.Body>
      <Modal.Footer>
        <button
          disabled={selectedStatus === userData.status}
          className={`py-2 px-4 rounded-full border ${
            mode === "dark" ? "border-[white]" : "border-[black]"
          } ${
            selectedStatus === userData.status
              ? "opacity-[0.3]"
              : "hover:opacity-[0.75]"
          }`}
          onClick={() => {
            dispatch(
              changeUserStatus({
                id: sessionId,
                ids: [userData.user.user_id],
                status: selectedStatus,
                userType: userData.user.account_type,
              })
            );
            setModalOpen(false);
          }}
        >
          Change status
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserStatusModal;
