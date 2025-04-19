"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploader from "@/components/upload/FileUploader";

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
    isLoading: fileUploadLoading,
  } = useSelector((state: GlobalState) => state.trainingPlan);

  const dispatch = useDispatch<any>();
  const [fileId, setFileId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getPlanInfo(id));
  }, [dispatch, id]);

  // Set initial file ID when planInfo loads
  useEffect(() => {
    if (planInfo?.file?.id) {
      setFileId(planInfo.file.id);
    }
  }, [planInfo]);

  const initialValues = {
    image: null,
    title: {
      en: planInfo?.title?.en || "",
      ar: planInfo?.title?.ar || "",
    },
    sub_title: {
      en: planInfo?.sub_title?.en || "",
      ar: planInfo?.sub_title?.ar || "",
    },
    year: planInfo?.year || new Date().getFullYear(),
  };

  const submitHandler = async (values: any, { setSubmitting }: any) => {
    if (!fileId) {
      toast.error("Please upload a training plan file");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();

    // Append multilingual fields
    const textFields = {
      title: values.title,
      sub_title: values.sub_title,
      description: values.description,
    };

    Object.entries(textFields).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        formData.append(`${key}[en]`, value.en || "");
        formData.append(`${key}[ar]`, value.ar || "");
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Append other fields
    formData.append("year", values.year.toString());
    formData.append("file_id", fileId.toString());

    // Append image if it exists
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    try {
      await dispatch(updatePlan({ id, data: formData })).unwrap();
    } catch (error: any) {
      console.error("Update error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUploadSuccess = (uploadedFileId: number) => {
    setFileId(uploadedFileId);
  };

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
        enableReinitialize
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Tabs defaultValue="English" className="w-full">
              <div className="mt-4 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
                <TabsList className="grid md:w-[40%] my-4 grid-cols-2 dark:bg-gray-700 bg-gray-100">
                  <TabsTrigger value="English">English</TabsTrigger>
                  <TabsTrigger value="Arabic">Arabic</TabsTrigger>
                </TabsList>
                <div className="grid grid-cols-1 gap-y-4 sm:gap-y-2">
                  <TabsContent value="English" className="-my-[1px]">
                    <CustomInput
                      type="text"
                      name="title.en"
                      label="English Title"
                      required
                      placeholder="Title"
                    />
                    <CustomInput
                      type="text"
                      name="sub_title.en"
                      label="English Sub Title"
                      placeholder="Enter sub title in english"
                    />
                  </TabsContent>
                  <TabsContent value="Arabic" className="-my-[1px]">
                    <CustomInput
                      type="text"
                      name="title.ar"
                      label="Arabic Title"
                      required
                      placeholder="Title"
                    />
                    <CustomInput
                      type="text"
                      name="sub_title.ar"
                      label="Arabic Sub Title"
                      placeholder="Enter sub title in arabic"
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
                      Training Plan File:
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
                    disabled={operationLoading || fileUploadLoading}
                  >
                    {operationLoading ? <Loader /> : "Update Training Plan"}
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

export default UpdateTrainingPlan;
