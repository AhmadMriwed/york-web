"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import {
  getCategories,
  getCourseads,
  getVenues,
} from "@/store/endUser/endUserSlice";
import { courseAdType, Venue } from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import { Checkbox, InputPicker, Loader } from "rsuite";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import ImageUploader from "@/components/inputs/image-uploader/ImageUploader";
import Image from "next/image";
import TextEditor from "@/components/inputs/editor/Editor";
import { getFlexibleText, getTranslatedText } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";


import { ThemeContext } from "@/components/Pars/ThemeContext";

// Types
interface CourseAdFormValues {
  title: {
    en: string;
    ar: string | null;
  };
  sub_title: {
    en: string;
    ar: string;
  };
  start_date: Date;
  end_date: Date | null;
  houres: number | null;
  fee: string | null | undefined;
  lang: string;
  image: File | null;
  venue_id: number | null;
  category_id: number | null;
  code: string;
  status: string;
  outlines: {
    en: string;
    ar: string | null;
  };
  description: {
    en: string;
    ar: string;
  };
}

interface CourseAdOperationProps {
  initialValues?: Partial<CourseAdFormValues>;
  submitHandler: (values: any, actions: any) => void;
  operationLoading: boolean;
  op: "add" | "update";
}

// Validation Schema
const courseAdSchema = yup.object().shape({
  title: yup.object().shape({
    en: yup.string().required("English title is required"),
    ar: yup.string(),
  }),
  sub_title: yup.object().shape({
    en: yup.string(),
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
  houres: yup.number().required("Hours is required"),
  fee: yup.number().required("Fee is required"),
  lang: yup.string().required("Language is required"),
  image: yup.mixed().nullable(),
  venue_id: yup.number().required("Venue is required"),
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
  outlines: yup.object().shape({
    en: yup.string().required("English outlines are required"),
    ar: yup.string(),
  }),
  description: yup.object().shape({
    en: yup.string().required("English description is required"),
    ar: yup.string(),
  }),
});

const CourseAdOperation: React.FC<CourseAdOperationProps> = ({
  initialValues,
  submitHandler,
  operationLoading,
  op,
}) => {
  const [venueTerm, setVenueTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [courseadTerm, setCourseadTerm] = useState("");
  const [onlineVenueChecked, setOnlineVenueChecked] = useState(false);
  const [selectedAd, setSelectedAd] =
    useState<Partial<CourseAdFormValues> | null>(null);
  const [selectedAdId, setSelectedAdId] = useState<number | null>(null);
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const formikRef = useRef<FormikProps<any> | null>(null);

  const {
    venues,
    categories,
    courseads,
    isLoading: dataLoading,
  } = useSelector((state: GlobalState) => state.endUser);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getVenues(venueTerm));
  }, [dispatch, venueTerm]);

  useEffect(() => {
    dispatch(getCategories(categoryTerm));
  }, [categoryTerm, dispatch]);

  useEffect(() => {
    dispatch(getCourseads(courseadTerm));
  }, [courseadTerm, dispatch]);

  const statusData = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const langs = [
    { label: "English", value: "en" },
    { label: "Arabic", value: "ar" },
  ];

  const venuesList = venues?.map((venue: Venue) => ({
    label: (
      <div key={venue.id} className="flex items-center gap-2">
        <div className="bg-slate-400 w-[25px]">
          {venue.image && (
            <Image src={venue.image} alt="venue image" width={25} height={25} />
          )}
        </div>
        <p className="m-0">{venue?.title}</p>
      </div>
    ),
    value: venue.id,
  }));

  const categoriesList = categories?.map((category: any) => ({
    label: (
      <div key={category.id} className="flex items-center gap-2">
        <div className="bg-slate-400 w-[25px]">
          {category.image && (
            <Image
              src={category.image}
              alt="category image"
              width={25}
              height={25}
            />
          )}
        </div>
        <p className="m-0">{category?.title}</p>
      </div>
    ),
    value: category.id,
  }));

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
      type: "date",
      name: "start_date",
      label: "Start Date",
      placeholder: "Start Date",
      optional: false,
      required: true,
      disabled: false,
    },
    {
      type: "date",
      name: "end_date",
      label: "End Date",
      placeholder: "End Date",
      optional: false,
      required: true,
      disabled: false,
    },
    {
      type: "number",
      name: "houres",
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

  const populateFieldsFromAd = () => {
    if (!selectedAdId || !courseads) return;

    // Find the selected ad
    const ad = courseads.find((ad: any) => ad.id === selectedAdId);
    if (ad) {
      const populatedValues: Partial<CourseAdFormValues> = {
        code: "",
        title: {
          en: getFlexibleText(ad.title, "en"),
          ar: getFlexibleText(ad.title, "ar"),
        },
        sub_title: {
          en: getFlexibleText(ad.sub_title, "en"),
          ar: getFlexibleText(ad.sub_title, "ar"),
        },
        start_date: ad.start_date ? new Date(ad.start_date) : new Date(),
        end_date: ad.end_date ? new Date(ad.end_date) : null,
        fee: ad.fee ? ad.fee! : null,
        houres: ad.houres ? ad.houres : null,
        lang: ad.language ? ad.language : "",
        venue_id: ad.venue?.id ? ad.venue.id : null,
        category_id: ad.category?.id ? ad.category.id : null,
        status: ad.change_active_date ? "active" : "inactive",
        outlines: {
          en: getFlexibleText(ad.outlines, "en"),
          ar: getFlexibleText(ad.outlines, "ar"),
        },
        description: {
          en: getFlexibleText(ad.description, "en"),
          ar: getFlexibleText(ad.description, "ar"),
        },
      };

      // Update the selectedAd state
      setSelectedAd(populatedValues);

      // Manually set Formik values using the ref
      if (formikRef.current) {
        formikRef.current.setValues({
          ...formikRef.current.values,
          ...populatedValues,
        });
      }
    }
  };

  useEffect(() => {
    if (selectedAdId && courseads) {
      populateFieldsFromAd();
    }
  }, [selectedAdId, courseads]);

  const defaultValues: CourseAdFormValues = {
    title: { en: "", ar: "" },
    sub_title: { en: "", ar: "" },
    start_date: new Date(),
    end_date: new Date(),
    houres: null,
    fee: null,
    lang: "",
    image: null,
    venue_id: null,
    category_id: null,
    code: "",
    status: "inactive",
    outlines: { en: "", ar: "" },
    description: { en: "", ar: "" },
  };

  return (
    <Formik
      initialValues={initialValues || selectedAd || defaultValues}
      validationSchema={courseAdSchema}
      onSubmit={submitHandler}
      enableReinitialize
      innerRef={(instance) => {
        formikRef.current = instance;
      }}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <Tabs defaultValue="English" className="w-full">
            <div className="mt-4 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
              {op === "add" && (
                <div className="mb-11 flex flex-col justify-center gap-2 ">
                  <p className="font-[500] text-black max-w-lg">
                    Choose the course ad to fill the fields automatically:
                  </p>
                  <InputPicker
                    size="lg"
                    onSearch={(value: string) => setCourseadTerm(value)}
                    renderMenu={(menu) => {
                      if (dataLoading) {
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
                      courseads?.map((ad: any) => ({
                        label: getTranslatedText(ad.title),
                        value: ad.id,
                      })) || []
                    }
                    onChange={(value: number) => {
                      setSelectedAdId(value);
                    }}
                    placeholder="Course ads"
                    className="!text-[#000] !w-full"
                  />
                </div>
              )}

              <TabsList
                className={`grid md:w-[40%] my-4 grid-cols-2 ${
                  mode === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <TabsTrigger value="English">English</TabsTrigger>
                <TabsTrigger value="Arabic">Arabic</TabsTrigger>
              </TabsList>

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

                <TabsContent value="English" className="-my-[1px]">
                  <CustomInput
                    type="text"
                    name={`title.en`}
                    label={`Title Englsih`}
                    placeholder={`Enter title in english`}
                    required
                  />
                </TabsContent>
                <TabsContent value="English" className="-my-[1px]">
                  <CustomInput
                    type="text"
                    name={`sub_title.en`}
                    label={`Sub Title English`}
                    placeholder={`Enter sub title in english`}
                    optional
                  />
                </TabsContent>

                <TabsContent value="Arabic" className="-my-[1px]">
                  <CustomInput
                    type="text"
                    name={`title.ar`}
                    label={`Title Arabic`}
                    placeholder={`Enter title in arabic`}
                    required
                  />
                </TabsContent>
                <TabsContent value="Arabic" className="-my-[1px]">
                  <CustomInput
                    type="text"
                    name={`sub_title.ar`}
                    label={`Sub Title Arabic`}
                    placeholder={`Enter sub title in arabic`}
                    optional
                  />
                </TabsContent>

                <CustomInput
                  type="select"
                  selectData={statusData}
                  name="status"
                  label="Status"
                  optional
                  placeholder="Status"
                />
                <CustomInput
                  type="select"
                  selectData={langs}
                  name="lang"
                  label="Language"
                  required
                  placeholder="Language"
                />

                <div className="flex justify-start items-center">
                  <CustomInput
                    type="select"
                    selectData={venuesList}
                    selectLoading={dataLoading}
                    selectSearchable={true}
                    selectOnSearch={(value: string) => setVenueTerm(value)}
                    name="venue_id"
                    label="Venue"
                    required
                    placeholder="Venue"
                    disabled={onlineVenueChecked}
                  />
                  <Checkbox
                    className="!text-[#000]"
                    checked={onlineVenueChecked}
                    onChange={(value, checked) => {
                      if (checked) {
                        const onlineVenue = venues.find(
                          (venue: Venue) => venue.title === "online"
                        );
                        if (onlineVenue) {
                          props.setFieldValue("venue_id", onlineVenue.id);
                        } else {
                          props.setFieldValue("venue_id", -1);
                        }
                      } else {
                        props.setFieldValue("venue_id", null);
                      }
                      setOnlineVenueChecked(checked);
                    }}
                  >
                    online
                  </Checkbox>
                </div>

                <CustomInput
                  type="select"
                  selectData={categoriesList}
                  selectLoading={dataLoading}
                  selectSearchable={true}
                  selectOnSearch={(value: string) => setCategoryTerm(value)}
                  name="category_id"
                  label="Category"
                  required
                  placeholder="Category"
                />
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-2 my-6">
                <TabsContent value="English" className="space-y-4">
                  <TextEditor
                    name={`outlines.en`}
                    label={`Outlines English`}
                    required
                  />
                  <TextEditor
                    name={`description.en`}
                    label={`Description English`}
                    required
                  />
                </TabsContent>

                <TabsContent value="Arabic" className="space-y-4">
                  <TextEditor
                    name={`outlines.ar`}
                    label={`Outlines Arabic`}
                    required
                  />
                  <TextEditor
                    name={`description.ar`}
                    label={`Description Arabic`}
                    required
                  />
                </TabsContent>

                <ImageUploader formikProps={props} />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="colored-btn !w-full !text-[16px]"
                  disabled={operationLoading}
                >
                  {operationLoading ? (
                    <Loader />
                  ) : op === "add" ? (
                    "Add course ad"
                  ) : (
                    "Update course ad"
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

export default CourseAdOperation;
