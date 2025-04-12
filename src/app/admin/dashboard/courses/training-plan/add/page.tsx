"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import {
  addPlan,
  planOperationCompleted,
  uploadTrainingPlain,
} from "@/store/adminstore/slices/courses/training-plan/trainingPlanSlice";
import { GlobalState } from "@/types/storeTypes";

import Header from "@/components/Pars/Header";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import ImageUploader from "@/components/inputs/image-uploader/ImageUploader";
import OperationAlert from "@/components/Pars/OperationAlert";
import { Loader } from "rsuite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploader from "@/components/courses/FileUploader";
import { toast } from "sonner";

const planSchema = yup.object().shape({
  image: yup.mixed().nullable(),
  title: yup.object().shape({
    en: yup.string().required("English title is required"),
    ar: yup.string(),
  }),
  sub_title: yup.object().shape({
    en: yup.string(),
    ar: yup.string(),
  }),
  file_id: yup.number().nullable(),
  description: yup.string().nullable(),
  year: yup.number().required("Year is required"),
  file: yup.mixed().nullable(),
});

const AddTrainingPlan = () => {
  const {
    status,
    operationError,
    operationLoading,
    isLoading: fileUploadLoading,
  } = useSelector((state: GlobalState) => state.trainingPlan);
  const [fileId, setFileId] = useState<number | null>(null);

  const dispatch = useDispatch<any>();

  const initialValues = {
    image: null,
    title: {
      en: "",
      ar: "",
    },
    sub_title: {
      en: "",
      ar: "",
    },
    description: "",
    file_id: null,
    year: new Date().getFullYear(),
    file: null,
  };
  const submitHandler = (values: any, actions: any) => {
    const formData = new FormData();

    // Handle text fields with English/Arabic versions
    const multilingualFields = {
      title: {
        en: values.title.en || "",
        ar: values.title.ar || null,
      },
      sub_title: {
        en: values.sub_title.en || "",
        ar: values.sub_title.ar || null,
      },
      description: values.description || "",
    };

    // Append multilingual fields
    Object.entries(multilingualFields).forEach(([key, value]) => {
      if (typeof value === "object") {
        formData.append(`${key}[en]`, value.en);
        formData.append(`${key}[ar]`, value.ar);
      } else {
        formData.append(key, value);
      }
    });

    formData.append("year", values.year.toString());
    //@ts-ignore
    formData.append("file_id", fileId.toString());

    if (values.image) {
      formData.append("image", values.image);
    }

    dispatch(addPlan(formData)).unwrap();
  };

  const handleFileUploadSuccess = (uploadedFileId: number) => {
    setFileId(uploadedFileId);
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
            <Tabs defaultValue="English" className="w-full">
              <div className="mt-4 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
                <TabsList
                  className={`grid md:w-[40%] my-4 grid-cols-2 dark:bg-gray-700 bg-gray-100 `}
                >
                  <TabsTrigger value="English">English</TabsTrigger>
                  <TabsTrigger value="Arabic">Arabic</TabsTrigger>
                </TabsList>
                <div className="grid grid-cols-1 gap-y-4 sm:gap-y-2">
                  <TabsContent value="English" className="-my-[1px]">
                    <CustomInput
                      type="text"
                      name="title.en"
                      label=" English Title"
                      required
                      placeholder="Title"
                    />
                    <CustomInput
                      type="text"
                      name={`sub_title.en`}
                      label={` English Sub Title`}
                      placeholder={`Enter sub title in english`}
                    />
                  </TabsContent>
                  <TabsContent value="Arabic" className="-my-[1px]">
                    <CustomInput
                      type="text"
                      name="title.ar"
                      label=" Arabic Title"
                      required
                      placeholder="Title"
                    />
                    <CustomInput
                      type="text"
                      name={`sub_title.ar`}
                      label={` Arabic Sub Title`}
                      placeholder={`Enter sub title in arabic`}
                    />
                  </TabsContent>

                  <CustomInput
                    type="number"
                    name="year"
                    label="Year"
                    required
                    placeholder="Year"
                  />

                  {/* File Uploader Component */}
                  <div className="mb-4 relative">
                    <label className="block text-sm font-medium text-[#888] mb-1">
                      Training Plan File :
                    </label>
                    <div className={fileUploadLoading ? "opacity-50" : ""}>
                      <FileUploader onUploadSuccess={handleFileUploadSuccess} />
                    </div>
                    {fileUploadLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader size="md" color="#037f85" />
                      </div>
                    )}
                  </div>

                  <ImageUploader formikProps={props} />
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="colored-btn !w-full !text-[16px]"
                    disabled={operationLoading || fileUploadLoading || !fileId}
                  >
                    {operationLoading ? <Loader /> : "Add Training Plan"}
                  </button>
                </div>
              </div>
            </Tabs>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddTrainingPlan;
