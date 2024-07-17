import { useContext } from "react";
import { Tooltip, Whisper } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";

export default function TotalCourses() {
   const amounts = [0, 10, 100, 1000, 10000];
   const [trainers, trainess, client] = [0.8, 0.1, 0.2];
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const category = [
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

   const city = [
      {
         id: 1,
         name: "MO",
         certificated: 2,
         completed: 1,
         declined: 5,
      },
      {
         id: 2,
         name: "Tu",
         certificated: 1,
         completed: 2,
         declined: 7,
      },
      {
         id: 3,
         name: "we",
         certificated: 1,
         completed: 1,
         declined: 8,
      },
      {
         id: 4,
         name: "th",
         certificated: 5,
         completed: 1,
         declined: 3,
      },
      {
         id: 5,
         name: "fr",
         certificated: 3.2,
         completed: 1,
         declined: 5,
      },
      {
         id: 6,
         name: "sa",
         certificated: 1.4,
         completed: 6.3,
         declined: 1.4,
      },
      {
         id: 7,
         name: "su",
         certificated: 1.2,
         completed: 4.2,
         declined: 2.2,
      },
   ];

   const Chart = ({ data }: { data: any }) => {
      return (
         <div>
            <div className="flex items-end w-full h-[170px]">
               <div className="h-full flex flex-col-reverse justify-between w-[40px]">
                  {amounts.map((amount) => {
                     return (
                        <div key={amount} className="py-[5px] text-[#A7A7A7]">
                           {amount}
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
                  {data.map((item: any) => {
                     return (
                        <div
                           className="flex flex-col justify-end items-center gap-[3px] w-[25px] h-full"
                           key={item.id}
                        >
                           <Whisper
                              placement="left"
                              controlId="control-id-hover"
                              trigger="hover"
                              speaker={
                                 <Tooltip>
                                    Completed: {item.completed} h
                                 </Tooltip>
                              }
                           >
                              <div
                                 className="w-[8px] rounded-[2px] bg-[#01AFB8] min-h-2 cursor-pointer"
                                 style={{ height: item.completed * 10 + "%" }}
                              ></div>
                           </Whisper>

                           <Whisper
                              placement="left"
                              controlId="control-id-hover"
                              trigger="hover"
                              speaker={
                                 <Tooltip>Declined : {item.declined} h</Tooltip>
                              }
                           >
                              <div
                                 className="w-[8px] rounded-[2px] bg-[#EB882B] min-h-2 cursor-pointer"
                                 style={{ height: item.declined * 10 + "%" }}
                              ></div>
                           </Whisper>

                           <Whisper
                              placement="left"
                              controlId="control-id-hover"
                              trigger="hover"
                              speaker={
                                 <Tooltip>
                                    certificated : {item.certificated} h
                                 </Tooltip>
                              }
                           >
                              <div
                                 className="w-[8px] rounded-[2px] bg-[#19436B] min-h-5 cursor-pointer"
                                 style={{
                                    height: item.certificated * 10 + "%",
                                 }}
                              ></div>
                           </Whisper>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="flex ml-[40px] w-[calc(100%_-_40px)] justify-evenly px-[10px]">
               {data.map((item: any) => {
                  return (
                     <p
                        key={item.id}
                        className="w-[25px] text-[13px] text-center mt-[10px] capitalize text-[#A7A7A7]"
                     >
                        {item.name}
                     </p>
                  );
               })}
            </div>
         </div>
      );
   };

   const CoursesBy = ({ by, data }: { by: "category" | "city"; data: any }) => {
      return (
         <div className="mt-[20px] grow max-w-[400px]">
            <h4 className="text-[16px] leading-[1.3] capitalize font-semibold">
               By {by} :{" "}
            </h4>
            <div className="mt-[20px]">
               <div className="flex items-center justify-end gap-[10px] flex-wrap  sm:pe-3 pt-5 text-[#a098ae]">
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

               <div className="grow mt-[25px]">
                  <Chart data={data} />
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="px-[10px] py-[30px] sm:p-[30px] sm:pb-[50px]">
         <header className="flex justify-between items-center flex-wrap mb-[10px]">
            <h3 className="text-[20px] leading-[1.3] font-semibold">
               Total Courses{" "}
               <span className="ms-4 text-[#FEC700] text-[26px]">12,342</span>
            </h3>
            <button className="w-[90px] md:w-[100px] p-[5px] bg-[var(--primary-color1)] rounded-[6px] text-white">
               Button
            </button>
         </header>

         <div className="flex justify-between items-center gap-[40px] flex-wrap">
            <CoursesBy by="city" data={category} />
            <CoursesBy by="category" data={city} />
         </div>
      </div>
   );
}
