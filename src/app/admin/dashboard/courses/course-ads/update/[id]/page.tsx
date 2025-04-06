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
import CourseAdOperation from "@/components/courses/course-ads/CourseAdOperation";
import OperationAlert from "@/components/Pars/OperationAlert";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import { getFlexibleText } from "@/lib/utils";

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

  const submitHandler = async (values: any, actions: any) => {
    const formData = new FormData();

    formData.append("title[en]", values.title.en || "");
    formData.append("title[ar]", values.title.ar || "");
    formData.append("sub_title[en]", values.sub_title.en || "");
    formData.append("sub_title[ar]", values.sub_title.ar || "");
    formData.append("outlines[en]", values.outlines.en || "");
    formData.append("outlines[ar]", values.outlines.ar || "");
    formData.append("description[en]", values.description.en || "");
    formData.append("description[ar]", values.description.ar || "");

    formData.append(
      "start_date",
      values.start_date.toISOString().split("T")[0]
    );
    if (values.end_date) {
      formData.append("end_date", values.end_date.toISOString().split("T")[0]);
    }

    formData.append("houres", values.houres.toString());
    formData.append("fee", values.fee.toString());
    formData.append("language", values.lang === "en" ? "English" : "Arabic");
    formData.append("venue_id", values.venue_id.toString());
    formData.append("category_id", values.category_id.toString());

    if (values.code) formData.append("code", values.code);
    if (values.status) formData.append("status", values.status);
    if (values.image) formData.append("image", values.image);

    dispatch(updateCourseAd({ data: formData, id }));
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <ErrorMessage msg="Oops! There was an error, please try again later." />
    );

  let initialValues;
  if (courseAdInfo) {
    initialValues = {
      title: {
        en: getFlexibleText(courseAdInfo?.title, "en"),
        ar: getFlexibleText(courseAdInfo?.title, "ar"),
      },
      sub_title: {
        en: getFlexibleText(courseAdInfo?.sub_title, "en"),
        ar: getFlexibleText(courseAdInfo?.sub_title, "ar"),
      },
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
      outlines: {
        en: getFlexibleText(courseAdInfo?.outlines, "en"),
        ar: getFlexibleText(courseAdInfo?.outlines, "ar"),
      },
      description: {
        en: getFlexibleText(courseAdInfo?.description, "en"),
        ar: getFlexibleText(courseAdInfo?.description, "ar"),
      },
    };
  }

  return (
    <section className="p-3 sm:p-6">
      <Header title="Update Course Ad" />
      {initialValues && (
        <CourseAdOperation
          //@ts-ignore
          initialValues={initialValues}
          submitHandler={submitHandler}
          operationLoading={operationLoading}
          op="update"
        />
      )}
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
