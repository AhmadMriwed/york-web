"use client";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Input, InputPicker, DatePicker } from "rsuite";
import { Trash } from "@rsuite/icons";
import { IoMdAttach } from "react-icons/io";
import Image from "next/image";
import InputContainer from "@/components/sessions/InputContainer";
import Header from "@/components/sessions/Header";
import NewSessionModal from "@/components/sessions/NewSessionModal";

const newSessionSchema = yup.object().shape({
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  title: yup.string().required("Title is Required"),
  dateFrom: yup
    .date()
    .required("Start Date is Required")
    .min(new Date(), "Please enter a valid Start Date"),
  dateEnd: yup
    .date()
    .required("End Date is Required")
    .test(
      "is-valid-end-date",
      "End Date must be between Start Date and a maximum of one day after the Start Date",
      function (value) {
        const { dateFrom } = this.parent;
        const maxEndDate = new Date(dateFrom);
        maxEndDate.setDate(maxEndDate.getDate() + 1);

        return value >= dateFrom && value <= maxEndDate;
      }
    ),
  outline: yup.string().required("Outline is Required"),
  description: yup.string().required("Description is Required"),
  url: yup.string(),
  status: yup.string(),
  training_sessions_type: yup.string(),
  files: yup.array(),
});

const submithandler = (values: any) => {
  const data = { ...values };
  // Submission functionality
  console.log(data);
};

// Caculating the number of hours between Start Date and End Date
const calculateHours = (dateFrom: any, dateEnd: any) => {
  if (dateFrom && dateEnd) {
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateEnd);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const durationInHours = timeDifference / (1000 * 60 * 60);
    return Math.round(durationInHours);
  }
  return 0;
};

// DATA FOR Status and Type inputs
const sessionStatus = ["Active", "Deactive"].map((item) => ({
  label: item,
  value: item,
}));
const sessionTypes = ["type 1", "type 2"].map((item) => ({
  label: item,
  value: item,
}));

const AddNewSession = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fileNames, setFileNames] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState<any>(null);

  const imageInput = useRef<HTMLInputElement>(null);
  const filesInput = useRef<HTMLInputElement>(null);

  const handleImageRemove = (props: any) => {
    setUploadedImage(null);
    props.setFieldValue("image", null);
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  const handleFileRemove = (props: any, indexToRemove: number) => {
    const updatedFiles = props.values.files.filter(
      (file: any, index: number) => index !== indexToRemove
    );

    const updatedFileNames = fileNames.filter(
      (name: string, index: number) => index !== indexToRemove
    );

    props.setFieldValue("files", updatedFiles);
    setFileNames(updatedFileNames);
  };

  return (
    <Formik
      initialValues={{
        code: "",
        title: "",
        dateFrom: null,
        dateEnd: null,
        hours: 0,
        image: null,
        status: "",
        outline: "",
        description: "",
        files: [],
        training_sessions_type: "",
        url: "",
      }}
      validationSchema={newSessionSchema}
      onSubmit={submithandler}
    >
      {(props) => (
        <div className="px-2 pt-2 lg:px-14 lg:pt-4">
          <Header
            title="Add New Session"
            description="Add a new session manually or fill from a previous one"
          />
          <div className="my-6 flex flex-col items-start gap-4 lg:flex-row lg:justify-between lg:items-center">
            <p className="text-[14px] lg:text-[18px]">
              Do you want to fill in information from previous sessions?
            </p>
            <div>
              <button
                type="button"
                className="colored-btn"
                style={{ margin: "0" }}
                onClick={() => setModalOpen(true)}
              >
                Select Session
              </button>
            </div>
          </div>
          {/* FORM FIELD */}
          <Form className="flex flex-col md:flex-row justify-between items center">
            <NewSessionModal
              mode={mode}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              formikProps={props}
              submithandler={submithandler}
            />
            <div
              className={`mt-7 w-[100%] sm:w-[75%] md:w-[50%] p-[15px] sm:p-[30px]
              rounded-[10px] ${mode === "dark" ? "bg-light" : "bg-white"}`}
            >
              {/* CODE */}
              <InputContainer name="code" label="Code" optional>
                <Input
                  id="code"
                  name="code"
                  placeholder="Code"
                  onChange={(value: any) => (props.values.code = value)}
                />
                {props.errors.code && props.touched.code && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.code}
                  </div>
                )}
              </InputContainer>
              {/* TITLE */}
              <InputContainer name="title" label="Title" required>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  onChange={(value: any) => (props.values.title = value)}
                />
                {props.errors.title && props.touched.title && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.title}
                  </div>
                )}
              </InputContainer>
              {/* DATE FROM */}
              <InputContainer name="dateFrom" label="Start Date" required>
                <DatePicker
                  format="dd MMM yyyy hh:mm aa"
                  id="dateFrom"
                  name="dateFrom"
                  placeholder="Start Date"
                  style={{ width: "100%", border: "none", color: "#000" }}
                  onChange={(value: any) => {
                    props.values.dateFrom = value;
                    props.values.hours = calculateHours(
                      props.values.dateFrom,
                      props.values.dateEnd
                    );
                  }}
                />
                {props.errors.dateFrom && props.touched.dateFrom && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.dateFrom}
                  </div>
                )}
              </InputContainer>
              {/* DATE END */}
              <InputContainer name="dateEnd" label="End Date" required>
                <DatePicker
                  format="dd MMM yyyy hh:mm aa"
                  id="dateEnd"
                  name="dateEnd"
                  placeholder="End Date"
                  style={{ width: "100%", border: "none" }}
                  onChange={(value: any) => {
                    props.values.dateEnd = value;
                    props.values.hours = calculateHours(
                      props.values.dateFrom,
                      props.values.dateEnd
                    );
                  }}
                />
                {props.errors.dateEnd && props.touched.dateEnd && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.dateEnd}
                  </div>
                )}
              </InputContainer>
              {/* OUTLINE */}
              <InputContainer name="outline" label="Outline" required>
                <Input
                  as="textarea"
                  rows={3}
                  id="outline"
                  name="outline"
                  placeholder="Outline"
                  onChange={(value: any) => (props.values.outline = value)}
                />
                {props.errors.outline && props.touched.outline && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.outline}
                  </div>
                )}
              </InputContainer>
              {/* DESCRIPTION */}
              <InputContainer name="description" label="Description" required>
                <Input
                  as="textarea"
                  rows={3}
                  id="description"
                  name="description"
                  placeholder="Description"
                  onChange={(value: any) => (props.values.description = value)}
                />
                {props.errors.description && props.touched.description && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.description}
                  </div>
                )}
              </InputContainer>
              {/* URL */}
              <InputContainer name="url" label="Url" optional>
                <Input
                  id="url"
                  name="url"
                  placeholder="Url"
                  onChange={(value: any) => (props.values.url = value)}
                />
                {props.errors.url && props.touched.url && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.url}
                  </div>
                )}
              </InputContainer>
              {/* STATUS */}
              <InputContainer name="status" label="Status" optional>
                <InputPicker
                  data={sessionStatus}
                  id="status"
                  name="status"
                  placeholder="Status"
                  className="w-full"
                  onChange={(value: any) => (props.values.status = value)}
                />
                {props.errors.status && props.touched.status && (
                  <div className="text-red-600 ml-[3px] mt-[3px]">
                    {props.errors.status}
                  </div>
                )}
              </InputContainer>
              {/* TYPES */}
              <InputContainer
                name="training_sessions_type"
                label="Type"
                optional
              >
                <InputPicker
                  data={sessionTypes}
                  id="training_sessions_type"
                  name="training_sessions_type"
                  placeholder="Type"
                  className="w-full"
                  onChange={(value: string) =>
                    (props.values.training_sessions_type = value)
                  }
                />
                {props.errors.training_sessions_type &&
                  props.touched.training_sessions_type && (
                    <div className="text-red-600">
                      {props.errors.training_sessions_type}
                    </div>
                  )}
              </InputContainer>
              {/* ADD BUTTON */}
              <button
                type="submit"
                className="element-center py-2 px-3 mt-8 rounded-[4px] text-[18px] text-white
                bg-[var(--primary-color1)] !block w-full max-w-[700px] lg:mx-0 hover:bg-[var(--primary-color2)]
                transition-all duration-300"
              >
                Add Session
              </button>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 order-[-1] md:order-[1]">
              {/* IMAGE */}
              <div
                className={`text-black h-[312px] mt-7 lg:w-[300px] pb-[30px] px-[15px] rounded-[10px] overflow-y-auto
                lg:mx-0  ${mode === "dark" ? "bg-light" : "bg-white"}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    imageInput.current && imageInput.current.click();
                  }}
                  className="block mx-auto py-[10px] px-[30px] w-[50%] bg-[var(--primary-color1)]
                  hover:bg-[var(--primary-color2)] transition-all duration-200 text-white rounded-[0px_0px_10px_10px]"
                >
                  Send Image (optional)
                </button>
                <input
                  type="file"
                  onChange={(event) => {
                    if (
                      imageInput.current &&
                      imageInput.current.files &&
                      imageInput.current.files.length > 0
                    ) {
                      const file = imageInput.current.files[0];
                      props.setFieldValue("image", file);

                      if (event.target.files && event.target.files[0])
                        setUploadedImage(
                          URL.createObjectURL(event.target.files[0])
                        );
                    }
                  }}
                  ref={imageInput}
                  style={{ display: "none" }}
                />
                <div className="flex justify-center items-center">
                  {uploadedImage && (
                    <div className="pt-6 flex flex-col gap-2">
                      <Image
                        src={uploadedImage}
                        alt="Uploaded Image"
                        width={200}
                        height={200}
                      />
                      <button
                        type="button"
                        className="px-2 py-1 flex gap-1 items-center self-center rounded-full
                        border border-[var(--primary-color1)] text-[var(--primary-color1)]"
                        onClick={() => handleImageRemove(props)}
                      >
                        <Trash /> Remove
                      </button>
                    </div>
                  )}
                  {!uploadedImage && (
                    <div className="pt-[100px] text-center text-[20px]">
                      There is no image chosen
                    </div>
                  )}
                </div>
              </div>
              {/* FILES */}
              <div
                className={`text-black h-[312px] mt-7 lg:w-[300px] pb-[30px] px-[15px] rounded-[10px] overflow-y-auto lg:mx-0  ${
                  mode === "dark" ? "bg-light" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    filesInput.current && filesInput.current.click();
                  }}
                  className="block mx-auto py-[10px] px-[30px] w-[50%] bg-[var(--primary-color1)]
                  hover:bg-[var(--primary-color2)] transition-all duration-200 text-white rounded-[0px_0px_10px_10px]"
                >
                  Send Files (optional)
                </button>
                <input
                  type="file"
                  multiple
                  onChange={(event: any) => {
                    const files: any = Array.from(event.target.files);
                    const names = files.map((file: any) => file.name);

                    props.setFieldValue("files", [
                      ...props.values.files,
                      ...files,
                    ]);
                    setFileNames((prev: any) => [...prev, names]);
                  }}
                  ref={filesInput}
                  style={{ display: "none" }}
                />
                <div>
                  {fileNames.length > 0 &&
                    fileNames.map((fileName: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 mt-3"
                        >
                          <div className="min-w-5 min-h-5 rounded-[50%] bg-[#bb9be6] element-center">
                            <IoMdAttach
                              style={{
                                color: "white",
                                fontSize: "16px",
                              }}
                            />
                          </div>
                          {fileName}
                          <button
                            type="button"
                            className="rounded-full flex justidy-center items-center p-1
                        border border-[var(--primary-color1)] text-[var(--primary-color1)]"
                            onClick={() => handleFileRemove(props, index)}
                          >
                            <Trash />
                          </button>
                        </div>
                      );
                    })}
                  {fileNames.length === 0 && (
                    <div className="pt-[100px] text-center text-[20px]">
                      There is no file chosen
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AddNewSession;
