import { useContext } from "react";
import { Button, Input, Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";

interface ModalType {
   open: boolean;
   setOpen: any;
}

export default function ImportFile({ open, setOpen }: ModalType) {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const validationSchema = yup.object().shape({
      file: yup
         .mixed()
         .required("the file is required")
         .test(
            "fileFormat",
            "Unsupported Format , the type must be only Excel types",
            (value: any) => {
               const SUPPORTED_FORMATS = [
                  "xls",
                  "xlsx",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  "application/vnd.openxmlformats-officedocument",
               ];

               return (
                  value &&
                  SUPPORTED_FORMATS.includes(value.name.split(".").pop())
               );
            }
         ),
   });

   const submitHandler = (values: any, actions: any) => {
      console.log("submitted");
      console.log(values);
      // dispatch();
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
         formData.append(key, values[key]);
      });
      console.log(formData);
   };

   return (
      <Modal
         backdrop={true}
         open={open}
         onClose={() => setOpen(false)}
         size="md"
         className={`rounded-[17px]  border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
            mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
         }`}
      >
         <Modal.Header closeButton={true}>
            <Modal.Title
               className={`text-center ${
                  mode === "dark" ? "text-light" : "text-dark"
               } font-bold`}
            >
               Import File
            </Modal.Title>
         </Modal.Header>
         <Modal.Body
            className={`${
               mode === "dark" ? "text-light" : "text-dark"
            } px-3 mb-3`}
         >
            <p className="mb-[20px] text-[20px]">Enter a File (Excel File)</p>

            <Formik
               initialValues={{
                  file: "",
               }}
               validationSchema={validationSchema}
               onSubmit={submitHandler}
            >
               {(props) => (
                  <Form className="">
                     <label className="block pl-[5px] text-[#888] mb-2">
                        Enter a File :
                     </label>

                     <Input
                        placeholder="Enter a file"
                        name="file"
                        type="file"
                        onChange={(value, e: any) => {
                           props.setFieldValue("file", e.target.files[0]);
                        }}
                        accept=".xls, .xlsx"
                     />

                     {props.errors.file && props.touched.file && (
                        <div className="pl-[5px] ml-[110px] mb-[12px] mt-2 text-red-600">
                           {props.errors.file}
                        </div>
                     )}

                     <Modal.Footer className="mt-9 pr-1">
                        <Button
                           onClick={() => setOpen(false)}
                           appearance="subtle"
                           className="bg-red-500 text-white hover:bg-red-400 hover:text-white"
                        >
                           Cancel
                        </Button>
                        <Button
                           type="submit"
                           appearance="primary"
                           className="bg-btnColor hover:!bg-btnColorHover w-[100px]"
                        >
                           Import
                        </Button>
                     </Modal.Footer>
                  </Form>
               )}
            </Formik>
         </Modal.Body>
      </Modal>
   );
}

{
   /* <Uploader
action={baseURL + "mailBox/request/uploadFile"}
accept=".xls, .xlsx ,.pub"
draggable
listType="picture-text"
className={`py-[10px] px-[15px] rounded-[10px] `}
headers={{
   Authorization: `Bearer 2|Ny4IIA3LqYFV7KudK2v7yAIx8OhxkdmozKL52Hx49c973274`,
}}
multiple={true}
onSuccess={(response, file) => {
   console.log("response", response);
}}
>
<div
   style={{
      height: "52px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#01989f",
      borderColor: "white",
      borderStyle: "solid",
      borderRadius: "10px",
      cursor: "pointer",
   }}
>
   <span className="text-white">
      Click or Drag files to this area to upload
   </span>
</div>
</Uploader> */
}
