import React, { useContext } from "react";
import { ThemeContext } from "../pars/ThemeContext";
import {
  clientType,
  traineeType,
} from "@/types/adminTypes/courses/coursesTypes";
import { Modal } from "rsuite";
import Image from "next/image";

const UserReportModal = ({
  modalOpen,
  setModalOpen,
  userData,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  userData: clientType | traineeType;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      size="md"
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
          User Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-around items-center flex-col sm:flex-row">
          {userData && userData?.user && userData?.user?.image && (
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
              <p className="text-[20px]">
                {userData &&
                  userData?.user &&
                  userData?.user?.first_name &&
                  userData?.user?.last_name &&
                  `${userData.user.first_name} ${userData.user.last_name}`}
              </p>
              <p className="text-[12px] text-[#888]">
                id:{" "}
                {userData &&
                  userData?.user &&
                  userData?.user?.user_id &&
                  userData.user.user_id}
              </p>
            </div>
            <div className="flex items-center justify-between gap-7">
              Status:
              <span className="bg-[var(--primary-color1)] text-white font-bold px-2 rounded-full">
                {userData?.status && userData.status}
              </span>
            </div>
            {userData?.status === "Accepted" && userData?.date_accept && (
              <div className="flex items-center justify-between gap-7">
                Accept date: <span>{userData.date_accept.slice(0, 16)}</span>
              </div>
            )}
            {userData && userData?.user && userData?.user?.email && (
              <div className="flex items-center justify-between gap-7">
                Email: <span>{userData.user.email}</span>
              </div>
            )}
            {userData && userData?.user && userData?.user?.phone_number && (
              <div className="flex items-center justify-between gap-7">
                Phone: <span>{userData.user.phone_number}</span>
              </div>
            )}
            {userData &&
              userData?.permission_courses &&
              userData?.permission_courses?.name && (
                <div className="flex items-center justify-between gap-7">
                  Permission: <span>{userData.permission_courses.name}</span>
                </div>
              )}
            {userData && userData?.user && userData?.user?.gender && (
              <div className="flex items-center justify-between gap-7">
                Gender: <span>{userData.user.gender}</span>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserReportModal;
