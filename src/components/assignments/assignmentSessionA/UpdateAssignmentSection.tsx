"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import { GlobalState } from "@/types/storeTypes";
import { Button, Loader } from "rsuite";
import Image from "next/image";
import TextEditor from "@/components/inputs/editor/Editor";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getCategories } from "@/store/endUser/endUserSlice";
import { updateExamSection } from "@/lib/action/assignment_action";
import { getLocalISODate } from "@/utils/dateFuncs";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import CustomInputField from "./CustomInputField";

interface ExamSectionFormValues {
  title: string;
  trainer_name: string | null;
  start_date: Date;
  end_date: Date | null;
  category_id: number | null;
  code: string;
  status: string;
  description: string;
  type_id: number | null;
  image: File | null;
  organization: string | null; // Added organization_name field
}
interface ExamSectionOperationProps {
  typeData?: Partial<any[]>;
  assignmentsSection?: Partial<any>;
  id: number;
}

const examSectionSchema = yup.object().shape({
  title: yup.string().required(" title is required"),
  image: yup.mixed().nullable(), 
  start_date: yup.date().nullable(),
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
  category_id: yup.number().nullable(),
  type_id: yup.number().nullable(),
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  status: yup.string().nullable(),
  description: yup.string(),

  organization: yup.string(), 
});


const UpdateAssignmentSection: React.FC<ExamSectionOperationProps> = ({
  assignmentsSection,
  typeData,
  id
}) => {
  const [sectionTerm, setSectionTerm] = useState("");
  const [loading, setLoading] = useState(false);


  
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const formikRef = useRef<FormikProps<any> | null>(null);
  const {
    categories,
    isLoading: dataLoading,
  } = useSelector((state: GlobalState) => state.endUser);
  const dispatch = useDispatch<any>();






  const submitHandler = async (values: any, actions: any) => {  
    try {
      setLoading(true);

      const formData = new FormData();
  
      console.log(values);
      formData.append("title", values.title);
    
      if (values.category_id) formData.append("category_id", values.category_id);
      if (values.description) formData.append("description", values.description);
      if (values.start_date) formData.append("start_date",getLocalISODate( values.start_date));
      if (values.end_date) formData.append("end_date", getLocalISODate(values.end_date));
      if (values.trainer) formData.append("trainer", values.trainer);
      if (values.code) formData.append("code", values.code);
      if (values.status) formData.append("status", values.status);
      if (values.image instanceof File) formData.append("image", values.image);
      if (values.organization) formData.append("organization", values.organization);
      if (values.type_id) formData.append("type_id", values.type_id.toString());
      console.log(formData);
  
      const response = await updateExamSection(formData, id);
      console.log("API Response:", response);
   
      toast.success("Exam section updated successfully", {
        description: "The exam section has been updated successfully.",
        duration: 4000,
       
      });
      actions.resetForm();

    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
      });
    }finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };


  const statusData = [
    { label: "Active", value: "Active", id: 1 },
    { label: "Inactive", value: "Inactive", id: 2 },
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
        <p className="m-0 text-[16px]">{category?.title}</p>
      </div>
    ),
    value: category.id,
  }));
  const statusList = statusData?.map((status: any) => ({
    label: (
      <div key={status.id} className="flex items-center gap-2">
        <p className="m-0 text-[16px] ">{status.label}</p>
      </div>
    ),
    value: status.value,
  }));
  const typeList = typeData?.map((type: any) => ({
    label: (
      <div key={type.id} className="flex items-center gap-2">
        <p className="m-0 text-[16px] ">{type.type}</p>
      </div>
    ),
    value: type.id,
  }));
  


  const defaultValues: ExamSectionFormValues = {
    title: "",
    trainer_name: null,
    start_date: new Date(),
    end_date: new Date(),
    category_id: null,
    code: "",
    status: "",
    description: "",
    type_id: null,
    image: null,
    organization: "", 
  };
  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  const initialValues = assignmentsSection ? {
    ...assignmentsSection,
    category_id: assignmentsSection.category ?assignmentsSection.category.id : null,
    type_id: assignmentsSection.type ? assignmentsSection.type.id : null,
    description: assignmentsSection ? assignmentsSection.description: null
  } : defaultValues;
  return (
    <>
   
    <Formik
      initialValues={initialValues }
      validationSchema={examSectionSchema}
      onSubmit={submitHandler}
      enableReinitialize
      innerRef={(instance) => {
        formikRef.current = instance;
      }}
    >
      {(props: FormikProps<any>) => (
        <Form
          className={`relative py-2  sm:p-6 rounded-lg ${mode === "dark" ? " text-white" : " text-black"
            }`}
        >

          <div
            className={`mt-4 px-5 sm:px-10 xl:px-20 py-5 md:py-11 rounded-lg ${mode === "dark" ? "bg-gray-900 opacity-95" : "bg-light"
              }`}
          >
          

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-sm:gap-y-2 ">

              <CustomInputField
                type="text"
                name="title"
                label="Title "
                placeholder="Enter title in English"
                required
              />


              <CustomInputField
                type="date"
                name="start_date"
                label="Start Date"
                placeholder="Start Date"
    
                theme={mode}
              />
              <CustomInputField
                type="date"
                name="end_date"
                label="End Date"
                placeholder="End Date"
                theme={mode}
              />

              <CustomInputField
                type="text"
                name="organization"
                label="Organization Name"
                placeholder="Enter organization name"
              // optional
              />
              <CustomInputField
                type="select"
                selectData={typeList}
                name="type_id"
                label="Type"
 
                placeholder="type"
              />
              <CustomInputField
                type="select"
                selectData={categoriesList}
                name="category_id"
                label="Category"

                placeholder="Category"
              />
              <CustomInputField
                type="text"
                name="code"
                label="Code (6 characters)"
                placeholder="Enter code"
              // optional
              />
              <CustomInputField
                type="select"
                selectData={statusList}
                name="status"
                label="Status"
                // optional
                placeholder="Status"
              />
              <CustomInputField
                type="text"
                name="trainer"
                label="Trainer Name"
                placeholder="Enter trainer name"
              // optional
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-2 my-6 max-sm:my-3">
              <div className="space-y-4">
                <TextEditor
                  name="description"
                  label="Description "
                  value={initialValues?.description}
                // optional
                />
              </div>

              <ImageUploader formikProps={props} />
            </div>
            <div className="mt-7 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="!bg-primary-color1 py-[9px] sm:py-3 sm:px-9  max-sm:!w-full"
              >
                {loading ? (<div className="flex justify-center items-center gap-4">

                  <Loader />
                  <h3 className="text-lg tracking-widest sm:text-xl text-white">Update </h3>
                </div>
                ) : (
                  <h3 className="text-lg tracking-widest sm:text-xl text-white">Update </h3>
                )}
              </Button>
            </div>
          </div>

        </Form>
      )}
    </Formik>
  
    <Toaster position="top-right" richColors />


     </>
  );
};
export default UpdateAssignmentSection;