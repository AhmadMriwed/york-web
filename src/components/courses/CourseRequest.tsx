import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";

import { Location, More, Peoples } from "@rsuite/icons";

import { Dropdown, IconButton } from "rsuite";
import CauseModal from "@/components/courses/courseAds/CauseModal";
import InvoiceModal from "@/components/courses/courseAds/InvoiceModal";
import Image from "next/image";

import avatar from "@/../public/avatar.png"; //TMP

const CourseRequest = ({
  type,
}: {
  type?: "courseAd" | "courseRequest" | "courseSubmit";
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const router = useRouter();

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="sm"
        circle
        className={`!text-[var(--dark-bg-color)] hover:!bg-transparent`}
      />
    );
  };

  return (
    <>
      {type === "courseAd" && (
        <>
          <CauseModal
            role="reject"
            modalOpen={rejectModalOpen}
            setModalOpen={setRejectModalOpen}
          />
          <InvoiceModal
            modalOpen={invoiceModalOpen}
            setModalOpen={setInvoiceModalOpen}
          />
        </>
      )}

      {type === "courseRequest" && (
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
      )}

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
              <p className="font-bold">22. Ahmad Ebrahim</p>
              <div className="mt-1 flex items-center flex-wrap gap-2">
                <p className="m-0 text-[12px]">#22156</p>
                <span>|</span>
                <p className="m-0 text-[12px]">0935 476 102</p>
                <span>|</span>
                <p className="m-0 text-[12px]">ahmad@email.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end gap-2">
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={() => {
                if (type === "courseSubmit") {
                  router.push(`/admin-dashboard/courses/submit-courses/${6}`);
                }
              }}
            >
              Show Details
            </Dropdown.Item>
            <Dropdown.Item
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={() => {
                if (type === "courseAd") {
                  setInvoiceModalOpen(true);
                } else if (type === "courseRequest") {
                  setAcceptModalOpen(true);
                }
              }}
            >
              Accept request
            </Dropdown.Item>
            <Dropdown.Item
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={() => {
                if (type === "courseAd" || type === "courseRequest") {
                  setRejectModalOpen(true);
                }
              }}
            >
              Reject request
            </Dropdown.Item>
          </Dropdown>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            {type === "courseRequest" ? (
              <>
                <Location />
                <p>Address</p>
              </>
            ) : (
              <>
                <Peoples />
                <p>60</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseRequest;
