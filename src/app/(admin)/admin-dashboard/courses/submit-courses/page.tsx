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
import ErrorMessage from "@/components/error-message/ErrorMessage";
import EmptyResult from "@/components/empty-result/EmptyResult";
import OperationAlert from "@/components/Pars/OperationAlert";
import FilteringBar from "@/components/Pars/FilteringBar";

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
