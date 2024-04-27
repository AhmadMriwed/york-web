"use client";
import React from "react";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import { baseURL } from "@/utils/api";

import { LuImagePlus } from "react-icons/lu";

import { InputPicker, Uploader } from "rsuite";
import CustomInput from "@/components/rsuiteInput/CustomInput";
import Header from "@/components/Pars/Header";

// Validation Schema
const courseSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  subtitle: yup.string().required("Subtitle is Required"),
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
  // image: yup
  //   .mixed()
  //   .test("is-image", "Please upload a valid image", (value) => {
  //     if (!value) {
  //       return true;
  //     }
  //     return value instanceof File && value.type.startsWith("image/");
  //   }),
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
  status: "Active",
  outline: "",
  description: "",
};

const submitHandler = (values: any, actions: any) => {
  console.log(values);
};

const fields = [
  {
    type: "text",
    name: "code",
    label: "Code",
    placeholder: "Code",
    optional: true,
    required: false,
    disabled: false,
  },
  {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Title",
    optional: false,
    required: true,
    disabled: false,
  },
  {
    type: "text",
    name: "subtitle",
    label: "Sub Title",
    placeholder: "Sub Title",
    optional: false,
    required: true,
    disabled: false,
  },
  {
    type: "text",
    name: "language",
    label: "Language",
    placeholder: "Language",
    optional: false,
    required: true,
    disabled: false,
  },
  {
    type: "text",
    name: "location",
    label: "Location",
    placeholder: "Location",
    optional: true,
    required: false,
    disabled: false,
  },
  {
    type: "text",
    name: "submitCourse",
    label: "Submit Course",
    placeholder: "Submit Course",
    optional: true,
    required: false,
    disabled: true,
  },
  {
    type: "date",
    name: "date_from",
    label: "Start Date",
    placeholder: "Start Date",
    optional: false,
    required: true,
    disabled: false,
  },
  {
    type: "date",
    name: "date_to",
    label: "End Date",
    placeholder: "End Date",
    optional: false,
    required: true,
    disabled: false,
  },
  {
    type: "number",
    name: "hours",
    label: "Hours",
    placeholder: "Hours",
    optional: false,
    required: true,
    disabled: false,
  },
  {
    type: "number",
    name: "fee",
    label: "Fee",
    placeholder: "Fee",
    optional: false,
    required: true,
    disabled: false,
  },
];

const AddCourse = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={courseSchema}
      onSubmit={submitHandler}
    >
      {(props: FormikProps<any>) => (
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
              {fields.map((field) => (
                <CustomInput
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  optional={field.optional}
                  required={field.required}
                  disabled={field.disabled}
                />
              ))}

              <CustomInput
                type="select"
                selectData={[]}
                name="venue"
                label="Venue"
                optional
                placeholder="Venue"
              />
              <CustomInput
                type="select"
                selectData={[]}
                name="category"
                label="Category"
                optional
                placeholder="Category"
              />
              <CustomInput
                type="select"
                selectData={[]}
                name="status"
                label="Status"
                required
                placeholder="Status"
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
              />
              <CustomInput
                type="textarea"
                textAreaRows={2}
                name="description"
                label="Description"
                optional
                placeholder="Description"
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
