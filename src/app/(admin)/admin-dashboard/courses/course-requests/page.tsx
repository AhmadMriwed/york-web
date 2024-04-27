"use client";
import React, { useState } from "react";

import Header from "@/components/Pars/Header";
import CourseRequest from "@/components/courses/CourseRequest";

const CourseRequests = () => {
  const [filterBy, setFilterBy] = useState("Current");

  return (
    <section className="p-3 sm:p-6">
      <Header title="Course Requests" />

      <div className="border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center sm:px-11 mt-4">
        {["Current", "Rejected", "Accepted"].map((btnName) => (
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
      <div className="mt-7 sm:px-11">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <CourseRequest key={item} type="courseRequest" />
        ))}
      </div>
    </section>
  );
};

export default CourseRequests;
