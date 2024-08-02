import React from "react";
import { useRouter } from "next/navigation";
import { courseType } from "@/types/adminTypes/courses/coursesTypes";
import { getLocalDate } from "@/utils/dateFuncs";
import { Calendar } from "@rsuite/icons";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";

const MyCourse = ({ course }: { course: courseType }) => {
  const router = useRouter();

  return (
    <div
      className={`relative flex element-center before:absolute before:w-[75px] before:h-[75px] before:rounded-[50%]
      before:right-1 before:top-1 before:transition-all before:duration-300 before:ease-in-out hover:before:translate-x-[-25px]
      hover:before:translate-y-[25px] ${
        course.status === "Current"
          ? "before:bg-[var(--primary-color2)]"
          : course.status === "Accepted"
          ? "before:bg-green-400"
          : course.status === "Rejected"
          ? "before:bg-red-400"
          : course.status === "Expired"
          ? "before:bg-yellow-400"
          : ""
      }`}
    >
      <div
        className={`p-3 border-l border-l-[6px] rounded-md min-w-[325px] cursor-pointer relative
      backdrop-blur-2xl bg-[#9999993f] ${
        course.status === "Current"
          ? "border-l-[var(--primary-color2)]"
          : course.status === "Accepted"
          ? "border-l-green-400"
          : course.status === "Rejected"
          ? "border-l-red-400"
          : course.status === "Expired"
          ? "border-l-yellow-400"
          : ""
      }`}
        onClick={() => router.push("/admin-dashboard/courses/course-info/6")}
      >
        <div className="flex justify-between gap-11">
          <p className="text-[16px] font-[500]">
            {course?.title && course.title.slice(0, 16)}
          </p>
          <p className="px-1 m-0 rounded-full bg-gray-600 text-white text-[12px] font-bold element-center">
            {`#${course?.code && course.code}`}
          </p>
        </div>

        <div className="text-[10px] sm:text-[12px] flex items-center gap-1 mt-4">
          {course?.start_date && course?.end_date && (
            <>
              <Calendar />
              <p>{`${getLocalDate(
                new Date(course.start_date)
              )} - ${getLocalDate(new Date(course.end_date))}`}</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          {course?.owner && course?.owner?.image && (
            <Image
              src={course.owner.image}
              alt="owner image"
              width={20}
              height={20}
              className="!rounded-full"
            />
          )}
          <p className="">
            {course?.owner &&
              course?.owner?.first_name &&
              course?.owner?.last_name &&
              `${course.owner.first_name} ${course.owner.last_name}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`bg-[var(--dark-bg-color)] text-[var(--dark-text-color)] w-fit] py-[1.5px] px-[12px] sm:py-[3px]
        flex justify-center items-center gap-1 mt-2 w-fit rounded-full`}
          >
            <CiLocationOn />
            <p className="text-[10px] sm:text-[12px]">
              {course?.venue && course?.venue?.title && course.venue.title}
            </p>
          </div>

          <div
            className={`bg-[var(--dark-bg-color)] text-[var(--dark-text-color)] w-fit] py-[1.5px] px-[12px] sm:py-[3px]
        flex justify-center items-center gap-1 mt-2 w-fit rounded-full`}
          >
            <p className="text-[10px] sm:text-[12px]">
              {course?.category &&
                course?.category?.title &&
                course.category.title}
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <div className="">
            <span className="text-[24px] font-bold">
              {course?.houres && course.houres}
            </span>{" "}
            hours
          </div>
          <div className="text-[12px] font-[500]">
            {course.status && course.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
