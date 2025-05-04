import React from "react";
import { useDispatch } from "react-redux";
import { getCourseAds } from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { getAllCourses } from "@/store/adminstore/slices/courses/coursesSlice";
import { ArrowDownLine, ArrowUpLine } from "@rsuite/icons";
import { CiFilter, CiSearch } from "react-icons/ci";
import { CheckPicker, DatePicker, SelectPicker } from "rsuite";

const AssignmentFilter = ({
  role,
  filterValues,
  setFilterValues,
  resetFilterValues,
  filterFields,
  styles,
  disabled,
  onApplyFilter,
}: any) => {
  const dispatch = useDispatch<any>();

  const handleApplyFilter = () => {
    onApplyFilter();
  };

  // Format data for RSuite pickers
  const formatPickerData = (field: any) => {
    if (field.type === "select") {
      return field.options.map((option: any) => ({
        label: option.label,
        value: option.value,
      }));
    } else if (field.type === "check") {
      return field.data?.map((item: any) => ({
        label: item.title,
        value: item.id,
      }));
    } else if (field.name === "status") {
      return field.options?.map((option: any) => ({
        label: option.type,
        value: option.type,
      }));
    } else if (field.name === "organization") {
      return field.options?.map((option: any) => ({
        label: option.type,
        value: option.type,
      }));
    }
    return [];
  };

  return (
    <div
      className={`w-full max-w-3xl bg-gradient-to-b from-[#01395F] to-[#02B5A0] p-6 rounded-md flex flex-col justify-center items-center ${
        styles ? styles : ""
      }`}
    >
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2.5">
        <div
          className={
            "flex flex-1 justify-center items-center rounded-full py-2 px-3 dark:bg-gray-700 bg-white"
          }
        >
          <input
            type="text"
            placeholder="Search by assignments name, code "
            value={filterValues.title}
            onChange={(e) =>
              setFilterValues({
                ...filterValues,
                code: e.target.value,
                title: e.target.value,
              })
            }
            className="w-full lg:w-[225px] min-w-[100px] dark:text-white dark:bg-gray-700 text-[12px] border-none outline-none"
            disabled={disabled}
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
            disabled={disabled}
          >
            <CiFilter />
            <p className="m-0">Apply</p>
          </button>
          <button
            className="text-black bg-white py-2 px-4 rounded-full
            text-[12px] hover:translate-y-[-2px] transition-all duration-200"
            onClick={resetFilterValues}
            disabled={disabled}
          >
            <p className="m-0">Clear all</p>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-1 element-center mt-4">
        <div className="grid grid-cols-3  gap-2 text-center">
          {filterFields.map((field: any, index: number) => {
            if (field.type === "date") {
              return (
                <DatePicker
                  oneTap
                  key={index}
                  size="xs"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              );
            } else if (
              field.type === "select" ||
              field.name === "status" ||
              field.name === "organization"
            ) {
              return (
                <SelectPicker
                  searchable={false}
                  data={formatPickerData(field)}
                  key={index}
                  size="xs"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              );
            } else if (field.type === "check") {
              return (
                <CheckPicker
                  searchable={false}
                  data={formatPickerData(field)}
                  key={index}
                  size="xs"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default AssignmentFilter;
