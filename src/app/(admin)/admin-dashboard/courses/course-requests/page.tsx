"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseRequestOperationCompleted,
  getCourseRequests,
} from "@/store/adminstore/slices/courses/course-requests/courseRequestsSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import EmptyResult from "@/components/EmptyResult/EmptyResult";
import TrainerCourseRequest from "@/components/courses/TrainerCourseRequest";
import OperationAlert from "@/components/Pars/OperationAlert";

const CourseRequests = () => {
  const [filterBy, setFilterBy] = useState("Current");

  const {
    isLoading,
    error,
    courseRequests,
    status,
    operationError,
    operationLoading,
  } = useSelector((state: GlobalState) => state.courseRequests);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseRequests(filterBy));
  }, [dispatch, filterBy]);

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header title="Course Requests" />
      <OperationAlert
        messageOnError={`Oops! ${operationError}`}
        messageOnSuccess="The operation was completed successfuly"
        status={status}
        error={operationError}
        completedAction={courseRequestOperationCompleted}
      />

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
        {isLoading ? (
          <Loading />
        ) : courseRequests.length > 0 ? (
          courseRequests.map((course: any) => (
            <TrainerCourseRequest key={course.id} course={course} />
          ))
        ) : (
          <EmptyResult />
        )}
      </div>
    </section>
  );
};

export default CourseRequests;
