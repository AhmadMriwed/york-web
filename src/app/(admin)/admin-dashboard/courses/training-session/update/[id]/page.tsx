"use client";
import { useEffect, useState } from "react";
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
import ConfirmModal from "@/components/Pars/ConfirmModal";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loading from "@/components/Pars/Loading";

const UpdateSession = ({ params }: any) => {
  const { id } = params;
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const { operationLoading, operationError, updateStatus } = useSelector(
    (state: GlobalState) => state.sessions
  );
  const { sessionLoading, sessionError, sessionInfo } = useSelector(
    (state: GlobalState) => state.sessions
  );
  const dispatch: any = useDispatch();

  const submitHandler = (values: any) => {
    const data = {
      ...values,
      course_id: 1,
      date_from: getUTCDate(values.date_from),
      date_to: getUTCDate(values.date_to),
    };

    if (!(data.image instanceof File)) {
      delete data.image;
    }

    const formData = new FormData(); //TMP
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
    code: sessionInfo?.code,
    title: sessionInfo?.title,
    date_from: sessionInfo && new Date(sessionInfo.date_from),
    date_to: sessionInfo && new Date(sessionInfo.date_to),
    image: sessionInfo?.image,
    status: sessionInfo?.status,
    outline: sessionInfo?.outline,
    description: sessionInfo?.description,
    files: sessionInfo?.files,
    training_sessions_type: sessionInfo?.training_session_type
      ? sessionInfo.training_session_type.id
      : 0,
    url: sessionInfo?.url,
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
      <ConfirmModal
        open={confirmOpen}
        setOpen={setConfirmOpen}
        successMsg="The session was updated successfully."
        failMsg="Oops! There was an error, please try again later."
        status={updateStatus}
        error={operationError}
        completed={sessionOperationCompleted}
      />
    </div>
  );
};

export default UpdateSession;
