"use client";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getLocalDate } from "@/utils/dateFuncs";
import {
  courseOperationCompleted,
  deleteCourse,
  getCourseInfo,
} from "@/store/adminstore/slices/courses/coursesSlice";
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

import { Dropdown, IconButton } from "rsuite";
import Image from "next/image";
import UserRequest from "@/components/courses/UserRequest";
import TrainerInfo from "@/components/sessions/TrainerInfo";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import AlertModal from "@/components/Pars/AlertModal";
import OperationAlert from "@/components/Pars/OperationAlert";

const CourseInfo = ({ params }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();
  const { id } = params;

  const [filterBy, setFilterBy] = useState("All");
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    isLoading,
    error,
    courseInfo,
    status,
    operationError,
    operationLoading,
  } = useSelector((state: GlobalState) => state.courses);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCourseInfo(id));
  }, [dispatch, id]);

  console.log(courseInfo);

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
    router.push(`/admin-dashboard/courses/update/${courseInfo?.id}`);
  };

  const handleDuplicate = () => {
    //   dispatch(duplicateSession(session.id));
  };

  const handleActivation = () => {
    //   const status: "Active" | "Inactive" =
    //     session.status === "Active" ? "Inactive" : "Active";
    //   dispatch(
    //     changeStatus({
    //       ids: [session.id],
    //       status: status,
    //       classification: session.classification_session,
    //     })
    //   );
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
                {courseInfo?.category.title && courseInfo?.category.title}
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
                icon={
                  "Active" === "Active" ? (
                    <PiToggleRightFill />
                  ) : (
                    <PiToggleLeft />
                  )
                }
                className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
                onClick={handleActivation}
              >
                {"Active" === "Active" ? "Deactivate" : "Activate"}
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
                  {courseInfo?.venue.title && courseInfo.venue.title}
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
                STATUS UNKNOWN
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
            {courseInfo?.course_ad?.code &&
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
          <div className="border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center">
            {["All", "Trainer", "Trainee", "Client"].map((btnName) => (
              <button
                key={btnName}
                onClick={() => setFilterBy(btnName)}
                className={`py-2 sm:px-4 text-[14px] sm:text-[16px] font-[500] ${
                  filterBy === btnName
                    ? "border-b-2 border-[var(--primary-color1)]"
                    : ""
                }`}
              >
                {btnName}
              </button>
            ))}
          </div>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <UserRequest key={item} />
          ))}
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
            <div className="mt-4">
              <div className="flex items-center gap-2 text-[16px]">
                <PiInfoBold />
                <h3 className="font-bold">Description</h3>
              </div>
              <p className="sm:max-w-[325px] text-[12px] text-[#888]">
                {courseInfo?.description}
              </p>
            </div>
          )}

          <div className="mt-4">
            <div className="flex items-center gap-2 text-[16px]">
              <PiInfoBold />
              <h3 className="font-bold">Outlines</h3>
            </div>
            <p className="sm:max-w-[325px] text-[12px] text-[#888]">
              {courseInfo?.outlines}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
