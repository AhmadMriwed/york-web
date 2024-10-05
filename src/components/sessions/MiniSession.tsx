import { useContext } from "react";
import { calculateHours, getLocalDate } from "@/utils/dateFuncs";
import { ThemeContext } from "@/components/pars/ThemeContext";
import { Location, Calendar } from "@rsuite/icons";
import { FaClock } from "react-icons/fa";

const MiniSession = ({ session, course }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div
      className={`p-3 rounded-[16px] lg:max-w-[350px]
              ${
                mode === "dark" ? "bg-dark text-[#FFF]" : "bg-light text-[#000]"
              }`}
    >
      <p className="text-[12px] sm:text-[14px] font-bold mb-3">
        {session.title && session.title}
      </p>
      <div className="flex flex-1 justify-between items-end">
        <div className="flex flex-col gap-2">
          <p className="text-[12px] max-w-[150px]">{`${
            course?.title && course.title
          }, Code: ${course?.code && course.code}`}</p>
          <span
            className="bg-[var(--primary-color1)] text-white text-[12px]
            text-center rounded-full px-[6px] py-[4px] w-fit font-bold"
          >
            {session.status && session.status}
          </span>
          {course?.location && (
            <div
              className={`${
                mode === "dark"
                  ? "bg-[var(--light-color)] text-[var(--dark-color)]"
                  : "bg-[var(--dark-color)] text-[var(--light-color)]"
              } w-fit px-[12px] py-[3px] flex justify-center items-center gap-1
            rounded-full cursor-pointer`}
            >
              <Location />
              <p className="text-[12px]">{course.location}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[12px] flex items-center gap-1 self-end text-end">
            <FaClock />
            <p>
              {session.date_from &&
                session.date_to &&
                `${calculateHours(session.date_from, session.date_to)} hr`}
            </p>
          </div>
          <div className="text-[12px] flex items-center gap-1 self-end text-end">
            <Calendar />
            <p>
              {session.date_from &&
                session.date_to &&
                `${getLocalDate(session.date_from)} - ${getLocalDate(
                  session.date_to
                )}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniSession;
