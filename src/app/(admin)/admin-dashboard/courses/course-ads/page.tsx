"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseAdOperationCompleted,
  getCourseAds,
  getFilterData,
} from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { courseAdType } from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";

import CourseAd from "@/components/courses/courseAds/CourseAd";
import Filter from "@/components/courses/Filter";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";

const CoursesAds = () => {
  const router = useRouter();

  const { courseAds, filterData, isLoading, error } = useSelector(
    (state: GlobalState) => state.courseAds
  );
  const { status, operationLoading, operationError } = useSelector(
    (state: GlobalState) => state.courseAds
  );

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getFilterData());
    dispatch(getCourseAds({}));
  }, [dispatch]);

  const [filterValues, setFilterValues] = useState({
    code: "",
    title: "",

    start_date: null,
    end_date: null,

    validate: null,
    active: null,
    lang: null,

    category_ids: [],
    venue_ids: [],

    years: [],
    months: [],
  });

  let categories, venues, languages, years, months;
  if (
    filterData.categories &&
    filterData.venues &&
    filterData.languages &&
    filterData.year_models &&
    filterData.month_models
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
      data: [
        { label: "Valid", value: "true" },
        { label: "Invalid", value: "false" },
      ],
      value: filterValues.validate,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, validate: value }),
      placeholder: "Validity",
    },
    {
      type: "select",
      data: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
      value: filterValues.active,
      onChange: (value: any) =>
        setFilterValues({ ...filterValues, active: value }),
      placeholder: "Status",
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

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="px-2 pt-6 lg:px-6">
      <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${operationError}`}
        error={operationError}
        status={status}
        completedAction={courseAdOperationCompleted}
      />
      <div className="flex justify-between items-start gap-4 flex-col md:flex-row">
        <div>
          <h3 className="font-bold text-[24px] sm:text-[32px] text-[var(--primary-color1)]">
            Course ads
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button className="outlined-btn">Import</button>
            <button className="outlined-btn">Export</button>
          </div>
        </div>
        <Filter
          role="course_ads"
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          filterFields={filterFields}
          coursesCount={filterData.count_course_ad}
        />
        <button
          className="colored-btn !w-full sm:!w-fit"
          onClick={() => router.push("/admin-dashboard/courses/course-ads/add")}
        >
          Add Course Ad
        </button>
      </div>

      <div className="my-7 flex flex-col gap-2">
        {courseAds.map((ad: courseAdType) => (
          <CourseAd ad={ad} key={ad.id} />
        ))}
      </div>
    </section>
  );
};

export default CoursesAds;
