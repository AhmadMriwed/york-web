import { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { Location, Peoples, Calendar } from "@rsuite/icons";

const MiniSession = ({ pickable }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-1 justify-between items-end p-3 rounded-[16px]
      ${
        pickable
          ? `${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`
          : `${
              mode === "dark"
                ? "bg-[var(--dark-color)]"
                : "bg-[var(--light-color)]"
            }`
      }`}
    >
      <div className="flex flex-col gap-2">
        <h6 className="text-[14px] font-bold">03. SQL Principles</h6>
        <p className="text-[12px]">Data Science Course , ID : #342</p>
        <span
          className="bg-[var(--primary-color1)] text-[var(--light-color)] text-[10px]
            text-center rounded-full px-[4px] py-[2px] w-fit"
        >
          Web Development
        </span>
        <div
          className={`${
            mode === "dark"
              ? "bg-[var(--light-color)] text-[var(--dark-color)]"
              : "bg-[var(--dark-color)] text-[var(--light-color)]"
          } w-fit px-[12px] py-[3px] flex justify-center items-center gap-1
        rounded-full`}
        >
          <Location />
          <p className="text-[10px]">Rome</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-[10px] flex items-center gap-1 self-end text-end">
          <Peoples />
          <p>5600 Students</p>
        </div>
        <div className="text-[10px] flex items-center gap-1 self-end text-end">
          <Calendar />
          <p>23 May, 2023 to 05 Oct, 2023</p>
        </div>
      </div>
    </div>
  );
};

export default MiniSession;
