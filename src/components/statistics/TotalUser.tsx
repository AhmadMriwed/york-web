"use client";
import { useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";

export default function TotalUser() {
   const [trainers, trainess, client] = [0.3, 0.2, 0.5];

   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const { isLoading, error, statistics } = useSelector(
      (state: GlobalState) => state.statistics
   );

   const statisticsOfUsers = [
      {
         id: 1,
         name: "Trainers",
         number: statistics.number_of_trainer,
      },
      {
         id: 2,
         name: "Trainees",
         number: statistics.number_of_trainee,
      },
      {
         id: 3,
         name: "Clients",
         number: statistics.number_of_client,
      },
      {
         id: 4,
         name: "Admins",
         number: statistics.number_of_admin,
      },
   ];

   const userCategories = [
      {
         id: 1,
         name: "Treainees",
         number: 213,
         color: "#E77A16",
      },
      {
         id: 2,
         name: "Clients",
         number: 103,
         color: "#46D0D9",
      },
      {
         id: 3,
         name: "Treainers",
         number: 103,
         color: "#143656",
      },
      {
         id: 4,
         name: "Admins",
         number: 73,
         color: "#50f0ba",
      },
   ];

   return (
      <div className="py-5 px-[30px]">
         <header className="flex justify-between gap-3 items-center">
            <h3 className="text-[20px] leading-[1.3]">Total Users </h3>
            <p className="text-[26px] text-[#FEC700]">
               {statistics.number_of_users}
            </p>
         </header>

         <div
            className={`shadow-[0px_4px_11.9px_0px_#00000024] p-7 mt-[15px] rounded-[10px] ${
               mode === "dark" ? "bg-[#1A2532]" : "bg-white"
            }`}
         >
            <div>
               <button className="w-fit px-2 py-[3px] flex element-center bg-[var(--primary-color2)] ml-auto text-[13px] rounded-[6px] text-black">
                  currently availabel
               </button>
            </div>
            <div className="flex items-center justify-center sm:justify-between gap-4 flex-wrap mt-[15px]">
               <div className="grow felx element-center max-w-[350px]">
                  <div className="min-w-[130px] min-h-[130px] flex justify-center items-center">
                     <div
                        className="relative w-full h-full max-w-[130px] max-h-[130px] aspect-[1/1] rounded-[50%] "
                        style={
                           {
                              "--first": trainers,
                              "--second": trainess,
                              "--third": client,
                           } as React.CSSProperties
                        }
                     >
                        <div
                           className={`${
                              mode === "dark"
                                 ? " before:!border-t-[#1A2532]"
                                 : " before:!border-t-white"
                           } donut-slice donut__slice__first 
                           
                           `}
                        ></div>
                        <div
                           className={`${
                              mode === "dark"
                                 ? " before:!border-t-[#1A2532]"
                                 : " before:!border-t-white"
                           } donut-slice donut__slice__second `}
                        ></div>
                        <div
                           className={`${
                              mode === "dark"
                                 ? " before:!border-t-[#1A2532]"
                                 : " before:!border-t-white"
                           } donut-slice donut__slice__third `}
                        ></div>

                        {/* <div className="w-[80%] leading-[1.5] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
                           <div className="text-[15px] font-semibold">
                              <p className="text-[14px] font-light">Trainers</p>
                              {(trainers * 100).toFixed(1) + " %"}
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>

               <div>
                  {statisticsOfUsers.map((user) => {
                     return (
                        <div
                           className="flex items-center justify-between mt-1 w-[150px]"
                           key={user.id}
                        >
                           <p className="m-0 leading-[1.3] text-[13px]">
                              Total {user.name}
                           </p>{" "}
                           <p className="text-[#FEC700] text-[15px] m-0">
                              {user.number}
                           </p>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="mt-[25px] flex items-center justify-between gap-3 flex-wrap">
               {userCategories.map((cat) => {
                  return (
                     <div key={cat.id} className="flex items-center gap-4">
                        <div className="flex items-center gap-2 leading-[1.3] m-0 text-[12px] text-[#98aea7]">
                           <span
                              className="w-[10px] h-[10px] rounded-[1px]"
                              style={{ backgroundColor: cat.color }}
                           ></span>
                           {cat.name}
                        </div>
                        <p className="leading-[1.3] m-0 text-[12px] font-semibold ">
                           {cat.number}
                        </p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
