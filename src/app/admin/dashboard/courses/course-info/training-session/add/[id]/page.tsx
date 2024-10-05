"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSession } from "@/store/adminstore/slices/sessions/sessionsActions";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import { getUTCDate } from "@/utils/dateFuncs";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import OperationAlert from "@/components/Pars/OperationAlert";
import SessionOperation from "@/components/sessions/SessionOperation";

const AddSession = ({ params }: any) => {
  const { id } = params;

  const { operationLoading, operationError, status } = useSelector(
    (state: GlobalState) => state.sessions
  );

  const dispatch = useDispatch<any>();

  const initialValues = {
    course_id: id,
    code: "",
    title: "",
    date_from: new Date(),
    date_to: new Date(),
    image: null,
    status: "Active",
    outline: "",
    description: "",
    files: [],
    training_sessions_type: null,
    url: "",
  };

  const submitHandler = (values: any, actions: any) => {
    const data: any = {
      ...values,
      date_from: getUTCDate(values.date_from),
      date_to: getUTCDate(values.date_to),
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === "") {
        delete data[key];
      }
    });

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    dispatch(createSession(formData));
  };

  return (
    <section className="p-3 sm:p-6">
      <Header title="Add New Session" />
      <SessionOperation
        initialValues={initialValues}
        submitHandler={submitHandler}
        operationLoading={operationLoading}
        op="add"
        courseId={id}
      />
      <OperationAlert
        messageOnSuccess="operation accomplished successfully"
        messageOnError={`Oops! ${operationError}`}
        status={status}
        error={operationError}
        completedAction={sessionOperationCompleted}
      />
    </section>
  );
};

export default AddSession;
