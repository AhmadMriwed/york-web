"use client";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  getOtherSessions,
  getSessionInfo,
  getSessionStates,
  lifeSessionOperation,
} from "@/store/adminstore/slices/sessions/sessionsActions";
import { getCourseInfo } from "@/store/adminstore/slices/courses/singleCourseSlice";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import { sessionType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import {
  calculateHours,
  getLocalDate,
  getLocalTimezoneDate,
  getLocalISODate,
} from "@/utils/dateFuncs";
/* icons */
import { Location, Calendar } from "@rsuite/icons";
import {
  FaLanguage,
  FaClock,
  FaRegFile,
  FaLink,
  FaChartLine,
} from "react-icons/fa";
import { PiInfoBold } from "react-icons/pi";
/* components */
import ListItem from "@/components/sessions/ListItem";
import MiniSession from "@/components/sessions/MiniSession";
import BackBtn from "@/components/backbtn/BackBtn";
import { Loader } from "rsuite";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Timer from "@/components/sessions/Timer";
import SessionState from "@/components/sessions/SessionState";
import Image from "next/image";
import ConfirmModal from "@/components/Pars/ConfirmModal";

const LifeSession = ({ params }: any) => {
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

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getSessionInfo(id));
    dispatch(getOtherSessions(id));
    dispatch(getSessionStates(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCourseInfo(courseID));
  }, [dispatch, courseID]);

  const handleLifeOperation = (status: "Expierd" | "Pass" | "Active") => {
    dispatch(lifeSessionOperation({ id, status }));
  };

  if (sessionLoading && courseLoading) return <Loading />;

  if (sessionError || courseError)
    return (
      <ErrorMessage msg="Oops! There was an error, please try again later." />
    );

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
      <div className="flex flex-wrap justify-between items-center">
        <BackBtn textColor="" />
        <div className="my-2 flex gap-1">
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
        <div
          className={`xl:flex-1 flex justify-between items-center gap-2 sm:gap-4 flex-wrap-reverse sm:flex-nowrap p-3 sm:p-6 rounded-[16px]
        ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
        >
          <div className="flex flex-col max-w-lg">
            <h6 className="font-bold text-[16px] sm:text-[18px] leading-[1.6rem]">
              {sessionInfo?.title && `${sessionInfo?.title} `}
              <span className="p-1 text-[14px] bg-[var(--primary-color1)] text-white rounded-full">
                {sessionInfo?.status && sessionInfo?.status}
              </span>
              <span className="p-1 text-[14px] border-[1px] border-[var(--primary-color1)] rounded-full ml-1">
                {sessionInfo?.session_status && sessionInfo?.session_status}
              </span>
            </h6>
            <p className="text-[16px] text-[#888] mt-2">
              {`${courseInfo?.title && courseInfo.title}, code: ${
                courseInfo?.code && courseInfo.code
              }`}
            </p>
            {sessionInfo?.code && (
              <p className="text-[14px] mt-4">{`code: ${sessionInfo.code}`}</p>
            )}
            {sessionInfo?.training_session_type && (
              <p className="text-[14px] mt-1">
                {`type: ${sessionInfo.training_session_type.name}`}
              </p>
            )}
            <div className="flex items-center flex-wrap gap-2 mt-1">
              {courseInfo?.venue.title && (
                <p className="text-[14px]">
                  {`venue: ${courseInfo.venue.title}`}
                </p>
              )}
              <div
                className={`${
                  mode === "dark"
                    ? "bg-[var(--light-color)] text-[var(--dark-color)]"
                    : "bg-[var(--dark-color)] text-[var(--light-color)]"
                } w-fit px-[12px] py-[3px] flex justify-center items-center gap-1
            rounded-full cursor-pointer`}
              >
                <Location />
                <p className="text-[12px]">
                  {courseInfo?.location ? courseInfo.location : "Rome"}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center mt-4">
              <ListItem
                icon={<FaClock />}
                text={
                  sessionInfo?.date_from &&
                  sessionInfo?.date_to &&
                  `${calculateHours(
                    sessionInfo.date_from,
                    sessionInfo.date_to
                  )}hr`
                }
              />
              <ListItem
                icon={<FaLanguage />}
                text={courseInfo?.lang && courseInfo.lang}
              />
              <ListItem
                icon={<Calendar />}
                text={
                  sessionInfo?.date_from &&
                  sessionInfo?.date_to &&
                  `${getLocalDate(sessionInfo.date_from)} - ${getLocalDate(
                    sessionInfo.date_from
                  )}`
                }
              />
            </div>
          </div>
          <div className="bg-slate-400 min-w-[200px] w-[90%] sm:w-fit min-h-[200px] rounded-[8px] mx-auto sm:mx-0 self-start">
            {sessionInfo?.image && (
              <Image
                src={sessionInfo.image}
                alt="Session Image"
                width={400}
                height={400}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        </div>
        <div
          className={`px-3 sm:px-12 xl:px-6 py-6 rounded-[16px]
        ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
        >
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 sm:gap-7">
            <div className="flex flex-col gap-4">
              <h6 className="w-fit text-[14px] px-2 py-1 rounded-full bg-[var(--primary-color1)] text-white">
                Currently Available
              </h6>
              <div className="flex flex-col">
                <p className="text-[16px] font-bold">Session Topics:</p>
                <p className="max-w-[200px] text-[12px] text-[#888]">
                  {sessionInfo?.outline && sessionInfo.outline}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 flex flex-col justify-center gap-4">
              <div>
                <h6 className="text-[var(--primary-color1)] text-[16px] mb-1">
                  Assignments:
                </h6>
                <ListItem
                  gap={2}
                  icon={<FaRegFile />}
                  text={
                    sessionInfo?.count_assignments &&
                    `${sessionInfo.count_assignments} Files`
                  }
                />
              </div>
              <div>
                <h6 className="text-[var(--primary-color1)] text-[16px] mb-1">
                  Attached Files:
                </h6>
                <ListItem
                  gap={2}
                  icon={<FaRegFile />}
                  text={
                    sessionInfo?.files && `${sessionInfo.files.length} Files`
                  }
                />
              </div>
              <div
                className={`text-[var(--primary-color1)] font-bold flex items-center gap-2
            rounded-full py-1 px-2 ${
              mode === "dark"
                ? "bg-[var(--dark-color)]"
                : "bg-[var(--light-color)]"
            }`}
              >
                <FaLink />
                <a href={sessionInfo?.url} target="_blank">
                  Session URL
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
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
              //TMP
              <div
                className="p-6 w-[150px] h-[150px] bg-slate-400 rounded-[8px]
              flex justify-center items-center font-bold text-[18px] mx-auto"
              >
                GIF
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 text-[18px]">
                    <PiInfoBold />
                    <h3 className="font-bold">About The Session</h3>
                  </div>
                  <p className="max-w-[300px] text-[12px] text-[#888]">
                    {sessionInfo?.description && sessionInfo.description}
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
    </div>
  );
};

export default LifeSession;
