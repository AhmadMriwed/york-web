import React, { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";

import { FaCameraRetro } from "react-icons/fa";

import { Modal, Uploader } from "rsuite";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/sessions/CustomInput";
import { LuImagePlus } from "react-icons/lu";
import { baseURL } from "@/utils/api";

// Validation Schema
const invoiceSchema = yup.object().shape({
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
  submitCourse: yup.string().required("Submit Course is Required"),
  status: yup.string().required("Status is Required"),
  location: yup.string().required("Location is Required"),
  outline: yup.string().required("Outline is Required"),
  description: yup.string(),
  price: yup.number().required("Price is Required"),
  currency: yup.string().required("Currency is Required"),
  invoiceName: yup.string().required("Invoice Name is Required"),
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
  submitCourse: "",
  status: "",
  location: "",
  outline: "",
  description: "",
  price: 0,
  currency: "dollar",
  invoiceName: "",
};

const submitHandler = (values: any) => {
  console.log(values);
};

const InvoiceModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: any;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

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
                  Emit invoice for request with id: #125548
                </p>
                <div className="p-2">
                  <p className="font-bold mb-2">Course Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
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
                      onChange={(value: string) =>
                        (props.values.subtitle = value)
                      }
                      formikErrors={props.errors.subtitle}
                      formikTouched={props.touched.subtitle}
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
                      type="text"
                      name="language"
                      label="Language"
                      required
                      placeholder="Language"
                      onChange={(value: string) =>
                        (props.values.language = value)
                      }
                      formikErrors={props.errors.language}
                      formikTouched={props.touched.language}
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
                      onChange={(value: string) =>
                        (props.values.category = value)
                      }
                      formikErrors={props.errors.category}
                      formikTouched={props.touched.category}
                    />
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
                      name="submitCourse"
                      label="Submit Course"
                      required
                      placeholder="Submit Course"
                      onChange={(value: string) =>
                        (props.values.submitCourse = value)
                      }
                      formikErrors={props.errors.submitCourse}
                      formikTouched={props.touched.submitCourse}
                    />
                    <CustomInput
                      type="select"
                      selectData={[]}
                      name="status"
                      label="Status"
                      required
                      placeholder="Status"
                      onChange={(value: string) =>
                        (props.values.status = value)
                      }
                      formikErrors={props.errors.status}
                      formikTouched={props.touched.status}
                    />
                    <CustomInput
                      type="text"
                      name="location"
                      label="Location"
                      required
                      placeholder="Location"
                      onChange={(value: string) =>
                        (props.values.location = value)
                      }
                      formikErrors={props.errors.location}
                      formikTouched={props.touched.location}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2">
                    <CustomInput
                      type="textarea"
                      textAreaRows={2}
                      name="outline"
                      label="Outline"
                      required
                      placeholder="Outline"
                      onChange={(value: string) =>
                        (props.values.outline = value)
                      }
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
                      onChange={(value: string) =>
                        (props.values.description = value)
                      }
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
                </div>
                <div className="p-2">
                  <p className="font-bold mb-2">Invoice Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <CustomInput
                      type="number"
                      name="price"
                      label="Price"
                      required
                      placeholder="Price"
                      onChange={(value: number) => (props.values.price = value)}
                      formikErrors={props.errors.price}
                      formikTouched={props.touched.price}
                    />
                    <CustomInput
                      type="select"
                      selectData={[]}
                      name="currency"
                      label="Currency"
                      required
                      placeholder="Currency"
                      onChange={(value: string) =>
                        (props.values.currency = value)
                      }
                      formikErrors={props.errors.currency}
                      formikTouched={props.touched.currency}
                    />
                    <CustomInput
                      type="text"
                      name="invoiceName"
                      label="Invoice Name"
                      required
                      placeholder="Invoice Name"
                      onChange={(value: string) =>
                        (props.values.invoiceName = value)
                      }
                      formikErrors={props.errors.invoiceName}
                      formikTouched={props.touched.invoiceName}
                    />
                  </div>
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
                <button
                  type="submit"
                  className="colored-btn"
                  onClick={() => console.log(props.values)}
                >
                  Emit Invoice
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
