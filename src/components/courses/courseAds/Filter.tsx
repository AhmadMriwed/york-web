import React, { useState } from "react";
import useExpandedState from "@/hooks/useExpandedState";

import { ArrowDownLine } from "@rsuite/icons";
import { CiFilter, CiSearch } from "react-icons/ci";

import { InputPicker } from "rsuite";

const filterFields = [
  {
    data: [],
    placeholder: "Category",
  },
  {
    data: [],
    placeholder: "Venue",
  },
  {
    data: [],
    placeholder: "Language",
  },
  {
    data: [],
    placeholder: "Month",
  },
  {
    data: [],
    placeholder: "Year",
  },
  {
    data: [],
    placeholder: "St Date",
  },
  {
    data: [],
    placeholder: "Ed Date",
  },
  {
    data: [],
    placeholder: "Status",
  },
  {
    data: [],
    placeholder: "Validity",
  },
  {
    data: [],
    placeholder: "Code",
  },
];

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-lg bg-gradient-to-b from-[#01395F] to-[#02B5A0] p-3 rounded-lg flex flex-col gap-2 justify-center items-center">
      <div>
        <div className="text-white flex flex-col element-center">
          <p className="text-[18px] font-[400] m-0">
            Learn A New Skills On Your Time
          </p>
          <p className="text-[14px] my-2">Search Over 57,000 Online Courses</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex justify-center items-center rounded-full py-2 px-3 bg-white">
            <input
              type="text"
              placeholder="Search by course name, code or details"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 lg:w-[225px] text-[#888] text-[12px] border-none outline-none"
            />
            <div className="text-[#00d4d4] text-[20px] font-bold">
              <CiSearch />
            </div>
          </div>
          <button className="flex justify-center items-center gap-1 text-white bg-gradient-to-tl from-[#01395F] to-[#02B5A0] py-2 px-4 rounded-lg">
            <CiFilter />
            <p className="text-[12px] m-0">Apply</p>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-1 element-center">
        <div
          className="mb-2 w-full flex justify-center items-center gap-2 cursor-pointer text-dark font-[400]"
          onClick={() => setExpanded(!expanded)}
        >
          <p>More Advanced</p> <ArrowDownLine />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {expanded &&
            filterFields.map((field, index) => (
              <InputPicker
                key={index}
                size="xs"
                data={[]}
                placeholder={field.placeholder}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
