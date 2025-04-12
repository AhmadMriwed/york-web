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

    const requiredFields = {
      title: {
        en: values.title.en || "",
        ar: values.title.ar || null,
      },
      outlines: {
        en: values.outlines.en || "",
        ar: values.outlines.ar || null,
      },
      description: {
        en: values.description.en || "",
        ar: values.description.ar || null,
      },
      sub_title: {
        en: values.sub_title.en || "",
        ar: values.sub_title.ar || null,
      },
    };

    Object.entries(requiredFields).forEach(([key, value]) => {
      formData.append(`${key}[en]`, value.en);
      formData.append(`${key}[ar]`, value.ar);
    });

    formData.append("start_date", getUTCDate(values.start_date));
    if (values.end_date) {
      formData.append("end_date", getUTCDate(values.end_date));
    }

    const optionalFields = {
      houres: values.houres?.toString(),
      fee: values.fee?.toString(),
      lang: values.lang === "en" ? "English" : "Arabic",
      venue_id: values.venue_id?.toString(),
      category_id: values.category_id?.toString(),
      code: values.code,
      status: values.status,
      image: values.image,
    };

    Object.entries(optionalFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

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
