import React, { useState, useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";

import { Check, Close } from "@rsuite/icons";

import CauseModal from "@/components/courses/CauseModal";
import Image from "next/image";

import avatar from "@/../public/avatar.png"; //TMP

const UserRequest = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);

  return (
    <>
      <>
        <CauseModal
          role="reject"
          modalOpen={rejectModalOpen}
          setModalOpen={setRejectModalOpen}
        />
        <CauseModal
          role="accept"
          modalOpen={acceptModalOpen}
          setModalOpen={setAcceptModalOpen}
        />
      </>

      <div
        className={`flex justify-between items-center mt-4 p-3 rounded-md text-black ${
          mode === "dark" ? "bg-light" : "bg-white"
        }`}
      >
        <div>
          <div className="flex items-start gap-2">
            <Image
              src={avatar}
              width={40}
              height={40}
              alt=""
              className="rounded-full"
            />

            <div>
              <p className="font-bold">77. Ahmad Ebrahim</p>

              <div className="mt-1 flex items-center flex-wrap gap-2">
                <p className="m-0 text-[12px]">0935 476 102</p>
                <span>|</span>
                <p className="m-0 text-[12px]">ahmad@email.com</p>
                <span>|</span>
                <p className="m-0 text-[12px]">Role: Client</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
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
        </div>
      </div>
    </>
  );
};

export default UserRequest;
