"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { calculateHours, getLocalDate } from "@/utils/dateFuncs";

import {
  Calendar,
  Check,
  Close,
  Email,
  Global,
  InfoOutline,
  Phone,
} from "@rsuite/icons";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { RiProfileLine } from "react-icons/ri";
import { PiHandbag } from "react-icons/pi";
import { FaCreditCard } from "react-icons/fa6";

import Header from "@/components/Pars/Header";

const SubmitCourseInfo = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <section className="p-3 sm:p-6">
      <Header title="Submit Course Details" />
      <div className="mt-4 p-3 sm:p-6 bg-[var(--dark-bg-color)] text-white rounded-md">
        <p className="font-bold">Info Submit Course :</p>
        <div className="flex items-center gap-2 mt-4">
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
        <p className="sm:text-[16px] font-500">Title</p>
        <p className="max-w-md text-[12px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi cumque
          ullam doloribus consequatur veritatis, earum iure sit amet consectetur
          adipisicing elit. Quasi cumque ullam doloribus consequatur veritatis,
          earum iure
        </p>
        <div className="flex justify-between sm:justify-start sm:gap-4 items-center mt-4">
          <div className="bg-black text-white w-fit py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1 rounded-full">
            <CiLocationOn />
            <p className="text-[10px] sm:text-[12px]">London</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="m-0 text-[12px] sm:text-[14px]">Entity type</p>
            <p className="m-0 text-[12px] sm:text-[14px]">|</p>
            <p className="m-0 text-[12px] sm:text-[14px]">course ad #225666</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between sm:justify-start items-center gap-1 sm:gap-4 mt-4">
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <IoLanguage />
            <p>Spanish</p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
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
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button className="p-3 bg-green-400 rounded-full cursor-pointer element-center">
            <Check />
          </button>
          <button className="p-3 bg-red-400 rounded-full cursor-pointer element-center">
            <Close />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-16 sm:gap-y-8 mt-3">
        <div
          className={`p-3 sm:p-6 ${
            mode === "dark" ? "bg-light" : "bg-white"
          } text-black rounded-md`}
        >
          <p className="font-bold font-bold border-b-[1px]">
            Info Department :
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <p className="flex items-center gap-1">
              <RiProfileLine /> Department Name
            </p>
            <p className="flex items-center gap-1">
              <Email /> department@email.com
            </p>
            <p className="flex items-center gap-1 max-w-md">
              <Global /> https://url.com
            </p>
            <p className="flex items-center gap-1">
              <PiHandbag /> Job title : web development
            </p>
            <p className="flex items-center gap-1">
              <InfoOutline /> cv trainee
            </p>
          </div>
        </div>
        <div
          className={`p-3 sm:p-6 ${
            mode === "dark" ? "bg-light" : "bg-white"
          } text-black rounded-md`}
        >
          <p className="font-bold border-b-[1px]">Selection Trainer :</p>
          <div className="mt-4 flex flex-col gap-2">
            <p className="flex items-center gap-1">
              <InfoOutline />
              Trainer Name | id: #112255
            </p>
            <p className="max-w-md text-[12px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              omnis dignissimos corrupti dolore maxime velit, minus ab repellat
              possimus incidunt
            </p>
            <p className="flex items-center gap-1">
              <Email /> trainer@email.com
            </p>
            <p className="flex items-center gap-1">
              <Phone /> 558-448-777
            </p>
            <p className="flex items-center gap-1">
              <PiHandbag />
              functional specialization
            </p>
          </div>
        </div>
        {/* <div>
          <p className="font-bold border-b-[1px]">Invoice :</p>
          <div className="mt-4 p-6 bg-light text-dark w-fit h-fit rounded-xl cursor-pointer">
            <p className="flex items-center gap-2 font-[500]">
              Show Invoice Details <FaCreditCard />
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SubmitCourseInfo;
