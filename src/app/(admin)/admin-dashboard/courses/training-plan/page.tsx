"use client";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { courseAdType } from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import {
  courseAdOperationCompleted,
  getCourseAds,
} from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import {
  downloadTrainingPlan,
  getTrainingPlan,
} from "@/store/adminstore/slices/courses/training-plan/trainingPlanSlice";
import { storageURL } from "@/utils/api";

import { More } from "@rsuite/icons";
import { CiFileOn } from "react-icons/ci";

import { DatePicker, Dropdown, IconButton, Loader } from "rsuite";
import Header from "@/components/Pars/Header";
import CourseAd from "@/components/courses/course-ads/CourseAd";
import Image from "next/image";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import EmptyResult from "@/components/empty-result/EmptyResult";
import OperationAlert from "@/components/Pars/OperationAlert";
import PDF from "@/components/PDF/PDF/PDF";
import { ThemeContext } from "@/components/Pars/ThemeContext";

const TrainingPlan = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  const [stDate, setStDate] = useState(null);
  const [edDate, setEdDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    courseAds,
    isLoading,
    error,
    operationError,
    operationLoading,
    status,
  } = useSelector((state: GlobalState) => state.courseAds);

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

  if (planError) return <ErrorMessage msg={`Oops! ${planError}`} />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <>
      <section className="p-3 sm:p-6">
        <Header
          title="Training Plan"
          btnTitle="Add Course ad"
          btnAction={() =>
            router.push("/admin-dashboard/courses/course-ads/add")
          }
        />
        <OperationAlert
          messageOnSuccess="The operation was completed successfuly"
          messageOnError={`Oops! ${operationError}`}
          status={status}
          error={operationError}
          completedAction={courseAdOperationCompleted}
        />

        {operationLoading && <Loading backdrop />}

        <PDF
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          PDF={trainingPlan?.file}
        />

        {trainingPlan ? (
          <div className="flex flex-col lg:flex-row justify-center gap-7 mt-7 p-3 sm:p-6 w-full bg-[var(--dark-bg-color)] text-white rounded-md">
            <div className="bg-slate-400 rounded-md w-full lg:w-fit">
              {trainingPlan.image && (
                <Image
                  src={storageURL + trainingPlan.image}
                  alt="training plan image"
                  width={350}
                  height={175}
                  className="bg-center bg-cover object-fit rounded-md"
                />
              )}
            </div>

            <div>
              <div className="flex justify-between items-center gap-6">
                <p className="text-[16px] sm:text-[22px] font-bold">
                  {`Training Plan ${
                    trainingPlan.year ? trainingPlan.year : ""
                  }`}
                </p>
                <div>
                  <Dropdown
                    renderToggle={renderIconButton}
                    placement="bottomEnd"
                  >
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
              <p className="sm:text-[16px]">
                {trainingPlan.title && trainingPlan.title}
              </p>
              <p className="lg:max-w-lg text-[12px] leading-[1.6rem]">
                {trainingPlan.sub_title && trainingPlan.sub_title}
              </p>
              {trainingPlan?.file && (
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
                      <a
                        href={storageURL + trainingPlan.file.path}
                        download
                        target="_blank"
                      >
                        <Dropdown.Item
                          className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                          // onClick={() =>
                          //   dispatch(downloadTrainingPlan(trainingPlan.file.path))
                          // }
                        >
                          Download file
                        </Dropdown.Item>
                      </a>
                      <Dropdown.Item
                        className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                        onClick={() => setModalOpen(true)}
                      >
                        Preview file
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col element-center my-11 p-6 sm:p-11 rounded-2xl ${
              mode === "dark" ? "bg-[var(--dark-bg-color)]" : "bg-white"
            }`}
          >
            <p className="text-[20px] font-bold text-center">
              There is no Training Plan
            </p>
            <p className="text-[14px] text-center">
              If you want to add a new training plan click the button below
            </p>
            <button
              className="outlined-btn mt-6"
              onClick={() =>
                router.push("/admin-dashboard/courses/training-plan/add")
              }
            >
              Add Training Plan
            </button>
          </div>
        )}

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
        ) : courseAds.length > 0 ? (
          <div className="mt-6 flex flex-col gap-3">
            {courseAds.map((ad: courseAdType) => (
              <CourseAd ad={ad} key={ad.id} />
            ))}
          </div>
        ) : (
          <EmptyResult />
        )}
      </section>
    </>
  );
};

export default TrainingPlan;
