"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import {
  courseOperationCompleted,
  createCourse,
} from "@/store/adminstore/slices/courses/coursesSlice";
import { getUTCDate } from "@/utils/dateFuncs";

import Header from "@/components/Pars/Header";
import CourseOperation from "@/components/courses/my-courses/CourseOperation";
import OperationAlert from "@/components/Pars/OperationAlert";

const AddCourse = () => {
  const dispatch = useDispatch<any>();
  const { operationLoading, operationError, status } = useSelector(
    (state: GlobalState) => state.courses
  );

  const initialValues = {
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
    location: "",
    course_ads_id: null,
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

    dispatch(createCourse(formData));
  };

  return (
    <section className="p-3 sm:p-6">
      <Header title="Add New Course" />
      <CourseOperation
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
        completedAction={courseOperationCompleted}
      />
    </section>
  );
};

export default AddCourse;
