"use client";
import React, { useEffect } from "react";

import Header from "@/components/Pars/Header";
import CourseUser from "@/components/courses/CourseUser";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import {
  courseUserOperationCopmleted,
  getCourseTrainers,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";

const JoinedTrainers = ({ params }: any) => {
  const { id } = params;

  const { isLoading, error, courseTrainers } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const { operationError, status } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseTrainers(id));
  }, [dispatch, id]);

  console.log(courseTrainers);

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header
        title="Course Trainers"
        btnTitle="Add Trainer"
        btnAction={() => {}}
      />
      <OperationAlert
        status={status}
        error={operationError}
        messageOnError={`Oops! ${operationError}`}
        messageOnSuccess="The operation was completed successfuly"
        completedAction={courseUserOperationCopmleted}
      />

      <div className="mt-7 sm:px-11">
        {courseTrainers.map((user) => (
          <CourseUser key={user.id} user={user} userType="trainer" />
        ))}
      </div>
    </section>
  );
};

export default JoinedTrainers;
