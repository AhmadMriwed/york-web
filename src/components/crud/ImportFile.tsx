import { useContext } from "react";
import { Button, Input, Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { importFile } from "@/store/adminstore/slices/enums/venuesSlice";
import { getImportExportEndpoint } from "./getEndpoint";

interface ModalType {
  open: boolean;
  setOpen: any;
}

export default function ImportFile({ open, setOpen }: ModalType) {
  const pathname = usePathname();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();

  const validationSchema = yup.object().shape({
    file: yup
      .mixed()
      .required("File is required")
      .test(
        "fileFormat",
        "Unsupported Format. Please upload an Excel file (.xls, .xlsx)",
        (value: any) => {
          if (!value) return false;

          const supportedExtensions = ["xls", "xlsx"];
          const extension = value.name.split(".").pop().toLowerCase();
          return supportedExtensions.includes(extension);
        }
      ),
  });

  const submitHandler = (values: any, actions: any) => {
    const formData = new FormData();  
    formData.append("file", values.file);

    const endpoint = getImportExportEndpoint(pathname, "import");

    dispatch(importFile({ data: formData, url: endpoint }))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((error: any) => {
        console.error("Import failed:", error);
      });
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
        className={`${mode === "dark" ? "text-light" : "text-dark"} px-3 mb-3`}
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
                  const file = e.target.files[0];
                  if (file) {
                    props.setFieldValue("file", file);
                  }
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
