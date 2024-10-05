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

import CourseAd from "@/components/courses/course-ads/CourseAd";
import Filter from "@/components/courses/Filter";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/empty-result/EmptyResult";

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

  const resetFilterValues = () => {
    setFilterValues({
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
  };

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

      {operationLoading && <Loading backdrop />}

      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center lg:items-start gap-4">
        <div>
          <h3 className="font-bold text-[24px] sm:text-[32px] text-[var(--primary-color1)]">
            Course ads
          </h3>

          {/* <div className="mt-4 flex flex-wrap items-center gap-2">
            <button className="outlined-btn">Import</button>
            <button className="outlined-btn">Export</button>
          </div> */}
        </div>
        <button
          className="colored-btn lg:order-last"
          style={{
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
          onClick={() => router.push("/admin/dashboard/courses/course-ads/add")}
        >
          Add Course ad
        </button>
        <Filter
          role="course_ads"
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          resetFilterValues={resetFilterValues}
          filterFields={filterFields}
          coursesCount={filterData.count_course_ad}
        />
      </div>

      <div className="my-7 flex flex-col gap-2">
        {isLoading ? (
          <Loading />
        ) : courseAds.length > 0 ? (
          courseAds.map((ad: courseAdType) => <CourseAd ad={ad} key={ad.id} />)
        ) : (
          <EmptyResult />
        )}
      </div>
    </section>
  );
};

export default CoursesAds;
