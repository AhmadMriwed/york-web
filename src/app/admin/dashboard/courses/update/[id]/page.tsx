"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseOperationCompleted,
  getCourseInfo,
  updateCourse,
} from "@/store/adminstore/slices/courses/coursesSlice";
import { GlobalState } from "@/types/storeTypes";
import { getUTCDate } from "@/utils/dateFuncs";

import Header from "@/components/Pars/Header";
import OperationAlert from "@/components/Pars/OperationAlert";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import CourseOperation from "@/components/courses/my-courses/CourseOperation";

const UpdateCourse = ({ params }: any) => {
  const { id } = params;

  const dispatch = useDispatch<any>();

  const {
    operationLoading,
    operationError,
    status,
    isLoading,
    error,
    courseInfo,
  } = useSelector((state: GlobalState) => state.courses);

  useEffect(() => {
    dispatch(getCourseInfo(id));
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

    dispatch(updateCourse({ data: formData, id }));
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <ErrorMessage msg="Oops! There was an error, please try again later." />
    );

  let initialValues;
  if (courseInfo)
    initialValues = {
      title: courseInfo?.title ? courseInfo?.title : "",
      sub_title: courseInfo?.sub_title ? courseInfo.sub_title : "",
      start_date: courseInfo.start_date
        ? new Date(courseInfo?.start_date)
        : new Date(),
      end_date: courseInfo.end_date
        ? new Date(courseInfo?.end_date)
        : new Date(),
      houres: courseInfo?.houres ? courseInfo.houres : null,
      fee: courseInfo?.fee ? courseInfo.fee : null,
      lang: courseInfo?.language ? courseInfo.language : "",
      image: null,
      venue_id: courseInfo?.venue?.id ? courseInfo.venue.id : null,
      category_id: courseInfo?.category?.id ? courseInfo.category.id : null,
      code: "",
      location: courseInfo?.location ? courseInfo?.location : "",
      course_ads_id:
        courseInfo?.course_ad && courseInfo?.course_ad.id
          ? courseInfo?.course_ad.id
          : null,
      status: courseInfo?.change_active_date ? "active" : "inactive",
      outlines: courseInfo?.outlines ? courseInfo.outlines : "",
      description: courseInfo?.description ? courseInfo?.description : "",
    };

  return (
    <section className="p-3 sm:p-6">
      <Header title="Update Course" />
      <CourseOperation
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
        completedAction={courseOperationCompleted}
      />
    </section>
  );
};

export default UpdateCourse;
