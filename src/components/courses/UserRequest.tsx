import React, { useState, useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { requestToJoinType } from "@/types/adminTypes/courses/coursesTypes";
import { Check, Close } from "@rsuite/icons";
import Image from "next/image";
import CauseModal from "./CauseModal";

const UserRequest = ({ request }: { request: requestToJoinType }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);

  return (
    <div
      className={`flex justify-between items-center mt-4 p-3 rounded-md ${
        mode === "dark" ? "bg-[var(--dark-bg-color)]" : "bg-white text-[#000]"
      }`}
    >
      <CauseModal
        role="reject"
        loc="join-request"
        id={request.id}
        modalOpen={rejectModalOpen}
        setModalOpen={setRejectModalOpen}
      />
      <CauseModal
        role="accept"
        loc="join-request"
        id={request.id}
        modalOpen={acceptModalOpen}
        setModalOpen={setAcceptModalOpen}
      />

      <div>
        <div className="flex items-start gap-2">
          {request.user.image && (
            <Image
              src={request.user.image}
              width={40}
              height={40}
              alt="user image"
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-bold">
              {request?.user &&
                `${request?.user?.user_id && request.user.user_id}. ${
                  request?.user?.first_name &&
                  request?.user?.last_name &&
                  request.user.first_name + " " + request.user.last_name
                }`}
            </p>
            <div className="mt-1 flex items-center flex-wrap gap-2">
              <p className="m-0 text-[12px]">
                {request?.user &&
                  request?.user?.phone_number &&
                  request.user.phone_number}
              </p>
              <span>|</span>
              <p className="m-0 text-[12px]">
                {request?.user && request?.user?.email && request.user.email}
              </p>
              <span>|</span>
              <p className="m-0 text-[12px]">{`Role: ${
                request?.permission_courses &&
                request?.permission_courses?.name &&
                request.permission_courses.name
              }`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {request.status === "Pending" && (
          <>
            <button
              className="p-2 bg-green-400 rounded-full cursor-pointer element-center"
              onClick={() => setAcceptModalOpen(true)}
            >
              <Check />
            </button>
            <button
              className="p-2 bg-red-400 rounded-full cursor-pointer element-center"
              onClick={() => setRejectModalOpen(true)}
            >
              <Close />
            </button>
          </>
        )}
        {request.status === "Accepted" && (
          <div className="py-1 px-2 bg-green-500 rounded-full element-center gap-1 text-[12px] text-white font-[500]">
            <Check /> Accepted
          </div>
        )}
        {request.status === "Rejected" && (
          <div className="py-1 px-2 bg-red-500 rounded-full element-center gap-1 text-[12px] text-white font-[500]">
            <Close /> Rejected
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRequest;
