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

import Header from "@/components/pars/Header";
import Loading from "@/components/pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import EmptyResult from "@/components/empty-result/EmptyResult";
import OperationAlert from "@/components/pars/OperationAlert";
import FilteringBar from "@/components/pars/FilteringBar";
import { submitCourseType } from "@/types/adminTypes/courses/coursesTypes";

import dynamic from "next/dynamic";
const CourseRequest = dynamic(
  () => import("@/components/courses/CourseRequest"),
  {
    ssr: false,
  }
);

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

      {operationLoading && <Loading backdrop />}

      <FilteringBar
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        filterData={filters}
        dataLength={submitCourses.length}
      />

      {isLoading ? (
        <Loading />
      ) : submitCourses.length > 0 ? (
        <div className="mt-7 sm:px-11">
          {submitCourses.map((submitCourse: submitCourseType) => (
            <CourseRequest key={submitCourse.id} details={submitCourse} />
          ))}
        </div>
      ) : (
        <EmptyResult />
      )}
    </section>
  );
};

export default SubmitCourses;
