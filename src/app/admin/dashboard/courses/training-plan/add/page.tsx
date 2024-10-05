"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import {
  addPlan,
  planOperationCompleted,
} from "@/store/adminstore/slices/courses/training-plan/trainingPlanSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/pars/Header";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import ImageUploader from "@/components/inputs/image-uploader/ImageUploader";
import OperationAlert from "@/components/pars/OperationAlert";
import { Loader } from "rsuite";

const planSchema = yup.object().shape({
  image: yup.mixed().nullable(),
  title: yup.string().required("Title is required"),
  sub_title: yup.string(),
  year: yup.number().required("Year is required"),
});

const AddTrainingPlan = () => {
  const { status, operationError, operationLoading } = useSelector(
    (state: GlobalState) => state.trainingPlan
  );

  const dispatch = useDispatch<any>();

  const initialValues = {
    image: null,
    title: "",
    sub_title: "",
    year: new Date().getFullYear(),
  };

  const submitHandler = (values: any) => {
    const data = { ...values };

    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === "") {
        delete data[key];
      }
    });

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    dispatch(addPlan(formData));
  };

  return (
    <section className="p-3 sm:p-6">
      <Header title="Add Training Plan" />
      <OperationAlert
        messageOnError={`Oops! ${operationError}`}
        messageOnSuccess="The operation was completed successfully"
        error={operationError}
        status={status}
        completedAction={planOperationCompleted}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={planSchema}
        onSubmit={submitHandler}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <div className="mt-4 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
              <div className="grid grid-cols-1 gap-y-4 sm:gap-y-2">
                <CustomInput
                  type="text"
                  name="title"
                  label="Title"
                  required
                  placeholder="Title"
                />
                <CustomInput
                  type="text"
                  name="sub_title"
                  label="Subtitle"
                  optional
                  placeholder="Subtitle"
                />
                <CustomInput
                  type="number"
                  name="year"
                  label="Year"
                  required
                  placeholder="Year"
                />
                <ImageUploader formikProps={props} />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="colored-btn !w-full !text-[16px]"
                >
                  {operationLoading ? <Loader /> : "Add Training Plan"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddTrainingPlan;
