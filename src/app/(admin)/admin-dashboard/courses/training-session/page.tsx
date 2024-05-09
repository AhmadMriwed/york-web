"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getSessionsByType } from "@/store/adminstore/slices/sessions/sessionsActions";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import { sessionType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
/* icons */
import { CiImport, CiExport } from "react-icons/ci";
/* components */
import Session from "@/components/sessions/Session";
import Header from "@/components/Pars/Header";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/EmptyResult/EmptyResult";

const filteringBtns: string[] = ["Current", "Upcoming", "Expired"];

const TrainingSession = () => {
  const {
    isLoading,
    error,
    currentSessions,
    expiredSessions,
    upcomingSessions,
    operationError,
    status,
  } = useSelector((state: GlobalState) => state.sessions);
  const [filterBy, setFilterBy] = useState<string>("Current");
  const dispatch: any = useDispatch();

  const sessions = useMemo(() => {
    if (filterBy === "Current") return currentSessions;
    if (filterBy === "Expired") return expiredSessions;
    if (filterBy === "Upcoming") return upcomingSessions;
    return [];
  }, [filterBy, currentSessions, expiredSessions, upcomingSessions]);

  // Fetch sessions
  useEffect(() => {
    dispatch(getSessionsByType("Current"));
    dispatch(getSessionsByType("Expired"));
    dispatch(getSessionsByType("Upcoming"));
  }, [dispatch]);

  return (
    <section className="px-2 pt-6 lg:px-6">
      <OperationAlert
        messageOnSuccess="operation accomplished successfully!"
        messageOnError="Oops! There was an error, please try again later."
        status={status}
        error={operationError}
        completedAction={sessionOperationCompleted}
      />
      <Header
        title="Sessions"
        description="Schedule all your Sessions , edit and track your teaching process."
      />

      {error ? (
        <ErrorMessage msg="Oops! There was an error, please try again later." />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mt-7 border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center">
            {filteringBtns.map((btnName) => (
              <button
                key={btnName}
                onClick={() => setFilterBy(btnName)}
                className={`py-2 sm:px-4 text-[14px] sm:text-[16px] ${
                  filterBy === btnName
                    ? "border-b-2 border-[var(--primary-color1)]"
                    : ""
                }`}
              >
                {btnName}
                {btnName === "Current"
                  ? `(${currentSessions.length})`
                  : btnName === "Expired"
                  ? `(${expiredSessions.length})`
                  : `(${upcomingSessions.length})`}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {sessions.length > 0 ? (
              sessions.map((session: sessionType, index: number) => (
                <Session key={index} session={session} />
              ))
            ) : (
              <EmptyResult />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TrainingSession;
