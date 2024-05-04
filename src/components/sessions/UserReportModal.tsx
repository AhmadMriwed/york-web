import React, { useContext } from "react";
import { getLocalISODate } from "@/utils/dateFuncs";
import { joinedUserType } from "@/types/adminTypes/sessions/sessionsTypes";
import { ThemeContext } from "../Pars/ThemeContext";
import Image from "next/image";
import { Modal } from "rsuite";

const UserReportModal = ({
  modalOpen,
  setModalOpen,
  userData,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  userData: joinedUserType;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      size="md"
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
          User Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-around items-center flex-col sm:flex-row">
          {userData.user.image && (
            <Image
              src={userData.user.image}
              width={150}
              height={150}
              alt="user image"
              style={{ borderRadius: "100%" }}
            />
          )}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 font-bold">
              <p className="text-[20px]">{`${userData.user.first_name} ${userData.user.last_name}`}</p>
              <p className="text-[12px] text-[#888]">
                id: {userData.user.user_id}
              </p>
            </div>
            <div className="flex items-center justify-between gap-7">
              Status:
              <span className="bg-[var(--primary-color1)] text-white font-bold px-2 rounded-full">
                {userData.status}
              </span>
            </div>
            <div className="flex items-center justify-between gap-7">
              Join time: <span>{getLocalISODate(userData.joind_time)}</span>
            </div>
            <div className="flex items-center justify-between gap-7">
              Left time: <span>{getLocalISODate(userData.left_time)}</span>
            </div>
            <div className="flex items-center justify-between gap-7">
              Email: <span>{userData.user.email}</span>
            </div>
            <div className="flex items-center justify-between gap-7">
              Username:
              <span>{userData.user.user_name}</span>
            </div>
            <div className="flex items-center justify-between gap-7">
              Account type:
              <span>{userData.user.account_type}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserReportModal;
