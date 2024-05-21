import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
import {
  getCategories,
  getCourseads,
  getVenues,
} from "@/store/endUser/endUserSlice";
import { courseAdType } from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import { InputPicker, Loader } from "rsuite";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import ImageUploader from "@/components/inputs/image-uploader/ImageUploader";
import Image from "next/image";

// Validation Schema
const courseAdSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  sub_title: yup.string(),
  start_date: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Please enter a valid start date"),
  end_date: yup
    .date()
    .required("End date is required")
    .test(
      "is-valid-end-date",
      "End date must be greater than start date",
      function (value) {
        const { start_date } = this.parent;

        return value > start_date;
      }
    ),
  houres: yup.number().required("Hours is required"),
  fee: yup.number().required("Fee is required"),
  lang: yup.string().required("Language is required"),
  image: yup.mixed().nullable(),
  venue_id: yup.string().required("Venue is required"),
  category_id: yup.string().required("Category is required"),
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  status: yup.string(),
  outlines: yup.string().required("Outlines is required"),
  description: yup.string().required("Description is required"),
});

const CourseAdOperation = ({
  initialValues,
  submitHandler,
  operationLoading,
  op,
}: any) => {
  const [venueTerm, setVenueTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [courseadTerm, setCourseadTerm] = useState("");

  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [selectedAdId, setSelectedAdId] = useState<any>(null);

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

  let statusData = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];
  let langs = [
    { label: "English", value: "en" },
    { label: "Arabic", value: "ar" },
  ];

  let venuesList: any, categoriesList: any;
  if (categories && venues) {
    venuesList = venues.map((venue: any) => ({
      label: (
        <div key={venue.id} className="flex items-center gap-2">
          <div className="bg-slate-400 w-[25px]">
            {venue.image && (
              <Image
                src={venue.image}
                alt="venue image"
                width={25}
                height={25}
              />
            )}
          </div>
          <p className="m-0">{venue?.title}</p>
        </div>
      ),
      value: venue.id,
    }));
    categoriesList = categories.map((category: any) => ({
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
  }

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
      name: "sub_title",
      label: "Sub Title",
      placeholder: "Sub Title",
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

    const ad = courseads.find((ad: any) => ad.id === selectedAdId);

    if (ad) {
      const populatedValues = {
        code: "",
        title: ad.title ? ad.title : "",
        sub_title: ad.sub_title ? ad.sub_title : "",
        start_date: ad.start_date ? new Date(ad.start_date) : new Date(),
        end_date: ad.end_date ? new Date(ad.end_date) : new Date(),
        fee: ad.fee ? ad.fee : null,
        houres: ad.houres ? ad.houres : null,
        lang: ad.language ? ad.language : "",
        venue_id: ad.venue.id ? ad.venue.id : null,
        category_id: ad.category.id ? ad.category.id : null,
        status: ad.change_active_date ? "active" : "inactive",
        outlines: ad.outlines ? ad.outlines : "",
        description: ad.description ? ad.description : "",
      };

      setSelectedAd({ ...populatedValues });
    }
  };

  useEffect(() => {
    populateFieldsFromAd();
  }, [selectedAdId]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={courseAdSchema}
      onSubmit={submitHandler}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <div className="mt-4 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
            {op === "add" && (
              <div className="mb-11 flex flex-col justify-center gap-2 ">
                <p className="font-[500] text-black max-w-lg">
                  Choose the course ad to fill the fields automatically :
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
                  data={courseads.map((ad: any) => ({
                    label: ad.title,
                    value: ad.id,
                  }))}
                  onChange={(value: number) => {
                    let selectedAd: courseAdType | undefined = courseads.find(
                      (ad: courseAdType) => ad.id === value
                    );
                    setSelectedAdId(selectedAd?.id);
                  }}
                  placeholder="Course ads"
                  className="!text-[#000] !w-full"
                />
              </div>
            )}
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
                  value={
                    selectedAd &&
                    selectedAd[field.name] &&
                    selectedAd[field.name]
                  }
                />
              ))}

              <CustomInput
                type="select"
                selectData={statusData}
                name="status"
                label="Status"
                optional
                placeholder="Status"
                value={selectedAd && selectedAd?.status && selectedAd?.status}
              />
              <CustomInput
                type="select"
                selectData={langs}
                name="lang"
                label="Language"
                required
                placeholder="Language"
                value={selectedAd && selectedAd?.lang && selectedAd?.lang}
              />
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
                value={
                  selectedAd && selectedAd?.venue_id && selectedAd?.venue_id
                }
              />
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
                value={
                  selectedAd &&
                  selectedAd?.category_id &&
                  selectedAd?.category_id
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-2 my-6">
              <CustomInput
                type="textarea"
                textAreaRows={2}
                name="outlines"
                label="Outlines"
                required
                placeholder="Outlines"
                value={
                  selectedAd && selectedAd?.outlines && selectedAd?.outlines
                }
              />
              <CustomInput
                type="textarea"
                textAreaRows={2}
                name="description"
                label="Description"
                required
                placeholder="Description"
                value={
                  selectedAd &&
                  selectedAd?.description &&
                  selectedAd?.description
                }
              />
              <ImageUploader formikProps={props} />
            </div>
            <div className="mt-7">
              <button
                type="submit"
                className="colored-btn !w-full !text-[16px]"
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
        </Form>
      )}
    </Formik>
  );
};

export default CourseAdOperation;
