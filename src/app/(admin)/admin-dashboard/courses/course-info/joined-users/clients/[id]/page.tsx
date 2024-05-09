"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseUserOperationCopmleted,
  getCourseClients,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import { getClients, getCoursePermissions } from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import CourseUser from "@/components/courses/CourseUser";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/EmptyResult/EmptyResult";
import AddJoinedUserModal from "@/components/courses/AddJoinedUserModal";

const JoinedClients = ({ params }: any) => {
  const { id } = params;

  const [addModal, setAddModal] = useState(false);

  const { isLoading, error, courseClients } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const { operationError, status } = useSelector(
    (state: GlobalState) => state.courseJoinedUsers
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseClients(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCoursePermissions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getClients(""));
  }, [dispatch]);

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header
        title="Course Clients"
        btnTitle="Add Client"
        btnAction={() => setAddModal(true)}
      />
      <AddJoinedUserModal
        modalOpen={addModal}
        setModalOpen={setAddModal}
        userType="client"
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
        ) : courseClients.length > 0 ? (
          courseClients.map((user) => (
            <CourseUser key={user.id} user={user} userType="client" />
          ))
        ) : (
          <EmptyResult />
        )}
      </div>
    </section>
  );
};

export default JoinedClients;
