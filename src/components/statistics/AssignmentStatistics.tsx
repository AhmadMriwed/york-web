"use client";
import { useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { MdAssignment } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { Progress } from "rsuite";

interface assignment {
   id: number;
   name: string;
   techer: string;
   studentsNumber: number;
   code: string;
   percent: number;
}

export default function AssignmentStatistics() {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const assignments: assignment[] = [
      {
         id: 1,
         name: "UX Research",
         techer: "Ms. Samantha William",
         studentsNumber: 7234,
         code: "#32 Software eng",
         percent: 70,
      },
      {
         id: 2,
         name: "Back-End Developer",
         techer: "Ms. Samantha William",
         studentsNumber: 1284,
         code: "#32 Software eng",
         percent: 40,
      },
      {
         id: 3,
         name: "Icon Design",
         techer: "Ms. Samantha William",
         studentsNumber: 934,
         code: "#91 Software eng",
         percent: 60,
      },
   ];

   const Assignment = ({ assignment }: { assignment: assignment }) => {
      return (
         <div
            className={`flex items-center justify-between gap-y-[15px] gap-x-[8px] flex-wrap px-[10px] py-[10px] min-h-fit rounded-[10px] border-l-[10px] ${
               assignment.percent < 50
                  ? "border-l-[#D26060]"
                  : assignment.percent >= 70
                  ? "border-l-[#5fc3a5]"
                  : "border-l-[#ffbe74]"
            } text-[#a098ae]`}
         >
            <div className="max-w-[175px] leading-[1.2] grow">
               <h3
                  className={`leading-[1.2] text-[16px] font-semibold ${
                     mode === "dark" ? "text-white" : "text-black"
                  }`}
               >
                  {assignment.name}
               </h3>
               <p className="leading-[1.2] mt-2 text-[13px] font-normal flex items-center gap-1">
                  {" "}
                  <span className="w-[20px] h-[20px] rounded-[5px] bg-red-500"></span>{" "}
                  {assignment.techer}
               </p>
            </div>
            <div className="w-[128px]">
               <p className="flex gap-[5px] items-center text-[13px]">
                  <MdGroups className="text-[13px]" />{" "}
                  {assignment.studentsNumber} students
               </p>
               <p className="flex gap-[5px] items-center text-[13px]">
                  <MdMenuBook className="text-[13px]" /> {assignment.code}{" "}
               </p>
            </div>
            <div className="min-w-[35px] min-h-[35px] grow mx-auto max-w-[50px] max-h-[50px]">
               <Progress.Circle
                  percent={assignment.percent}
                  strokeColor={
                     assignment.percent < 50
                        ? "#D26060"
                        : assignment.percent >= 70
                        ? "#5fc3a5"
                        : "#ffbe74"
                  }
                  strokeWidth={2}
                  trailWidth={2}
                  className="[&>.rs-progress-circle-info]:!justify-center [&>.rs-progress-circle-info]:!items-center [&>.rs-progress-circle-info]:!flex  [&>.rs-progress-circle-info]:!text-[10px] [&>.rs-progress-svg>.rs-progress-trail]:!stroke-[#a7a7a70d]"
               />
            </div>
         </div>
      );
   };

   return (
      <div
         className={`px-[10px] py-[10px] ${
            mode === "dark"
               ? "rounded-[10px] [&>div>*]:!bg-[#1A2532]"
               : "[&>div>*]:!bg-white"
         }`}
      >
         <h3 className="text-[22px] mb-1">Assignment</h3>
         <div className="flex gap-[10px] flex-row flex-wrap">
            <div className="py-[10px] px-2 min-h-[120px] grow w-[155px] rounded-[10px]">
               <div className="flex justify-between gap-[10px]">
                  <div className="w-[30px] h-[30px] rounded-[50%] bg-[#00EDED] element-center">
                     <MdAssignment className="text-[20px] text-black" />
                  </div>

                  <p className="text-[23px] font-bold leading-[1.2] text-[#FEC700]">
                     17
                  </p>
               </div>

               <div className="relative flex justify-between gap-[10px] mt-2">
                  <div className="">
                     <p
                        className={`${
                           mode === "dark" ? "text-[#415C7E]" : "text-[#39506D]"
                        }  text-[18px] leading-[1.2]`}
                     >
                        Total Assignment
                     </p>
                     <p className="text-[#9C9C9C] leading-[1.2] m-0 mt-2 font-light text-[12px]">
                        all current and upcoming course{" "}
                     </p>
                  </div>

                  <p className="text-[#00EDED] self-end text-[16px]">+8</p>
               </div>
            </div>

            <div className="py-3 px-2 min-h-[120px] grow-[2] w-[205px] rounded-[10px] flex justify-center items-center gap-4 ">
               <div
                  className={`${
                     mode === "dark" ? "text-[#415C7E]" : "text-[#39506D]"
                  } `}
               >
                  <p className="text-[24px] font-semibold leading-[1.2]">
                     Total
                  </p>
                  <p className="text-[20px] font-normal leading-[1.2] m-0 mt-1">
                     Students
                  </p>
                  <p className="text-[#747474] text-[12px] leading-[1.2] m-0 mt-2">
                     including all passed and failed students
                  </p>
               </div>
               <div className="flex items-center gap-3 justify-between text-center">
                  <div>
                     <p className="text-[32px] font-semibold text-[#2FFBD2]">
                        190
                     </p>
                     <p className="text-[12px] text-[#747474] mt-4">passed</p>
                  </div>
                  <div>
                     <p className="text-[32px] font-semibold text-[#D26060]">
                        15
                     </p>
                     <p className="text-[12px] text-[#747474] mt-4">failed</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex flex-col gap-[10px] mt-[10px] overflow-y-auto hide-scrollebar h-[160px]">
            {assignments.map((assignment: assignment) => {
               return (
                  <Assignment key={assignment.id} assignment={assignment} />
               );
            })}
         </div>
      </div>
   );
}
