"use client";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import {
   changeStatus,
   deleteSession,
   getOtherSessions,
   getSessionInfo,
} from "@/store/adminstore/slices/sessions/sessionsActions";
import { getCourseInfo } from "@/store/adminstore/slices/courses/singleCourseSlice";
import { sessionType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "@/components/Pars/ThemeContext";
/* icons */
import { FaRegFile, FaLink, FaChartLine } from "react-icons/fa";
import {
   PiInfoBold,
   PiTrash,
   PiToggleLeft,
   PiToggleRightFill,
} from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
/* components */
import { Loader } from "rsuite";
import TrainerInfo from "@/components/sessions/TrainerInfo";
import MiniSession from "@/components/sessions/MiniSession";
import Loading from "@/components/Pars/Loading";
import BackBtn from "@/components/buttons/BackBtn";
import AlertModal from "@/components/Pars/AlertModal";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import ConfirmModal from "@/components/Pars/ConfirmModal";
import SessionDetails from "@/components/sessions/SessionDetails";

const SessionInfo = ({ params }: any) => {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const { id } = params;
   const courseID = 1;
   const router = useRouter();

   const [deleteModal, setDeleteModal] = useState<boolean>(false);
   const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
   const {
      operationLoading,
      operationError,
      deleteStatus,
      isLoading,
      otherSessions,
      sessionLoading,
      sessionError,
      sessionInfo,
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
   }, [dispatch, id]);

   useEffect(() => {
      dispatch(getCourseInfo(courseID));
   }, [dispatch, courseID]);

   const handleEdit = () => {
      router.push(`/admin-dashboard/courses/training-session/update/${id}`);
   };

   const handleDelete = () => {
      setDeleteModal(true);
   };

   const handleActivation = () => {
      const status: "Active" | "Inactive" =
         sessionInfo?.status === "Active" ? "Inactive" : "Active";
      if (sessionInfo)
         dispatch(
            changeStatus({
               ids: [sessionInfo.id],
               status: status,
               classification: sessionInfo.classification_session,
            })
         );
   };

   if (sessionLoading && courseLoading) return <Loading />;

   if (sessionError || courseError)
      return (
         <ErrorMessage msg="Oops! There was an error, please try again later." />
      );

   return (
      <div className="px-2 sm:px-6 py-4">
         <AlertModal
            open={deleteModal}
            setOpen={setDeleteModal}
            requestType="delete"
            label={`Are you sure you want to delete "${sessionInfo?.title}" ?`}
            deleteAction={deleteSession}
            completed={sessionOperationCompleted}
            id={sessionInfo?.id}
            status={deleteStatus}
            deleteLoading={operationLoading}
            exitPath="/admin-dashboard/courses/training-session"
         />
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
               <button
                  className="outlined-btn flex justify-center items-center gap-1"
                  onClick={handleEdit}
               >
                  <CiEdit /> Edit
               </button>
               <button
                  className="outlined-btn flex justify-center items-center gap-1"
                  onClick={handleDelete}
               >
                  <PiTrash /> Delete
               </button>
               <button
                  className="outlined-btn flex justify-center items-center gap-1"
                  onClick={handleActivation}
               >
                  {sessionInfo?.status === "Active" ? (
                     <PiToggleRightFill />
                  ) : (
                     <PiToggleLeft />
                  )}
                  {sessionInfo?.status === "Active" ? "Deactivate" : "Activate"}
               </button>
            </div>
         </div>
         {/* ROW1 */}
         <div className="flex flex-col xl:flex-row gap-2">
            <SessionDetails sessionInfo={sessionInfo} courseInfo={courseInfo} />
            <div
               className="flex flex-col sm:flex-row justify-center sm:justify-between gap-2 sm:gap-7 px-3 sm:px-12 xl:px-6 py-6 rounded-[16px]
        bg-[#212A34] text-[var(--light-color)]"
            >
               <div className="flex flex-col gap-4">
                  <h6 className="w-fit text-[14px] px-2 py-1 rounded-full bg-[var(--primary-color1)] text-white">
                     Currently Available
                  </h6>
                  <div className="flex flex-col">
                     <p className="text-[16px] font-bold">Session Topics:</p>
                     <p className="sm:max-w-[225px] text-[12px]">
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
                     className="text-[var(--primary-color1)] text-[12px] font-bold flex items-center gap-1
            rounded-full p-1 sm:py-1 sm:px-2 bg-[var(--dark-color)]"
                  >
                     <FaLink />
                     <a href={sessionInfo?.url} target="_blank">
                        Session URL
                     </a>
                  </div>
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
                  <div>
                     <div className="flex items-center gap-2 text-[18px]">
                        <PiInfoBold />
                        <h3 className="font-bold">About The Session</h3>
                     </div>
                     <p className="sm:max-w-[325px] text-[12px] text-[#888]">
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
               </div>
            </div>
            {/* TRAINERS */}
            <div
               className={`p-3 sm:p-6 rounded-[16px] ${
                  mode === "dark" ? "bg-[#212A34]" : "bg-white"
               }`}
            >
               <h3 className="text-[20px] font-bold mb-2">Trainers</h3>
               <div className="flex flex-col sm:flex-row xl:flex-col gap-2">
                  {[1].map((item, index) => (
                     <TrainerInfo
                        key={index}
                        trainer={sessionInfo?.owner && sessionInfo.owner}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SessionInfo;
