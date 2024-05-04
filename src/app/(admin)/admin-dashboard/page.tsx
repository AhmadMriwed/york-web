"use client";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import AnnouncementsStatistics from "@/components/statistics/AnnouncementsStatistics";
import AssignmentStatistics from "@/components/statistics/AssignmentStatistics";
import MainStatistics from "@/components/statistics/MainStatistics";
import MyCoursesStatistics from "@/components/statistics/MyCoursesStatistics";
import SessionsStatistics from "@/components/statistics/SessionsStatistics";
import StudentsStatistics from "@/components/statistics/StudentsStatistics";
import { Axios } from "@/utils/axios";
import { useContext, useEffect } from "react";

const AdminDashboard = () => {
   const getData = async () => {
      const data = await Axios.get("admin/statistics");
      console.log(data);
   };

   const getAnnoun = async () => {
      const data = await Axios.get("announcement");
      console.log("announcement", data);
   };

   const getAnnouncement = async () => {
      const data = await Axios.get("admin/announcement");
      console.log(data);
   };

   const getCourses = async () => {
      const data = await Axios.get("admin/course_ads/getMap/filterCourse");
      console.log(data);
   };

   useEffect(() => {
      // getData();
      // getAnnoun();
      // getAnnouncement();
      // getCourses();
   }, []);

   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   return (
      <section
         className={`relative pt-[10px] py-[20px] px-[10px] md:px-[20px] ${
            mode === "dark" ? "statistics-bg-dark" : "statistics-bg-light"
         }`}
      >
         <header className="mb-[10px]">
            <h3 className="text-[22px] leading-[1.3]">
               Welcome Back ,{" "}
               <span className="text-[var(--primary-color1)]">Hussam</span>
            </h3>
            <p className="text-[12px] sm:text-[14px] mt-1">
               Schedule all your courses , see who`s increased
            </p>
         </header>

         <main className="grid grid-cols-[1fr] xl:grid-cols-[minmax(670px,710px)_minmax(360px,450px)] 2xl:grid-cols-[60%_38%] gap-[15px]">
            <div className="w-full flex flex-col gap-[15px]">
               <div>
                  <MainStatistics />
               </div>
               <div
                  className={`${
                     mode === "dark" ? "bg-[#0d0d0d73] " : "bg-[#FFFFFF73]"
                  }  rounded-[10px] shadow-[0px_4px_11.9px_0px_#00000024]          `}
               >
                  <MyCoursesStatistics />
               </div>
               <div
                  className={`${
                     mode === "dark" ? "bg-[#0d0d0d73] " : "bg-[#FFFFFF73]"
                  }  rounded-[10px] grow shadow-[0px_4px_11.9px_0px_#00000024]`}
               >
                  <StudentsStatistics />
               </div>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-between xl:flex-col items-center gap-[15px]">
               <div
                  className={`${
                     mode === "dark" ? "bg-[#0d0d0d73] " : "bg-[#FFFFFF73]"
                  }  rounded-[10px] grow w-full md:w-[49%] xl:w-full min-h-[300px] shadow-[0px_4px_11.9px_0px_#00000024]`}
               >
                  <AssignmentStatistics />
               </div>
               <div
                  className={`${
                     mode === "dark" ? "bg-[#0d0d0d73] " : "bg-[#FFFFFF73]"
                  }  rounded-[10px] grow w-full md:w-[49%] xl:w-full min-h-[300px] shadow-[0px_4px_11.9px_0px_#00000024]`}
               >
                  <AnnouncementsStatistics />
               </div>
            </div>
         </main>

         <main
            className={`${
               mode === "dark" ? "bg-[#0d0d0d73] " : "bg-[#FFFFFF73]"
            }  rounded-[10px] mt-[15px] shadow-[0px_4px_11.9px_0px_#00000024]`}
         >
            <SessionsStatistics />
         </main>
      </section>
   );
};

export default AdminDashboard;
