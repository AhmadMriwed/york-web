"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubmitCoursesByType,
  submitCourseOperationCompleted,
} from "@/store/adminstore/slices/courses/submit-courses/submitCoursesSlice";
import {
  getCategories,
  getCurrencies,
  getVenues,
} from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import CourseRequest from "@/components/courses/CourseRequest";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import EmptyResult from "@/components/EmptyResult/EmptyResult";
import OperationAlert from "@/components/Pars/OperationAlert";

const filters = ["Current", "Expired", "Rejected", "Accepted"];

const SubmitCourses = () => {
  const [filterBy, setFilterBy] = useState<string>("Current");

  const {
    submitCourses,
    isLoading,
    error,
    operationError,
    operationLoading,
    status,
  } = useSelector((state: GlobalState) => state.submitCourses);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getSubmitCoursesByType(filterBy));
  }, [dispatch, filterBy]);

  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVenues(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrencies(""));
  }, [dispatch]);

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header title="Submit Courses" />

      <OperationAlert
        messageOnError={`Oops! ${operationError}`}
        messageOnSuccess="The operation was completed successfuly"
        error={operationError}
        status={status}
        completedAction={submitCourseOperationCompleted}
      />

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
          {submitCourses.length > 0 ? (
            submitCourses.map((submitCourse) => (
              <CourseRequest key={submitCourse.id} details={submitCourse} />
            ))
          ) : (
            <EmptyResult />
          )}
        </div>
      )}
    </section>
  );
};

export default SubmitCourses;
