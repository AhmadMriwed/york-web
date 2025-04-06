"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseAdOperationCompleted,
  createCourseAd,
} from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { GlobalState } from "@/types/storeTypes";
import { getUTCDate } from "@/utils/dateFuncs";

import Header from "@/components/Pars/Header";
import OperationAlert from "@/components/Pars/OperationAlert";

import dynamic from "next/dynamic";
const CourseAdOperation = dynamic(
  () => import("@/components/courses/course-ads/CourseAdOperation"),
  {
    ssr: false,
  }
);

const AddCourseAd = () => {
  const dispatch = useDispatch<any>();

  const { operationLoading, operationError, status } = useSelector(
    (state: GlobalState) => state.courseAds
  );

  let initialValues = {
    title: {
      en: "",
      ar: "",
    },
    sub_title: {
      en: "",
      ar: "",
    },
    start_date: new Date(),
    end_date: new Date(),
    houres: null,
    fee: null,
    lang: "",
    image: null,
    venue_id: null,
    category_id: null,
    code: "",
    status: "",
    outlines: {
      en: "",
      ar: "",
    },
    description: {
      en: "",
      ar: "",
    },
  };

  const submitHandler = (values: any, actions: any) => {
    const formData = new FormData();
    console.log("hello");

    formData.append("title[en]", values.title.en || "");
    formData.append("title[ar]", values.title.ar || "");
    formData.append("sub_title[en]", values.sub_title.en || "");
    formData.append("sub_title[ar]", values.sub_title.ar || "");
    formData.append("outlines[en]", values.outlines.en || "");
    formData.append("outlines[ar]", values.outlines.ar || "");
    formData.append("description[en]", values.description.en || "");
    formData.append("description[ar]", values.description.ar || "");

    formData.append("start_date", getUTCDate(values.start_date));
    if (values.end_date) {
      formData.append("end_date", getUTCDate(values.end_date));
    }

    if (values.houres) formData.append("houres", values.houres.toString());
    if (values.fee) formData.append("fee", values.fee.toString());
    if (values.lang)
      formData.append("lang", values.lang === "en" ? "English" : "Arabic");
    if (values.venue_id)
      formData.append("venue_id", values.venue_id.toString());
    if (values.category_id)
      formData.append("category_id", values.category_id.toString());

    if (values.code) formData.append("code", values.code);
    if (values.status) formData.append("status", values.status);
    if (values.image) formData.append("image", values.image);

    dispatch(createCourseAd(formData));
  };

  return (
    <section className="p-3 sm:p-6">
      <Header title="Add New Course Ad" />
      <CourseAdOperation
        initialValues={initialValues}
        submitHandler={submitHandler}
        operationLoading={operationLoading}
        op="add"
      />
      <OperationAlert
        messageOnSuccess="operation accomplished successfully"
        messageOnError={`Oops! ${operationError}`}
        status={status}
        error={operationError}
        completedAction={courseAdOperationCompleted}
      />
    </section>
  );
};

export default AddCourseAd;
