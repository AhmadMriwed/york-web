"use client";

import { useContext } from "react";
import { ThemeContext } from "../pars/ThemeContext";
import { Progress } from "rsuite";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdMenuBook } from "react-icons/md";

export default function MyCoursesStatistics() {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const Course = () => {
    return (
      <div
        className={`${
          mode === "dark"
            ? "bg-[#1A2532] text-[var(--light-text-color)]"
            : "bg-white"
        } rounded-[10px] h-[190px] min-w-[190px] `}
      >
        <div
          className={`${
            mode === "dark"
              ? "bg-[#CCD5DF] text-[#1A2532]"
              : "bg-[#202933] text-white"
          } px-2 pt-1 rounded-t-[10px] h-[60px]`}
        >
          <h4 className="font-semibold text-[17px] leading-[1.5]">UI Design</h4>
          <p className=" leading-[1.5]">Creative design</p>
        </div>

        <div className="p-2 flex flex-col justify-between h-[130px]">
          <div className="flex justify-between gap-[5px] flex-wrap items-center h-[70px] text-[#A7A7A7]">
            <div className="text-[10px] flex gap-[5px] items-center">
              <RiGraduationCapLine className="text-[10px]" />
              <p className="m-0">200 students</p>
            </div>
            <div className="text-[10px] flex gap-[3px] items-center">
              <MdMenuBook className="text-[13px]" />
              <p className="m-0">200 lessions</p>
            </div>
          </div>
          <div>
            <Progress.Line
              percent={30}
              status="active"
              showInfo={false}
              strokeColor="#5BD4DD"
              className="bg-transparent [&>div>.rs-progress-line-inner]:!h-[5px] [&>div>.rs-progress-line-inner]:!bg-[#a7a7a70d] [&>div>div>.rs-progress-line-bg]:!h-[5px] [&>div>div>.rs-progress-line-bg]:!bg-[#5BD4DD] p-0"
            />
            <p className="text-[12px] text-[#A7A7A7] mt-[10px]">
              Completed 65%
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 pt-2 max-w-full overflow-hidden">
      <header className="flex justify-between items-center flex-wrap mb-[10px]">
        <h3 className="text-[20px] leading-[1.3]">My Courses</h3>
        <button className="w-[90px] md:w-[100px] p-[5px] bg-[var(--primary-color1)] rounded-[6px]">
          Button
        </button>
      </header>
      <div className="rounded-box w-[70vw] sm:w-[80vw] md:w-[65vw] xl:w-[660px] inline-flex gap-[20px] overflow-x-auto hide-scrollebar pe-2 ">
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
      </div>
    </div>
  );
}
