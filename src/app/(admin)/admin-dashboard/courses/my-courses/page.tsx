"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { courseType } from "@/types/adminTypes/courses/coursesTypes";
import {
  courseOperationCompleted,
  getAllCourses,
  getCoursesById,
  getFilterData,
} from "@/store/adminstore/slices/courses/coursesSlice";
import { getTrainers } from "@/store/endUser/endUserSlice";
import { getMyCourses } from "@/store/adminstore/slices/courses/my-courses/myCoursesSlice";
import { GlobalState } from "@/types/storeTypes";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { InputPicker, Loader } from "rsuite";
import Header from "@/components/Pars/Header";
import MyCourse from "@/components/courses/my-courses/MyCourse";
import Course from "@/components/courses/my-courses/Course";
import Filter from "@/components/courses/Filter";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/empty-result/EmptyResult";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import FilteringBar from "@/components/Pars/FilteringBar";

const filterALlBtns = ["Current", "Closed", "Expired"];

export default function MyCourses() {
  const router = useRouter();
  const containerRef = useRef<any>(null);

  const [filterAll, setFilterAll] = useState("Current");
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [trainerTerm, setTrainerTerm] = useState("");
  const [filterMyCourses, setFilterMyCourses] = useState("Current");
  const [showBy, setShowBy] = useState<"all" | "trainer">("all");

  const [filterValues, setFilterValues] = useState({
    code: "",
    title: "",
    category_ids: [],
    venue_ids: [],
    lang: null,
    start_date: null,
    end_date: null,
    years: [],
    months: [],
  });

  const {
    myCourses,
    isLoading: myCoursesLoading,
    error: myCoursesError,
  } = useSelector((state: GlobalState) => state.myCourses);

  const {
    isLoading,
    error,
    filterData,
    allCourses,
    status,
    operationError,
    operationLoading,
  } = useSelector((state: GlobalState) => state.courses);

  const {
    isLoading: trainersLoading,
    error: trainersError,
    trainers,
  } = useSelector((state: GlobalState) => state.endUser);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getMyCourses(filterMyCourses));
  }, [dispatch, filterMyCourses]);

  useEffect(() => {
    dispatch(getTrainers(trainerTerm));
  }, [dispatch, trainerTerm]);

  useEffect(() => {
    dispatch(getFilterData());
  }, [dispatch]);

  useEffect(() => {
    if (showBy === "trainer") {
      dispatch(getCoursesById({ id: selectedTrainer, status: filterAll }));
    } else {
      dispatch(getAllCourses({}));
    }
  }, [dispatch, filterAll, selectedTrainer, showBy]);

  const scrollTo = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount =
        direction === "right" ? container.offsetWidth : -container.offsetWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  let categories, venues, languages, years, months;
  if (
    filterData.categories &&
    filterData.venues &&
    filterData.languages &&
    filterData.year_models &&
    filterData.month_models &&
    trainers
  ) {
    categories = filterData.categories.map((item: any) => ({
      label: item.title,
      value: item.id,
    }));

    venues = filterData.venues.map((item: any) => ({
      label: item.title,
      value: item.id,
    }));

    languages = filterData.languages.map((item: any) => ({
      label: item.name,
      value: item.code,
    }));

    years = filterData.year_models.map((item: any) => ({
      label: item.name,
      value: item.origin,
    }));

    months = filterData.month_models.map((item: any) => ({
      label: item.name,
      value: item.origin,
    }));
  }

  let filterFields = [
    {
      type: "date",
      name: "start_date",
      value: filterValues.start_date,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, start_date: value }),
      placeholder: "Start date",
    },
    {
      type: "date",
      name: "end_date",
      value: filterValues.end_date,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, end_date: value }),
      placeholder: "End date",
    },
    {
      type: "select",
      data: languages,
      value: filterValues.lang,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, lang: value }),
      placeholder: "Language",
    },
    {
      type: "check",
      data: categories,
      value: filterValues.category_ids,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, category_ids: value }),
      placeholder: "Category",
    },
    {
      type: "check",
      data: venues,
      value: filterValues.venue_ids,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, venue_ids: value }),
      placeholder: "Venues",
    },
    {
      type: "check",
      data: years,
      value: filterValues.years,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, years: value }),
      placeholder: "Years",
    },
    {
      type: "check",
      data: months,
      value: filterValues.months,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, months: value }),
      placeholder: "Months",
    },
  ];

  const trainersList = trainers.map((t) => ({
    label: `${t.first_name} ${t.last_name}`,
    value: t.user_id,
  }));

  if (myCoursesError) return <ErrorMessage msg={`Oops! ${myCoursesError}`} />;

  return (
    <section className="p-3 sm:p-6 overflow-hidden">
      <Header
        title="Courses"
        btnTitle="Add New Course"
        btnAction={() => router.push("/admin-dashboard/courses/add")}
      />
      <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${operationError}`}
        error={operationError}
        status={status}
        completedAction={courseOperationCompleted}
      />

      {operationLoading && <Loading backdrop />}

      {/* <div className="my-4 flex flex-wrap items-center gap-2">
        <button className="outlined-btn">Import</button>
        <button className="outlined-btn">Export</button>
      </div> */}

      <div className="mt-4 px-3 py-7 bg-[#212A34] w-full rounded-lg text-white flex flex-col lg:flex-row gap-4 md:gap-11">
        <div className="border-l border-l-[2px] border-[var(--primary-color1)] pl-2 shrink-0">
          <p className="text-[20px] font-[400]">My Courses</p>
          <p className="text-[#888] my-1">check out all your current courses</p>
          <InputPicker
            data={[
              { label: "Current", value: "Current" },
              { label: "Expired", value: "Expired" },
              { label: "Closed", value: "Closed" },
            ]}
            className="hover:!cursor-pointer mt-7"
            name="course-status"
            defaultValue="Current"
            placeholder="Status"
            value={filterMyCourses}
            onChange={(value: string) => setFilterMyCourses(value)}
          />
        </div>
        {myCoursesLoading ? (
          <div className="m-11">
            <Loader size="md" />
          </div>
        ) : myCourses.length > 0 ? (
          <div className="flex items-center gap-2 overflow-hidden py-2 relative">
            <div
              className="flex items-center gap-2 overflow-x-scroll pb-2 no-scrollbar"
              ref={containerRef}
            >
              {myCourses.map((course: courseType) => (
                <MyCourse key={course.id} course={course} />
              ))}
            </div>
            <button
              onClick={() => scrollTo("left")}
              className="absolute top-[50%] left-0 translate-y-[-50%] rounded-full element-center p-3 hidden sm:block hover:scale-[1.1]"
              style={{ backgroundColor: "rgb(0, 0, 0, 0.3)" }}
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => scrollTo("right")}
              className="absolute top-[50%] right-0 translate-y-[-50%] rounded-full element-center p-3 hidden sm:block hover:scale-[1.1]"
              style={{ backgroundColor: "rgb(0, 0, 0, 0.3)" }}
            >
              <FaArrowRight />
            </button>
          </div>
        ) : (
          <EmptyResult />
        )}
      </div>

      <div className="mt-11 mb-7 flex flex-col sm:flex-row justify-between gap-7">
        <div>
          <p className="text-[12px] font-[500] mb-2">Filter Courses :</p>
          <InputPicker
            placement="auto"
            data={[
              { label: "Status & Trainer", value: "trainer" },
              { label: "All courses", value: "all" },
            ]}
            value={showBy}
            cleanable={false}
            onChange={(value: "all" | "trainer") => setShowBy(value)}
            placeholder="Filter by"
          />
        </div>
        {showBy === "all" && (
          <div className="element-center lg:mr-11">
            <Filter
              role="courses"
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              filterFields={filterFields}
            />
          </div>
        )}
      </div>

      {showBy === "trainer" && (
        <>
          <FilteringBar
            filterBy={filterAll}
            setFilterBy={setFilterAll}
            filterData={filterALlBtns}
            dataLength={allCourses.length}
          />

          <div className="mt-2 flex justify-end">
            <div className="flex flex-col gap-2">
              <InputPicker
                data={trainersList}
                placement="auto"
                searchable
                onSearch={(value: string) => setTrainerTerm(value)}
                renderMenu={(menu) => {
                  if (trainersLoading) {
                    return (
                      <p
                        style={{
                          padding: 10,
                          color: "#999",
                          textAlign: "center",
                        }}
                      >
                        <Loader />
                      </p>
                    );
                  }
                  return menu;
                }}
                className="text-black"
                value={selectedTrainer}
                onChange={(value: string) => setSelectedTrainer(value)}
                placeholder="Select trainer"
              />
              <p className="text-[12px] font-[500] text-red-500">
                {!selectedTrainer && `Trainer is required`}
              </p>
            </div>
          </div>
        </>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-7 flex flex-col gap-2">
          {allCourses.length > 0 ? (
            allCourses.map((course: courseType) => (
              <Course key={course.id} course={course} />
            ))
          ) : (
            <EmptyResult />
          )}
        </div>
      )}
    </section>
  );
}
