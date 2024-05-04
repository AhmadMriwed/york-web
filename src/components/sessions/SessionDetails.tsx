import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { calculateHours, getLocalDate } from "@/utils/dateFuncs";
import { storageURL } from "@/utils/api";
/* icons */
import { Location, Calendar, ArrowDownLine, ArrowUpLine } from "@rsuite/icons";
import { FaLanguage, FaClock } from "react-icons/fa";
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
      className={`xl:flex-1 flex justify-between gap-2 sm:gap-4 flex-wrap-reverse sm:flex-nowrap p-3 sm:p-6 rounded-[16px]
        ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
    >
      {expanded && (
        <div className="flex flex-col justify-between gap-1 max-w-lg">
          <h6 className="font-bold text-[16px] sm:text-[16px]">
            {sessionInfo?.title && `${sessionInfo?.title} `}
            <span className="px-2 py-0.5 text-[12px] sm:text-[14px] bg-[var(--primary-color1)] text-white rounded-full">
              {sessionInfo?.status && sessionInfo?.status}
            </span>
            <span className="px-2 py-0.5 text-[12px] sm:text-[14px] border-[1px] border-[var(--primary-color1)] rounded-full ml-1">
              {life
                ? sessionInfo?.session_status && sessionInfo.session_status
                : sessionInfo?.classification_session &&
                  sessionInfo.classification_session}
            </span>
          </h6>
          <p className="text-[14px] sm:text-[16px] text-[#888]">
            {`${courseInfo?.title && courseInfo.title}, code: ${
              courseInfo?.code && courseInfo.code
            }`}
          </p>
          {sessionInfo?.code && (
            <p className="text-[14px] m-0">{`code: ${sessionInfo.code}`}</p>
          )}
          {sessionInfo?.training_session_type && (
            <p className="text-[14px] m-0">
              {`type: ${sessionInfo.training_session_type.name}`}
            </p>
          )}
          <div className="flex items-center flex-wrap gap-2">
            {courseInfo?.venue.title && (
              <div
                className={`${
                  mode === "dark"
                    ? "bg-[var(--light-color)] text-[var(--dark-color)]"
                    : "bg-[var(--dark-color)] text-[var(--light-color)]"
                } w-fit px-[12px] py-[3px] flex justify-center items-center gap-1
            rounded-full`}
              >
                <p className="text-[12px]">{courseInfo.venue.title}</p>
              </div>
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
          <div className="flex gap-2 sm:gap-4 items-center mt-2">
            <div className="text-[12px] sm:text-[14px] flex items-center gap-1">
              <FaClock />
              <p>
                {sessionInfo?.date_from &&
                  sessionInfo?.date_to &&
                  `${calculateHours(
                    sessionInfo.date_from,
                    sessionInfo.date_to
                  )}hr`}
              </p>
            </div>
            <div className="text-[12px] sm:text-[14px] flex items-center gap-1">
              <FaLanguage />
              <p>{courseInfo?.lang && courseInfo.lang}</p>
            </div>
            <div className="text-[12px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>
                {sessionInfo?.date_from &&
                  sessionInfo?.date_to &&
                  `${getLocalDate(sessionInfo.date_from)} - ${getLocalDate(
                    sessionInfo.date_from
                  )}`}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full sm:w-fit">
        <div className="bg-slate-400 min-w-[200px] w-full sm:w-fit min-h-[200px] rounded-[8px] self-start">
          {sessionInfo?.image && (
            <Image
              src={storageURL + sessionInfo.image}
              alt="session image"
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
