import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { calculateHours, getLocalDate } from "@/utils/dateFuncs";
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

import tmpImage from "@/../public/main-background.jpg"; //TMP

const CourseAd = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

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
    //   setDeleteModal(true);
  };

  const handleShowDetails = () => {
    router.push(`/admin-dashboard/courses/course-ads/${1}`);
  };

  const handleEdit = () => {
    //   router.push(
    //     `/admin-dashboard/courses/training-session/update/${session.id}`
    //   );
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
      <div className="flex justify-between gap-2">
        <div className="bg-slate-400 min-w-[100px] h-[100px] sm:w-[175px] sm:h-[150px] rounded-[8px]">
          <Image
            src={tmpImage}
            alt="Course Ad Image"
            width={400}
            height={400}
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
            Lorem ipsum dolor sit amet
            <span
              className="w-fit bg-[var(--primary-color1)] text-white text-[10px] sm:text-[12px]
            text-center rounded-full px-[4px] py-[1px] sm:px-3 sm:py-1"
            >
              Active
            </span>
          </p>
          <p className="m-0 text-[10px] sm:text-[14px] sm:text-[16px] text-[#888]">
            #225897
          </p>
          <div
            className="w-fit bg-[#00d4d4] text-black text-[10px] sm:text-[12px]
            text-center rounded-full px-[4px] py-[1px] sm:px-3 sm:py-1"
          >
            Strategy
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <IoLanguage />
            <p>Spanish</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <CiClock1 />
              <p>{`${calculateHours(new Date(), new Date())} hr`}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <FaDollarSign />
              <p>477</p>
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
              {"Active" === "Active" ? "Deactivate" : "Activate"}
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
            <p className="xs: text-[10px] sm:text-[12px]">London</p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <MdRequestPage />
            <p>2 requests</p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <Calendar />
            <p>{`${getLocalDate(new Date())}`}</p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <Calendar />
            <p>{`${getLocalDate(new Date())}`}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CourseAd;
