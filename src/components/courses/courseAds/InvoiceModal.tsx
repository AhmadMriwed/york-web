import React, { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";

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
    name: "submitCourse",
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
    optional: false,
    required: true,
    disabled: false,
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
                  <div className="grid grid-cols-1 gap-y-2">
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
                </div>
                <div className="p-2">
                  <p className="font-bold mb-2">Invoice Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <CustomInput
                      type="text"
                      name="invoiceName"
                      label="Invoice Name"
                      required
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
                      selectData={[]}
                      name="currency"
                      label="Currency"
                      required
                      placeholder="Currency"
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
