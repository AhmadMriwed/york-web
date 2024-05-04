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
import CourseAdOperation from "@/components/courses/courseAds/CourseAdOperation";
import OperationAlert from "@/components/Pars/OperationAlert";

const AddCourseAd = () => {
  const dispatch = useDispatch<any>();
  const { operationLoading, operationError, status } = useSelector(
    (state: GlobalState) => state.courseAds
  );

  let initialValues = {
    title: "",
    sub_title: "",
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
    outlines: "",
    description: "",
  };

  const submitHandler = (values: any, actions: any) => {
    const data: any = {
      ...values,
      start_date: getUTCDate(values.start_date),
      end_date: getUTCDate(values.end_date),
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === "") {
        delete data[key];
      }
    });

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

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
