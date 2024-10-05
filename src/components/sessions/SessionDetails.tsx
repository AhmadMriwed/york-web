import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../pars/ThemeContext";
import { calculateHours, getLocalDate } from "@/utils/dateFuncs";
import { storageURL } from "@/utils/api";
/* icons */
import { Location, Calendar, ArrowDownLine, ArrowUpLine } from "@rsuite/icons";
import { FaClock } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
/* components */
import Image from "next/image";

const SessionDetails = ({ sessionInfo, courseInfo, life }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`xl:flex-1 flex justify-between gap-4 flex-wrap-reverse sm:flex-nowrap p-3 sm:p-6 rounded-[16px]
        ${
          mode === "dark" ? "bg-[#212A34] text-[#FFF]" : "bg-white text-[#000]"
        }`}
    >
      {expanded && (
        <div className="flex flex-col justify-between gap-2 max-w-lg">
          <h6 className="font-bold text-[16px] sm:text-[16px]">
            {sessionInfo?.title && `${sessionInfo?.title} `}
            <span className="px-2 py-0.5 text-[12px] bg-[var(--primary-color1)] text-white rounded-full">
              {sessionInfo?.status && sessionInfo?.status}
            </span>
            <span className="px-2 py-0.5 text-[12px] bg-[var(--primary-color1)] text-white rounded-full ml-1">
              {life
                ? sessionInfo?.session_status && sessionInfo.session_status
                : sessionInfo?.classification_session &&
                  sessionInfo.classification_session}
            </span>
          </h6>

          <p className="text-[14px] text-[#888]">
            {`${courseInfo?.title && courseInfo.title} #${
              courseInfo?.code && courseInfo.code
            }`}
          </p>
          {sessionInfo?.code && (
            <p className="text-[14px] m-0">{`code: #${sessionInfo.code}`}</p>
          )}
          {sessionInfo?.training_session_type && (
            <p className="text-[14px] m-0">
              {`type: ${sessionInfo.training_session_type.name}`}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-2">
            {courseInfo?.venue.title && (
              <div
                className="bg-[var(--primary-color2)] text-[#000] w-fit px-[12px] py-[3px] flex justify-center
                items-center gap-1 rounded-full"
              >
                <p className="text-[12px]">{courseInfo.venue.title}</p>
              </div>
            )}
            {courseInfo?.location && (
              <div
                className={`bg-[#000] text-[#FFF] w-fit px-[12px] py-[3px] flex justify-center items-center gap-1
            rounded-full cursor-pointer`}
              >
                <Location />
                <p className="text-[12px]">{courseInfo.location}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4">
            <div className="text-[12px] flex items-center gap-1">
              <Calendar />
              <p>
                {sessionInfo?.date_from && getLocalDate(sessionInfo.date_from)}
              </p>
            </div>
            <div className="text-[12px] flex items-center gap-1">
              <Calendar />
              <p>{sessionInfo?.date_to && getLocalDate(sessionInfo.date_to)}</p>
            </div>
            <div className="text-[12px] flex items-center gap-1">
              <FaClock />
              <p>
                {sessionInfo?.date_from &&
                  sessionInfo?.date_to &&
                  `${calculateHours(
                    sessionInfo.date_from,
                    sessionInfo.date_to
                  )} hr`}
              </p>
            </div>
            <div className="text-[12px] flex items-center gap-1">
              <IoLanguage />
              <p>{courseInfo?.language && courseInfo.language}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between w-full sm:w-fit">
        <div className="bg-slate-400 min-w-[250px] h-[175px] rounded-md">
          {courseInfo?.image && (
            <Image
              src={storageURL + courseInfo.image}
              alt="session image"
              width={250}
              height={175}
              className="sm:!min-w-[250px] bg-center bg-cover object-fit rounded-md"
            />
          )}
        </div>
        <div
          className="p-3 sm:hidden cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ArrowUpLine /> : <ArrowDownLine />}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
