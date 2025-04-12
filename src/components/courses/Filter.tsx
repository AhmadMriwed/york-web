import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCourseAds } from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { getAllCourses } from "@/store/adminstore/slices/courses/coursesSlice";
import { ArrowDownLine, ArrowUpLine } from "@rsuite/icons";
import { CiFilter, CiSearch } from "react-icons/ci";
import { CheckPicker, DatePicker, SelectPicker } from "rsuite";

const Filter = ({
  role,
  filterValues,
  setFilterValues,
  resetFilterValues,
  filterFields,
  coursesCount,
  styles,
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
    <div
      className={`w-full max-w-3xl bg-gradient-to-b from-[#01395F] to-[#02B5A0] p-6 rounded-md flex flex-col justify-center items-center ${
        styles ? styles : ""
      }`}
    >
      <div>
        <div className="text-white flex flex-col element-center">
          <p className="text-[16px] font-[400] leading-[1.6rem]">
            Learn A New Skills On Your Time
          </p>
          {coursesCount && (
            <p className="text-[12px] leading-[1.6rem] m-0">{`Search Over ${coursesCount} Online Courses`}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2.5">
        <div
          className={
            "flex flex-1 justify-center items-center rounded-full py-2 px-3 dark:bg-black bg-white"
          }
        >
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
            className="w-full lg:w-[225px] min-w-[100px] text-white text-[12px] border-none outline-none"
          />
          <div className="text-[#00d4d4] text-[20px] font-bold">
            <CiSearch />
          </div>
        </div>
        <div className="flex justify-center items-center gap-1">
          <button
            className="flex justify-center items-center gap-1 text-white bg-gradient-to-tl from-[#01395F] to-[#02B5A0] py-2 px-4 rounded-full
            text-[12px] hover:translate-y-[-2px] transition-all duration-200"
            onClick={handleApplyFilter}
          >
            <CiFilter />
            <p className="m-0">Apply</p>
          </button>
          <button
            className="text-black bg-white py-2 px-4 rounded-full
            text-[12px] hover:translate-y-[-2px] transition-all duration-200"
            onClick={resetFilterValues}
          >
            <p className="m-0">Clear all</p>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-1 element-center mt-2.5">
        <button
          className="mb-2 w-full flex justify-center items-center gap-2 cursor-pointer text-[12px] text-[#000] font-semibold"
          onClick={() => setExpanded(!expanded)}
        >
          <p>More Advanced</p> {expanded ? <ArrowUpLine /> : <ArrowDownLine />}
        </button>
        <div className="grid grid-cols-3 gap-2">
          {expanded &&
            filterFields.map((field: any, index: number) => {
              if (field.type === "date") {
                return (
                  <DatePicker
                    oneTap
                    key={index}
                    size="xs"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              } else if (field.type === "select") {
                return (
                  <SelectPicker
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
