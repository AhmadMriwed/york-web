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
import ConfirmModal from "@/components/Pars/ConfirmModal";

const filteringBtns: string[] = ["Current", "Upcoming", "Expired"];

const TrainingSession = () => {
  const {
    isLoading,
    error,
    currentSessions,
    expiredSessions,
    upcomingSessions,
    operationError,
    duplicateStatus,
  } = useSelector((state: GlobalState) => state.sessions);
  const [filterBy, setFilterBy] = useState<string>("Current");
  const [duplicateOpen, setDuplicateOpen] = useState<boolean>(false);
  const router = useRouter();
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
    <section className="px-2 pt-2 lg:px-14 lg:pt-4">
      <ConfirmModal
        open={duplicateOpen}
        setOpen={setDuplicateOpen}
        successMsg="The session was duplicated successfully."
        failMsg="Oops! There was an error, please try again later."
        status={duplicateStatus}
        error={operationError}
        completed={sessionOperationCompleted}
      />
      <Header
        title="Sessions"
        description="Schedule all your Sessions , edit and track your teaching process."
        btnTitle="Add Session"
        btnAction={() =>
          router.push("/admin-dashboard/courses/training-session/add")
        }
      />
      <div className="flex gap-3 items-center flex-wrap mt-7">
        <div>
          <button className="outlined-btn flex justify-center items-center gap-2">
            <CiImport /> Import
          </button>
        </div>
        <div>
          <button className="outlined-btn flex justify-center items-center gap-2">
            <CiExport /> Export
          </button>
        </div>
      </div>
      {error ? (
        <ErrorMessage msg="Oops! There was an error, please try again later." />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mt-10 border-b-[1px] border-[#303030]">
            {filteringBtns.map((btnName) => (
              <button
                key={btnName}
                onClick={() => setFilterBy(btnName)}
                className={`py-2 px-2 sm:px-4 text-[14px] sm:text-[16px] ${
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
              <p className="text-[16px] text-center font-bold mt-7">{`There are no ${filterBy.toLocaleLowerCase()} sessions.`}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TrainingSession;
