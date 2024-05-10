"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getCourseSessionsByType } from "@/store/adminstore/slices/sessions/sessionsActions";
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
import EmptyResult from "@/components/EmptyResult/EmptyResult";
import OperationAlert from "@/components/Pars/OperationAlert";

const filteringBtns: string[] = ["Current", "Upcoming", "Expired"];

const CourseTrainingSession = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();

  const [filterBy, setFilterBy] = useState<string>("Current");

  const {
    operationError,
    operationLoading,
    status,
    allSessions,
    isLoading,
    error,
  } = useSelector((state: GlobalState) => state.sessions);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseSessionsByType({ type: filterBy, id: id }));
  }, [dispatch, id, filterBy]);

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="px-2 pt-6 lg:px-6">
      <Header
        title="Sessions"
        description="Schedule all your Sessions , edit and track your teaching process."
        btnTitle="Add New Session"
        btnAction={() =>
          router.push(
            `/admin-dashboard/courses/course-info/training-session/add/${id}`
          )
        }
      />
      <OperationAlert
        messageOnSuccess="The operation was completed successfuly"
        messageOnError={`Oops! ${operationError}`}
        error={operationError}
        status={status}
        completedAction={sessionOperationCompleted}
      />

      {operationLoading && <Loading backdrop />}

      {/* <div className="flex items-center gap-2 mt-7">
        <button className="outlined-btn flex justify-center items-center gap-1">
          <CiImport /> Import
        </button>
        <button className="outlined-btn flex justify-center items-center gap-1">
          <CiExport /> Export
        </button>
      </div> */}

      <div>
        <div className="mt-7 border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center">
          {filteringBtns.map((btnName) => (
            <button
              key={btnName}
              onClick={() => setFilterBy(btnName)}
              className={`py-2 sm:px-4 text-[14px] sm:text-[16px] font-[500] ${
                filterBy === btnName
                  ? "border-b-2 border-[var(--primary-color1)]"
                  : ""
              }`}
            >
              {btnName}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {isLoading ? (
            <Loading />
          ) : allSessions.length > 0 ? (
            allSessions.map((session: sessionType) => (
              <Session key={session.id} session={session} />
            ))
          ) : (
            <EmptyResult />
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseTrainingSession;
