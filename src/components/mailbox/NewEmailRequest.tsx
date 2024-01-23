"use client";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputPicker } from "rsuite";
import { Input } from "rsuite";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { IoMdAttach } from "react-icons/io";

const newRequestSchema = yup.object().shape({
   sendTo: yup.string().required("Send To is Required"),
   requestType: yup.string().required("Request Type is Required"),
   title: yup.string().required("Title is Required"),
   description: yup.string(),

   files: yup.array().of(
      yup
         .mixed()
         .required("Required")
         .test(
            "fileSize",
            "File size must not exceed 5MB",
            (value: any) => value && value.size <= 5242880
         )
   ),
});

const submithandler = (values: any, actions: any) => {
   const data = { ...values };
   console.log(values);
   console.log("email");
};

const data = [
   "Eugenia",
   "Bryan",
   "Linda",
   "Nancy",
   "Lloyd",
   "Alice",
   "Julia",
   "Albert",
].map((item) => ({ label: item, value: item }));

export default function NewEmailRequest({
   role,
}: {
   role: "reply" | "request";
}) {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const hiddenFileInput: any = useRef(null);
   const [fileNames, setFileNames] = useState<any[]>([]);

   const handleChange = (event: any) => {
      const files: any = Array.from(event.target.files);
      const names = files.map((file: any) => file.name);
      console.log("clicked");

      setFileNames((prev: any) => [...prev, names]);
   };

   return (
      <Formik
         initialValues={{
            sendTo: "",
            requestType: "",
            title: "",
            description: "",
            files: [],
         }}
         validationSchema={newRequestSchema}
         onSubmit={submithandler}
      >
         {(props) => {
            if (role === "reply") {
               props.values.sendTo = "jhon sina";
               props.values.requestType = "request";
            }
            return (
               <Form className="flex justify-between flex-wrap gap-2 flex-col lg:flex-row ">
                  <div className="flex-1">
                     <div
                        className={`mt-7 max-w-[700px] py-[30px] pe-[15px] sm:pe-[70px] ps-[15px] rounded-[10px] ${
                           mode === "dark" ? "bg-light" : "bg-white"
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
                                 data={data}
                                 block
                                 placeholder="Send to"
                                 name="sendTo"
                                 className="flex-1 border border-[#c1c1c1] outline-none text-black"
                                 onChange={(value: string) =>
                                    (props.values.sendTo = value)
                                 }
                              />
                           )}

                           {role === "reply" && (
                              <p className=" mb-1 capitalize text-[var(--primary-color1)] text-[17px] font-bold">
                                 {props.values.sendTo}
                              </p>
                           )}
                        </div>
                        {props.errors.sendTo && props.touched.sendTo && (
                           <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                              {props.errors.sendTo}
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
                                 data={data}
                                 block
                                 placeholder="Send to"
                                 name="requestType"
                                 className="flex-1 border border-[#c1c1c1] outline-none text-black"
                                 onChange={(value: string) =>
                                    (props.values.requestType = value)
                                 }
                              />
                           )}
                           {role === "reply" && (
                              <p className=" mb-1 capitalize text-[var(--primary-color1)] text-[17px] font-bold">
                                 {props.values.requestType}
                              </p>
                           )}
                        </div>
                        {props.errors.requestType &&
                           props.touched.requestType && (
                              <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                                 {props.errors.requestType}
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
                              onChange={(value: string) =>
                                 (props.values.title = value)
                              }
                           />
                        </div>
                        {props.errors.title && props.touched.title && (
                           <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                              {props.errors.title}
                           </div>
                        )}
                        <div className="flex gap-x-3 sm:items-center flex-col sm:flex-row mb-[12px]">
                           <label className="pl-[5px] text-[#888] mb-1 min-w-[100px]">
                              Description
                           </label>

                           <Input
                              as="textarea"
                              rows={4}
                              placeholder="Description"
                              name="description"
                              className="flex-1 border border-[#c1c1c1] outline-none text-black"
                              onChange={(value: string) =>
                                 (props.values.description = value)
                              }
                           />
                        </div>
                        {props.errors.description &&
                           props.touched.description && (
                              <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                                 {props.errors.description}
                              </div>
                           )}
                     </div>

                     <button
                        type="submit"
                        className="element-center gap-7 py-2 px-3 mt-3 rounded-[4px] text-[18px] text-white bg-[var(--primary-color1)] !block w-full max-w-[700px] lg:mx-0 hover:bg-[var(--primary-color2)] transition-all duration-300"
                     >
                        Send
                     </button>
                  </div>
                  <div
                     className={`text-black h-[312px] mt-7 lg:w-[300px] pb-[30px] px-[15px] rounded-[10px] overflow-y-auto lg:mx-0  ${
                        mode === "dark" ? "bg-light" : "bg-white"
                     }`}
                  >
                     <button
                        type="button"
                        onClick={() => hiddenFileInput.current.click()}
                        className="block mx-auto py-[10px] px-[30px] w-[50%] bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)] transition-all duration-200 text-white rounded-[0px_0px_10px_10px]"
                     >
                        Send File
                     </button>
                     <input
                        type="file"
                        multiple
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                     />
                     <div>
                        {fileNames.length > 0 &&
                           fileNames.map((fileName: any, index: number) => {
                              return (
                                 <div
                                    key={index}
                                    className="flex items-center gap-3 mt-3 overflow-x-auto"
                                 >
                                    <div className="min-w-5 min-h-5 rounded-[50%] bg-[#bb9be6] element-center">
                                       <IoMdAttach
                                          style={{
                                             color: "white",
                                             fontSize: "16px",
                                          }}
                                       />
                                    </div>{" "}
                                    {fileName}
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
               </Form>
            );
         }}
      </Formik>
   );
}
