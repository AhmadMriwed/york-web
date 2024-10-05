"use client";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputPicker, Progress, Uploader } from "rsuite";
import { Input } from "rsuite";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../pars/ThemeContext";
import Cookie from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import {
  createReplay,
  createRequest,
  getAllUsers,
} from "@/store/adminstore/slices/mailbox/mailboxSlice";
import { getRequestTypesAsMenue } from "@/store/adminstore/slices/enums/requestTypesSlice";
import {
  resetUploadedFiles,
  uploadFile,
} from "@/store/adminstore/slices/mailbox/fileSlice";
import Image from "next/image";
import { baseURL, storageURL } from "@/utils/api";
import { FileType } from "rsuite/esm/Uploader";
const newRequestSchema = yup.object().shape({
  recived_id: yup.string().required("Send To is Required"),
  request_type_id: yup.string().required("Request Type is Required"),
  title: yup.string().required("Title is Required"),
  sub_title: yup.string(),
  file_ids: yup.array().of(yup.number()),
});

export default function NewEmailRequest({
  role,
  replayData,
}: {
  role: "reply" | "request";
  replayData?: {
    requestId: string;
    requestType: string;
    sendTo: string;
  };
}) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();
  const [keyWord, setKeyWord] = useState("");
  const cookie = new Cookie();

  const {
    isLoading,
    error: usersError,
    loadingUsers,
    users,
  } = useSelector((state: GlobalState) => state.mailbox);

  const {
    isLoading: isUploadingFile,
    error: filesError,
    uploadedFiles,
    uploadPercent,
  } = useSelector((state: GlobalState) => state.files);

  console.log("error", filesError);

  const {
    isLoading: loadingRequests,
    error: requestsError,
    requestTypesAsMenue,
  } = useSelector((state: GlobalState) => state.requestTypes);

  console.log("users", users);

  const submithandler = (values: any, actions: any) => {
    if (role === "request") {
      let data = {
        ...values,
        file_ids: uploadedFiles.map((file) => file.id),
      };
      console.log("data", data);
      dispatch(createRequest(data));
    } else if (role === "reply") {
      let data = {
        request_id: replayData?.requestId,
        title: values.title,
        sub_title: values.sub_title,
        file_ids: values.file_ids,
      };
      console.log("data", data);
      dispatch(createReplay(data));
    }
  };

  useEffect(() => {
    dispatch(getRequestTypesAsMenue());
    dispatch(resetUploadedFiles());
  }, [dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(keyWord, "kksaj");
      dispatch(getAllUsers(keyWord));
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, keyWord]);

  return (
    <Formik
      initialValues={{
        recived_id: "",
        request_type_id: role === "request" ? "" : replayData?.requestId,
        title: "",
        sub_title: "",
        file_ids: [] as any[],
      }}
      validationSchema={newRequestSchema}
      onSubmit={submithandler}
    >
      {(props) => {
        if (role === "reply") {
          props.values.recived_id = "jhon sina";
          props.values.request_type_id = "request";
        }
        return (
          <Form className="flex justify-between flex-wrap gap-2 flex-col lg:flex-row ">
            <div className="flex-1">
              <div
                className={`mt-7 max-w-[700px] py-[30px] pe-[15px] sm:pe-[70px] ps-[15px] rounded-[10px] min-h-[312px] ${
                  mode === "dark"
                    ? "bg-[#212A34] text-white"
                    : "bg-light text-[#656565]"
                }`}
              >
                <div
                  className={`flex gap-x-3 ${
                    role === "request"
                      ? "sm:items-center flex-col sm:flex-row"
                      : "flex-row"
                  } mb-[12px]`}
                >
                  <label className=" pl-[5px] text-[#888] mb-1 w-[100px]">
                    Send to :{" "}
                  </label>
                  {role === "request" && (
                    <InputPicker
                      // loading={loadingUsers}
                      data={users}
                      block
                      placeholder="Send To"
                      name="recived_id"
                      className="flex-1 border border-[#c1c1c1] outline-none text-black cursor-pointer"
                      onChange={(value: string) => {
                        props.values.recived_id = value;
                      }}
                      searchBy={() => {
                        return true;
                      }}
                      onSearch={(searchKeyword: string, event) => {
                        setKeyWord(searchKeyword);
                      }}
                      renderMenuItem={(label, item) => {
                        return (
                          <div className="flex items-center gap-3 pb-4 border-b border-b-[#ccc] ">
                            <div className="min-w-[30px]">
                              {item.image !== null &&
                              item.image.startsWith("http") ? (
                                <Image
                                  src={item.image}
                                  alt="user photo"
                                  width={30}
                                  height={30}
                                  className="rounded-[50%]"
                                />
                              ) : (
                                <Image
                                  src={storageURL + item.image}
                                  alt="user photo"
                                  width={30}
                                  height={30}
                                  className="rounded-[50%]"
                                />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold flex justify-between items-center min-w-[220px]">
                                <p className="m-0 text-black ">{label}</p>
                                <p className="m-0  text-[var(--primary-color1)]">
                                  {item.type}
                                </p>
                              </div>
                              <p className="m-0 text-[#777]">{item.email}</p>
                            </div>
                          </div>
                        );
                      }}
                    />
                  )}

                  {role === "reply" && (
                    <p className=" mb-1 capitalize text-[var(--primary-color1)] text-[17px] font-bold">
                      {replayData?.sendTo}
                    </p>
                  )}
                </div>
                {props.errors.recived_id && props.touched.recived_id && (
                  <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                    {props.errors.recived_id}
                  </div>
                )}
                <div
                  className={`flex gap-x-3 ${
                    role === "request"
                      ? "sm:items-center flex-col sm:flex-row"
                      : "flex-row"
                  } mb-[12px]`}
                >
                  <label className=" pl-[5px] text-[#888] mb-1 w-[100px]">
                    Request Type :
                  </label>
                  {role === "request" && (
                    <InputPicker
                      loading={loadingRequests}
                      data={requestTypesAsMenue}
                      block
                      placeholder="Select The Request Type"
                      name="request_type_id"
                      className="flex-1 border border-[#c1c1c1] outline-none text-black cursor-pointer"
                      onChange={(value: string) =>
                        (props.values.request_type_id = value)
                      }
                    />
                  )}
                  {role === "reply" && (
                    <p className=" mb-1 capitalize text-[var(--primary-color1)] text-[17px] font-bold">
                      {replayData?.requestType}
                    </p>
                  )}
                </div>
                {props.errors.request_type_id &&
                  props.touched.request_type_id && (
                    <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                      {props.errors.request_type_id}
                    </div>
                  )}

                <div className="flex gap-x-3 sm:items-center flex-col sm:flex-row mb-[12px]">
                  <label className="pl-[5px] text-[#888] mb-1 min-w-[100px]">
                    Title :{" "}
                  </label>
                  <Input
                    placeholder="Email Title"
                    name="title"
                    className="flex-1 border border-[#c1c1c1] outline-none text-black"
                    onChange={(value: string) => (props.values.title = value)}
                  />
                </div>
                {props.errors.title && props.touched.title && (
                  <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                    {props.errors.title}
                  </div>
                )}
                <div className="flex gap-x-3 sm:items-center flex-col sm:flex-row mb-[12px]">
                  <label className="pl-[5px] text-[#888] mb-1 min-w-[100px]">
                    Description :
                  </label>

                  <Input
                    as="textarea"
                    rows={4}
                    placeholder="Description"
                    name="sub_title"
                    className="flex-1 border border-[#c1c1c1] outline-none text-black"
                    onChange={(value: string) =>
                      (props.values.sub_title = value)
                    }
                  />
                </div>
                {props.errors.sub_title && props.touched.sub_title && (
                  <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                    {props.errors.sub_title}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="element-center gap-7 py-2 px-3 mt-3 rounded-[4px] text-[18px] text-white bg-[var(--primary-color1)] !block w-full max-w-[700px] lg:mx-0 hover:bg-[var(--primary-color2)] transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Sending ..." : "Send"}
              </button>
            </div>

            <Uploader
              action={baseURL + "mailBox/request/uploadFile"}
              draggable
              listType="picture-text"
              className={`text-black max-h-min  mt-7 lg:w-[300px] py-[30px] px-[15px] rounded-[10px]  lg:mx-0 relative bg-light`}
              headers={{
                Authorization: `Bearer ${cookie.get("admin_token")}`,
              }}
              multiple={true}
              onSuccess={(response, file) => {
                console.log("response", response);
                console.log("response file", file);
              }}
              renderFileInfo={(file: FileType) => {
                const extension = file.name?.slice(
                  file.name.lastIndexOf(".") + 1
                );

                console.log("file:", file);
                return (
                  file.name && (
                    <span>
                      {file.name.length > 12
                        ? file.name?.slice(0, 12) + "...   " + "." + extension
                        : file.name}
                    </span>
                  )
                );
              }}
            >
              <div
                style={{
                  height: "252px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--light)",
                  borderColor: "white",
                }}
              >
                <span>Click or Drag files to this area to upload</span>
              </div>
            </Uploader>
          </Form>
        );
      }}
    </Formik>
  );
}

// <div
// className={`text-black h-[312px] mt-7 lg:w-[300px] pb-[30px] px-[15px] rounded-[10px] overflow-y-auto lg:mx-0 relative bg-light`}
// >
// <div className="sticky top-0 bg-inherit">
//    <button
//       type="button"
//       onClick={() => hiddenFileInput.current.click()}
//       className="block mx-auto py-[10px]  px-[30px] w-[50%] bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)] transition-all duration-200 text-white rounded-[0px_0px_10px_10px]"
//    >
//       Send File
//    </button>
// </div>
// <Input
//    placeholder="add a cause for the status"
//    name="file_ids"
//    type="file"
//    multiple
//    onChange={(value, e: any) => uploadFileHandler(e)}
//    className="hidden"
//    ref={hiddenFileInput}
//    style={{ display: "none" }}
// />
// <div>
//    {uploadedFiles.length > 0 &&
//       uploadedFiles.map((file, index: number) => {
//          return (
//             <div
//                key={index}
//                className="flex items-center justify-between gap-3 mt-3 overflow-x-auto pb-3 border-b border-[#bb9be6]"
//             >
//                <div className="flex items-center gap-3 p-1 ">
//                   <div className="min-w-5 min-h-5 rounded-[50%] bg-[#bb9be6] element-center">
//                      <IoMdAttach
//                         style={{
//                            color: "white",
//                            fontSize: "16px",
//                         }}
//                      />
//                   </div>{" "}
//                   <p>{file.name}</p>
//                </div>
//                <div
//                   onClick={() =>
//                      dispatch(deleteFile(file.id))
//                   }
//                   className="min-w-7 min-h-7 rounded-[50%] bg-red-500 element-center cursor-pointer"
//                >
//                   <RiDeleteBinLine
//                      style={{
//                         color: "white",
//                         fontSize: "20px",
//                      }}
//                   />
//                </div>
//             </div>
//          );
//       })}

//    {!isUploadingFile && uploadedFiles.length === 0 && (
//       <div className="pt-[100px] text-center text-[20px]">
//          There is no file chosen
//       </div>
//    )}
// </div>{" "}
// {isUploadingFile && (
//    <div className="absolute left-0 bottom-0 w-full bg-inherit element-center">
//       <Progress.Line
//          percent={uploadPercent}
//          strokeColor={
//             uploadPercent === 100 ? "#52c41a" : "#3385ff"
//          }
//          status={
//             filesError
//                ? "fail"
//                : uploadPercent === 100
//                ? "success"
//                : "active"
//          }
//       />
//    </div>
// )}
// </div>
