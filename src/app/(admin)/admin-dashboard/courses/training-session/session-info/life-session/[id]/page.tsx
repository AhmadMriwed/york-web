"use client";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
   getOtherSessions,
   getSessionInfo,
   getSessionStates,
   lifeSessionOperation,
} from "@/store/adminstore/slices/sessions/sessionsActions";
import { getCourseInfo } from "@/store/adminstore/slices/courses/coursesSlice";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import { sessionType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import {
   calculateHours,
   getLocalTimezoneDate,
   getLocalISODate,
} from "@/utils/dateFuncs";
/* icons */
import { FaRegFile, FaLink, FaChartLine } from "react-icons/fa";
import { PiInfoBold } from "react-icons/pi";
/* components */
import MiniSession from "@/components/sessions/MiniSession";
import BackBtn from "@/components/buttons/BackBtn";
import { Loader } from "rsuite";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import Timer from "@/components/sessions/Timer";
import SessionState from "@/components/sessions/SessionState";
import SessionDetails from "@/components/sessions/SessionDetails";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/empty-result/EmptyResult";

const LifeSession = ({ params }: any) => {
<<<<<<< HEAD:src/app/(admin)/admin-dashboard/courses/training-session/life-session/[id]/page.tsx
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const { id } = params;
   const courseID = 1;
   const router = useRouter();

   const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

   const {
      isLoading,
      otherSessions,
      sessionStates,
      sessionLoading,
      sessionError,
      sessionInfo,
      operationError,
   } = useSelector((state: GlobalState) => state.sessions);

   const {
      isLoading: courseLoading,
      error: courseError,
      courseInfo,
   } = useSelector((state: GlobalState) => state.singleCourse);
=======
  const { id } = params;

  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const router = useRouter();

  const {
    isLoading,
    otherSessions,
    sessionStates,
    sessionLoading,
    sessionError,
    sessionInfo,
    operationError,
    operationLoading,
    status,
  } = useSelector((state: GlobalState) => state.sessions);

  const {
    isLoading: courseLoading,
    error: courseError,
    courseInfo,
  } = useSelector((state: GlobalState) => state.courses);
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a:src/app/(admin)/admin-dashboard/courses/training-session/session-info/life-session/[id]/page.tsx

   const dispatch: any = useDispatch();

   useEffect(() => {
      dispatch(getSessionInfo(id));
      dispatch(getOtherSessions(id));
      dispatch(getSessionStates(id));
   }, [dispatch, id]);

<<<<<<< HEAD:src/app/(admin)/admin-dashboard/courses/training-session/life-session/[id]/page.tsx
   useEffect(() => {
      dispatch(getCourseInfo(courseID));
   }, [dispatch, courseID]);
=======
  useEffect(() => {
    if (sessionInfo?.course_id) dispatch(getCourseInfo(sessionInfo.course_id));
  }, [dispatch, sessionInfo?.course_id]);
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a:src/app/(admin)/admin-dashboard/courses/training-session/session-info/life-session/[id]/page.tsx

   const handleLifeOperation = (status: "Expierd" | "Pass" | "Active") => {
      dispatch(lifeSessionOperation({ id, status }));
   };

<<<<<<< HEAD:src/app/(admin)/admin-dashboard/courses/training-session/life-session/[id]/page.tsx
   if (sessionLoading && courseLoading) return <Loading />;
=======
  if (sessionLoading || courseLoading) return <Loading />;
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a:src/app/(admin)/admin-dashboard/courses/training-session/session-info/life-session/[id]/page.tsx

   if (sessionError || courseError)
      return (
         <ErrorMessage msg="Oops! There was an error, please try again later." />
      );

<<<<<<< HEAD:src/app/(admin)/admin-dashboard/courses/training-session/life-session/[id]/page.tsx
   return (
      <div className="px-2 sm:px-6 py-4">
         <ConfirmModal
            open={confirmOpen}
            setOpen={setConfirmOpen}
            failMsg="Oops! There was an error, please try again later."
            error={operationError}
            completed={sessionOperationCompleted}
         />
         {/* TOP BAR */}
         <div className="flex flex-wrap justify-between items-center my-2">
            <BackBtn textColor="" />
            <div className="flex gap-1">
               {sessionInfo && (
                  <>
                     {!sessionInfo.session_status ||
                        (sessionInfo.session_status === "Pend" && (
                           <button
                              className="outlined-btn"
                              onClick={() => handleLifeOperation("Active")}
                           >
                              Start
                           </button>
                        ))}
                     {sessionInfo.session_status === "Active" && (
                        <>
                           <button
                              className="outlined-btn"
                              onClick={() => handleLifeOperation("Expierd")}
                           >
                              Stop
                           </button>
                           <button
                              className="outlined-btn"
                              onClick={() => handleLifeOperation("Pass")}
                           >
                              Pause
                           </button>
                        </>
                     )}
                     {sessionInfo.session_status === "Pass" && (
                        <>
                           <button
                              className="outlined-btn"
                              onClick={() => handleLifeOperation("Expierd")}
                           >
                              Stop
                           </button>
                           <button
                              className="outlined-btn"
                              onClick={() => handleLifeOperation("Active")}
                           >
                              Resume
                           </button>
                        </>
                     )}
                  </>
               )}
            </div>
         </div>
         {/* ROW1 */}
         <div className="flex flex-col xl:flex-row gap-2">
            <SessionDetails
               sessionInfo={sessionInfo}
               courseInfo={courseInfo}
               life
            />
            <div
               className="px-3 sm:px-12 xl:px-6 py-6 rounded-[16px]
        bg-[#212A34] text-[var(--light-color)]"
            >
               <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-2 sm:gap-7">
                  <div className="flex flex-col gap-4">
                     <h6 className="w-fit text-[14px] px-2 py-1 rounded-full bg-[var(--primary-color1)] text-white">
                        Currently Available
                     </h6>
                     <div className="flex flex-col">
                        <p className="text-[16px] font-bold">Session Topics:</p>
                        <p className="sm:max-w-[225px] text-[12px] text-[#888]">
                           {sessionInfo?.outline && sessionInfo.outline}
                        </p>
                     </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex sm:flex-col justify-between sm:justify-center items-center gap-4">
                     <div>
                        <p className="text-[var(--primary-color1)] text-[12px] sm:text-[16px] mb-1">
                           Assignments:
                        </p>
                        <div className="text-[12px] sm:text-[14px] flex items-center gap-2">
                           <FaRegFile />
                           <p>
                              {sessionInfo?.count_assignments &&
                                 `${sessionInfo.count_assignments} Files`}
                           </p>
                        </div>
                     </div>
                     <div>
                        <p className="text-[var(--primary-color1)] text-[12px] sm:text-[16px] mb-1">
                           Attached Files:
                        </p>
                        <div className="text-[12px] sm:text-[14px] flex items-center gap-2">
                           <FaRegFile />
                           <p>
                              {sessionInfo?.files &&
                                 `${sessionInfo.files.length} Files`}
                           </p>
                        </div>
                     </div>
                     <div
                        className="text-[var(--primary-color1)] text-[12px] font-bold flex items-center gap-2
            rounded-full p-1 sm:py-1 sm:px-2 bg-[var(--dark-color)]"
                     >
                        <FaLink />
                        <a href={sessionInfo?.url} target="_blank">
                           Session URL
                        </a>
                     </div>
                  </div>
               </div>
               <div className="mt-2 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
                  <div>
                     <p className="font-bold text-[12px] sm:text-[14px]">
                        {sessionInfo?.start_time &&
                           `St: ${getLocalISODate(sessionInfo.start_time)}`}
                     </p>
                     <p className="font-bold text-[12px] sm:text-[14px]">
                        {sessionInfo?.start_time &&
                           sessionInfo?.date_from &&
                           sessionInfo?.date_to &&
                           `Ed: ${getLocalISODate(
                              new Date(sessionInfo.start_time).setHours(
                                 new Date(sessionInfo.start_time).getHours() +
                                    calculateHours(
                                       sessionInfo.date_from,
                                       sessionInfo.date_to
                                    )
                              )
                           )}`}
                     </p>
                  </div>
                  {sessionInfo?.start_time && sessionInfo.date_to && (
                     <Timer
                        startTime={getLocalTimezoneDate(sessionInfo.start_time)}
                        endTime={getLocalTimezoneDate(sessionInfo.date_to)}
                     />
                  )}
               </div>
            </div>
         </div>
         {/* ROW2 */}
         <div className="mt-2 flex flex-col xl:flex-row gap-2">
            <div
               className={`flex-1 flex flex-col lg:flex-row p-3 sm:p-6 rounded-[16px] ${
                  mode === "dark" ? "bg-[#212A34]" : "bg-white"
               }`}
            >
               <div className="flex-1">
                  <div className="w-fit px-6 py-3 rounded-[4px] bg-[var(--primary-color1)] text-white">
                     Files
                  </div>
                  <div className="w-full h-[1px] bg-[var(--primary-color1)] my-1"></div>
                  {sessionInfo?.files &&
                  sessionInfo?.files?.length &&
                  sessionInfo.files.length !== 0 ? (
                     <div className="flex flex-col gap-2 my-3">
                        {sessionInfo.files.map((file, index) => (
                           <div key={index}>{file.name}</div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-[16px] my-3">
                        There are no attached files.
                     </p>
                  )}
               </div>
               <div className="w-[1px] h-full bg-[var(--primary-color1)] mx-6"></div>
               <div>
                  {sessionInfo?.session_status &&
                  sessionInfo.session_status === "Expierd" ? (
                     <div className="p-6 w-[100px] h-[100px] bg-slate-400 rounded-[8px] mx-auto">
                        {/* GIF */}
                     </div>
                  ) : (
                     <>
                        <div>
                           <div className="flex items-center gap-2 text-[18px]">
                              <PiInfoBold />
                              <h3 className="font-bold">About The Session</h3>
                           </div>
                           <p className="sm:max-w-[325px] text-[12px] text-[#888]">
                              {sessionInfo?.description &&
                                 sessionInfo.description}
                           </p>
                        </div>
                        <div>
                           <div className="flex items-center gap-2 text-[18px] mt-3">
                              <FaChartLine />
                              <h3 className="font-bold">Other Sessions</h3>
                           </div>
                           {isLoading && courseLoading ? (
                              <Loader />
                           ) : (
                              <div className="flex flex-col gap-2 px-1 max-h-[275px] overflow-y-scroll">
                                 {otherSessions.map(
                                    (session: sessionType, index: number) => (
                                       <div
                                          key={index}
                                          className="cursor-pointer hover:opacity-[0.9]"
                                          onClick={() =>
                                             router.push(
                                                `/admin-dashboard/courses/training-session/session-info/${session.id}`
                                             )
                                          }
                                       >
                                          <MiniSession
                                             session={session}
                                             course={courseInfo}
                                          />
                                       </div>
                                    )
                                 )}
                              </div>
                           )}
                        </div>
                     </>
                  )}
               </div>
            </div>
            {/* STATES */}
            <div
               className={`p-3 sm:p-6 rounded-[16px] ${
                  mode === "dark" ? "bg-[#212A34]" : "bg-white"
               }`}
            >
               <h3 className="text-[20px] font-bold mb-3">Session States</h3>
               <div className="flex flex-col gap-1 px-1 overflow-y-scroll max-h-[300px]">
                  {isLoading ? (
                     <Loader />
                  ) : sessionStates.length === 0 ? (
                     <p className="text-[16px] my-3">There are no states.</p>
                  ) : (
                     sessionStates.map((state, index) => (
                        <SessionState state={state} key={index} />
                     ))
                  )}
               </div>
            </div>
         </div>
=======
  return (
    <div className="px-2 sm:px-6 py-4">
      <OperationAlert
        messageOnSuccess="operation accomplished successfully!"
        messageOnError="Oops! There was an error, please try again later."
        status={status}
        error={operationError}
        completedAction={sessionOperationCompleted}
      />

      {operationLoading && <Loading backdrop />}

      {/* TOP BAR */}
      <div className="flex flex-wrap justify-between items-center my-2">
        <BackBtn textColor="" />
        <div className="flex gap-1">
          {sessionInfo && (
            <>
              {!sessionInfo.session_status ||
                (sessionInfo.session_status === "Pend" && (
                  <button
                    className="outlined-btn"
                    onClick={() => handleLifeOperation("Active")}
                  >
                    Start
                  </button>
                ))}
              {sessionInfo.session_status === "Active" && (
                <>
                  <button
                    className="outlined-btn"
                    onClick={() => handleLifeOperation("Expierd")}
                  >
                    Stop
                  </button>
                  <button
                    className="outlined-btn"
                    onClick={() => handleLifeOperation("Pass")}
                  >
                    Pause
                  </button>
                </>
              )}
              {sessionInfo.session_status === "Pass" && (
                <>
                  <button
                    className="outlined-btn"
                    onClick={() => handleLifeOperation("Expierd")}
                  >
                    Stop
                  </button>
                  <button
                    className="outlined-btn"
                    onClick={() => handleLifeOperation("Active")}
                  >
                    Resume
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* ROW1 */}
      <div className="flex flex-col xl:flex-row gap-2">
        <SessionDetails
          sessionInfo={sessionInfo}
          courseInfo={courseInfo}
          life
        />
        <div
          className="px-3 sm:px-12 xl:px-6 py-6 rounded-[16px]
        bg-[#212A34] text-[#FFF]"
        >
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-2 sm:gap-7">
            <div className="flex flex-col gap-4">
              <h6 className="w-fit text-[14px] px-2 py-1 rounded-full bg-[var(--primary-color1)] text-white">
                Currently Available
              </h6>
              <div className="flex flex-col">
                <p className="text-[16px] font-bold">Session Topics:</p>
                <p className="sm:max-w-[225px] text-[12px] text-[#888]">
                  {sessionInfo?.outline && sessionInfo.outline}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 flex sm:flex-col justify-between sm:justify-center items-center gap-4">
              <div>
                <p className="text-[var(--primary-color1)] text-[12px] sm:text-[16px] mb-1">
                  Assignments:
                </p>
                <div className="text-[12px] sm:text-[14px] flex items-center gap-2">
                  <FaRegFile />
                  <p>
                    {sessionInfo?.count_assignments &&
                      `${sessionInfo.count_assignments} Files`}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[var(--primary-color1)] text-[12px] sm:text-[16px] mb-1">
                  Attached Files:
                </p>
                <div className="text-[12px] sm:text-[14px] flex items-center gap-2">
                  <FaRegFile />
                  <p>
                    {sessionInfo?.files && `${sessionInfo.files.length} Files`}
                  </p>
                </div>
              </div>
              <div
                className="text-[var(--primary-color1)] text-[12px] font-bold flex items-center gap-2
            rounded-full p-1 sm:py-1 sm:px-2 bg-[var(--dark-color)]"
              >
                <FaLink />
                <a href={sessionInfo?.url} target="_blank">
                  Session URL
                </a>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
            <div>
              <p className="font-bold text-[12px] sm:text-[14px]">
                {sessionInfo?.start_time &&
                  `St: ${getLocalISODate(sessionInfo.start_time)}`}
              </p>
              <p className="font-bold text-[12px] sm:text-[14px]">
                {sessionInfo?.start_time &&
                  sessionInfo?.date_from &&
                  sessionInfo?.date_to &&
                  `Ed: ${getLocalISODate(
                    new Date(sessionInfo.start_time).setHours(
                      new Date(sessionInfo.start_time).getHours() +
                        calculateHours(
                          sessionInfo.date_from,
                          sessionInfo.date_to
                        )
                    )
                  )}`}
              </p>
            </div>
            {sessionInfo?.start_time && sessionInfo.date_to && (
              <Timer
                startTime={getLocalTimezoneDate(sessionInfo.start_time)}
                endTime={getLocalTimezoneDate(sessionInfo.date_to)}
              />
            )}
          </div>
        </div>
      </div>
      {/* ROW2 */}
      <div className="mt-2 flex flex-col xl:flex-row gap-2">
        <div
          className={`flex-1 flex flex-col lg:flex-row p-3 sm:p-6 rounded-[16px] ${
            mode === "dark" ? "bg-[#212A34]" : "bg-white"
          }`}
        >
          <div className="flex-1">
            <div className="w-fit px-6 py-3 rounded-[4px] bg-[var(--primary-color1)] text-white">
              Files
            </div>
            <div className="w-full h-[1px] bg-[var(--primary-color1)] my-1"></div>
            {sessionInfo?.files &&
            sessionInfo?.files?.length &&
            sessionInfo.files.length !== 0 ? (
              <div className="flex flex-col gap-2 my-3">
                {sessionInfo.files.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            ) : (
              <p className="text-[16px] my-3">There are no attached files.</p>
            )}
          </div>
          <div className="w-[1px] h-full bg-[var(--primary-color1)] mx-6"></div>
          <div>
            {sessionInfo?.session_status &&
            sessionInfo.session_status === "Expierd" ? (
              <div className="p-6 w-[100px] h-[100px] bg-slate-400 rounded-[8px] mx-auto">
                {/* GIF */}
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 text-[16px]">
                    <PiInfoBold />
                    <h3 className="font-bold">About The Session</h3>
                  </div>
                  <p className="sm:max-w-[325px] text-[12px] text-[#888]">
                    {sessionInfo?.description && sessionInfo.description}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[16px] mt-3">
                    <FaChartLine />
                    <h3 className="font-bold">Other Sessions</h3>
                  </div>
                  {isLoading && courseLoading ? (
                    <Loader />
                  ) : (
                    <div className="flex flex-col gap-2 px-1 max-h-[275px] overflow-y-scroll">
                      {otherSessions.length > 0 ? (
                        otherSessions.map(
                          (session: sessionType, index: number) => (
                            <div
                              key={index}
                              className="cursor-pointer hover:opacity-[0.9]"
                              onClick={() =>
                                router.push(
                                  `/admin-dashboard/courses/training-session/session-info/${session.id}`
                                )
                              }
                            >
                              <MiniSession
                                session={session}
                                course={courseInfo}
                              />
                            </div>
                          )
                        )
                      ) : (
                        <EmptyResult />
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {/* STATES */}
        <div
          className={`p-3 sm:p-6 rounded-[16px] ${
            mode === "dark" ? "bg-[#212A34]" : "bg-white"
          }`}
        >
          <h3 className="text-[16px] font-bold mb-3">Session States</h3>
          <div className="flex flex-col gap-1 px-1 overflow-y-scroll max-h-[300px]">
            {isLoading ? (
              <Loader />
            ) : sessionStates.length === 0 ? (
              <p className="text-[16px] my-3">There are no states.</p>
            ) : (
              sessionStates.map((state, index) => (
                <SessionState state={state} key={index} />
              ))
            )}
          </div>
        </div>
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a:src/app/(admin)/admin-dashboard/courses/training-session/session-info/life-session/[id]/page.tsx
      </div>
   );
};

export default LifeSession;
