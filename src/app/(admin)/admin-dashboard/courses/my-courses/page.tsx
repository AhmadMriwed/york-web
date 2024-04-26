"use client";
import React, { useRef, useState } from "react";

import Header from "@/components/Pars/Header";
import MyCourseComp from "@/components/courses/myCourses/MyCourseComp";
import { InputPicker } from "rsuite";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Filter from "@/components/courses/courseAds/Filter";
import Course from "@/components/courses/myCourses/Course";
import { useRouter } from "next/navigation";
import { CiExport, CiImport } from "react-icons/ci";

export default function MyCourses() {
  const router = useRouter();
  const [filterBy, setFilterBy] = useState("Current");
  const containerRef = useRef<any>(null);

  const scrollTo = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount =
        direction === "right" ? container.offsetWidth : -container.offsetWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-3 sm:p-6 overflow-hidden">
      <Header
        title="Courses"
        btnTitle="Add New Course"
        btnAction={() => router.push("/admin-dashboard/courses/add")}
      />
      <div className="my-4 flex flex-wrap items-center gap-2">
        <button className="outlined-btn flex justify-center items-center gap-1">
          <CiImport /> Import
        </button>
        <button className="outlined-btn flex justify-center items-center gap-1">
          <CiExport /> Export
        </button>
      </div>
      <div className="mt-4 p-3 bg-[#212A34] w-full rounded-lg text-white flex flex-col lg:flex-row gap-4 md:gap-11">
        <div className="border-l border-l-[2px] border-[var(--primary-color1)] pl-2 shrink-0">
          <p className="text-[24px] font-[400]">My Courses</p>
          <p className="text-[#888] m-0">check out all your current courses</p>
          <InputPicker
            data={[]}
            className="hover:!cursor-pointer mt-7"
            name="course-status"
            defaultValue="Currently"
            placeholder="Status"
            onChange={() => {}}
          />
        </div>
        <div className="flex items-center gap-2 overflow-hidden py-2 relative">
          <div
            className="flex items-center gap-2 overflow-x-scroll pb-2 no-scrollbar"
            ref={containerRef}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <MyCourseComp key={item} />
            ))}
          </div>
          <button
            onClick={() => scrollTo("left")}
            className="absolute top-[50%] left-0 translate-y-[-50%] rounded-full element-center p-3 hidden sm:block hover:scale-[1.1]"
            style={{ backgroundColor: "rgb(0, 0, 0, 0.3)" }}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => scrollTo("right")}
            className="absolute top-[50%] right-0 translate-y-[-50%] rounded-full element-center p-3 hidden sm:block hover:scale-[1.1]"
            style={{ backgroundColor: "rgb(0, 0, 0, 0.3)" }}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="my-4 element-center bg-gradient-to-b from-[#01395F] to-[#02B5A0] rounded-lg">
        <Filter />
      </div>
      <div className="border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center sm:px-11 my-4">
        {["Current", "Closed", "Expired"].map((btnName) => (
          <button
            key={btnName}
            onClick={() => setFilterBy(btnName)}
            className={`py-2 sm:px-4 text-[16px] font-[500] ${
              filterBy === btnName
                ? "border-b-2 border-[var(--primary-color1)]"
                : ""
            }`}
          >
            {btnName}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <InputPicker data={[]} placeholder="Show by" />
      </div>
      <div className="my-7 flex flex-col gap-2">
        {[1, 2, 3, 4].map((_, index) => (
          <Course key={index} />
        ))}
      </div>
    </section>
  );
}
