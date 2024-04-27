"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { More } from "@rsuite/icons";
import { CiFileOn } from "react-icons/ci";

import { DatePicker, Dropdown, IconButton } from "rsuite";
import Header from "@/components/Pars/Header";
import CourseAd from "@/components/courses/courseAds/CourseAd";
import Image from "next/image";

import tmpImage from "@/../public/main-background.jpg"; //TMP

const TrainingPlan = () => {
  const router = useRouter();

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

  return (
    <section className="p-3 sm:p-6">
      <Header
        title="Training Plan"
        btnTitle="Add New Course Ad"
        btnAction={() => router.push("/admin-dashboard/courses/course-ads/add")}
      />

      <div className="flex flex-col lg:flex-row justify-center gap-7 mt-7 p-3 sm:p-6 w-full bg-[var(--dark-bg-color)] text-white rounded-md">
        <Image
          src={tmpImage}
          alt="Course Ad Image"
          width={275}
          height={175}
          className="sm:!min-w-[275px] bg-center bg-cover object-fit rounded-md"
        />

        <div className="flex justify-between gap-11">
          <div>
            <p className="text-[16px] sm:text-[22px] font-bold">
              Training Plan 2023-2024
            </p>
            <p className="sm:text-[16px]">Title</p>
            <p className="max-w-md text-[12px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              cumque ullam doloribus consequatur veritatis, earum iure sit amet
              consectetur adipisicing elit. Quasi cumque ullam doloribus
              consequatur veritatis, earum iure
            </p>
            <div className="flex justify-between sm:justify-start items-center gap-11 mt-6">
              <div className="flex items-center gap-1">
                <CiFileOn />
                <p>File</p>
              </div>
              <div>
                <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
                  <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                    Download file
                  </Dropdown.Item>
                  <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                    Preview file
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
          <div>
            <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
              <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
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
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex justify-between items-center gap-2">
          <p>St: </p>
          <DatePicker
            format="yyyy-MM-dd HH:mm"
            className="!border-none"
            id=""
            name=""
            onChange={() => {}}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <p>Ed: </p>
          <DatePicker
            format="yyyy-MM-dd HH:mm"
            className="!border-none"
            id=""
            name=""
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {[1, 2, 3, 4].map((item) => (
          <CourseAd key={item} />
        ))}
      </div>
    </section>
  );
};

export default TrainingPlan;
