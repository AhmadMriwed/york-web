import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getLocalDate } from "@/utils/dateFuncs";
import {
  courseOperationCompleted,
  deleteCourse,
} from "@/store/adminstore/slices/courses/coursesSlice";
import { courseType } from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";
/* icons */
import { Calendar, More, Edit, Trash, Paragraph, Peoples } from "@rsuite/icons";
import { FaBook } from "react-icons/fa";
import { PiToggleRightFill, PiToggleLeft } from "react-icons/pi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
/* components */
import Image from "next/image";
import AlertModal from "@/components/Pars/AlertModal";
import { Dropdown, IconButton } from "rsuite";

const Course = ({ course }: { course: courseType }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const { status, operationLoading, operationError } = useSelector(
    (state: GlobalState) => state.courses
  );
  const dispatch = useDispatch<any>();

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="md"
        circle
        className={`${
          mode === "dark"
            ? "!text-[var(--light-bg-color)]"
            : "!text-[var(--dark-color)]"
        } !bg-transparent`}
      />
    );
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleShowDetails = () => {
    router.push(`/admin-dashboard/courses/course-info/${course.id}`);
  };

  const handleEdit = () => {
    router.push(`/admin-dashboard/courses/update/${course.id}`);
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

  return (
    <article
      className={`p-3 sm:p-6 flex justify-between gap-2
      rounded-[16px] ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
    >
      <AlertModal
        open={deleteModal}
        setOpen={setDeleteModal}
        requestType="delete"
        label={`Are you sure you want to delete "${course.title}" ?`}
        deleteAction={deleteCourse}
        completed={courseOperationCompleted}
        id={course.id}
        status={status}
      />
      <div className="flex justify-between gap-2">
        <div className="bg-slate-400 min-w-[100px] h-[100px] sm:w-[175px] sm:h-[150px] rounded-[8px]">
          {course.image && (
            <Image
              src={storageURL + course.image}
              alt="course image"
              width={400}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        <div className="flex flex-col justify-between gap-1 max-w-[125px] sm:max-w-xs">
          <p className="m-0 text-[12px] sm:text-[18px] font-bold leading-[1rem] sm:leading-[1.6rem]">
            {course.title && course.title.slice(0, 16)}
            <span
              className="w-fit bg-[var(--primary-color1)] text-white text-[10px] sm:text-[12px]
            text-center rounded-full px-[4px] py-[1px] sm:px-3 sm:py-1"
            >
              STATUS UNKNOWN
            </span>
          </p>
          <p className="m-0 text-[10px] sm:text-[14px] sm:text-[16px] text-[#888]">
            {`#${course?.code}`}
          </p>
          <div
            className="w-fit bg-[#00d4d4] text-black text-[10px] sm:text-[12px]
            text-center rounded-full px-[4px] py-[1px] sm:px-3 sm:py-1"
          >
            {course.category.title && course.category.title}
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <IoLanguage />
            <p>{course.language && course.language}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <CiClock1 />
              <p>{`${course?.houres} hr`}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Peoples />
              <p>{course.count_trainees && course.count_trainees}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <div>
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item
              icon={<Paragraph />}
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={handleShowDetails}
            >
              Show Details
            </Dropdown.Item>
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
                "Active" === "Active" ? <PiToggleRightFill /> : <PiToggleLeft />
              }
              className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
              onClick={handleActivation}
            >
              CHANGE STATUS
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="flex flex-col xl:flex-row gap-1 sm:gap-2">
          <div
            className={`${
              mode === "dark"
                ? "bg-[var(--light-bg-color)] text-[var(--light-text-color)]"
                : "bg-[var(--dark-bg-color)] text-[var(--dark-text-color)]"
            } w-fit] py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1
            rounded-full`}
          >
            <CiLocationOn />
            <p className="xs: text-[10px] sm:text-[12px]">
              {course?.venue?.title && course.venue.title}
            </p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <FaBook />
            <p>{`${course?.count_training_session} sessions`}</p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <Calendar />
            <p>{`${getLocalDate(new Date(course?.start_date))}`}</p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <Calendar />
            <p>{`${getLocalDate(new Date(course?.end_date))}`}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Course;
