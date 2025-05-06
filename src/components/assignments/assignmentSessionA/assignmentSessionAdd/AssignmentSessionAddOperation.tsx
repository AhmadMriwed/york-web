"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps, useField } from "formik";
import * as yup from "yup";
import { GlobalState } from "@/types/storeTypes";
import { Button, InputPicker, Loader, SelectPicker } from "rsuite";
import Image from "next/image";
import TextEditor from "@/components/inputs/editor/Editor";

import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getCategories } from "@/store/endUser/endUserSlice";
import CustomInputField from "../CustomInputField";
import "./style.css";
import ImageUploader from "../ImageUploader";
import {
  addExamSection,
  fetchCategories,
} from "@/lib/action/assignment_action";
import { getLocalISODate, getUTCDate } from "@/utils/dateFuncs";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCategory } from "@/lib/action/exam_action";
import { Loader2 } from "lucide-react";

interface ExamSectionFormValues {
  title: string;
  trainer_name: string | null;
  start_date: Date | null;
  end_date: Date | null;
  category_id: number | null;
  code: string;
  status: string;
  type_id: number | null;
  description: string;
  image: File | null;
  organization: string | null; // Added organization_name field
}
interface ExamSectionOperationProps {
  typeData?: Partial<any[]>;
  assignmentsSections?: Partial<any[]>;
  CategoryLoading: any;
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
  type_id: yup.number().required(" type is required"),
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

const AssignmentSessionAddOperation: React.FC<ExamSectionOperationProps> = ({
  assignmentsSections,
  typeData,
  CategoryLoading,
}) => {
  const [sectionTerm, setSectionTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const formikRef = useRef<FormikProps<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [assignmentCategoryData, setAssignmentCategoryData] = useState<any[]>(
    []
  );
  const [isrefetchcategory, setIsrefetchcategory] = useState(false);
  const [categoryLoader, setCategoryLoader] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      setCategoryLoader(true);
      try {
        const categoryData = await fetchCategories();
        setAssignmentCategoryData(categoryData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch sessions"
        );
      } finally {
        setLoading(false);
        setCategoryLoader(false);
      }
    };
    loadData();
  }, [isrefetchcategory]);

  const submitHandler = async (values: any, actions: any) => {
    try {
      setLoading(true);

      const formData = new FormData();

      console.log(values);
      formData.append("title", values.title);

      if (values.category_id)
        formData.append("category_id", values.category_id || undefined);
      if (values.description)
        formData.append("description", values.description || undefined);
      if (values.start_date)
        formData.append(
          "start_date",
          getLocalISODate(values.start_date || undefined)
        );
      if (values.end_date)
        formData.append(
          "end_date",
          getLocalISODate(values.end_date || undefined)
        );
      if (values.trainer)
        formData.append("trainer", values.trainer || undefined);
      if (values.code) formData.append("code", values.code || undefined);
      if (values.status) formData.append("status", values.status || undefined);
      if (values.image instanceof File)
        formData.append("image", values.image || undefined);
      if (values.organization)
        formData.append("organization", values.organization || undefined);
      if (values.type_id)
        formData.append("type_id", values.type_id.toString() || undefined);
      console.log(formData);

      const response = await addExamSection(formData);
      console.log("API Response:", response);
      router.push(
        `/admin/dashboard/assignments/assignment-session/${response.data.data.id}`
      );

      toast.success("Exam section added successfully", {
        description: "The exam section has been created successfully.",
        duration: 4000,
      });
      actions.resetForm();
      console.log(response.data.data.id);
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
      });
    } finally {
      setLoading(false);
      // actions.setSubmitting(false);
    }
  };

  const statusData = [
    { label: "Active", value: "Active", id: 1 },
    { label: "Inactive", value: "Inactive", id: 2 },
  ];
  const categoriesList = assignmentCategoryData?.map((category: any) => ({
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
    start_date: null,
    end_date: null,
    category_id: null,
    code: "",
    status: "",
    description: "",
    type_id: null,
    image: null,
    organization: "",
  };

  const initialValues = assignmentsSections?.find(
    (section) => section.id === selectedSectionId
  )
    ? {
        ...assignmentsSections.find(
          (section) => section.id === selectedSectionId
        ),
        category_id:
          assignmentsSections.find(
            (section) => section.id === selectedSectionId
          )?.category?.id || null,
        type_id:
          assignmentsSections.find(
            (section) => section.id === selectedSectionId
          )?.type?.id || null,
        code: "",
      }
    : defaultValues;

  return (
    <>
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
            className={`relative py-2 max-sm:mt-1 sm:p-6 rounded-lg ${
              mode === "dark" ? " text-white" : " text-black"
            }`}
          >
            <div
              className={`mt-4 px-4 sm:px-10 lg:px-20 py-5 md:py-11 rounded-md ${
                mode === "dark" ? "bg-gray-900 opacity-95" : "bg-light"
              }`}
            >
              <div className="mb-8 flex flex-col justify-center gap-2">
                <p
                  className={`font-medium text-[16px] max-sm:text-[15px] px-2 ${
                    mode === "dark" ? "text-gray-100" : "text-gray-700"
                  }`}
                >
                  Choose an exam section to fill the fields automatically:
                </p>
                <InputPicker
                  size="lg"
                  onSearch={(value: string) => setSectionTerm(value)}
                  renderMenu={(menu) => {
                    if (CategoryLoading) {
                      return (
                        <p
                          style={{
                            padding: 10,
                            color: "#999",
                            textAlign: "center",
                          }}
                        >
                          <Loader />
                        </p>
                      );
                    }
                    return menu;
                  }}
                  data={
                    assignmentsSections?.map((sec: any) => ({
                      label: sec.title || "Untitled Section",
                      value: sec.id,
                    })) || []
                  }
                  onChange={(value: number) => {
                    setSelectedSectionId(value);
                  }}
                  placeholder="Exam Sections"
                  className=""
                  menuClassName="dark-dropdown"
                />
                {mode === "dark" && (
                  <style>
                    {`
      /* Dropdown menu container */
      .dark-dropdown {
        background-color: #374151 !important;
        
      }

      /* Menu items */
      .dark-dropdown .rs-picker-select-menu-item {
        color: #f3f4f6 !important; /* Text color */
      }

      /* Hover state */
      .dark-dropdown .rs-picker-select-menu-item:hover {
        background-color: #4b5563 !important;
      }

      /* Active/selected item */
      .dark-dropdown .rs-picker-select-menu-item-active {
        background-color: #1f2937 !important;
        color: #fff !important;
      }

      /* Focus state */
      .dark-dropdown .rs-picker-select-menu-item:focus {
        background-color: #374151 !important;
      }

      /* Search input inside dropdown */
      .dark-dropdown .rs-picker-search-bar input {
        background-color: #1f2937 !important;
        color: #fff !important;
        border-color: #4b5563 !important;
      }
    `}
                  </style>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-sm:gap-y-2 ">
                <CustomInputField
                  type="text"
                  name="title"
                  label="Title (English)"
                  placeholder="Enter title in English"
                  required
                />

                <CustomInputField
                  type="date"
                  name="start_date"
                  label="Start Date"
                  placeholder="Start Date"
                  optional
                  theme={mode}
                />
                <CustomInputField
                  type="date"
                  name="end_date"
                  label="End Date"
                  placeholder="End Date"
                  theme={mode}
                  optional
                />
                {/* Replaced Venue with Organization Name */}
                <CustomInputField
                  type="text"
                  name="organization"
                  label="Organization Name"
                  placeholder="Enter organization name"
                  optional
                />
                <CustomInputField
                  type="select"
                  selectData={typeList}
                  name="type_id"
                  label="Type"
                  required
                  placeholder="type"
                />
                {/* <CustomInputField
                  type="select"
                  selectData={categoriesList}
                  name="category_id"
                  label="Category"
                  placeholder="Category"
                /> */}
                <CategorySelect
                  // type="select"
                  selectData={categoriesList}
                  name="category_id"
                  label="Category"
                  placeholder="Category"
                  selectLoading={categoryLoader}
                  selectSearchable={true}
                  isrefetchcategory={isrefetchcategory}
                  setisrefetchcaetgory={setIsrefetchcategory}
                  selectOnSearch={(value) => setSectionTerm(value)}
                  theme={mode}
                />

                <CustomInputField
                  type="text"
                  name="code"
                  label="Code (6 characters)"
                  placeholder="Enter code"
                  optional
                />
                <CustomInputField
                  type="select"
                  selectData={statusList}
                  name="status"
                  label="Status"
                  optional
                  placeholder="Status"
                />
                <CustomInputField
                  type="text"
                  name="trainer"
                  label="Trainer Name"
                  placeholder="Enter trainer name"
                  optional
                />
              </div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-2 my-6 max-sm:my-3">
                <div className="space-y-4">
                  <TextEditor
                    name="description"
                    label="Description "
                    value={initialValues?.description}
                    optional
                  />
                </div>

                <ImageUploader formikProps={props} />
              </div>
              <div className="mt-7 flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="!bg-primary-color1 py-[8px] sm:py-2 sm:!px-9  max-sm:!w-full"
                >
                  {loading ? (
                    <div className="flex justify-center items-center gap-4">
                      <Loader />
                      <h6 className="text-[17px] tracking-wide sm:text-xl text-white">
                        Add{" "}
                      </h6>
                    </div>
                  ) : (
                    <h6 className="text-[17px] tracking-wide sm:text-xl text-white">
                      Add{" "}
                    </h6>
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
export default AssignmentSessionAddOperation;

const CategorySelect = ({
  name,
  label,
  placeholder,
  optional,
  required,
  isrefetchcategory,
  setisrefetchcaetgory,
  disabled,
  selectData,
  selectLoading,
  selectSearchable,
  selectOnSearch,
  textAreaRows,
  value,
  theme,
}: {
  name: string;
  label: string;
  placeholder?: string;
  isrefetchcategory: any;
  setisrefetchcaetgory: any;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  selectData?: any;
  selectLoading?: boolean;
  selectSearchable?: boolean;
  selectOnSearch?: (value: string) => void;
  textAreaRows?: number;
  value?: any;
  theme: "light" | "dark";
}) => {
  const [field, meta, helpers] = useField(name);
  const [loadingBtn, setLoadingBtn] = useState(false);
  return (
    <div className="mb-[10px]">
      {/* Label */}
      <label
        htmlFor={name}
        className={`text-[15px] ml-[4px]   dark:!text-gray-100`}
      >
        {label} {optional ? "(optional)" : ""}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <SelectPicker
          placement="auto"
          data={selectData}
          searchable={selectSearchable}
          onSearch={selectOnSearch}
          renderMenu={(menu) => {
            if (selectLoading) {
              return (
                <p
                  style={{
                    padding: 10,
                    color: theme === "dark" ? "#ccc" : "#999",
                    textAlign: "center",
                    background: theme === "dark" ? "#1f2937" : "white",
                  }}
                >
                  <Loader />
                </p>
              );
            }
            return (
              <div>
                {menu}
                {/* Add new category form */}
                <div className={`p-3 border-t `}>
                  <p className="m-0 text-[16px]">{`Can't find your category? Add a new one:`}</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="New category name"
                      className={`flex-1 px-3 border-gray-400 focus:outline-none focus:border-1 focus:border-primary-color1  py-[6px] rounded border `}
                      id={`new-${name}-input`}
                    />
                    <button
                      type="submit"
                      className={`px-5 py-[6px] rounded bg-primary-color1 text-white`}
                      onClick={async () => {
                        const input = document.getElementById(
                          `new-${name}-input`
                        ) as HTMLInputElement;
                        const newCategoryName = input.value.trim();
                        if (newCategoryName) {
                          try {
                            setLoadingBtn(true);

                            await createCategory(newCategoryName);
                            toast.success(
                              `Category "${newCategoryName}" added successfully`
                            );
                            input.value = "";
                            setisrefetchcaetgory(!isrefetchcategory);

                            // await reloadCategories();
                          } catch (error) {
                            toast.error("Failed to add new category");
                          } finally {
                            setLoadingBtn(false);
                          }
                        }
                      }}
                    >
                      {loadingBtn ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <span>Add</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          }}
          size="md"
          className={`!w-full !border-none  ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : `!border-[1px] rounded-lg `
          }`}
          id={name}
          name={name}
          placeholder={placeholder}
          menuClassName="dark:!bg-gray-800"
          value={field.value}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      </div>
    </div>
  );
};
