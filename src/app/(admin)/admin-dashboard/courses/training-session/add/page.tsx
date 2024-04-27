"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import { createSession } from "@/store/adminstore/slices/sessions/sessionsActions";
import { GlobalState } from "@/types/storeTypes";
import { getUTCDate } from "@/utils/dateFuncs";
/* components */
import Header from "@/components/Pars/Header";
import SessionOperation from "@/components/sessions/SessionOperation";
import NewSessionModal from "@/components/sessions/NewSessionModal";
import OperationAlert from "@/components/Pars/OperationAlert";

const AddNewSession = () => {
  const { operationLoading, operationError, status } = useSelector(
    (state: GlobalState) => {
      return state.sessions;
    }
  );
  const dispatch: any = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const submitHandler: any = (values: any) => {
    const data: any = {
      ...values,
      course_id: 1,
      date_from: getUTCDate(values.date_from),
      date_to: getUTCDate(values.date_to),
    };

    if (!(data.image instanceof File)) {
      delete data.image;
    }

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    dispatch(createSession(formData));
  };

  const initialValues = {
    code: "",
    title: "",
    date_from: new Date(),
    date_to: new Date(),
    image: null,
    status: "Active",
    outline: "",
    description: "",
    files: [],
    training_sessions_type: 0,
    url: "",
  };

  return (
    <div className="px-2 pt-2 lg:px-14 lg:pt-4">
      <Header
        title="Add New Session"
        description="Would you like to import data from previous sessions? Simply click on
          'Select Session'."
        btnTitle="Select Session"
        btnAction={() => setModalOpen(true)}
      />
      <SessionOperation
        submitHandler={submitHandler}
        initialValues={initialValues}
        operationLoading={operationLoading}
        op="add"
      />
      <NewSessionModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <OperationAlert
        messageOnSuccess="The session was added successfully."
        messageOnError="Oops! There was an error, please try again later."
        status={status}
        error={operationError}
        completedAction={sessionOperationCompleted}
      />
    </div>
  );
};

export default AddNewSession;
