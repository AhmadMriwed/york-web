"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseUserOperationCopmleted,
  getCourseTrainers,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import {
  getCoursePermissions,
  getTrainers,
} from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import CourseUser from "@/components/courses/CourseUser";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/EmptyResult/EmptyResult";

const JoinedTrainers = ({ params }: any) => {
  const { id } = params;

  const [addModal, setAddModal] = useState(false);

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

  useEffect(() => {
    dispatch(getCoursePermissions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTrainers(""));
  }, [dispatch]);

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header
        title="Course Trainers"
        btnTitle="Add Trainer"
        btnAction={() => setAddModal(true)}
      />
      <OperationAlert
        status={status}
        error={operationError}
        messageOnError={`Oops! ${operationError}`}
        messageOnSuccess="The operation was completed successfuly"
        completedAction={courseUserOperationCopmleted}
      />

      <div className="mt-7 sm:px-11">
        {isLoading ? (
          <Loading />
        ) : courseTrainers.length > 0 ? (
          courseTrainers.map((user) => (
            <CourseUser
              key={user.id}
              user={user}
              userType="trainer"
              addModal={addModal}
              setAddModal={setAddModal}
              courseId={id}
            />
          ))
        ) : (
          <EmptyResult />
        )}
      </div>
    </section>
  );
};

export default JoinedTrainers;
