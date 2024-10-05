"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseUserOperationCopmleted,
  getRequestsToJoin,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import { getCoursePermissions } from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import UserRequest from "@/components/courses/UserRequest";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/empty-result/EmptyResult";
import FilteringBar from "@/components/Pars/FilteringBar";

const filterData = ["Current", "Rejected", "Accepted"];

const RequestsToJoin = ({ params }: any) => {
  const { id } = params;

  const [filterBy, setFilterBy] = useState<string>("Current");

  const { isLoading, error, requestsToJoin, status, operationError } =
    useSelector((state: GlobalState) => state.courseJoinedUsers);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getRequestsToJoin({ id: id, type: filterBy }));
  }, [dispatch, id, filterBy]);

  useEffect(() => {
    dispatch(getCoursePermissions());
  }, [dispatch]);

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header title="Requests to Join" />
      <OperationAlert
        status={status}
        error={operationError}
        messageOnError={`Oops! ${operationError}`}
        messageOnSuccess="The operation was completed successfuly"
        completedAction={courseUserOperationCopmleted}
      />

      <FilteringBar
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        filterData={filterData}
        dataLength={requestsToJoin.length}
      />

      {isLoading ? (
        <Loading />
      ) : requestsToJoin.length > 0 ? (
        <div className="mt-7 sm:px-11">
          {requestsToJoin.map((request) => (
            <UserRequest key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <EmptyResult />
      )}
    </section>
  );
};

export default RequestsToJoin;
