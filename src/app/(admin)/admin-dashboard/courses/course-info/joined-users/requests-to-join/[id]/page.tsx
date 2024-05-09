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
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/EmptyResult/EmptyResult";

const RequestsToJoin = ({ params }: any) => {
  const { id } = params;

  const [filterBy, setFilterBy] = useState<"Current" | "Accepted" | "Rejected">(
    "Current"
  );

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

      <div className="border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center sm:px-11 mt-4">
        {["Current", "Rejected", "Accepted"].map((btnName: any) => (
          <button
            key={btnName}
            onClick={() => setFilterBy(btnName)}
            className={`py-2 sm:px-4 text-[16px] font-[500] ${
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
