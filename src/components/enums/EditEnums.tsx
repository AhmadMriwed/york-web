import { useContext, useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "../Pars/CustomInput";
import Loading from "../Pars/Loading";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { getSingleEnum } from "@/store/adminstore/slices/enums/singleEnumSlice";
import Image from "next/image";
import { storageURL } from "@/utils/api";
import { CiEdit } from "react-icons/ci";

interface ModalType {
  open: boolean;
  setOpen: any;
  requestType: string;
  formFields: {
    name: string;
    label: string;
    type: string;
    validation: any;
    placeholder: string;
  }[];
  initialValues: any;
  onSubmit: any;
  isLoading: boolean;
  url: string;
  id: number;
  loadingContent?: string;
}

export default function EditEnums({
  open,
  setOpen,
  requestType,
  formFields,
  initialValues,
  onSubmit,
  isLoading,
  url,
  id,
  loadingContent,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [showImage, setShowImage] = useState(true);
  const [description, setDescription] = useState<string>("");
  const previewRef: any = useRef();
  const hiddenFileInput: any = useRef(null);

  // Define validation schema
  const validationSchema = yup.object().shape(
    formFields.reduce((accumulator: any, field) => {
      accumulator[field.name] = field.validation;
      return accumulator;
    }, {})
  );

  const { error, singleEnum = initialValues } = useSelector(
    (state: GlobalState) => state.singleEnum
  );
  const dispatch: any = useDispatch();
  console.log("singleEnum", singleEnum);

  const handleImageUpload = () => {
    const file = hiddenFileInput.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        previewRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setShowImage(false);
    }
  };

  useEffect(() => {
    if (open) {
      setShowImage(true);
      dispatch(getSingleEnum(url + id));
      console.log("url:", url + id);
    }
  }, [dispatch, url, id, open]);

  useEffect(() => {
    if (singleEnum.description) {
      setDescription(singleEnum.description);
    }
  }, [singleEnum.description]);

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
          {requestType}
        </Modal.Title>
      </Modal.Header>

      {isLoading ? (
        <Loading content={loadingContent && loadingContent} />
      ) : (
        <Modal.Body
          className={`${
            mode === "dark" ? "text-light" : "text-dark"
          } px-3 mb-3`}
        >
          <Formik
            initialValues={singleEnum}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values, singleEnum)}
            enableReinitialize={true}
          >
            {(props) => {
              return (
                <Form className="">
                  {formFields.map((field) => {
                    return field.type === "textarea" ? (
                      <div key={field.name}>
                        <label className="block pl-[5px] text-[#888] mb-1">
                          {field.label}
                        </label>
                        <Input
                          key={field.name}
                          as="textarea"
                          rows={3}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={description}
                          onChange={(value) => {
                            props.setFieldValue([field.name].toString(), value);
                            setDescription(value);
                          }}
                          className="mb-[10px]"
                        />
                        {props.errors[field.name] &&
                          props.touched[field.name] && (
                            <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                              {`${props.errors[field.name]}`}
                            </div>
                          )}
                      </div>
                    ) : field.type === "file" ? (
                      <div key={field.name}>
                        <label className="block pl-[5px] text-[#888] mb-1">
                          {field.label}
                        </label>
                        {props.values.image ? (
                          <div className="p-2 relative w-fit">
                            {showImage ? (
                              <Image
                                src={
                                  props.values[field.name].startsWith("http")
                                    ? props.values[field.name]
                                    : storageURL + props.values[field.name]
                                }
                                alt="Enum image"
                                width={120}
                                height={120}
                              />
                            ) : (
                              <Image
                                src={""}
                                alt=""
                                width={120}
                                height={120}
                                ref={previewRef}
                              />
                            )}

                            <CiEdit
                              style={{
                                position: "absolute",
                                top: 0,
                                right: "-25px",
                                cursor: "pointer",
                                fontSize: "22px",
                              }}
                              onClick={() => hiddenFileInput.current.click()}
                            />
                          </div>
                        ) : (
                          <div className="flex gap-3 m-2 items-center">
                            <p>No Image Available</p>
                            <button
                              onClick={() => hiddenFileInput.current.click()}
                              type="button"
                              className="text-[var(--primary-color1)] hover:text-[var(--primary-color2)] text-[24px]"
                            >
                              +
                            </button>
                          </div>
                        )}

                        <Input
                          placeholder="Enter an image"
                          name={field.name}
                          type="file"
                          onChange={(value, e: any) => {
                            console.log(e, value);
                            handleImageUpload();

                            props.setFieldValue(
                              [field.name].toString(),
                              e.target.files[0]
                            );
                          }}
                          accept="image/*"
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                        />
                      </div>
                    ) : (
                      <CustomInput
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    );
                  })}

                  <Modal.Footer className="mt-4 pr-1 element-center">
                    <Button
                      type="submit"
                      appearance="primary"
                      className="bg-btnColor hover:bg-btnColorHover w-[65px]"
                    >
                      Edit
                    </Button>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      )}
    </Modal>
  );
}
