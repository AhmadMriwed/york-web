import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getLocalDate } from "@/utils/dateFuncs";
import {
  changeAdStatus,
  courseAdOperationCompleted,
  deleteCourseAd,
  duplicateCourseAd,
} from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { courseAdType } from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";
/* icons */
import { Calendar, More, Edit, Trash, Paragraph } from "@rsuite/icons";
import { FaDollarSign } from "react-icons/fa";
import { PiToggleRightFill, PiToggleLeft } from "react-icons/pi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { MdRequestPage } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
/* components */
import Image from "next/image";
import { Dropdown, IconButton } from "rsuite";
import AlertModal from "@/components/Pars/AlertModal";
import { getTranslatedText } from "@/lib/utils";

interface CourseAdProps {
  ad: courseAdType | null;
}

const CourseAd = ({ ad }: CourseAdProps) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const { status, operationLoading, operationError } = useSelector(
    (state: GlobalState) => state.courseAds
  );
  const dispatch = useDispatch<any>();

  if (!ad) {
    return <div className=" text-center text-red-500"></div>;
  }

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

  const handleShowDetails = () => {
    router.push(`/admin/dashboard/courses/course-ads/${ad.id}`);
  };

  const handleEdit = () => {
    router.push(`/admin/dashboard/courses/course-ads/update/${ad.id}`);
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleDuplicate = () => {
    dispatch(duplicateCourseAd(ad.id));
  };

  const handleActivation = () => {
    dispatch(changeAdStatus(ad.id));
  };

  return (
    <article
      className={`p-3 sm:p-6 flex justify-between gap-2 rounded-[16px] ${
        mode === "dark" ? "bg-[#212A34] text-[#FFF]" : "bg-white text-[#000]"
      }`}
    >
      <AlertModal
        open={deleteModal}
        setOpen={setDeleteModal}
        requestType="delete"
        label={`Are you sure you want to delete "${ad.title}" ?`}
        deleteAction={deleteCourseAd}
        completed={courseAdOperationCompleted}
        id={ad.id}
        status={status}
      />

      <div className="flex justify-between gap-2">
        <div className="min-w-[100px] h-[100px] sm:w-[175px] sm:h-[150px] rounded-[8px]">
          <Image
            src={ad.image ? storageURL + ad.image : "/register.png"}
            alt="course ad image"
            width={400}
            height={400}
            className={`${!ad.image ? "border border-blue-500 relative" : ""}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>

        <div className="flex flex-col justify-between gap-1 max-w-[125px] sm:max-w-xs">
          <p className="m-0 text-[12px] sm:text-[18px] font-bold leading-[1rem] sm:leading-[1.6rem]">
            {getTranslatedText(ad.title)?.slice(0, 10) || "Untitled"}
            <span
              className="w-fit bg-[var(--primary-color1)] text-white text-[10px] sm:text-[12px]
              text-center rounded-full px-[4px] py-[1px] sm:px-3 mx-3 sm:py-1"
            >
              {ad.change_active_date ? "Active" : "Inactive"}
            </span>
          </p>
          {ad.code && (
            <p className="m-0 text-[10px] sm:text-[16px] text-[#888]">
              #{ad.code}
            </p>
          )}
          {ad.category?.title && (
            <div
              className="w-fit bg-[#00d4d4] text-black text-[10px] sm:text-[12px]
              text-center rounded-full px-[4px] sm:px-3 py-[1px]"
            >
              {ad.category.title}
            </div>
          )}
          {ad.language && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <IoLanguage />
              <p>{ad.language}</p>
            </div>
          )}
          <div className="flex items-center gap-1">
            {ad.houres && (
              <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
                <CiClock1 />
                <p>{ad.houres} hr</p>
              </div>
            )}
            {ad.fee && (
              <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
                <FaDollarSign />
                <p>{ad.fee}</p>
              </div>
            )}
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
              className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={handleDuplicate}
            >
              Duplicate
            </Dropdown.Item>
            <Dropdown.Item
              icon={
                ad.change_active_date ? <PiToggleRightFill /> : <PiToggleLeft />
              }
              className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={handleActivation}
            >
              {ad.change_active_date ? "Deactivate" : "Activate"}
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="flex flex-col xl:flex-row gap-1 sm:gap-2">
          {ad.venue?.title && (
            <div
              className={`${
                mode === "dark"
                  ? "bg-[var(--light-bg-color)] text-[var(--light-text-color)]"
                  : "bg-[var(--dark-bg-color)] text-[var(--dark-text-color)]"
              } w-fit] py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1 rounded-full`}
            >
              <CiLocationOn />
              <p className="xs:text-[10px] sm:text-[12px]">{ad.venue.title}</p>
            </div>
          )}
          {ad.count_requests !== undefined && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <MdRequestPage />
              <p>{ad.count_requests} requests</p>
            </div>
          )}
          {ad.start_date && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>{getLocalDate(new Date(ad.start_date))}</p>
            </div>
          )}
          {ad.end_date && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>{getLocalDate(new Date(ad.end_date))}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CourseAd;
