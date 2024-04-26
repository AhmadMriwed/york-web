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
const courseAdSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  subtitle: yup.string().required("Title is Required"),
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
  hours: yup.number().required("Number is Required"),
  fee: yup.number().required("Fee is Required"),
  language: yup.string().required("Language is Reqiured"),
  image: yup
    .mixed()
    .test("is-image", "Please upload a valid image", (value) => {
      if (!value) {
        return true;
      }
      return value instanceof File && value.type.startsWith("image/");
    }),
  venue: yup.string(),
  category: yup.string(),
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  location: yup.string(),
  submitCourse: yup.string(),
  status: yup.string().required("Status is Required"),
  outline: yup.string().required("Outline is Required"),
  description: yup.string(),
});

const initialValues = {
  title: "",
  subtitle: "",
  date_from: new Date(),
  date_to: new Date(),
  hours: 0,
  fee: 0,
  language: "",
  image: null,
  venue: "",
  category: "",
  code: "",
  location: "",
  submitCourse: "",
  status: "",
  outline: "",
  description: "",
};

const submitHandler = (values: any) => {
  console.log(values);
};

const AddCourse = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={courseAdSchema}
      onSubmit={submitHandler}
    >
      {(props) => (
        <Form className="p-3 sm:p-6">
          <Header title="Add New Course" />
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <p className="text-[14px] sm:text-[16px] max-w-lg">
              If a course following course ad, you can select it:
            </p>
            <InputPicker data={[]} placeholder="Course Ads" />
          </div>
          <div className="mt-7 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-2">
              <CustomInput
                type="text"
                name="code"
                label="Code"
                optional
                placeholder="Code"
                onChange={(value: string) => (props.values.code = value)}
                formikErrors={props.errors.code}
                formikTouched={props.touched.code}
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
                type="text"
                name="subtitle"
                label="Subtitle"
                required
                placeholder="Subtitle"
                onChange={(value: string) => (props.values.subtitle = value)}
                formikErrors={props.errors.subtitle}
                formikTouched={props.touched.subtitle}
              />
              <CustomInput
                type="text"
                name="language"
                label="Language"
                required
                placeholder="Language"
                onChange={(value: string) => (props.values.language = value)}
                formikErrors={props.errors.language}
                formikTouched={props.touched.language}
              />
              <CustomInput
                type="text"
                name="location"
                label="Location"
                optional
                placeholder="Location"
                onChange={(value: string) => (props.values.location = value)}
                formikErrors={props.errors.location}
                formikTouched={props.touched.location}
              />
              <CustomInput
                type="text"
                name="submitCourse"
                label="Submit Course"
                optional
                disabled
                placeholder="Submit Course"
                onChange={(value: string) =>
                  (props.values.submitCourse = value)
                }
                formikErrors={props.errors.submitCourse}
                formikTouched={props.touched.submitCourse}
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
                type="number"
                name="hours"
                label="Hours"
                required
                placeholder="Hours"
                onChange={(value: number) => (props.values.hours = value)}
                formikErrors={props.errors.hours}
                formikTouched={props.touched.hours}
              />
              <CustomInput
                type="number"
                name="fee"
                label="Fee"
                required
                placeholder="Fee"
                onChange={(value: number) => (props.values.fee = value)}
                formikErrors={props.errors.fee}
                formikTouched={props.touched.fee}
              />

              <CustomInput
                type="select"
                selectData={[]}
                name="venue"
                label="Venue"
                optional
                placeholder="Venue"
                onChange={(value: string) => (props.values.venue = value)}
                formikErrors={props.errors.venue}
                formikTouched={props.touched.venue}
              />
              <CustomInput
                type="select"
                selectData={[]}
                name="category"
                label="Category"
                optional
                placeholder="Category"
                onChange={(value: string) => (props.values.category = value)}
                formikErrors={props.errors.category}
                formikTouched={props.touched.category}
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
              <CustomInput
                type="textarea"
                textAreaRows={2}
                name="description"
                label="Description"
                optional
                placeholder="Description"
                onChange={(value: string) => (props.values.description = value)}
                formikErrors={props.errors.description}
                formikTouched={props.touched.description}
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

export default AddCourse;
