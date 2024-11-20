import React, { useContext, useState } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { courseType } from "@/types/adminTypes/courses/coursesTypes";
import { Check, Close, Location, More } from "@rsuite/icons";
import { Dropdown, IconButton } from "rsuite";
import CauseModal from "@/components/courses/CauseModal";
import Image from "next/image";

const TrainerCourseRequest = ({ course }: { course: courseType }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);

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
        loc="course-request"
        id={course.id}
        modalOpen={rejectModalOpen}
        setModalOpen={setRejectModalOpen}
      />
      <CauseModal
        role="accept"
        loc="course-request"
        id={course.id}
        modalOpen={acceptModalOpen}
        setModalOpen={setAcceptModalOpen}
      />

      <div>
        <div className="flex items-start gap-2">
          {course?.owner?.image && (
            <Image
              src={course.owner.image}
              width={40}
              height={40}
              alt="user image"
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-bold">
              {course?.owner_id &&
                course?.owner &&
                course?.owner?.first_name &&
                course?.owner?.last_name &&
                `${course.owner_id}. ${
                  course.owner.first_name + " " + course.owner.last_name
                }`}
            </p>
            <div className="mt-1 flex items-center flex-wrap gap-2">
              <p className="m-0 text-[12px]">
                {course?.code && `#${course.code}`}
              </p>
              <span>|</span>
              <p className="m-0 text-[12px]">
                {course?.owner &&
                  course?.owner?.phone_number &&
                  course.owner.phone_number}
              </p>
              <span>|</span>
              <p className="m-0 text-[12px]">
                {course?.owner && course?.owner?.email && course.owner.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-4">
        {course?.status === "Current" && (
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={() => setAcceptModalOpen(true)}
            >
              Accept request
            </Dropdown.Item>
            <Dropdown.Item
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={() => setRejectModalOpen(true)}
            >
              Reject request
            </Dropdown.Item>
          </Dropdown>
        )}
        {course?.status === "Accepted" && (
          <div className="py-1 px-2 bg-green-500 rounded-full element-center gap-1 text-[12px] text-white font-[500]">
            <Check /> Accepted
          </div>
        )}
        {course?.status === "Rejected" && (
          <div className="py-1 px-2 bg-red-500 rounded-full element-center gap-1 text-[12px] text-white font-[500]">
            <Close /> Rejected
          </div>
        )}
        <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
          <Location />
          <p>{course?.location && course.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerCourseRequest;
