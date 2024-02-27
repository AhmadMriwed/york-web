import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessionsTypes } from "@/store/adminstore/slices/sessions/sessionsActions";
import { calculateHours } from "@/utils/dateFuncs";
import { sessionTypeType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
/* icons */
import { Trash } from "@rsuite/icons";
import { IoMdAttach } from "react-icons/io";
/* components */
import Image from "next/image";
import CustomInput from "@/components/sessions/CustomInput";
import { Loader } from "rsuite";

// Validation Schema
const sessionSchema = yup.object().shape({
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  title: yup.string().required("Title is Required"),
  date_from: yup
    .date()
    .required("Start Date is Required")
    .min(new Date(), "Please enter a valid Start Date"),
  date_to: yup
    .date()
    .required("End Date is Required")
    .test(
      "is-valid-end-date",
      "End Date must be greater than Start Date and a maximum of one day after the Start Date",
      function (value) {
        const { date_from } = this.parent;
        const maxEndDate = new Date(date_from);
        maxEndDate.setDate(maxEndDate.getDate() + 1);

        return value > date_from && value <= maxEndDate;
      }
    ),
  outline: yup.string().required("Outline is Required"),
  description: yup.string().required("Description is Required"),
  url: yup.string(),
  status: yup.string(),
  training_sessions_type: yup.number(),
  files: yup.array(),
  image: yup
    .mixed()
    .nullable()
    .test("is-image", "Please upload a valid image", (value) => {
      if (!value) {
        return true;
      }
      return value instanceof File && value.type.startsWith("image/");
    }),
});

const SessionOperation = ({
  initialValues,
  submitHandler,
  operationLoading,
  op,
}: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const { sessionsTypes } = useSelector((state: GlobalState) => {
    return state.sessions;
  });
  const dispatch: any = useDispatch();

  const [fileNames, setFileNames] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [hours, setHours] = useState<number>(
    calculateHours(initialValues.date_from, initialValues.date_to)
  );

  const imageInput = useRef<HTMLInputElement>(null);
  const filesInput = useRef<HTMLInputElement>(null);

  // Type field data
  const sessionTypes = sessionsTypes.map((type: sessionTypeType) => ({
    label: type.name,
    value: type.id,
  }));
  // Status field data
  const sessionStatus = ["Active", "Inactive"].map((status: string) => ({
    label: status,
    value: status,
  }));

  const handleImageRemove = (props: any) => {
    setUploadedImage(null);
    props.values.image = null;
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
    props.values.files = updatedFiles;
    setFileNames(updatedFileNames);
  };

  useEffect(() => {
    dispatch(getSessionsTypes());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={sessionSchema}
      onSubmit={submitHandler}
    >
      {(props) => (
        <Form className="flex flex-col md:flex-row justify-between items center">
          <div
            className={`my-7 w-[100%] sm:w-[75%] md:w-[50%] p-[15px] sm:p-[30px]
              rounded-[10px] ${mode === "dark" ? "bg-light" : "bg-white"}`}
          >
            {/* CODE */}
            <CustomInput
              type="text"
              name="code"
              label="Code"
              optional
              placeholder="Code"
              value={props.values.code}
              onChange={(value: any) => (props.values.code = value)}
              formikErrors={props.errors.code}
              formikTouched={props.touched.code}
            />
            {/* TITLE */}
            <CustomInput
              type="text"
              name="title"
              label="Title"
              required
              placeholder="Title"
              value={props.values.title}
              onChange={(value: any) => (props.values.title = value)}
              formikErrors={props.errors.title}
              formikTouched={props.touched.title}
            />
            {/* DATE FROM */}
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
                  setHours(
                    calculateHours(props.values.date_from, props.values.date_to)
                  );
                } else {
                  props.values.date_from = null;
                  setHours(0);
                }
              }}
              formikErrors={props.errors.date_from}
              formikTouched={props.touched.date_from}
            />
            <div
              className={`text-end font-bold ${
                hours <= 0 || hours > 24 ? "text-red-600" : "text-green-600"
              }`}
            >{`hours: ${hours}`}</div>
            {/* DATE TO */}
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
                  setHours(
                    calculateHours(props.values.date_from, props.values.date_to)
                  );
                } else {
                  props.values.date_to = null;
                  setHours(0);
                }
              }}
              formikErrors={props.errors.date_to}
              formikTouched={props.touched.date_to}
            />
            {/* TYPES */}
            <CustomInput
              type="select"
              selectData={sessionTypes}
              name="training_sessions_type"
              label="Type"
              optional
              placeholder="Type"
              value={props.values.type}
              onChange={(value: any) =>
                (props.values.training_sessions_type = value)
              }
              formikErrors={props.errors.training_sessions_type}
              formikTouched={props.touched.training_sessions_type}
            />
            {/* STATUS */}
            <CustomInput
              type="select"
              selectData={sessionStatus}
              name="status"
              label="Status"
              optional
              placeholder="Status"
              value={props.values.status}
              onChange={(value: any) => (props.values.status = value)}
              formikErrors={props.errors.status}
              formikTouched={props.touched.status}
            />
            {/* OUTLINE */}
            <CustomInput
              type="textarea"
              name="outline"
              label="Outline"
              required
              placeholder="Outline"
              value={props.values.outline}
              onChange={(value: any) => (props.values.outline = value)}
              formikErrors={props.errors.outline}
              formikTouched={props.touched.outline}
            />
            {/* DESCRIPTION */}
            <CustomInput
              type="textarea"
              name="description"
              label="Description"
              required
              placeholder="Description"
              value={props.values.description}
              onChange={(value: any) => (props.values.description = value)}
              formikErrors={props.errors.description}
              formikTouched={props.touched.description}
            />
            {/* URL */}
            <CustomInput
              type="text"
              name="url"
              label="Url"
              optional
              placeholder="Url"
              value={props.values.url}
              onChange={(value: any) => (props.values.url = value)}
              formikErrors={props.errors.url}
              formikTouched={props.touched.url}
            />
            {/* ADD BUTTON */}
            <button
              type="submit"
              className="py-2 mt-6 rounded-[8px] text-[18px] text-white
                bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)]
                transition-all duration-300 w-full flex justify-center items-center"
            >
              {operationLoading ? (
                <Loader />
              ) : (
                `${op === "update" ? "Update Session" : "Add Session"}`
              )}
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
                name="image"
                onChange={(event) => {
                  if (
                    imageInput.current &&
                    imageInput.current.files &&
                    imageInput.current.files.length > 0
                  ) {
                    const file = imageInput.current.files[0];
                    props.setFieldValue("image", file);

                    if (
                      event.target.files &&
                      event.target.files[0] &&
                      event.target.files[0].type.startsWith("image/")
                    )
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
                  <div className="pt-[100px] text-center text-[18px]">
                    {props.errors.image && props.touched.image ? (
                      <p className="text-red-600">{`${props.errors.image}`}</p>
                    ) : (
                      <p>There is no image chosen</p>
                    )}
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
                name="files"
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
                      <div key={index} className="flex items-center gap-3 mt-3">
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
                  <div className="pt-[100px] text-center text-[18px]">
                    There is no file chosen
                  </div>
                )}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SessionOperation;
