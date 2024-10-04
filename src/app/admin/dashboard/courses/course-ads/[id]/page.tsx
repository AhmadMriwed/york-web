"use client";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getLocalDate } from "@/utils/dateFuncs";
import { GlobalState } from "@/types/storeTypes";
import {
  changeAdStatus,
  courseAdOperationCompleted,
  deleteCourseAd,
  duplicateCourseAd,
  getCourseAdInfo,
} from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import {
  getCategories,
  getCurrencies,
  getVenues,
} from "@/store/endUser/endUserSlice";
import {
  getAdSubmitCourses,
  submitCourseOperationCompleted,
} from "@/store/adminstore/slices/courses/submit-courses/submitCoursesSlice";
import { storageURL } from "@/utils/api";

import { CiClock1, CiLocationOn } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { Calendar, Edit, More, Trash } from "@rsuite/icons";
import { MdRequestPage } from "react-icons/md";
import { PiInfoBold, PiToggleLeft, PiToggleRightFill } from "react-icons/pi";
import { HiOutlineDuplicate } from "react-icons/hi";

import { Dropdown, IconButton, Loader } from "rsuite";
import CourseRequest from "@/components/courses/CourseRequest";
import Image from "next/image";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import AlertModal from "@/components/Pars/AlertModal";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/empty-result/EmptyResult";
import FilteringBar from "@/components/Pars/FilteringBar";

const filterData = ["Current", "Upcoming", "Expired"];

const CourseAdInfo = ({ params }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();
  const { id } = params;

  const [filterBy, setFilterBy] = useState("Current");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const {
    courseAdInfo,
    isLoading,
    error,
    status,
    operationLoading,
    operationError,
  } = useSelector((state: GlobalState) => state.courseAds);

  const {
    adSubmitCourses,
    isLoading: submitLoading,
    error: submitError,
    operationLoading: submitOperationLoading,
    operationError: submitOperationError,
    status: submitStatus,
  } = useSelector((state: GlobalState) => state.submitCourses);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseAdInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAdSubmitCourses({ id: id, type: filterBy }));
  }, [dispatch, filterBy, id]);

  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVenues(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrencies(""));
  }, [dispatch]);

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="md"
        circle
        className="!text-[var(--dark-text-color)] !bg-transparent"
      />
    );
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleEdit = () => {
    router.push(
      `/admin/dashboard/courses/course-ads/update/${courseAdInfo.id}`
    );
  };

  const handleDuplicate = () => {
    dispatch(duplicateCourseAd(courseAdInfo.id));
  };

  const handleActivation = () => {
    dispatch(changeAdStatus(courseAdInfo.id));
  };

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section>
      <AlertModal
        open={deleteModal}
        setOpen={setDeleteModal}
        requestType="delete"
        label={`Are you sure you want to delete "${courseAdInfo.title}" ?`}
        deleteAction={deleteCourseAd}
        completed={courseAdOperationCompleted}
        id={courseAdInfo.id}
        status={status}
      />
      <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${operationError}`}
        status={status}
        error={operationError}
        completedAction={courseAdOperationCompleted}
      />
      <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${submitOperationError}`}
        status={submitStatus}
        error={submitError}
        completedAction={submitCourseOperationCompleted}
      />

      {(operationLoading || submitOperationLoading) && <Loading backdrop />}

      <div className="bg-[var(--dark-bg-color)] w-full p-3 sm:p-7 flex flex-col lg:flex-row justify-evenly items-center gap-7">
        <div className="bg-slate-400 min-w-[275px] h-[175px] rounded-md">
          {courseAdInfo.image && (
            <Image
              src={storageURL + courseAdInfo.image}
              alt="course ad image"
              width={275}
              height={175}
              className="sm:!min-w-[275px] bg-center bg-cover object-fit rounded-md"
            />
          )}
        </div>

        <div className="text-white">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-light">
                {courseAdInfo.code && `#${courseAdInfo.code}`}
              </p>
              <p
                className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] font-bold m-0"
              >
                {courseAdInfo.category &&
                  courseAdInfo.category.title &&
                  courseAdInfo.category.title}
              </p>
              <p
                className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] font-bold m-0"
              >
                {courseAdInfo.fee && `$ ${courseAdInfo.fee}`}
              </p>
            </div>

            <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
              <Dropdown.Item
                icon={<Trash />}
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={handleDelete}
              >
                Delete
              </Dropdown.Item>
              <Dropdown.Item
                icon={<Edit />}
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                onClick={handleEdit}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                icon={<HiOutlineDuplicate />}
                className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
                onClick={handleDuplicate}
              >
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item
                icon={
                  courseAdInfo.change_active_date ? (
                    <PiToggleRightFill />
                  ) : (
                    <PiToggleLeft />
                  )
                }
                className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
                onClick={handleActivation}
              >
                {courseAdInfo.change_active_date ? "Deactivate" : "Activate"}
              </Dropdown.Item>
            </Dropdown>
          </div>

          <p className="text-[16px] sm:text-[20px] mt-2 font-bold">
            {courseAdInfo.title && courseAdInfo.title}
          </p>
          <p className="max-w-md text-[12px]">
            {courseAdInfo.sub_title && courseAdInfo.sub_title}
          </p>

          <div className="flex justify-between items-center mt-4">
            <div className="bg-black text-white w-fit py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1 rounded-full">
              <CiLocationOn />
              <p className="xs: text-[10px] sm:text-[12px]">
                {courseAdInfo.venue &&
                  courseAdInfo.venue.title &&
                  courseAdInfo.venue.title}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p
                className="bg-[var(--primary-color1)] text-[#FFF] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0 font-bold"
              >
                {new Date() < new Date(courseAdInfo.start_date) && "Upcoming"}
                {new Date() > new Date(courseAdInfo.start_date) &&
                  new Date() < new Date(courseAdInfo.end_date) &&
                  "Cuurent"}
                {new Date() > new Date(courseAdInfo.end_date) && "Expired"}
              </p>
              <p
                className="bg-[var(--primary-color1)] text-[#FFF] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0 font-bold"
              >
                {courseAdInfo.change_active_date ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-1 sm:gap-2 mt-4">
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <IoLanguage />
              <p>{courseAdInfo.language && courseAdInfo.language}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center">
              <CiClock1 />
              <p>{courseAdInfo.houres && `${courseAdInfo.houres} hr`}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>
                {courseAdInfo.start_date &&
                  `${getLocalDate(new Date(courseAdInfo.start_date))}`}
              </p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>
                {courseAdInfo.end_date &&
                  `${getLocalDate(new Date(courseAdInfo.end_date))}`}
              </p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <MdRequestPage />
              <p>
                {courseAdInfo.count_requests &&
                  `${courseAdInfo.count_requests} requests`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex gap-7 flex-col lg:flex-row p-3 sm:p-6 m-2 rounded-[16px] ${
          mode === "dark" ? "bg-[#212A34]" : "bg-white"
        }`}
      >
        <div className="flex-1 max-h-[100vh] overflow-y-scroll pr-4">
          <h3 className="sm:text-[24px] text-[var(--primary-color1)] font-bold mb-2">
            Submit Courses
          </h3>

          <FilteringBar
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            filterData={filterData}
            dataLength={adSubmitCourses.length}
          />

          {submitLoading ? (
            <div className="element-center m-7">
              <Loader size="lg" />
            </div>
          ) : adSubmitCourses.length > 0 ? (
            adSubmitCourses.map((submitCourse) => (
              <CourseRequest key={submitCourse.id} details={submitCourse} />
            ))
          ) : (
            <EmptyResult />
          )}
        </div>

        <div className="order-first lg:order-last flex flex-col gap-4">
          {courseAdInfo?.description && (
            <div className="mt-4 lg:max-w-sm">
              <div className="flex items-center gap-2 text-[16px]">
                <PiInfoBold />
                <h3 className="font-bold">Description</h3>
              </div>

              <div
                className="p-1"
                dangerouslySetInnerHTML={{ __html: courseAdInfo.description }}
              />
            </div>
          )}

          {courseAdInfo?.outlines && (
            <div className="mt-4 lg:max-w-sm">
              <div className="flex items-center gap-2 text-[16px]">
                <PiInfoBold />
                <h3 className="font-bold">Outlines</h3>
              </div>

              <div
                className="p-1"
                dangerouslySetInnerHTML={{ __html: courseAdInfo.outlines }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseAdInfo;
