import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const FilteringBar = ({
  filterBy,
  setFilterBy,
  filterData,
  dataLength,
}: {
  filterBy: string;
  setFilterBy: (value: string) => void;
  filterData: string[];
  dataLength?: number;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div
      className={`mt-7 border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center ${
        mode === "dark" ? "text-[#FFF]" : "text-[#000]"
      }`}
    >
      {filterData.map((btnTitle) => (
        <button
          key={btnTitle}
          onClick={() => setFilterBy(btnTitle)}
          className={`py-2 sm:px-4 text-[14px] sm:text-[16px] font-[500] flex justify-center items-center gap-1 ${
            filterBy === btnTitle
              ? "border-b-2 border-[var(--primary-color1)]"
              : ""
          }`}
        >
          <p>{btnTitle}</p>

          {filterBy === btnTitle && (dataLength || dataLength === 0) && (
            <span className="bg-[var(--primary-color1)] min-w-[20px] max-w-fit h-[20px] p-0.5 rounded-full element-center text-[#FFF] text-[10px] font-bold">
              {dataLength}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilteringBar;
