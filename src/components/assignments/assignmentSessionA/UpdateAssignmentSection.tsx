"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import { GlobalState } from "@/types/storeTypes";
import { Checkbox, InputPicker, Loader } from "rsuite";
import Image from "next/image";
import TextEditor from "@/components/inputs/editor/Editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getCategories } from "@/store/endUser/endUserSlice";
import CustomInputField from "@/components/assignments/assignmentSessionA/CustomInputField";
import ImageUploader from "./ImageUploader";

// Types
interface ExamSectionFormValues {
  title: {
    en: string;
    ar: string | null;
  };
  trainer_name: string | null;
  start_date: Date;
  end_date: Date | null;
  category_id: number | null;
  code: string;
  status: string;
  description: {
    en: string;
    ar: string;
  };
  image: File | null;
  organization_name: string | null; // Added organization_name field
}

interface ExamSectionUpdateProps {
  initialValues: Partial<ExamSectionFormValues>; // Initial values are required for update
  submitHandler: (values: any, actions: any) => void;
  operationLoading?: boolean;
}

// Validation Schema
const examSectionSchema = yup.object().shape({
  title: yup.object().shape({
    en: yup.string().required("English title is required"),
    ar: yup.string(),
  }),
  start_date: yup.date().required("Start date is required"),
  end_date: yup
    .date()
    .nullable()
    .test(
      "is-valid-end-date",
      "End date must be greater than start date",
      function (value) {
        const { start_date } = this.parent;
        if (value) return value > start_date;
        return true;
      }
    ),
  category_id: yup.number().required("Category is required"),
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  status: yup.string(),
  description: yup.object().shape({
    en: yup.string().required("English description is required"),
    ar: yup.string(),
  }),
  organization_name: yup.string(), // Validation for organization_name
});

const UpdateAssignmentSection: React.FC<ExamSectionUpdateProps> = ({
  initialValues,
  submitHandler,
  operationLoading,
}) => {
  const [sectionTerm, setSectionTerm] = useState("");
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const formikRef = useRef<FormikProps<any> | null>(null);
  const {
    categories,
    isLoading: dataLoading,
  } = useSelector((state: GlobalState) => state.endUser);
  const dispatch = useDispatch<any>();

  const statusData = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const categoriesList = categories?.map((category: any) => ({
    label: (
      <div key={category.id} className="flex items-center gap-2">
        <div className="w-[25px] h-[25px] rounded-full overflow-hidden bg-slate-400">
          {category.image && (
            <Image
              src={category.image}
              alt="category image"
              width={25}
              height={25}
            />
          )}
        </div>
        <p className="m-0 text-[18px]">{category?.title}</p>
      </div>
    ),
    value: category.id,
  }));


  const statusList = statusData?.map((status: any) => ({
    label: (
      <div key={status.id} className="flex items-center gap-2">
        <p className="m-0 text-[18px] py-[3px]">{status.label}</p>
      </div>
    ),
    value: status.value,
  }));

  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={examSectionSchema}
      onSubmit={submitHandler}
      enableReinitialize
      innerRef={(instance) => {
        formikRef.current = instance;
      }}
    >
      {(props: FormikProps<any>) => (
        <Form
          className={`relative p-4 sm:p-6 rounded-lg ${
            mode === "dark" ? " text-white" : " text-black"
          }`}
        >
          <div className="absolute w-full h-full dark:bg-gray-900 opacity-60" />
          <Tabs
            defaultValue="English"
            className={`w-full relative ${
              mode === "dark" ? "text-white" : "text-black"
            }`}
          >
            <div
              className={`mt-4 px-2 sm:px-20 lg:px-40 py-11 rounded-sm ${
                mode === "dark" ? "" : "bg-light"
              }`}
            >
                    <TabsList
                         className={`grid md:w-[40%] my-6 h-12  grid-cols-2 ${
                           mode === "dark"
                             ? "bg-gray-700 text-white"
                             : "bg-gray-100 text-black"
                         }`}
                       >
                         <TabsTrigger className="h-full"  value="English">English</TabsTrigger>
                         <TabsTrigger className="h-full" value="Arabic">Arabic</TabsTrigger>
                       </TabsList>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-2">
                <TabsContent value="English" className="-my-[1px]">
                  <CustomInputField
                    type="text"
                    name="title.en"
                    label="Title (English)"
                    placeholder="Enter title in English"
                    required
                  />
                </TabsContent>
                <TabsContent value="Arabic" className="-my-[1px]">
                  <CustomInputField
                    type="text"
                    name="title.ar"
                    label="Title (Arabic)"
                    placeholder="Enter title in Arabic"
                    required
                  />
                </TabsContent>
                <CustomInputField
                  type="date"
                  name="start_date"
                  label="Start Date"
                  placeholder="Start Date"
                  required
                  theme={mode}

                />
                <CustomInputField
                  type="date"
                  name="end_date"
                  label="End Date"
                  placeholder="End Date"
                  theme={mode}
                />
                {/* Organization Name Field */}
                <CustomInputField
                  type="text"
                  name="organization_name"
                  label="Organization Name"
                  placeholder="Enter organization name"
                //   optional
                />
                <CustomInputField
                  type="select"
                  selectData={categoriesList}
                  name="category_id"
                  label="Category"
                  required
                  placeholder="Category"
                />
                <CustomInputField
                  type="text"
                  name="code"
                  label="Code (6 characters)"
                  placeholder="Enter code"
                //   optional
                />
                <CustomInputField
                  type="select"
                  selectData={statusList}
                  name="status"
                  label="Status"
                //   optional
                  placeholder="Status"
                />
                <CustomInputField
                  type="text"
                  name="trainer_name"
                  label="Trainer Name"
                  placeholder="Enter trainer name"
                //   optional
                />
              </div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-2 my-6">
                <TabsContent value="English" className="space-y-4">
                  <TextEditor
                    name="description.en"
                    label="Description (English)"
                    // optional
                  />
                </TabsContent>
                <TabsContent value="Arabic" className="space-y-4">
                  <TextEditor
                    name="description.ar"
                    label="Description (Arabic)"
                    // optional
                  />
                </TabsContent>
                <ImageUploader formikProps={props} />
              </div>
              <div className="mt-7">
                <button
                  type="submit"
                  className={`colored-btn !w-full !py-3 !text-[18px] ${
                    mode === "dark" ? "bg-blue-600" : "bg-blue-500"
                  }`}
                  disabled={operationLoading}
                >
                  {operationLoading ? (
                    <Loader />
                  ) : (
                    "Update Exam Section"
                  )}
                </button>
              </div>
            </div>
          </Tabs>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAssignmentSection;