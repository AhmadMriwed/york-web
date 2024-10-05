"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import {
  getPlanInfo,
  planOperationCompleted,
  updatePlan,
} from "@/store/adminstore/slices/courses/training-plan/trainingPlanSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import ImageUploader from "@/components/inputs/image-uploader/ImageUploader";
import Loading from "@/components/Pars/Loading";
import ErrorMessage from "@/components/error-message/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";
import { Loader } from "rsuite";

const planSchema = yup.object().shape({
  image: yup.mixed().nullable(),
  title: yup.string().required("Title is required"),
  sub_title: yup.string(),
  year: yup.number().required("Year is required"),
});

const UpdateTrainingPlan = ({ params }: any) => {
  const { id } = params;

  const {
    planInfo,
    isLoading,
    error,
    status,
    operationError,
    operationLoading,
  } = useSelector((state: GlobalState) => state.trainingPlan);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getPlanInfo(id));
  }, [dispatch, id]);

  const initialValues = {
    image: null,
    title: planInfo?.title ? planInfo.title : "",
    sub_title: planInfo?.sub_title ? planInfo.sub_title : "",
    year: planInfo?.year ? planInfo.year : null,
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

    dispatch(updatePlan({ id: id, data: formData }));
  };

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage msg={`Oops! ${error}`} />;

  return (
    <section className="p-3 sm:p-6">
      <Header title="Update Training Plan" />
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
                  {operationLoading ? <Loader /> : "Update Training Plan"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default UpdateTrainingPlan;
