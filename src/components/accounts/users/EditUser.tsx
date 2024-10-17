import { useContext, useEffect, useRef, useState } from "react";
import { Button, Dropdown, Input, Modal } from "rsuite";
import { Form, Formik } from "formik";
import * as yup from "yup";
// import CustomInput from "../Pars/CustomInput";
// import Loading from "../Pars/Loading";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import Image from "next/image";
import { storageURL } from "@/utils/api";
import { CiEdit } from "react-icons/ci";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getSingleUser } from "@/store/adminstore/slices/accounts/singleUserSlice";
import Loading from "@/components/Pars/Loading";
import CustomInput from "@/components/Pars/CustomInput";

interface ModalType {
  open: boolean;
  setOpen: any;
  id: number;
}

export default function EditUser({ open, setOpen, id }: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [showImage, setShowImage] = useState(true);
  const [userStatus, setUserStatus] = useState("");
  const previewRef: any = useRef();
  const hiddenFileInput: any = useRef(null);

  const formFields: {
    name: string;
    label: string;
    type: string;
    validation: any;
    placeholder: string;
  }[] = [
    {
      name: "first_name",
      label: "First Name :",
      type: "text",
      placeholder: "Enter Your First Name",
      validation: yup.string(),
    },

    {
      name: "last_name",
      label: "Last Name :",
      type: "text",
      placeholder: "Enter Your Last Name",
      validation: yup.string(),
    },
    {
      name: "email",
      label: "Email :",
      type: "email",
      placeholder: "example@example.com",
      validation: yup.string().email("Invalid email"),
    },
    {
      name: "status",
      label: "User Status :",
      type: "text",
      placeholder: "Select User Status",
      validation: yup.string(),
    },
    {
      name: "phone",
      label: "Phone Number :",
      type: "number",
      placeholder: "Enter a phone number",
      validation: yup.string(),
    },
    {
      name: "image",
      label: "Image (Optional) :",
      type: "file",
      placeholder: "Enter an image",
      validation: yup.mixed(),
    },
  ];

  const handleSubmit = (values: any) => {
    console.log("values editor", values);
  };

  const initalValues: any = {
    first_name: "",
    last_name: "",
    email: "",
    role_id: "",
    status: "",
    image: "",
    verified: "",
    phone: "",
  };

  const {
    error,
    singleUser = initalValues,
    isLoading,
    status,
  } = useSelector((state: GlobalState) => state.singleUser);
  const dispatch: any = useDispatch();
  console.log("singleEnum", singleUser);

  const validationSchema = yup.object().shape(
    formFields.reduce((accumulator: any, field) => {
      accumulator[field.name] = field.validation;
      return accumulator;
    }, {})
  );

  const handleImageUpload = () => {
    const file = hiddenFileInput.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        previewRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (open) {
      setShowImage(true);
      setUserStatus("");
      dispatch(getSingleUser(`admin/accounts/${id}`));
    }
  }, [dispatch, id, open]);

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
          Edit User Data
        </Modal.Title>
      </Modal.Header>

      {isLoading ? (
        <Loading content={"Editing..."} />
      ) : (
        <Modal.Body
          className={`${
            mode === "dark" ? "text-light" : "text-dark"
          } px-3 mb-3`}
        >
          <Formik
            initialValues={singleUser}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {(props) => {
              return (
                <Form className="">
                  {formFields.map((field) => {
                    return field.type === "file" ? (
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
                            setShowImage(false);
                          }}
                          accept="image/*"
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                        />
                      </div>
                    ) : field.name === "status" ? (
                      <>
                        <label className="block pl-[5px] text-[#888] mb-1">
                          User Status
                        </label>
                        <Dropdown
                          title={
                            userStatus
                              ? userStatus
                              : singleUser.account_status
                              ? singleUser.account_status.status
                              : "Select User Status"
                          }
                          name="status"
                          className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                          block
                        >
                          <Dropdown.Item
                            onClick={() => {
                              setUserStatus("Accepted");
                              // props.values.status = "Accepted";
                              props.setFieldValue("status", "Accepted");
                            }}
                          >
                            Accepted
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setUserStatus("Rejected");
                              props.setFieldValue("status", "Accepted");
                            }}
                          >
                            Rejected
                          </Dropdown.Item>
                        </Dropdown>
                      </>
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
                    <Button
                      type="button"
                      appearance="primary"
                      className="bg-btnColor hover:bg-btnColorHover w-[65px]"
                      onClick={() => console.log(props.errors)}
                    >
                      Button
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
