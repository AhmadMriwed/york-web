import { useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { Tooltip, Whisper } from "rsuite";

export default function StudentsStatistics() {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const hours = [2, 4, 6, 8, 10];
   const [trainers, trainess, client] = [0.8, 0.1, 0.2];

   const days = [
      {
         id: 1,
         name: "MO",
         certificated: 3,
         completed: 3,
         declined: 1,
      },
      {
         id: 2,
         name: "Tu",
         certificated: 1,
         completed: 4,
         declined: 4,
      },
      {
         id: 3,
         name: "we",
         certificated: 3,
         completed: 1,
         declined: 2,
      },
      {
         id: 4,
         name: "th",
         certificated: 1,
         completed: 4,
         declined: 3,
      },
      {
         id: 5,
         name: "fr",
         certificated: 3.2,
         completed: 6,
         declined: 1,
      },
      {
         id: 6,
         name: "sa",
         certificated: 1.4,
         completed: 5.3,
         declined: 3.4,
      },
      {
         id: 7,
         name: "su",
         certificated: 7.2,
         completed: 1.2,
         declined: 2.2,
      },
   ];

   const Chart = () => {
      return (
         <div>
            <div className="flex items-end w-full h-[200px]">
               <div className="h-full flex flex-col-reverse justify-between w-[28px]">
                  {hours.map((hour) => {
                     return (
                        <div
                           key={hour}
                           className="text-center py-[5px] text-[#A7A7A7]"
                        >
                           {hour} h
                        </div>
                     );
                  })}
               </div>

               <div
                  className={`flex justify-evenly grow h-full px-[10px] pt-1 border-b ${
                     mode === "dark"
                        ? "border-b-[#222222]"
                        : "border-b-[#EAEAEA]"
                  } `}
               >
                  {days.map((day) => {
                     return (
                        <div
                           className="flex flex-col justify-end items-center gap-[3px] w-[25px] h-full"
                           key={day.id}
                        >
                           <Whisper
                              placement="left"
                              controlId="control-id-hover"
                              trigger="hover"
                              speaker={
                                 <Tooltip>Completed: {day.completed} h</Tooltip>
                              }
                           >
                              <div
                                 className="w-[10px] rounded-[4px] bg-[#01AFB8] min-h-2 cursor-pointer"
                                 style={{ height: day.completed * 10 + "%" }}
                              ></div>
                           </Whisper>

                           <Whisper
                              placement="left"
                              controlId="control-id-hover"
                              trigger="hover"
                              speaker={
                                 <Tooltip>Declined : {day.declined} h</Tooltip>
                              }
                           >
                              <div
                                 className="w-[10px] rounded-[4px] bg-[#EB882B] min-h-2 cursor-pointer"
                                 style={{ height: day.declined * 10 + "%" }}
                              ></div>
                           </Whisper>

                           <Whisper
                              placement="left"
                              controlId="control-id-hover"
                              trigger="hover"
                              speaker={
                                 <Tooltip>
                                    certificated : {day.certificated} h
                                 </Tooltip>
                              }
                           >
                              <div
                                 className="w-[10px] rounded-[4px] bg-[#19436B] min-h-5 cursor-pointer"
                                 style={{ height: day.certificated * 10 + "%" }}
                              ></div>
                           </Whisper>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="flex ml-[51px] w-[calc(100%_-_51px)] justify-evenly px-[10px]">
               {days.map((day) => {
                  return (
                     <p
                        key={day.id}
                        className="w-[25px] text-[13px] text-center mt-[10px] capitalize text-[#A7A7A7]"
                     >
                        {day.name}
                     </p>
                  );
               })}
            </div>
         </div>
      );
   };

   const TotlaUsers = () => {
      return (
         <div
            className={`${
               mode === "dark" ? "bg-[#1A2532]" : "bg-white"
            } min-w-[260px] sm:min-w-[270px] grow min-h-[160px] rounded-[20px] p-3 text-[#a098ae]`}
         >
            <div>
               <button className="w-fit px-2 py-[3px] flex element-center bg-[var(--primary-color2)] ml-auto text-[13px] rounded-[6px] text-black">
                  currently availabel
               </button>
            </div>

            <div className="mt-[25px]">
               <div className="flex justify-around items-center gap-2 flex-wrap  ">
                  <div className="text-[#405053]">
                     <p className="text-[17px] leading-[1.2] font-light ">
                        Total
                     </p>
                     <p className="text-[20px] leading-[1.2] mt-0 font-semibold">
                        Users
                     </p>
                  </div>
                  <p className="text-[#ffbe74] text-[20px]">7,098</p>
               </div>
            </div>

            <div className="mt-[30px] flex items-center justify-between gap-3 flex-wrap-reverse mx-auto grow">
               {
                  <div className="min-w-[100px] min-h-[100px] grow flex justify-center items-center">
                     <div
                        className="relative w-full h-full max-w-[100px] max-h-[100px] aspect-[1/1] rounded-[50%] "
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

                        <div className="w-[80%] leading-[1.5] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
                           <div className="text-[15px] font-semibold">
                              <p className="text-[14px] font-light">Trainers</p>
                              {(trainers * 100).toFixed(1) + " %"}
                           </div>
                        </div>
                     </div>
                  </div>
               }

               <div className="h-[120px] min-w-[calc(50%_-_6px)] max-w-[200px] flex flex-col justify-center gap-[15px] grow">
                  <div className="flex items-center justify-center gap-1">
                     <div className="flex items-center gap-2 text-[14px] grow">
                        <span className="w-[12px] h-[12px] rounded-sm bg-[#46D0D9]" />
                        Client
                     </div>
                     <div className="text-[14px]">5,567</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                     <div className="flex items-center gap-2 text-[14px] grow">
                        <span className="w-[12px] h-[12px] rounded-sm bg-[#E77A16]" />
                        Trainees
                     </div>
                     <div className="text-[14px]">1,274</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                     <div className="flex items-center gap-2 text-[14px] grow">
                        <span className="w-[12px] h-[12px] rounded-sm bg-[#143656]" />
                        Trainers
                     </div>
                     <div className="text-[14px]">478</div>
                  </div>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="p-2 sm:p-6 pb-3 flex gap-x-3 gap-y-5  flex-wrap">
         <div className="grow">
            <header className="flex justify-between items-center gap-3">
               <h3 className="text-[24px] leading-[1.3]">Total Students </h3>
               <h3 className="text-[26px] leading-[1.3] text-[#FEC700]">
                  1,431
               </h3>
            </header>

            <div className="flex items-center justify-end gap-[10px] sm:pe-3 pt-5 text-[#a098ae]">
               <div className="flex items-center gap-2 text-[14px]">
                  <span className="w-[12px] h-[12px] rounded-sm bg-[#19436B]" />
                  Certificated
               </div>
               <div className="flex items-center gap-2 text-[14px]">
                  <span className="w-[12px] h-[12px] rounded-sm bg-[#01AFB8]" />
                  Completed
               </div>
               <div className="flex items-center gap-2 text-[14px]">
                  <span className="w-[12px] h-[12px] rounded-sm bg-[#EB882B]" />
                  Declined
               </div>
            </div>

            <div className="grow mt-5">
               <Chart />
            </div>
         </div>
         <TotlaUsers />
      </div>
   );
}
