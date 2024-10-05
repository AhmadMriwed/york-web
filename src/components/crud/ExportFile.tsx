import React, { useContext, useState } from "react";
import { Button, Checkbox, Dropdown, Input, Modal } from "rsuite";
import { ThemeContext } from "../pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "../pars/CustomInput";
import { useDispatch } from "react-redux";

interface ModalType {
  open: boolean;
  setOpen: any;
  ids?: number[];
}

export default function ExportFile({ open, setOpen, ids }: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [fileType, setFileType] = useState("");
  const dispatch: any = useDispatch();

  const submitHandler = (values: any, actions: any) => {
    console.log("submitted");
    console.log(values);
    if (ids) {
    }
    // dispatch();
  };

  const validationSchema = yup.object().shape({
    fileName: yup.string().required("File Name is required"),
    checkAll: yup.boolean(),
    ids: yup.number(),
    from: yup.number().when("$checkAll", (checkAll, schema) => {
      return checkAll[0]
        ? schema
        : yup.number().required("Inital ID is required");
    }),
    to: yup.number().when("$checkAll", (checkAll, schema) => {
      console.log("check all", checkAll[0]);
      return checkAll[0]
        ? yup.number()
        : yup.number().required("Last ID List is required");
    }),
    fileType: yup.string().required("File Type is required"),
  });

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
          Export File
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`${mode === "dark" ? "text-light" : "text-dark"} px-3 mb-3`}
      >
        <Formik
          initialValues={{
            fileName: "",
            fileType: "",
            from: ids ? 0 : "",
            checkAll: false,
            to: ids ? 0 : "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {(props) => (
            <Form className="">
              <CustomInput
                label="File Name"
                name="fileName"
                type="text"
                placeholder="Enter the file name"
              />

              <label className="block pl-[5px] text-[#888] mb-1">
                File Type :
              </label>

              <Dropdown
                title={fileType ? fileType : "Select The File Type"}
                name="status"
                className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                block
              >
                <Dropdown.Item
                  onClick={() => {
                    setFileType("Word");
                    props.values.fileType = "word";
                  }}
                >
                  Word
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFileType("PDF");
                    props.values.fileType = "pdf";
                  }}
                >
                  PDF
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFileType("Excel");
                    props.values.fileType = "excel";
                  }}
                >
                  Excel
                </Dropdown.Item>
              </Dropdown>
              {props.errors.fileType && props.touched.fileType && (
                <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                  {props.errors.fileType}
                </div>
              )}

              {ids ? (
                <div className="mt-1 ms-2">
                  <p>your selected IDs : </p>
                  <p className="mb-2">[{ids.join(",")}]</p>
                </div>
              ) : (
                <>
                  <CustomInput
                    label="From :"
                    name="from"
                    type="number"
                    placeholder="Enter the inital ID"
                  />
                  <CustomInput
                    label="To :"
                    name="to"
                    type="number"
                    placeholder="Enter the lsat ID"
                  />
                </>
              )}

              <div className="flex items-center gap-2 mt-4 ms-1">
                <Input
                  placeholder="Enter a file"
                  name="checkAll"
                  type="checkbox"
                  onChange={(value, e: any) => {
                    console.log(e);
                    console.log("caheckall", value);
                    props.setFieldValue("checkAll", e.target.checked);
                  }}
                  className="w-fit"
                />
                <label className="pl-[5px] text-[#888] mb-1">
                  Select all IDs
                </label>
              </div>

              <Modal.Footer className="mt-2 pr-1">
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
                  Export
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
