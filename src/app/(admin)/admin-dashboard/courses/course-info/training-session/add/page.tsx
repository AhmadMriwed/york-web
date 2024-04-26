"use client";
import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { FaCameraRetro } from "react-icons/fa";

import { InputPicker, Uploader } from "rsuite";
import CustomInput from "@/components/sessions/CustomInput";
import Header from "@/components/Pars/Header";
import { baseURL } from "@/utils/api";
import { LuImagePlus } from "react-icons/lu";

// Validation Schema
const courseSessionScehma = yup.object().shape({
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  course: yup.string(),
  title: yup.string().required("Title is Required"),
  date_from: yup
    .date()
    .required("Start Date is Required")
    .min(new Date(), "Please enter a valid Start Date"),
  date_to: yup
    .date()
    .required("End Date is Required")
    .test(
      "is-valid-end-date",
      "End Date must be greater than Start Date",
      function (value) {
        const { date_from } = this.parent;

        return value > date_from;
      }
    ),
  image: yup
    .mixed()
    .test("is-image", "Please upload a valid image", (value) => {
      if (!value) {
        return true;
      }
      return value instanceof File && value.type.startsWith("image/");
    }),
  status: yup.string().required("Status is Required"),
  outline: yup.string().required("Outline is Required"),
  training_sessions_type: yup.string(),
});

const initialValues = {
  code: "",
  course: "",
  title: "",
  date_from: new Date(),
  date_to: new Date(),
  image: null,
  status: "",
  outline: "",
  training_sessions_type: "",
};

const submitHandler = (values: any) => {
  console.log(values);
};

const AddSession = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={courseSessionScehma}
      onSubmit={submitHandler}
    >
      {(props) => (
        <Form className="p-3 sm:p-6">
          <Header title="Add New Session" />
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <p className="text-[14px] sm:text-[16px] max-w-lg">
              Do you want to fill in information from previous sessions? Select
              the session
            </p>
            <InputPicker data={[]} placeholder="Sessions" />
          </div>
          <div className="mt-7 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-2">
              <CustomInput
                type="text"
                name="code"
                label="Code"
                required
                placeholder="Code"
                onChange={(value: string) => (props.values.code = value)}
                formikErrors={props.errors.code}
                formikTouched={props.touched.code}
              />
              <CustomInput
                type="text"
                name="course"
                label="Course"
                required
                disabled
                placeholder="Course"
                onChange={(value: string) => (props.values.course = value)}
                formikErrors={props.errors.course}
                formikTouched={props.touched.course}
              />
              <CustomInput
                type="text"
                name="title"
                label="Title"
                required
                placeholder="Title"
                onChange={(value: string) => (props.values.title = value)}
                formikErrors={props.errors.title}
                formikTouched={props.touched.title}
              />

              <CustomInput
                type="date"
                name="date_from"
                label="Start Date"
                required
                placeholder="Start Date"
                value={props.values.date_from}
                onChange={(value: any) => {
                  if (value) {
                    props.values.date_from = value;
                  }
                }}
                formikErrors={props.errors.date_from}
                formikTouched={props.touched.date_from}
              />
              <CustomInput
                type="date"
                name="date_to"
                label="End Date"
                required
                placeholder="End Date"
                value={props.values.date_to}
                onChange={(value: any) => {
                  if (value) {
                    props.values.date_to = value;
                  }
                }}
                formikErrors={props.errors.date_to}
                formikTouched={props.touched.date_to}
              />

              <CustomInput
                type="select"
                selectData={[]}
                name="status"
                label="Status"
                required
                placeholder="Status"
                onChange={(value: string) => (props.values.status = value)}
                formikErrors={props.errors.status}
                formikTouched={props.touched.status}
              />
              <CustomInput
                type="select"
                selectData={[]}
                name="training_sessions_type"
                label="training Sessions Type"
                required
                placeholder="training Sessions Type"
                onChange={(value: string) =>
                  (props.values.training_sessions_type = value)
                }
                formikErrors={props.errors.training_sessions_type}
                formikTouched={props.touched.training_sessions_type}
              />
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-2 my-6">
              <CustomInput
                type="textarea"
                textAreaRows={2}
                name="outline"
                label="Outline"
                required
                placeholder="Outline"
                onChange={(value: string) => (props.values.outline = value)}
                formikErrors={props.errors.outline}
                formikTouched={props.touched.outline}
              />

              <Uploader
                action={baseURL + ""}
                draggable
                listType="picture-text"
                className="text-[#888] mt-4"
                renderFileInfo={(file) => {
                  return (
                    <>
                      <span>{file.name}</span>
                    </>
                  );
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#888",
                    padding: "25px",
                  }}
                >
                  <span className="element-center gap-2">
                    <LuImagePlus />
                    <p>Click or Drag Image to Upload (optional)</p>
                  </span>
                </div>
              </Uploader>
            </div>
            <div className="mt-7">
              <button
                type="submit"
                className="colored-btn !w-full !text-[16px]"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddSession;
