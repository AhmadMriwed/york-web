import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { submitCourseType } from "@/types/adminTypes/courses/coursesTypes";

import { Location, More, Peoples } from "@rsuite/icons";

import { Dropdown, IconButton } from "rsuite";
import CauseModal from "@/components/courses/CauseModal";
import InvoiceModal from "@/components/courses/InvoiceModal";
import Image from "next/image";

const CourseRequest = ({
  loc,
  details,
  acceptModalOpen,
  setAcceptModalOpen,
  rejectModalOpen,
  setRejectModalOpen,
  invoiceModalOpen,
  setInvoiceModalOpen,
}: {
  loc?: "courseAd" | "courseRequest" | "courseSubmit";
  details?: submitCourseType;
  acceptModalOpen?: boolean;
  setAcceptModalOpen?: any;
  rejectModalOpen?: boolean;
  setRejectModalOpen?: any;
  invoiceModalOpen?: boolean;
  setInvoiceModalOpen?: any;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

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
      {loc === "courseAd" && (
        <>
          <CauseModal
            role="reject"
            submitId={details?.id}
            modalOpen={rejectModalOpen}
            setModalOpen={setRejectModalOpen}
          />
          <InvoiceModal
            modalOpen={invoiceModalOpen}
            setModalOpen={setInvoiceModalOpen}
            submitInfo={details}
          />
        </>
      )}

      {loc === "courseRequest" && (
        <>
          <CauseModal
            role="reject"
            submitId={details?.id}
            modalOpen={rejectModalOpen}
            setModalOpen={setRejectModalOpen}
          />
          <CauseModal
            role="accept"
            submitId={details?.id}
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
            {details?.user.image && (
              <Image
                src={details?.user.image}
                width={40}
                height={40}
                alt="user image"
                className="rounded-full"
              />
            )}

            <div>
              <p className="font-bold">
                {details?.user_id &&
                  details.user.first_name &&
                  details.user.last_name &&
                  `${details?.user_id}. ${
                    details.user.first_name + " " + details.user.last_name
                  }`}
              </p>
              <div className="mt-1 flex items-center flex-wrap gap-2">
                <p className="m-0 text-[12px]">
                  {details?.code && `#${details.code}`}
                </p>
                <span>|</span>
                <p className="m-0 text-[12px]">
                  {details?.user.phone_number && details?.user.phone_number}
                </p>
                <span>|</span>
                <p className="m-0 text-[12px]">
                  {details?.user.email && details?.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-2">
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={() => {
                if (loc === "courseSubmit" || loc === "courseAd") {
                  router.push(
                    `/admin-dashboard/courses/submit-courses/${details?.id}`
                  );
                }
              }}
            >
              Show Details
            </Dropdown.Item>

            {loc === "courseAd" && (
              <>
                <Dropdown.Item
                  className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                  onClick={() => {
                    setInvoiceModalOpen(true);
                  }}
                >
                  Accept request
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                  onClick={() => {
                    setRejectModalOpen(true);
                  }}
                >
                  Reject request
                </Dropdown.Item>
              </>
            )}

            {loc === "courseSubmit" && details?.status === "Pending" && (
              <>
                <Dropdown.Item
                  className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                  onClick={() => {}}
                >
                  Accept request
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                  onClick={() => {}}
                >
                  Reject request
                </Dropdown.Item>
              </>
            )}
          </Dropdown>

          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            {loc === "courseRequest" ? (
              <>
                <Location />
                <p>Address</p>
              </>
            ) : (
              <>
                <Peoples />
                <p>{details?.num_people}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseRequest;
