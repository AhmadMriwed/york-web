import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { submitCourseType } from "@/types/adminTypes/courses/coursesTypes";
import { Check, Close, More, Peoples, Wait } from "@rsuite/icons";
import { Dropdown, IconButton } from "rsuite";
import CauseModal from "@/components/courses/CauseModal";
import InvoiceModal from "@/components/courses/InvoiceModal";
import Image from "next/image";
import RejectionCauseModal from "./RejectionCauseModal";

const CourseRequest = ({ details }: { details?: submitCourseType }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const router = useRouter();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionCauseModalOpen, setRejectionCauseModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

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
    <div
      className={`flex justify-between items-start gap-0.5 mt-4 p-3 rounded-md ${
        mode === "dark" ? "bg-[var(--dark-bg-color)]" : "bg-white text-[#000]"
      }`}
    >
      <CauseModal
        role="reject"
        loc="submit"
        id={details?.id}
        modalOpen={rejectModalOpen}
        setModalOpen={setRejectModalOpen}
      />
      <InvoiceModal
        modalOpen={invoiceModalOpen}
        setModalOpen={setInvoiceModalOpen}
        submitInfo={details}
      />
      <RejectionCauseModal
        modalOpen={rejectionCauseModalOpen}
        setModalOpen={setRejectionCauseModalOpen}
        adminCause={details?.cause}
      />

      <div>
        <div className="flex items-start gap-2.5">
          {details?.user && details?.user?.image && (
            <Image
              src={details.user.image}
              width={40}
              height={40}
              alt="user image"
              className="rounded-full"
            />
          )}
          <div className="flex flex-col gap-1">
            <div>
              <p className="font-bold">
                {details?.user_id &&
                  details?.user?.first_name &&
                  details?.user?.last_name &&
                  `${details?.user_id}. ${
                    details.user.first_name + " " + details.user.last_name
                  }`}
              </p>
              <p className="text-[12px] font-bold">
                {details?.title && details.title}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[12px]">
                {details?.code && `#${details.code}`}
              </p>
              <p className="m-0 text-[12px]">
                {details?.user &&
                  details?.user?.phone_number &&
                  details.user.phone_number}
              </p>
              <p className="m-0 text-[12px] break-all">
                {details?.user && details?.user?.email && details.user.email}
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
              router.push(
                `/admin/dashboard/courses/submit-courses/${details?.id}`
              );
            }}
          >
            Show Details
          </Dropdown.Item>
          {(details?.status === "Pending" || details?.status === null) && (
            <>
              <Dropdown.Item
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={() => setInvoiceModalOpen(true)}
              >
                Accept request
              </Dropdown.Item>
              <Dropdown.Item
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={() => setRejectModalOpen(true)}
              >
                Reject request
              </Dropdown.Item>
            </>
          )}
        </Dropdown>
        {(details?.status === "Pending" || details?.status === null) && (
          <div className="py-1 px-2 bg-[var(--primary-color1)] rounded-full element-center gap-1 text-[12px] text-white font-[500]">
            <Wait /> Pending
          </div>
        )}
        {details?.status === "Accepted" && (
          <div className="py-1 px-2 bg-green-500 rounded-full element-center gap-1 text-[12px] text-white font-[500]">
            <Check /> Accepted
          </div>
        )}
        {details?.status === "Rejected" && (
          <div
            className="py-1 px-2 bg-red-500 rounded-full element-center gap-1 text-[12px] text-white font-[500] cursor-pointer"
            onClick={() => setRejectionCauseModalOpen(true)}
          >
            <Close /> Rejected
          </div>
        )}
        {details?.num_people && (
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <Peoples />
            <p>{details.num_people}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRequest;
