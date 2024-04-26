"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { calculateHours, getLocalDate } from "@/utils/dateFuncs";

import { CiClock1, CiLocationOn } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { Calendar, Edit, More, Paragraph, Trash } from "@rsuite/icons";
import { MdRequestPage } from "react-icons/md";
import { PiInfoBold, PiToggleLeft, PiToggleRightFill } from "react-icons/pi";
import { HiOutlineDuplicate } from "react-icons/hi";

import { Dropdown, IconButton } from "rsuite";
import CourseRequest from "@/components/courses/CourseRequest";
import Image from "next/image";

import tmpImage from "@/../public/main-background.jpg";

const CourseAdInfo = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [filterBy, setFilterBy] = useState("Current");

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
    //   setDeleteModal(true);
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
    <section>
      <div className="bg-[var(--dark-bg-color)] w-full p-3 sm:p-7 flex flex-col lg:flex-row justify-evenly items-center gap-7">
        <div className="text-white">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-light"> #225544</p>
              <p
                className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0"
              >
                Web development
              </p>
              <p
                className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0"
              >
                $ 40
              </p>
            </div>
            <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
              <Dropdown.Item
                icon={<Paragraph />}
                className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                // onClick={handleDelete}
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
            Introduction to Web Development
          </p>
          <p className="max-w-md text-[12px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            cumque ullam doloribus consequatur veritatis, earum iure
          </p>
          <div className="flex justify-between items-center mt-4">
            <div className="bg-black text-white w-fit py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1 rounded-full">
              <CiLocationOn />
              <p className="xs: text-[10px] sm:text-[12px]">London</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p
                className="bg-[var(--primary-color1)] text-[#FFF] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0 font-bold"
              >
                Expired
              </p>
              <p
                className="bg-[var(--primary-color1)] text-[#FFF] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0 font-bold"
              >
                Active
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-1 sm:gap-2 mt-4">
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <IoLanguage />
              <p>Spanish</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center">
              <CiClock1 />
              <p>{`${calculateHours(new Date(), new Date())} hr`}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>{`${getLocalDate(new Date())}`}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>{`${getLocalDate(new Date())}`}</p>
            </div>
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <MdRequestPage />
              <p>2 requests</p>
            </div>
          </div>
        </div>
        <div className="order-first lg:order-last">
          <Image
            src={tmpImage}
            alt="Course Ad Image"
            width={275}
            height={175}
            className="sm:!min-w-[275px] bg-center bg-cover object-fit rounded-md"
          />
        </div>
      </div>

      <div
        className={`flex gap-7 flex-col lg:flex-row p-3 sm:p-6 m-2 rounded-[16px] ${
          mode === "dark" ? "bg-[#212A34]" : "bg-white"
        }`}
      >
        <div className="flex-1 max-h-[100vh] overflow-y-scroll pr-4">
          <h3 className="sm:text-[24px] text-[var(--primary-color1)] font-bold mb-2">
            Course Requests
          </h3>
          <div className="border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center">
            {["Current", "Upcoming", "Expired"].map((btnName) => (
              <button
                key={btnName}
                onClick={() => setFilterBy(btnName)}
                className={`py-2 sm:px-4 text-[16px] font-[500] ${
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
            <CourseRequest key={item} type="courseAd" />
          ))}
        </div>

        <div className="order-first lg:order-last">
          <div className="flex items-center gap-2 text-[16px]">
            <PiInfoBold />
            <h3 className="font-bold">About The Course</h3>
          </div>
          <p className="sm:max-w-[325px] text-[12px] text-[#888]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            eos vitae quia quam magni impedit, porro incidunt repudiandae ex
            alias voluptate, consequuntur ipsam rerum facere saepe cupiditate at
            ipsum mollitia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CourseAdInfo;
