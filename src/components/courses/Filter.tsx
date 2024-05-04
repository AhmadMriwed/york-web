import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCourseAds } from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { getAllCourses } from "@/store/adminstore/slices/courses/coursesSlice";

import { ArrowDownLine } from "@rsuite/icons";
import { CiFilter, CiSearch } from "react-icons/ci";

import { CheckPicker, DatePicker, InputPicker } from "rsuite";

const Filter = ({
  role,
  filterValues,
  setFilterValues,
  filterFields,
  coursesCount,
}: any) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch<any>();

  const handleApplyFilter = () => {
    const updatedFilterValues: any = { ...filterValues };

    Object.keys(updatedFilterValues).forEach((key) => {
      if (
        updatedFilterValues[key] === null ||
        updatedFilterValues[key] === "" ||
        (Array.isArray(updatedFilterValues[key]) &&
          updatedFilterValues[key].length === 0)
      ) {
        delete updatedFilterValues[key];
      }
    });

    const updatedFilterValuesJson = JSON.stringify(updatedFilterValues);

    if (role === "course_ads") {
      dispatch(getCourseAds(updatedFilterValuesJson));
    } else {
      dispatch(getAllCourses(updatedFilterValuesJson));
    }
  };

  return (
    <div className="w-full max-w-lg bg-gradient-to-b from-[#01395F] to-[#02B5A0] p-4 rounded-md flex flex-col gap-4 justify-center items-center">
      <div>
        <div className="text-white flex flex-col element-center">
          <p className="text-[18px] font-[400]">
            Learn A New Skills On Your Time
          </p>
          {coursesCount && (
            <p className="text-[14px]">{`Search Over ${coursesCount} Online Courses`}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex justify-center items-center rounded-full py-2 px-3 bg-white">
          <input
            type="text"
            placeholder="Search by course name, code or details"
            value={filterValues.title}
            onChange={(e) =>
              setFilterValues({
                ...filterValues,
                code: e.target.value,
                title: e.target.value,
              })
            }
            className="flex-1 lg:w-[225px] text-[#888] text-[12px] border-none outline-none"
          />
          <div className="text-[#00d4d4] text-[20px] font-bold">
            <CiSearch />
          </div>
        </div>
        <button
          className="flex justify-center items-center gap-1 text-white bg-gradient-to-tl from-[#01395F] to-[#02B5A0] py-2 px-4 rounded-lg
            hover:font-bold transition-all duration-200"
          onClick={handleApplyFilter}
        >
          <CiFilter />
          <p className="text-[12px] m-0">Apply</p>
        </button>
      </div>
      <div className="w-full flex flex-wrap gap-1 element-center">
        <div
          className="mb-2 w-full flex justify-center items-center gap-2 cursor-pointer text-dark font-[400]"
          onClick={() => setExpanded(!expanded)}
        >
          <p>More Advanced</p> <ArrowDownLine />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {expanded &&
            filterFields.map((field: any, index: number) => {
              if (field.type === "date") {
                return (
                  <DatePicker
                    key={index}
                    size="xs"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              } else if (field.type === "select") {
                return (
                  <InputPicker
                    searchable={false}
                    data={field.data}
                    key={index}
                    size="xs"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              } else {
                return (
                  <CheckPicker
                    searchable={false}
                    data={field.data}
                    key={index}
                    size="xs"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
