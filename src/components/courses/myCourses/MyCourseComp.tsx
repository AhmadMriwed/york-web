import React, { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getLocalDate } from "@/utils/dateFuncs";

import { Calendar } from "@rsuite/icons";
import { CiLocationOn } from "react-icons/ci";

import Image from "next/image";

import tmpImage from "@/../public/avatar.png";
import { useRouter } from "next/navigation";

const MyCourseComp = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <div
      className="relative flex element-center before:absolute before:w-[100px] before:h-[100px] before:bg-[var(--primary-color1)]
      before:rounded-[50%] before:right-0 before:top-0 before:transition-all before:duration-300 before:ease-in-out
      hover:before:translate-x-[-25px] hover:before:translate-y-[25px]"
    >
      <div
        className="p-3 border-l border-l-[6px] border-l-[var(--primary-color2)] rounded-md min-w-[275px] cursor-pointer relative
      backdrop-blur-2xl bg-cardDarkBg"
        // style={{ backgroundColor: "rgba(65, 65, 65, 0.308)" }}
        onClick={() => router.push("/admin-dashboard/courses/course-info/6")}
      >
        <div className="flex justify-between gap-11">
          <p className="text-[16px] font-[500]">UI/UX Design</p>
          <p className="px-1 m-0 rounded-full bg-gray-600 text-[12px] font-bold element-center">
            #14255
          </p>
        </div>
        <div className="text-[10px] sm:text-[12px] flex items-center gap-1 mt-4">
          <Calendar />
          <p>{`${getLocalDate(new Date())} - ${getLocalDate(new Date())}`}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Image
            src={tmpImage}
            alt="user"
            width={20}
            height={20}
            className="!rounded-full"
          />
          <p className="">Ahmad Ebrahim</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`bg-[var(--dark-bg-color)] text-[var(--dark-text-color)] w-fit] py-[1.5px] px-[12px] sm:py-[3px]
        flex justify-center items-center gap-1 mt-2 w-fit rounded-full`}
          >
            <CiLocationOn />
            <p className="text-[10px] sm:text-[12px]">London</p>
          </div>
          <div
            className={`bg-[var(--dark-bg-color)] text-[var(--dark-text-color)] w-fit] py-[1.5px] px-[12px] sm:py-[3px]
        flex justify-center items-center gap-1 mt-2 w-fit rounded-full`}
          >
            <p className="text-[10px] sm:text-[12px]">Web development</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-[24px] font-bold">21</span> hours
        </div>
      </div>
    </div>
  );
};

export default MyCourseComp;
