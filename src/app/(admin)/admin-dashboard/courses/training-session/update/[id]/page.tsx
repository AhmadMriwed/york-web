"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSessionInfo,
  updateSession,
} from "@/store/adminstore/slices/sessions/sessionsActions";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import { getUTCDate } from "@/utils/dateFuncs";
import { GlobalState } from "@/types/storeTypes";
/* components */
import Header from "@/components/Pars/Header";
import SessionOperation from "@/components/sessions/SessionOperation";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";

const UpdateSession = ({ params }: any) => {
  const { id } = params;

  const { operationLoading, operationError, status } = useSelector(
    (state: GlobalState) => state.sessions
  );
  const { sessionLoading, sessionError, sessionInfo } = useSelector(
    (state: GlobalState) => state.sessions
  );
  const dispatch: any = useDispatch();

  const submitHandler = (values: any) => {
    const data = {
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

    dispatch(updateSession({ data: formData, id }));
  };

  useEffect(() => {
    dispatch(getSessionInfo(id));
  }, [dispatch, id]);

  if (sessionLoading) {
    return <Loading />;
  }

  if (sessionError)
    return (
      <ErrorMessage msg="Oops! There was an error, please try again later." />
    );

  const initialValues = {
    code: "",
    title: sessionInfo?.title ? sessionInfo?.title : "",
    date_from: sessionInfo?.date_from
      ? new Date(sessionInfo.date_from)
      : new Date(),
    date_to: sessionInfo?.date_to ? new Date(sessionInfo.date_to) : new Date(),
    image: null,
    status: sessionInfo?.status ? sessionInfo?.status : "",
    outline: sessionInfo?.outline ? sessionInfo?.outline : "",
    description: sessionInfo?.description ? sessionInfo?.description : "",
    files: [],
    training_sessions_type: sessionInfo?.training_session_type
      ? sessionInfo.training_session_type.id
      : null,
    url: sessionInfo?.url ? sessionInfo?.url : "",
  };

  return (
    <div className="px-2 pt-2 lg:px-14 lg:pt-4">
      <Header
        title="Update Session"
        description="Modify just the fields that you want to update then click 'Update Session'."
      />

      <SessionOperation
        submitHandler={submitHandler}
        initialValues={initialValues}
        operationLoading={operationLoading}
        op="update"
      />

      <OperationAlert
        messageOnSuccess="operation accomplished successfully!"
        messageOnError="Oops! There was an error, please try again later."
        status={status}
        error={operationError}
        completedAction={sessionOperationCompleted}
      />
    </div>
  );
};

export default UpdateSession;
