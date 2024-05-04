"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { getSubmitCoursesByType } from "@/store/adminstore/slices/courses/submit-courses/submitCoursesSlice";

import Header from "@/components/Pars/Header";
import CourseRequest from "@/components/courses/CourseRequest";
import Loading from "@/components/Pars/Loading";

const filters = ["Current", "Expired", "Rejected", "Accepted"];

const SubmitCourses = () => {
  const [filterBy, setFilterBy] = useState<string>("Current");

  const { submitCourses, isLoading, error } = useSelector(
    (state: GlobalState) => state.submitCourses
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getSubmitCoursesByType(filterBy));
  }, [dispatch, filterBy]);

  return (
    <section className="p-3 sm:p-6">
      <Header title="Submit Courses" />

      <div className="border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center sm:px-11 mt-4">
        {filters.map((btnName) => (
          <button
            key={btnName}
            onClick={() => setFilterBy(btnName)}
            className={`py-2 sm:px-4 text-[14px] sm:text-[16px] font-[500] ${
              filterBy === btnName
                ? "border-b-2 border-[var(--primary-color1)]"
                : ""
            }`}
          >
            {btnName}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-7 sm:px-11">
          {submitCourses.map((submitCourse) => (
            <CourseRequest
              key={submitCourse.id}
              loc="courseSubmit"
              details={submitCourse}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SubmitCourses;
