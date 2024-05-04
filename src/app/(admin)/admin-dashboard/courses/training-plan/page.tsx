"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { courseAdType } from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import { getCourseAds } from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { getTrainingPlan } from "@/store/adminstore/slices/courses/training-plan/trainingPlanSlice";

import { More } from "@rsuite/icons";
import { CiFileOn } from "react-icons/ci";

import { DatePicker, Dropdown, IconButton, Loader } from "rsuite";
import Header from "@/components/Pars/Header";
import CourseAd from "@/components/courses/courseAds/CourseAd";
import Image from "next/image";
import Loading from "@/components/Pars/Loading";

const TrainingPlan = () => {
  const router = useRouter();

  const [stDate, setStDate] = useState(null);
  const [edDate, setEdDate] = useState(null);

  const { courseAds, isLoading, error } = useSelector(
    (state: GlobalState) => state.courseAds
  );

  const {
    isLoading: planLoading,
    error: planError,
    trainingPlan,
  } = useSelector((state: GlobalState) => state.trainingPlan);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getTrainingPlan());
  }, [dispatch]);

  useEffect(() => {
    let filterValues: any = {};

    if (stDate) filterValues = { ...filterValues, start_date: stDate };
    if (edDate) filterValues = { ...filterValues, end_date: edDate };

    const jsonValues = JSON.stringify(filterValues);

    dispatch(getCourseAds(jsonValues));
  }, [dispatch, edDate, stDate]);

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="lg"
        circle
        className="!text-[var(--light-bg-color)] !bg-transparent"
      />
    );
  };

  if (planLoading) return <Loading />;

  return (
    <>
      <section className="p-3 sm:p-6">
        <Header
          title="Training Plan"
          btnTitle="Add Course Ad"
          btnAction={() =>
            router.push("/admin-dashboard/courses/course-ads/add")
          }
        />

        {/* <div className="flex flex-col lg:flex-row justify-center gap-7 mt-7 p-3 sm:p-6 w-full bg-[var(--dark-bg-color)] text-white rounded-md">
          <div className="bg-slate-400 rounded-md w-fit">
            {trainingPlan.image && (
              <Image
                src={trainingPlan.image}
                alt="training plan image"
                width={275}
                height={175}
                className="bg-center bg-cover object-fit rounded-md"
              />
            )}
          </div>

          <div className="flex justify-between gap-11">
            <div>
              <p className="text-[16px] sm:text-[22px] font-bold">
                {`Training Plan ${trainingPlan.year ? trainingPlan.year : ""}`}
              </p>
              <p className="sm:text-[16px]">
                {trainingPlan.title && trainingPlan.title}
              </p>
              <p className="max-w-md text-[12px]">
                {trainingPlan.sub_title && trainingPlan.sub_title}
              </p>
              {trainingPlan.file && (
                <div className="flex justify-between sm:justify-start items-center gap-11 mt-6">
                  <div className="flex items-center gap-1">
                    <CiFileOn />
                    <p>File</p>
                  </div>
                  <div>
                    <Dropdown
                      renderToggle={renderIconButton}
                      placement="bottomEnd"
                    >
                      <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                        Download file
                      </Dropdown.Item>
                      <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                        Preview file
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
                <Dropdown.Item
                  className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                  onClick={() =>
                    router.push(
                      `/admin-dashboard/courses/training-plan/update/${trainingPlan.id}`
                    )
                  }
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                  Import
                </Dropdown.Item>
                <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                  Export
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div> */}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex justify-between items-center gap-2">
            <p>St: </p>
            <DatePicker
              placement="auto"
              format="yyyy-MM-dd HH:mm"
              className="!border-none"
              name="start_date"
              onChange={(value: any) => setStDate(value)}
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <p>Ed: </p>
            <DatePicker
              placement="auto"
              format="yyyy-MM-dd HH:mm"
              className="!border-none"
              name="end_date"
              onChange={(value: any) => setEdDate(value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="element-center m-7">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {courseAds.map((ad: courseAdType) => (
              <CourseAd ad={ad} key={ad.id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default TrainingPlan;
