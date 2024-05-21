import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { submitCourseType } from "@/types/adminTypes/courses/coursesTypes";
import { Check, Close, More, Peoples, Wait } from "@rsuite/icons";
import { Dropdown, IconButton } from "rsuite";
import CauseModal from "@/components/courses/CauseModal";
import InvoiceModal from "@/components/courses/InvoiceModal";
import Image from "next/image";

const CourseRequest = ({ details }: { details?: submitCourseType }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const router = useRouter();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
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
      className={`flex justify-between items-center mt-4 p-3 rounded-md ${
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

      <div>
        <div className="flex items-start gap-2">
          {details?.user && details?.user?.image && (
            <Image
              src={details.user.image}
              width={40}
              height={40}
              alt="user image"
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-bold">
              {details?.user_id &&
                details?.user?.first_name &&
                details?.user?.last_name &&
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
                {details?.user &&
                  details?.user?.phone_number &&
                  details.user.phone_number}
              </p>
              <span>|</span>
              <p className="m-0 text-[12px]">
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
                `/admin-dashboard/courses/submit-courses/${details?.id}`
              );
            }}
          >
            Show Details
          </Dropdown.Item>
          {details?.status === "Pending" && (
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
        {details?.status === "Pending" && (
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
          <div className="py-1 px-2 bg-red-500 rounded-full element-center gap-1 text-[12px] text-white font-[500]">
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
