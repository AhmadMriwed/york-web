import Image from "next/image";
import React, { useContext, useState } from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import photo from "../../../public/avatar.png";
import { ThemeContext } from "../Pars/ThemeContext";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

export default function AnnouncementsStatistics() {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const [enrolled, declined, created] = [0.6, 0.2, 0.18];

   const Order = () => {
      const [isClicked, setIsClicked] = useState(false);
      return (
         <div className="relative cursor-pointer">
            <div
               className={`shadow-md flex justify-between gap-1 items-center flex-wrap px-[7px] py-[10px] text-[#a098ae] rounded-[6px] ${
                  mode === "dark" ? "rounded-[10px] bg-[#1A2532]" : "bg-white"
               }`}
               onClick={() => setIsClicked(!isClicked)}
            >
               <div className="flex items-center gap-1 grow">
                  <Image
                     src={photo}
                     alt="photo"
                     width={22}
                     height={22}
                     className="rounded-[50%]"
                  />
                  <p className="leading-[1.2] m-0 text-[10px]">Jhone Smis</p>
               </div>
               <p className="leading-[1.2] m-0 text-[10px] break-words ">
                  email.example@gmail.com
               </p>
               <div
                  className={`${
                     isClicked ? "block" : "hidden"
                  } popup absolute w-[100%] h-[calc(100%_-_10px)] top-[50%] left-0 translate-y-[-50%] bg-[#e8e8e873] shadow-md`}
               >
                  <div className="flex justify-center items-center gap-[40px] h-[100%]">
                     <div
                        className="bg-[#2FFBD2] flex element-center w-[22px] h-[22px] rounded-[50%] m-0 text-center hover:bg-[#2ffbd2ad] transition-all duration-200"
                        onClick={() => console.log("true is clicked")}
                     >
                        <FaCheck className="text-[14px] text-black " />
                     </div>
                     <div
                        className="bg-[#D26060] flex element-center w-[22px] h-[22px] rounded-[50%] m-0 text-center hover:bg-[#d14141fb] transition-all duration-200"
                        onClick={() => console.log("fasle is clicked")}
                     >
                        <IoCloseOutline className="text-[16px] text-black " />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="p-3 sm:py-6 sm:px-3 pb-3">
         <header className="px-2 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-3">
               <TfiAnnouncement className="text-[var(--primary-color1)] text-[32px]" />
               <div>
                  <p className="leading-[1.2] text-[15px] sm:text-[17px] font-semibold m-0">
                     Announcements
                  </p>
                  <p className="leading-[1.2] text-[10px] m-0">
                     all available courses annoucements{" "}
                  </p>
               </div>
            </div>
            <div>
               <p className="leading-[1.2] text-[12px] text-[#FFDC42]">
                  +100 students
               </p>
               <p className="leading-[1.2] text-[12px] text-[#FFDC42] m-0">
                  this week
               </p>
            </div>
         </header>

         <div className="flex gap-2 flex-wrap flex-col sm:flex-row mt-[25px]">
            <div className="flex flex-col items-center  h-[250px] p-3 sm:p-0 sm:w-[calc(40%_-_6px)] grow">
               <h5 className="leading-[1.2] m-0 text-[12px] text-center">
                  Total Ads Orders
               </h5>
               <p className="text-[16px] leading-[1.2] mt-2 mx-auto">234</p>
               <div className="w-[120px] h-[120px] mt-[15px]">
                  <div
                     className="relative w-full h-full max-w-[180px] max-h-[180px] aspect-[1/1] rounded-[50%] "
                     style={
                        {
                           "--first": enrolled,
                           "--second": declined,
                           "--third": created,
                        } as React.CSSProperties
                     }
                  >
                     <div
                        className={`${
                           mode === "dark"
                              ? " before:!border-t-[#1A2532]"
                              : " before:!border-t-white"
                        } donut-slice-announcement donut-slice-first-announcement
                           
                           `}
                     ></div>
                     <div
                        className={`${
                           mode === "dark"
                              ? " before:!border-t-[#1A2532]"
                              : " before:!border-t-white"
                        } donut-slice-announcement  donut-slice-second-announcement `}
                     ></div>
                     <div
                        className={`${
                           mode === "dark"
                              ? " before:!border-t-[#1A2532]"
                              : " before:!border-t-white"
                        } donut-slice-announcement donut-slice-third-announcement `}
                     ></div>

                     <div className="w-[80%] leading-[1.5] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
                        <div className="text-[22px] font-semibold">{1.872}</div>
                        <div className="text-[15px] font-light">Online</div>
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-1 flex-wrap  justify-between mt-[30px] w-full">
                  <div>
                     <div className="flex gap-[3px] items-center text-[9px]">
                        <span className="w-[8px] h-[8px] rounded-[50%] bg-[#19436B]" />{" "}
                        Declined
                     </div>
                     <div className="text-[14px] ml-1">14</div>
                  </div>
                  <div>
                     <div className="flex gap-[3px] items-center text-[9px]">
                        <span className="w-[8px] h-[8px] rounded-[50%] bg-[#FFB21A]" />{" "}
                        Created
                     </div>
                     <div className="text-[14px] ml-1">14</div>
                  </div>
                  <div>
                     <div className="flex gap-[3px] items-center text-[9px]">
                        <span className="w-[8px] h-[8px] rounded-[50%] bg-[#00EEEE]" />{" "}
                        Enrolled
                     </div>
                     <div className="text-[14px] ml-1">14</div>
                  </div>
               </div>
            </div>

            <div className="h-[250px] p-3 sm:p-0  sm:w-[calc(60%_-_6px)] grow">
               <h5 className="leading-[1.2] m-0 text-[12px]">
                  Total Ads Orders :
               </h5>
               <div className="mt-3 flex flex-col gap-2 h-[calc(100%_-_26px)] overflow-y-auto hide-scrollebar">
                  <Order />
                  <Order />
                  <Order />
                  <Order />
                  <Order />
                  <Order />
               </div>
            </div>
         </div>
      </div>
   );
}
