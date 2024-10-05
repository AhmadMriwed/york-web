"use client";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getLocalDate } from "@/utils/dateFuncs";
import {
  courseOperationCompleted,
  deleteCourse,
  duplicateCourse,
  getCourseInfo,
  updateCourse,
} from "@/store/adminstore/slices/courses/coursesSlice";
import {
  courseUserOperationCopmleted,
  getRequestsToJoin,
} from "@/store/adminstore/slices/courses/joinedUsers/courseJoinedUsersSlice";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";

import { CiClock1, CiLocationOn } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { Calendar, Edit, More, Trash } from "@rsuite/icons";
import {
  PiChalkboardTeacher,
  PiInfoBold,
  PiToggleLeft,
  PiToggleRightFill,
} from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

import { Dropdown, IconButton, Loader } from "rsuite";
import Image from "next/image";
import UserRequest from "@/components/courses/UserRequest";
import TrainerInfo from "@/components/courses/TrainerInfo";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import AlertModal from "@/components/Pars/AlertModal";
import OperationAlert from "@/components/Pars/OperationAlert";
import EmptyResult from "@/components/empty-result/EmptyResult";
import { getCoursePermissions } from "@/store/endUser/endUserSlice";
import FilteringBar from "@/components/Pars/FilteringBar";

const filterData = ["Current", "Rejected", "Accepted"];

const CourseInfo = ({ params }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();
  const { id } = params;

  const [filterBy, setFilterBy] = useState<string>("Current");
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    isLoading,
    error,
    courseInfo,
    status,
    operationError,
    operationLoading,
  } = useSelector((state: GlobalState) => state.courses);

  const {
    isLoading: requestLoading,
    error: requestError,
    requestsToJoin,
    status: requestStatus,
    operationError: requestOperationError,
    operationLoading: requestOperationLoading,
  } = useSelector((state: GlobalState) => state.courseJoinedUsers);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getRequestsToJoin({ id: id, type: filterBy }));
  }, [dispatch, id, filterBy]);

  useEffect(() => {
    dispatch(getCoursePermissions());
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
    router.push(`/admin/dashboard/courses/update/${courseInfo?.id}`);
  };

  const handleDuplicate = () => {
    if (courseInfo?.id) dispatch(duplicateCourse(courseInfo.id));
  };

  const handleActivation = () => {
    const newStatus = !courseInfo?.active;
    dispatch(updateCourse({ id: courseInfo?.id, data: { active: newStatus } }));
  };

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section>
      <AlertModal
        open={deleteModal}
        setOpen={setDeleteModal}
        requestType="delete"
        label={`Are you sure you want to delete "${courseInfo?.title}" ?`}
        deleteAction={deleteCourse}
        completed={courseOperationCompleted}
        id={courseInfo?.id}
        status={status}
      />
      <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${operationError}`}
        status={status}
        error={operationError}
        completedAction={courseOperationCompleted}
      />
      <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${requestOperationError}`}
        status={requestStatus}
        error={requestOperationError}
        completedAction={courseUserOperationCopmleted}
      />

      {(operationLoading || requestOperationLoading) && <Loading backdrop />}

      <div className="bg-[var(--dark-bg-color)] w-full p-3 sm:p-7 flex flex-col lg:flex-row justify-evenly items-center gap-7">
        <div className="bg-slate-400 min-w-[275px] h-[175px] rounded-md">
          {courseInfo?.image && (
            <Image
              src={storageURL + courseInfo.image}
              alt="course image"
              width={275}
              height={175}
              className="sm:!min-w-[275px] bg-center bg-cover object-fit rounded-md"
            />
          )}
        </div>

        <div className="text-white">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-light">{`#${courseInfo?.code}`}</p>
              <p
                className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0"
              >
                {courseInfo?.category &&
                  courseInfo?.category.title &&
                  courseInfo?.category.title}
              </p>
              <p
                className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0"
              >
                {`$ ${courseInfo?.fee && courseInfo.fee}`}
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
                icon={<HiOutlineDocumentDuplicate />}
                className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
                onClick={handleDuplicate}
              >
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item
                icon={
                  courseInfo?.active ? <PiToggleRightFill /> : <PiToggleLeft />
                }
                className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
                onClick={handleActivation}
              >
                {courseInfo?.active ? "Deactivate" : "Activate"}
              </Dropdown.Item>
            </Dropdown>
          </div>

          <p className="text-[16px] sm:text-[20px] mt-2 font-bold">
            {courseInfo?.title && courseInfo.title}
          </p>
          <p className="max-w-md text-[12px]">
            {courseInfo?.sub_title && courseInfo.sub_title}
          </p>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white w-fit py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1 rounded-full">
                <CiLocationOn />
                <p className="xs: text-[10px] sm:text-[12px]">
                  {courseInfo?.venue &&
                    courseInfo?.venue.title &&
                    courseInfo.venue.title}
                </p>
              </div>
              <div className="bg-black text-white w-fit py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1 rounded-full">
                <CiLocationOn />
                <p className="xs: text-[10px] sm:text-[12px]">
                  {courseInfo?.location && courseInfo.location}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p
                className="bg-[var(--primary-color1)] text-[#FFF] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0 font-bold"
              >
                {courseInfo?.status && courseInfo.status}
              </p>
              <p
                className="bg-[var(--primary-color1)] text-[#FFF] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0 font-bold"
              >
                {courseInfo?.active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <p className="mt-2 text-[12px]">
            {courseInfo?.course_ad &&
              courseInfo?.course_ad?.code &&
              `course ad code: #${courseInfo.course_ad.code}`}
          </p>

          <div className="flex flex-wrap justify-between items-center gap-1 sm:gap-2 mt-4">
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <IoLanguage />
              <p>{courseInfo?.language && courseInfo.language}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center">
              <CiClock1 />
              <p>{`${courseInfo?.houres} hr`}</p>
            </div>
            {courseInfo?.start_date && (
              <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
                <Calendar />
                <p>{`${getLocalDate(new Date(courseInfo.start_date))}`}</p>
              </div>
            )}
            {courseInfo?.end_date && (
              <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
                <Calendar />
                <p>{`${getLocalDate(new Date(courseInfo.end_date))}`}</p>
              </div>
            )}
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <FaBook />
              <p>{`${courseInfo?.count_training_session} sessions`}</p>
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
          <h3 className="sm:text-[22px] text-[var(--primary-color1)] font-bold mb-2">
            Requests to Join
          </h3>
          <FilteringBar
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            filterData={filterData}
            dataLength={requestsToJoin.length}
          />

          {requestLoading ? (
            <div className="m-7 element-center">
              <Loader size="lg" />
            </div>
          ) : requestsToJoin.length > 0 ? (
            requestsToJoin.map((request) => (
              <UserRequest key={request.id} request={request} />
            ))
          ) : (
            <EmptyResult />
          )}
        </div>

        <div className="order-first lg:order-last">
          <div>
            <div className="flex items-center gap-2 text-[16px]">
              <PiChalkboardTeacher />
              <h3 className="font-bold">Trainers</h3>
            </div>

            <TrainerInfo
              trainer={{
                image: courseInfo?.owner?.image,
                first_name: courseInfo?.owner?.first_name,
                last_name: courseInfo?.owner?.last_name,
                id: courseInfo?.owner?.user_id,
                about_me: courseInfo?.owner?.about_me,
                phone_number: courseInfo?.owner?.phone_number,
                email: courseInfo?.owner?.email,
              }}
            />
          </div>

          {courseInfo?.description && (
            <div className="mt-4 lg:max-w-sm">
              <div className="flex items-center gap-2 text-[16px]">
                <PiInfoBold />
                <h3 className="font-bold">Description</h3>
              </div>
              <div
                className="p-1"
                dangerouslySetInnerHTML={{ __html: courseInfo.description }}
              />
            </div>
          )}

          {courseInfo?.outlines && (
            <div className="mt-4 lg:max-w-sm">
              <div className="flex items-center gap-2 text-[16px]">
                <PiInfoBold />
                <h3 className="font-bold">Outlines</h3>
              </div>
              <div
                className="p-1"
                dangerouslySetInnerHTML={{ __html: courseInfo.outlines }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
