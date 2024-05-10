"use client";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import {
  getSubmitDetails,
  submitCourseOperationCompleted,
} from "@/store/adminstore/slices/courses/submit-courses/submitCoursesSlice";
import {
  getCategories,
  getCurrencies,
  getVenues,
} from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";
import { getLocalDate } from "@/utils/dateFuncs";

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

import Header from "@/components/Pars/Header";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import InvoiceModal from "@/components/courses/InvoiceModal";
import CauseModal from "@/components/courses/CauseModal";
import OperationAlert from "@/components/Pars/OperationAlert";

const SubmitCourseInfo = ({ params }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const { id } = params;

  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const {
    submitDetails,
    isLoading,
    error,
    status,
    operationError,
    operationLoading,
  } = useSelector((state: GlobalState) => state.submitCourses);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getSubmitDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVenues(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrencies(""));
  }, [dispatch]);

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header title="Submit Course Details" />
      <OperationAlert
        messageOnSuccess="operation accomplished successfully"
        messageOnError={`Oops! ${operationError}`}
        error={operationError}
        status={status}
        completedAction={submitCourseOperationCompleted}
      />

      {operationLoading && <Loading backdrop />}

      {submitDetails && (
        <>
          <InvoiceModal
            modalOpen={invoiceOpen}
            setModalOpen={setInvoiceOpen}
            submitInfo={submitDetails}
          />
          <CauseModal
            loc="submit"
            role="reject"
            id={submitDetails.id}
            modalOpen={rejectOpen}
            setModalOpen={setRejectOpen}
          />
        </>
      )}

      <div className="mt-4 p-3 sm:p-6 bg-[var(--dark-bg-color)] text-white rounded-md">
        <p className="font-bold">Info Submit Course :</p>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-[14px] font-light">{`#${
            submitDetails?.code && submitDetails?.code
          }`}</p>
          <p
            className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0"
          >
            {submitDetails?.category &&
              submitDetails?.category.title &&
              submitDetails?.category.title}
          </p>
          <p
            className="bg-[var(--primary-color2)] text-[#000] w-fit py-[1.5px] px-[12px] sm:py-[3px] rounded-full
              xs: text-[10px] sm:text-[12px] m-0"
          >
            {`$ ${submitDetails?.fee && submitDetails?.fee}`}
          </p>
        </div>
        <p className="sm:text-[16px] font-500 my-2">
          {submitDetails?.title && submitDetails?.title}
        </p>
        <p className="max-w-md text-[12px]">
          {submitDetails?.description && submitDetails?.description}
        </p>
        <div className="flex justify-between sm:justify-start sm:gap-4 items-center mt-4">
          <div className="bg-black text-white w-fit py-[1.5px] px-[12px] sm:py-[3px] flex justify-center items-center gap-1 rounded-full">
            <CiLocationOn />
            <p className="text-[10px] sm:text-[12px]">
              {submitDetails?.venue &&
                submitDetails?.venue.title &&
                submitDetails?.venue.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="m-0 text-[12px] sm:text-[14px]">
              {submitDetails?.entity_type && submitDetails?.entity_type}
            </p>
            <p className="m-0 text-[12px] sm:text-[14px]">|</p>
            <p className="m-0 text-[12px] sm:text-[14px]">{`course ad id #${
              submitDetails?.course_ad_id && submitDetails?.course_ad_id
            }`}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between sm:justify-start items-center gap-1 sm:gap-4 mt-4">
          {submitDetails?.language && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <IoLanguage />
              <p>{submitDetails?.language}</p>
            </div>
          )}
          {submitDetails?.hours && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <CiClock1 />
              <p>{`${submitDetails?.hours} hr`}</p>
            </div>
          )}
          {submitDetails?.start_date && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>{`${getLocalDate(new Date(submitDetails?.start_date))}`}</p>
            </div>
          )}
          {submitDetails?.end_date && (
            <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
              <Calendar />
              <p>{`${getLocalDate(new Date(submitDetails?.end_date))}`}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4">
          {submitDetails?.status === "Pending" && (
            <>
              <button
                className="p-3 bg-green-400 rounded-full cursor-pointer element-center"
                onClick={() => setInvoiceOpen(true)}
              >
                <Check />
              </button>
              <button
                className="p-3 bg-red-400 rounded-full cursor-pointer element-center"
                onClick={() => setRejectOpen(true)}
              >
                <Close />
              </button>
            </>
          )}
          {submitDetails?.status === "Accepted" && (
            <div className="py-2 px-6 bg-green-500 rounded-full element-center gap-2">
              <Check /> Accepted
            </div>
          )}
          {submitDetails?.status === "Rejected" && (
            <div className="py-2 px-6 bg-red-500 rounded-full element-center gap-2">
              <Close /> Rejected
            </div>
          )}
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
            {submitDetails?.department.name && (
              <p className="flex items-center gap-1">
                <RiProfileLine /> {submitDetails?.department.name}
              </p>
            )}
            {submitDetails?.department.email && (
              <p className="flex items-center gap-1">
                <Email /> {submitDetails?.department.email}
              </p>
            )}
            {submitDetails?.department.url && (
              <p className="flex items-center gap-1 max-w-md">
                <Global />{" "}
                <a href={submitDetails.department.url}>department url</a>
              </p>
            )}
            {submitDetails?.department.job_title && (
              <p className="flex items-center gap-1">
                <PiHandbag />{" "}
                {`Job title : ${submitDetails?.department.job_title}`}
              </p>
            )}
            {submitDetails?.department.cv_trainer && (
              <p className="flex items-center gap-1">
                <InfoOutline />{" "}
                {`cv trainee : ${submitDetails?.department.cv_trainer}`}
              </p>
            )}
          </div>
        </div>

        {submitDetails?.selection_training && (
          <div
            className={`p-3 sm:p-6 ${
              mode === "dark" ? "bg-light" : "bg-white"
            } text-black rounded-md`}
          >
            <p className="font-bold border-b-[1px]">Selection Trainer :</p>
            <div className="mt-4 flex flex-col gap-2">
              <p className="flex items-center gap-1">
                <InfoOutline />
                Trainer Name | id: #
              </p>
              <p className="max-w-md text-[12px]">description</p>
              <p className="flex items-center gap-1">
                <Email /> email
              </p>
              <p className="flex items-center gap-1">
                <Phone /> phone
              </p>
              <p className="flex items-center gap-1">
                <PiHandbag />
                functional specialization :
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubmitCourseInfo;
