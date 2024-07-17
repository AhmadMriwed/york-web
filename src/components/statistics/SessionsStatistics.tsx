import React, { useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import Image from "next/image";
import photo from "../../../public/avatar.png";
import { MdGroups } from "react-icons/md";

interface session {
   key: number;
   name: string;
   category: string;
   id: string;
   techer: string;
   location: string;
   students: number;
   dateFrom: string;
   dateTo: string;
}

export default function SessionsStatistics() {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const sessions: session[] = [
      {
         key: 1,
         name: "Data Mining",
         category: "Data science courses",
         id: "#342",
         techer: "Simon Minter",
         location: "Rome",
         students: 7123,
         dateFrom: "23 May , 2023",
         dateTo: "05 Oct , 2023",
      },
      {
         key: 2,
         name: "Data Mining",
         category: "Data science courses",
         id: "#342",
         techer: "Simon Minter",
         location: "Rome",
         students: 7123,
         dateFrom: "23 May , 2023",
         dateTo: "05 Oct , 2023",
      },
      {
         key: 3,
         name: "Data Mining",
         category: "Data science courses",
         id: "#342",
         techer: "Simon Minter",
         location: "Rome",
         students: 7123,
         dateFrom: "23 May , 2023",
         dateTo: "05 Oct , 2023",
      },
   ];

   const Session = ({ session }: { session: session }) => {
      return (
         <div
            className={`py-2 px-3 flex gap-[20px] items-center flex-wrap rounded-[10px] ${
               mode === "dark" ? " bg-[#1A2532] text-[#a098ae]" : "bg-white"
            }`}
         >
            <div className="grow w-full lg:w-[200px]">
               <p
                  className={`text-[20px] font-semibold leading-[1.2] ${
                     mode === "dark" ? " text-white" : "text-black"
                  }`}
               >
                  02. {session.name}
               </p>
               <p className="leading-[1.2] mt-1 text-[12px]">
                  {session.category} , ID : {session.id}
               </p>
               <div
                  className={`w-fit px-3 flex element-center h-5  text-[13px] mt-1 text-black rounded-[10px]  bg-[#00EDED]`}
               >
                  somthing
               </div>
            </div>

            <div className="flex gap-[5px] items-center">
               <Image
                  src={photo}
                  alt="photo"
                  width={22}
                  height={22}
                  className="rounded-[50%]"
               />
               <p>{session.techer}</p>
            </div>

            <div
               className={`flex element-center py-[2px] w-fit min-w-[75px] ${
                  mode === "dark"
                     ? "bg-[#D1DBE7] text-[#1A2532]"
                     : "bg-[#202933] text-white"
               } rounded-[30px] text-[12px]`}
            >
               {session.location}
            </div>
            <div className="flex items-center gap-1">
               <MdGroups className="text-[14px]" />
               <p className="text-[14px]">{session.students} students </p>
            </div>

            <div className="flex items-center gap-[2px]">
               <MdGroups className="text-[14px]" />
               <p>{session.dateFrom}</p>
               to
               <p className="m-0">{session.dateTo}</p>
            </div>
         </div>
      );
   };

   return (
      <div className="p-5">
         <header className="flex justify-between items-center flex-wrap mb-[10px]">
            <h3 className="text-[20px] leading-[1.3]">Sessions :</h3>
            <button className="w-[90px] md:w-[100px] p-[5px] bg-[var(--primary-color1)] rounded-[6px]">
               Button
            </button>
         </header>
         <main className="flex flex-col gap-[15px]">
            {sessions.map((session: session) => {
               return <Session session={session} key={session.key} />;
            })}
         </main>
      </div>
   );
}
