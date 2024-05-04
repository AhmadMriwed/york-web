"use client";
import React, { useEffect } from "react";

import Header from "@/components/Pars/Header";
import CourseUser from "@/components/courses/CourseUser";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import {
  courseUserOperationCopmleted,
  getCourseTrainees,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";

const JoinedTrainees = ({ params }: any) => {
  const { id } = params;

  const { isLoading, error, courseTrainees } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const { operationError, status } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseTrainees(id));
  }, [dispatch, id]);

  console.log(courseTrainees);

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header
        title="Course Trainees"
        btnTitle="Add Trainee"
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
        {courseTrainees.map((user) => (
          <CourseUser key={user.id} user={user} userType="trainee" />
        ))}
      </div>
    </section>
  );
};

export default JoinedTrainees;
