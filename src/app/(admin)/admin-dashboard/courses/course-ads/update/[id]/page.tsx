"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseAdOperationCompleted,
  getCourseAdInfo,
  updateCourseAd,
} from "@/store/adminstore/slices/courses/course-ads/courseAdsSlice";
import { GlobalState } from "@/types/storeTypes";
import { getUTCDate } from "@/utils/dateFuncs";

import Header from "@/components/Pars/Header";
import CourseAdOperation from "@/components/courses/courseAds/CourseAdOperation";
import OperationAlert from "@/components/Pars/OperationAlert";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

const UpdateCourseAd = ({ params }: any) => {
  const { id } = params;

  const dispatch = useDispatch<any>();

  const {
    operationLoading,
    operationError,
    status,
    isLoading,
    error,
    courseAdInfo,
  } = useSelector((state: GlobalState) => state.courseAds);

  useEffect(() => {
    dispatch(getCourseAdInfo(id));
  }, [dispatch, id]);

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

    dispatch(updateCourseAd({ data: formData, id }));
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <ErrorMessage msg="Oops! There was an error, please try again later." />
    );

  let initialValues;
  if (courseAdInfo)
    initialValues = {
      title: courseAdInfo?.title ? courseAdInfo.title : "",
      sub_title: courseAdInfo?.sub_title ? courseAdInfo.sub_title : "",
      start_date: courseAdInfo.start_date
        ? new Date(courseAdInfo?.start_date)
        : new Date(),
      end_date: courseAdInfo.end_date
        ? new Date(courseAdInfo?.end_date)
        : new Date(),
      houres: courseAdInfo?.houres ? courseAdInfo.houres : null,
      fee: courseAdInfo?.fee ? courseAdInfo.fee : null,
      lang: courseAdInfo?.language ? courseAdInfo.language : "",
      image: null,
      venue_id: courseAdInfo?.venue?.id ? courseAdInfo.venue.id : null,
      category_id: courseAdInfo?.category?.id ? courseAdInfo.category.id : null,
      code: "",
      status: courseAdInfo?.change_active_date ? "active" : "inactive",
      outlines: courseAdInfo?.outlines ? courseAdInfo.outlines : "",
      description: courseAdInfo?.description ? courseAdInfo?.description : "",
    };

  return (
    <section className="p-3 sm:p-6">
      <Header title="Update Course Ad" />
      <CourseAdOperation
        initialValues={initialValues}
        submitHandler={submitHandler}
        operationLoading={operationLoading}
        op="update"
      />
      <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${operationError}`}
        status={status}
        error={operationError}
        completedAction={courseAdOperationCompleted}
      />
    </section>
  );
};

export default UpdateCourseAd;
