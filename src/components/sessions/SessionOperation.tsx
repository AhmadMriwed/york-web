import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseSessionsByType,
  getSessionsTypes,
} from "@/store/adminstore/slices/sessions/sessionsActions";
import {
  sessionType,
  sessionTypeType,
} from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { calculateHours } from "@/utils/dateFuncs";
import { Form, Formik, FormikProps } from "formik";
import * as yup from "yup";
/* icons */
import { Close } from "@rsuite/icons";
import { LuFilePlus } from "react-icons/lu";
import { IoMdAttach } from "react-icons/io";
/* components */
import { InputPicker, Loader } from "rsuite";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import ImageUploader from "../inputs/image-uploader/ImageUploader";
import TextEditor from "../inputs/editor/Editor";

// Validation Schema
const sessionSchema = yup.object().shape({
  course_id: yup.number(),
  code: yup
    .string()
    .test("len", "Must be empty or exactly 6 characters", (val: any) => {
      if (val && val.length !== 6) {
        return false;
      }
      return true;
    }),
  title: yup.string().required("Title is required"),
  date_from: yup.date().required("Start date is required"),
  date_to: yup
    .date()
    .nullable()
    .test(
      "is-valid-end-date",
      "End date must be greater than start date",
      function (value) {
        const { date_from } = this.parent;
        if (value) return value > date_from;
        return true;
      }
    ),
  outline: yup.string().required("Outline is required"),
  description: yup.string().required("Description is required"),
  url: yup.string(),
  status: yup.string().nullable(),
  training_sessions_type: yup.number().nullable(),
  files: yup.array(),
  image: yup.mixed().nullable(),
});

const SessionOperation = ({
  initialValues,
  submitHandler,
  operationLoading,
  op,
  courseId,
}: any) => {
  const { sessionsTypes, allSessions, isLoading } = useSelector(
    (state: GlobalState) => {
      return state.sessions;
    }
  );
  const dispatch: any = useDispatch();

  const [fileNames, setFileNames] = useState<any[]>([]);

  // const [hours, setHours] = useState<number>(
  //   calculateHours(initialValues.date_from, initialValues.date_to)
  // );

  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<any>(null);

  const filesInput = useRef<HTMLInputElement>(null);

  // Type field data
  const sessionTypes = sessionsTypes.map((type: sessionTypeType) => ({
    label: type.name,
    value: type.id,
  }));
  // Status field data
  const sessionStatus = ["Active", "Pend", "Pass", "Finish"].map(
    (status: string) => ({
      label: status,
      value: status,
    })
  );
  // Sessions data
  const sessionsList = allSessions.map((s: sessionType) => ({
    label: s.title,
    value: s.id,
  }));

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

  useEffect(() => {
    dispatch(getCourseSessionsByType({ id: courseId, type: "All" }));
  }, [courseId, dispatch]);

  const populateFieldsFromSession = () => {
    if (!selectedSessionId || !allSessions) return;

    const session = allSessions.find(
      (session: sessionType) => session.id === selectedSessionId
    );

    if (session) {
      const populatedValues = {
        course_id: session.course_id ? session.course_id : null,
        code: "",
        title: session.title ? session.title : "",
        date_from: session.date_from ? session.date_from : null,
        date_to: session.date_to ? session.date_to : null,
        image: null,
        status: session.status ? session.status : null,
        outline: session.outline ? session.outline : "",
        description: session.description ? session.description : "",
        files: [],
        training_sessions_type:
          session.training_session_type && session.training_session_type.id
            ? session.training_session_type.id
            : 0,
        url: session.url ? session.url : "",
      };

      setSelectedSession({ ...populatedValues });
    }
  };

  useEffect(() => {
    populateFieldsFromSession();
  }, [selectedSessionId]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={sessionSchema}
      onSubmit={submitHandler}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <div className="mt-4 px-2 sm:px-20 lg:px-40 py-11 rounded-sm bg-light">
            {op === "add" && (
              <div className="mb-11 flex flex-col justify-center gap-2 ">
                <p className="font-[500] text-black max-w-lg">
                  Choose session to fill the fields :
                </p>
                <InputPicker
                  size="lg"
                  renderMenu={(menu) => {
                    if (isLoading) {
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
                  data={sessionsList}
                  onChange={(value: number) => {
                    let selectedsession: sessionType | undefined =
                      allSessions.find(
                        (session: sessionType) => session.id === value
                      );
                    setSelectedSessionId(selectedsession?.id);
                  }}
                  placeholder="Course sessions"
                  className="text-black w-full"
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-2">
              <CustomInput
                type="text"
                name="course_id"
                label="Course Id"
                required
                placeholder="Course Id"
                disabled
              />
              <CustomInput
                type="text"
                name="code"
                label="Code"
                optional
                placeholder="Code"
              />
              <CustomInput
                type="text"
                name="title"
                label="Title"
                required
                placeholder="Title"
                value={
                  selectedSession &&
                  selectedSession.title &&
                  selectedSession.title
                }
              />
              <CustomInput
                type="text"
                name="url"
                label="Url"
                optional
                placeholder="Url"
                value={
                  selectedSession && selectedSession.url && selectedSession.url
                }
              />

              <CustomInput
                type="select"
                selectData={sessionTypes}
                name="training_sessions_type"
                label="Type"
                optional
                placeholder="Type"
                value={
                  selectedSession &&
                  selectedSession.training_session_type &&
                  selectedSession.training_session_type.id &&
                  selectedSession.training_session_type.id
                }
              />
              <CustomInput
                type="select"
                selectData={sessionStatus}
                name="status"
                label="Status"
                optional
                placeholder="Status"
                value={
                  selectedSession &&
                  selectedSession.status &&
                  selectedSession.status
                }
              />

              <CustomInput
                type="date"
                name="date_from"
                label="Start date"
                required
                placeholder="Start date"
                value={
                  selectedSession &&
                  selectedSession.date_from &&
                  selectedSession.date_from
                }
              />
              <CustomInput
                type="date"
                name="date_to"
                label="End date"
                placeholder="End date"
                value={
                  selectedSession &&
                  selectedSession.date_to &&
                  selectedSession.date_to
                }
              />

              {/* <div
                className={`self-center text-center font-[500] ${
                  hours <= 0 || hours > 24 ? "text-red-700" : "text-green-700"
                }`}
              >
                {`hours : ${hours}`}
              </div> */}
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-2 my-6">
              <TextEditor
                name="outline"
                label="Outline"
                required
                value={
                  selectedSession &&
                  selectedSession.outline &&
                  selectedSession.outline
                }
              />
              <TextEditor
                name="description"
                label="Description"
                required
                value={
                  selectedSession &&
                  selectedSession.description &&
                  selectedSession.description
                }
              />
              <ImageUploader formikProps={props} />

              <div
                className="w-full mt-3 px-3 py-5 border-[1px] border-dashed border-black bg-transparent
      cursor-pointer flex justify-center items-center"
                onClick={() => filesInput.current && filesInput.current.click()}
              >
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
                <div className="w-full">
                  {fileNames.length === 0 && (
                    <div className="flex justify-center items-center">
                      <p className="text-[12px] text-black font-[500] flex items-center gap-2">
                        <LuFilePlus />
                        Click here to upload files (optional)
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col element-center gap-2">
                    {fileNames.length > 0 &&
                      fileNames.map((fileName: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center gap-2 w-full bg-slate-200 p-2 rounded-md"
                          >
                            <div className="flex items-center gap-1 overflow-hidden text-[12px] text-black">
                              <IoMdAttach
                                style={{
                                  color: "black",
                                  fontSize: "16px",
                                }}
                              />
                              <div
                                className="overflow-hidden"
                                style={{
                                  wordWrap: "break-word",
                                }}
                              >
                                {fileName}
                              </div>
                            </div>

                            <button
                              type="button"
                              className="p-3 rounded-full hover:bg-slate-100 transition:bg duration-200 flex justify-center items-center text-black"
                              onClick={() => handleFileRemove(props, index)}
                            >
                              <Close />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="colored-btn !w-full !text-[16px]">
              {operationLoading ? (
                <Loader />
              ) : (
                `${op === "update" ? "Update session" : "Add session"}`
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SessionOperation;
