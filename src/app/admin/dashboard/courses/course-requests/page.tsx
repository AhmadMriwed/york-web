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
import ErrorMessage from "@/components/error-message/ErrorMessage";
import EmptyResult from "@/components/empty-result/EmptyResult";
import TrainerCourseRequest from "@/components/courses/TrainerCourseRequest";
import OperationAlert from "@/components/Pars/OperationAlert";
import FilteringBar from "@/components/Pars/FilteringBar";

const filterData = ["Current", "Rejected", "Accepted"];

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

      {operationLoading && <Loading backdrop />}

      <FilteringBar
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        filterData={filterData}
        dataLength={courseRequests.length}
      />

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
