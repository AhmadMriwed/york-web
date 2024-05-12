"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseUserOperationCopmleted,
  getCourseTrainees,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import {
  getCoursePermissions,
  getTrainees,
} from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import CourseUser from "@/components/courses/CourseUser";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/empty-result/EmptyResult";
import AddJoinedUserModal from "@/components/courses/AddJoinedUserModal";

const JoinedTrainees = ({ params }: any) => {
  const { id } = params;

  const [addModal, setAddModal] = useState(false);

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

  useEffect(() => {
    dispatch(getCoursePermissions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTrainees(""));
  }, [dispatch]);

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header
        title="Course Trainees"
        btnTitle="Add Trainee"
        btnAction={() => setAddModal(true)}
      />
      <AddJoinedUserModal
        modalOpen={addModal}
        setModalOpen={setAddModal}
        userType="trainee"
        courseId={id}
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
        ) : courseTrainees.length > 0 ? (
          courseTrainees.map((user) => (
            <CourseUser key={user.id} user={user} userType="trainee" />
          ))
        ) : (
          <EmptyResult />
        )}
      </div>
    </section>
  );
};

export default JoinedTrainees;
