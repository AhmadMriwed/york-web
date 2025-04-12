"use client";
import React, { useContext, useState } from "react";
import { Button, Dropdown, Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "../Pars/CustomInput";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { exportFile } from "@/store/adminstore/slices/enums/venuesSlice";
import { getImportExportEndpoint } from "./getEndpoint";
import { toast } from "sonner";

interface ModalType {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected_ids?: number[];
}

export default function ExportFile({ open, setOpen, selected_ids }: ModalType) {
  const pathname = usePathname();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [format, setFormat] = useState("");
  const dispatch: any = useDispatch();

  const endpoint = getImportExportEndpoint(pathname, "export");

  const submitHandler = (values: any, actions: any) => {
    if (!values.format) {
      toast.error("Please select a file format");
      return;
    }

    if (!selected_ids?.length && (!values.from || !values.to)) {
      toast.error("Please either select items or specify a range");
      return;
    }

    dispatch(
      exportFile({
        url: endpoint,
        selected_ids: selected_ids?.length ? selected_ids : undefined,
        from: selected_ids?.length ? undefined : values.from,
        to: selected_ids?.length ? undefined : values.to,
        fileName: values.fileName,
        format: values.format,
      })
    ).then((action: any) => {
      if (exportFile.fulfilled.match(action)) {
        toast.success("File exported successfully");
        setOpen(false);
        actions.resetForm();
      }
    });
  };

  const validationSchema = yup.object().shape({
    fileName: yup.string().required("File Name is required"),
    format: yup.string().required("Format is required"),
    from: yup.number().when("selected_ids", (selected_ids, schema) => {
      return !selected_ids || selected_ids.length === 0
        ? schema.required("From is required when no items are selected")
        : schema.notRequired();
    }),
    to: yup.number().when("selected_ids", (selected_ids, schema) => {
      return !selected_ids || selected_ids.length === 0
        ? schema
            .required("To is required when no items are selected")
            .min(yup.ref("from"), "'To' must be >= 'From'")
        : schema.notRequired();
    }),
  });

  const formats = [
    { label: "Excel", value: "xlsx" },
    { label: "CSV", value: "csv" },
    { label: "PDF", value: "pdf" },
    { label: "Word", value: "docx" },
  ];

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => {
        setOpen(false);
        setFormat("");
      }}
      size="md"
      className={`rounded-[17px] border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
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
            format: "",
            from: "",
            to: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {(props) => (
            <Form>
              <CustomInput
                label="File Name"
                name="fileName"
                type="text"
                placeholder="Enter the file name"
              />

              <label className="block pl-[5px] text-[#888] mb-1">
                Format :
              </label>
              <Dropdown
                title={format || "Select The Format"}
                className={`w-full bg-white text-black text-bla rounded-[6px] border-[#c1c1c1] mb-[10px] `}
                block
              >
                {formats.map((type) => (
                  <Dropdown.Item
                    key={type.value}
                    onClick={() => {
                      setFormat(type.label);
                      props.setFieldValue("format", type.value);
                    }}
                  >
                    {type.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
              {props.errors.format && props.touched.format && (
                <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                  {props.errors.format}
                </div>
              )}

              {selected_ids && selected_ids.length > 0 ? (
                <div className="mt-1 ms-2 mb-4">
                  <p>Exporting {selected_ids.length} selected items</p>
                  <p className="text-sm text-gray-700">
                    IDs: [{selected_ids.join(", ")}]
                  </p>
                </div>
              ) : (
                <div className="flex gap-4">
                  <CustomInput
                    label="From ID"
                    name="from"
                    type="number"
                    min={1}
                    placeholder="Start ID"
                    className="flex-1 p-2 rounded-md text-gray-700"
                  />
                  <CustomInput
                    label="To ID"
                    name="to"
                    type="number"
                    min={props.values.from || 1}
                    placeholder="End ID"
                    className="flex-1 p-2 rounded-md text-gray-700"
                  />
                </div>
              )}

              <Modal.Footer className="mt-2 pr-1">
                <Button
                  onClick={() => {
                    setOpen(false);
                    setFormat("");
                  }}
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
