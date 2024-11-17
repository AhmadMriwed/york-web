import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { createInvoice } from "@/store/adminstore/slices/courses/submit-courses/submitCoursesSlice";
import { getUTCDate } from "@/utils/dateFuncs";
import {
  submitCourseType,
  Venue,
} from "@/types/adminTypes/courses/coursesTypes";
import { GlobalState } from "@/types/storeTypes";
import { ArrowDownLine, ArrowUpLine } from "@rsuite/icons";
import { Checkbox, Loader, Modal } from "rsuite";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import Image from "next/image";
import ImageUploader from "../inputs/image-uploader/ImageUploader";
import TextEditor from "../inputs/editor/Editor";

// Validation Schema
const invoiceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  sub_title: yup.string().required("Subtitle is required"),
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
  lang: yup.string().required("Language is reqiured"),
  image: yup.mixed().nullable(),
  venue_id: yup.number(),
  category_id: yup.number(),
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  submit_courses_id: yup.string().required("Submit course is required"),
  status: yup.string().required("Status is required"),
  location: yup.string().required("Location is required"),
  outlines: yup.string().required("Outline is required"),
  description: yup.string(),
  price: yup.number().required("Price is required"),
  currencies_id: yup.number().required("Currency is required"),
  invoice_name: yup.string(),
});

const InvoiceModal = ({
  modalOpen,
  setModalOpen,
  submitInfo,
}: {
  modalOpen?: boolean;
  setModalOpen: any;
  submitInfo?: submitCourseType;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [expand, setExpand] = useState(false);
  const [onlineVenueChecked, setOnlineVenueChecked] = useState(false);

  const { isLoading, venues, categories, currencies } = useSelector(
    (state: GlobalState) => state.endUser
  );
  const { operationLoading } = useSelector(
    (state: GlobalState) => state.submitCourses
  );

  const dispatch = useDispatch<any>();

  const statusData = [
    { label: "Pending", value: "Pending" },
    { label: "Rejected", value: "Rejected" },
    { label: "Accepted", value: "Accepted" },
  ];

  const venuesList = venues.map((venue: any) => ({
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
  const categoriesList = categories.map((category: any) => ({
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
  const currenciesList = currencies.map((currency: any) => ({
    label: (
      <div key={currency.id} className="flex items-center gap-2">
        <div className="bg-slate-400 w-[25px]">
          {currency.image && (
            <Image
              src={currency.image}
              alt="currency image"
              width={25}
              height={25}
            />
          )}
        </div>
        <p className="m-0">{currency?.currency}</p>
      </div>
    ),
    value: currency.id,
  }));

  const submitHandler = (values: any) => {
    const data: any = {
      ...values,
      start_date: getUTCDate(values.start_date),
      end_date: getUTCDate(values.end_date),
    };

    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === "") {
        delete data[key];
      }
    });

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    dispatch(createInvoice(formData));
  };

  const initialValues = {
    title: submitInfo?.title ? submitInfo.title : "",
    sub_title: "",
    start_date: submitInfo?.start_date
      ? new Date(submitInfo.start_date)
      : new Date(),
    end_date: submitInfo?.end_date ? new Date(submitInfo.end_date) : new Date(),
    houres: submitInfo?.hours ? submitInfo.hours : null,
    fee: submitInfo?.fee ? submitInfo.fee : null,
    lang: submitInfo?.language
      ? submitInfo.language === "English"
        ? "en"
        : "ar"
      : "",
    image: null,
    venue_id:
      submitInfo?.venue && submitInfo?.venue?.id ? submitInfo.venue.id : null,
    category_id:
      submitInfo?.category && submitInfo?.category?.id
        ? submitInfo.category.id
        : null,
    code: "",
    course_ads_id: submitInfo?.course_ad_id,
    submit_courses_id: submitInfo?.id,
    status: submitInfo?.status ? submitInfo.status : "",
    location: "",
    outlines: "",
    description: submitInfo?.description ? submitInfo.description : "",
    price: null,
    currencies_id: 1,
    invoice_name: "course invoice",
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
      name: "course_ads_id",
      label: "Course Ad Id",
      placeholder: "Course Ad Id",
      optional: false,
      required: true,
      disabled: true,
    },
    {
      type: "text",
      name: "submit_courses_id",
      label: "Submit Course",
      placeholder: "Submit Course",
      optional: false,
      required: true,
      disabled: true,
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
      optional: false,
      required: true,
      disabled: false,
    },
    {
      type: "text",
      name: "location",
      label: "Location",
      placeholder: "Location",
      optional: false,
      required: true,
      disabled: onlineVenueChecked,
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

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      size="lg"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-[var(--dark-bg-color)] [&>div>*]:text-[var(--dark-text-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--light-text-color)]"
      }`}
    >
      <Modal.Header className="flex items-center mt-1">
        <Modal.Title
          className={`${
            mode === "dark"
              ? "text-[var(--light-color)]"
              : "text-[var(--dark-color)]"
          }`}
          onClick={() => console.log(submitInfo)}
        >
          Create Invoice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <Formik
          initialValues={initialValues}
          validationSchema={invoiceSchema}
          onSubmit={submitHandler}
        >
          {(props) => (
            <Form className="flex flex-col">
              <div className="bg-light text-dark py-1 px-1 sm:px-3 rounded-sm">
                <p className="text-center text-[16px] py-1">
                  {`Create invoice for request with id: #${
                    submitInfo?.id && submitInfo.id
                  }`}
                </p>
                <div className="p-2">
                  <p className="font-bold mb-2">Invoice Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <CustomInput
                      type="text"
                      name="invoice_name"
                      label="Invoice Name"
                      disabled
                      placeholder="Invoice Name"
                    />
                    <CustomInput
                      type="number"
                      name="price"
                      label="Price"
                      required
                      placeholder="Price"
                    />
                    <CustomInput
                      type="select"
                      selectData={currenciesList}
                      selectLoading={isLoading}
                      selectSearchable
                      name="currencies_id"
                      label="Currency"
                      required
                      placeholder="Currency"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <p className="font-bold mb-2">Course Info</p>
                  <div className="grid grid-cols-1 gap-y-1">
                    <CustomInput
                      type="select"
                      selectData={[
                        { label: "English", value: "en" },
                        { label: "Arabic", value: "ar" },
                      ]}
                      name="lang"
                      label="Language"
                      required
                      placeholder="Language"
                    />
                    <TextEditor name="outlines" label="Outline" required />
                    <TextEditor
                      name="description"
                      label="Description"
                      optional
                    />
                    <ImageUploader formikProps={props} />
                  </div>

                  <div
                    className="my-7 element-center"
                    onClick={() => setExpand(!expand)}
                  >
                    <button
                      type="button"
                      className="gap-2 text-[14px] font-[500] element-center text-[var(--primary-color1)]"
                    >
                      <p>Show More Advance</p>
                      {expand ? <ArrowUpLine /> : <ArrowDownLine />}
                    </button>
                  </div>
                  {expand && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
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
                        selectData={statusData}
                        name="status"
                        label="Status"
                        required
                        placeholder="Status"
                      />
                      <div className="flex justify-start items-center">
                        <CustomInput
                          type="select"
                          selectData={venuesList}
                          selectLoading={isLoading}
                          selectSearchable
                          name="venue_id"
                          label="Venue"
                          optional
                          placeholder="Venue"
                          disabled={onlineVenueChecked}
                        />
                        <Checkbox
                          className="!text-[#000]"
                          onChange={(value, checked) => {
                            if (checked) {
                              const onlineVenue = venues.find(
                                (venue: Venue) => venue.title === "online"
                              );
                              if (onlineVenue) {
                                props.values.venue_id = onlineVenue.id;
                              } else {
                                props.values.venue_id = -1;
                              }
                              setOnlineVenueChecked(true);
                              console.log();
                            } else {
                              props.values.venue_id = null;
                              setOnlineVenueChecked(false);
                            }
                          }}
                        >
                          online
                        </Checkbox>
                      </div>
                      <CustomInput
                        type="select"
                        selectData={categoriesList}
                        selectSearchable
                        selectLoading={isLoading}
                        name="category_id"
                        label="Category"
                        optional
                        placeholder="Category"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 m-2 self-end">
                <button
                  type="button"
                  className="outlined-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="colored-btn">
                  {operationLoading ? <Loader /> : "Create Invoice"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceModal;
