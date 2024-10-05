import { useContext } from "react";
import { ThemeContext } from "@/components/pars/ThemeContext";
import { sessionState } from "@/types/adminTypes/sessions/sessionsTypes";
import { getLocalISODate } from "@/utils/dateFuncs";
import { Avatar } from "rsuite";

const SessionState = ({ state }: { state: sessionState; key: any }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div
      className={`p-2 rounded-[8px] ${
        mode === "dark" ? "bg-dark text-[#FFF]" : "bg-light text-[#000]"
      }`}
    >
      <div className="flex justify-between items-center gap-11">
        <div className="flex items-center gap-1">
          <Avatar src={state.user.image} circle alt="user image" />
          <div>
            <div className="font-bold text-[12px] sm:text-[14px]">{`${state.user.first_name} ${state.user.last_name}`}</div>
          </div>
        </div>

        <div className="text-end">
          <div
            className={`font-bold text-[12px] sm:text-[14px] ${
              mode === "dark"
                ? "text-[var(--primary-color2)]"
                : "text-[var(--primary-color1)]"
            }`}
          >
            {state.status}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end gap-11 mt-1">
        <div className="text-[12px] sm:text-[14px] text-[#888]">
          {getLocalISODate(state.start_time)}
        </div>

        <div className="text-[12px] sm:text-[14px] text-[#888]">
          {getLocalISODate(state.end_time)}
        </div>
      </div>
    </div>
  );
};

export default SessionState;
