"use client";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputPicker } from "rsuite";
import { Input } from "rsuite";
import { useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";

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

export default function NewEmailRequest() {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

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
         {(props) => (
            <Form
               className={`mt-7 max-w-[700px] py-[30px] pe-[15px] sm:pe-[70px] ps-[15px] rounded-[10px] ${
                  mode === "dark" ? "bg-light" : "bg-white"
               }`}
            >
               <div className="flex gap-x-3 sm:items-center flex-col sm:flex-row mb-[12px]">
                  <label className=" pl-[5px] text-[#888] mb-1 w-[100px]">
                     Send to :{" "}
                  </label>
                  <InputPicker
                     data={data}
                     block
                     placeholder="Send to"
                     name="sendTo"
                     className="flex-1 border border-[#c1c1c1] outline-none text-black"
                     onChange={(value: string) => (props.values.sendTo = value)}
                  />
               </div>
               {props.errors.sendTo && props.touched.sendTo && (
                  <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                     {props.errors.sendTo}
                  </div>
               )}
               <div className="flex gap-x-3 sm:items-center flex-col sm:flex-row mb-[12px]">
                  <label className=" pl-[5px] text-[#888] mb-1 w-[100px]">
                     Request Type :
                  </label>
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
               </div>
               {props.errors.requestType && props.touched.requestType && (
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
               {props.errors.description && props.touched.description && (
                  <div className="pl-[5px] ml-[110px] mb-[12px] text-red-600">
                     {props.errors.description}
                  </div>
               )}

               <input
                  type="file"
                  name="files"
                  multiple
                  onChange={(event: any) =>
                     props.setFieldValue("files", event.target.value)
                  }
               />
               {props.touched.files && props.errors.files && (
                  <div>{props.errors.files}</div>
               )}

               <button
                  type="submit"
                  className="element-center gap-7 py-2 px-3 w-[150px] rounded-[4px] text-[18px] text-white bg-[var(--primary-color1)]"
               >
                  Send
               </button>
            </Form>
         )}
      </Formik>
   );
}
