import { Modal, Button, Dropdown, CheckPicker, Input } from "rsuite";
import { ThemeContext } from "../../pars/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/pars/CustomInput";
import CustomPassword from "@/components/pars/CustomPassword";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsMenue } from "@/store/adminstore/slices/enums/categoriesSlice";
import { GlobalState } from "@/types/storeTypes";
import { Signature, SignatureComponent } from "@syncfusion/ej2-react-inputs";
import { createTrainer } from "@/store/adminstore/slices/accounts/trainersSlice";

import dynamic from "next/dynamic";

const LocationModal = dynamic(() => import("./LocationModal"), {
  ssr: false,
});

interface ModalType {
  open: boolean;
  setOpen: any;
  requestType: string;
  operation: string;
  serviceId?: any;
}

const addTrainerSchema = yup.object().shape({
  first_name: yup.string().required("Please add your first Name"),
  last_name: yup.string().required("Please add your last Name"),
  email: yup.string().email("Invalid email").required("Email Is Required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  image: yup
    .mixed()
    .test(
      "fileFormat",
      "Unsupported Format (File Must be Image)",
      (value: any) => {
        if (value) {
          const supportedFormats = ["jpg", "jpeg", "png"];
          console.log(value);
          return supportedFormats.includes(value.name?.split(".").pop());
        }
        return true;
      }
    ),
  // account_status: yup.string().required("Require"),
  // user_status: yup.string().required("Require"),
  trainer_type_id: yup.number().required("Require"),
  gender: yup.string().required("Require"),
  birth_date: yup
    .date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate must be in the past")
    .min(
      new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
      "You must be at least 100 years old"
    ),
  phone_number: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
    .required("Phone number is required"),
  categories: yup
    .array()
    .min(1, "At least one category is required")
    .required("Categories are required"),
  location: yup.object().required("Location is required"),
  digital_signature: yup
    .string()
    .required("Sign is required , Sign and press the Save button"),
  domains: yup.string().required("Required "),
  about_me: yup.string().required("Please add the Your info "),
});

export default function AddTrainerModal({
  open,
  setOpen,
  requestType,
}: ModalType) {
  let signObj: Signature | null;
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [trainerType, setTrainerType] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });

  const dispatch: any = useDispatch();
  const { categoriesAsMenue, isLoading } = useSelector(
    (state: GlobalState) => state.categories
  );

  useEffect(() => {
    if (open) {
      dispatch(getCategoriesAsMenue());
    }
  }, [dispatch, open]);

  const submithandler = async (values: any, actions: any) => {
    const data = { ...values };
    console.log(values);
    // const formData = new FormData();
    // Object.keys(values).forEach((key) => {
    //    formData.append(key, values[key]);
    // });
    // console.log(formData);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "location") {
        // append nested object
        for (let previewKey in values[key]) {
          formData.append(`location[${previewKey}]`, values[key][previewKey]);
        }
      } else if (key === "categories") {
        for (var i = 0; i < values.Category.length; i++) {
          formData.append("categories[]", values.Category[i]);
        }
      } else {
        formData.append(key, values[key]);
      }
    });
    console.log("formdata", formData);
    dispatch(createTrainer(formData));
  };

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => setOpen(false)}
      size="lg"
      className={`rounded-[17px]  border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] w-[1200px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title
          className={`${
            mode === "dark" ? "text-light" : "text-dark"
          } font-bold`}
        >
          {requestType}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`${mode === "dark" ? "text-light" : "text-dark"} px-3 mb-3`}
      >
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            image: "",
            // account_status: "",
            // user_status: "",
            trainer_type_id: 1,
            birth_date: "",
            gender: "",
            phone_number: "",
            categories: [],
            digital_signature: "",
            location: position.lat + "," + position.lng,
            domains: "",
            about_me: "",
          }}
          validationSchema={addTrainerSchema}
          onSubmit={submithandler}
        >
          {(props) => (
            <Form className="flex flex-wrap flex-col sm:flex-row gap-[15px] justify-between">
              <div className="basis-[48%]">
                <CustomInput
                  label="First Name"
                  name="first_name"
                  type="text"
                  placeholder="Enter Your First Name"
                />
                <CustomInput
                  label="Last Name"
                  name="last_name"
                  type="text"
                  placeholder="Enter Your Last Name"
                />
                <CustomInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
                <CustomPassword
                  label="Enter Password"
                  name="password"
                  placeholder="Enter at least 8 characters"
                />

                <CustomPassword
                  label="Confirm Password"
                  name="password_confirmation"
                  placeholder="Confirm The Password"
                />
                {/* 
                        <label className="block pl-[5px] text-[#888] mb-1">
                           User Status
                        </label>
                        <Dropdown
                           title={
                              userStatus ? userStatus : "Select User Status"
                           }
                           name="user_status"
                           className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                           block
                        >
                           <Dropdown.Item
                              onClick={() => {
                                 setUserStatus("Rejected");
                                 props.values.user_status = "rejected";
                              }}
                           >
                              Rejected
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => {
                                 setUserStatus("Accepted");
                                 props.values.user_status = "accepted";
                              }}
                           >
                              Accepted
                           </Dropdown.Item>
                        </Dropdown>
                        {props.errors.user_status &&
                           props.touched.user_status && (
                              <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                                 {props.errors.user_status}
                              </div>
                           )} */}

                <CustomInput
                  label="Phone"
                  name="phone_number"
                  type="number"
                  placeholder="+963999999999"
                />

                <label className="block pl-[5px] text-[#888] mb-1">
                  Category
                </label>
                <CheckPicker
                  data={categoriesAsMenue}
                  loading={isLoading}
                  block
                  placeholder="Select Category"
                  onChange={(value: any) => {
                    console.log(value, "values picker");
                    props.values.categories = value;
                  }}
                  name="categories"
                />
                {props.errors.categories && props.touched.categories && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.categories}
                  </div>
                )}

                <label className="block pl-[5px] text-[#888] mb-1">
                  About Me
                </label>

                <Input
                  as="textarea"
                  rows={4}
                  name="about_me"
                  type="text"
                  placeholder="Add Something About You"
                  onChange={(value) => {
                    props.values.about_me = value;
                  }}
                  className="mb-[10px]"
                />
                {props.errors.about_me && props.touched.about_me && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.about_me}
                  </div>
                )}
              </div>
              <div className="basis-[48%]">
                <label className="block pl-[5px] text-[#888] mb-1">
                  Location
                </label>
                <Button
                  onClick={() => setOpenLocationModal(true)}
                  block
                  className="text-left bg-white text-black outline-none w-full rounded-[6px] mb-[10px] mt-1 hover:!bg-whit focus:!bg-white focus:!text-[#888] [&>*]:!text-left  hover:text-[#888] !blur-none"
                  name="location"
                >
                  {position.lat === 0
                    ? "Select your location"
                    : position.lat + "," + position.lng}
                </Button>
                {props.errors.location && props.touched.location && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.location}
                  </div>
                )}
                <LocationModal
                  open={openLocationModal}
                  setOpen={setOpenLocationModal}
                  position={position}
                  setPosition={setPosition}
                  setLocation={() => {
                    props.setFieldValue("location", position);
                  }}
                />
                {/* <label className="block pl-[5px] text-[#888] mb-1">
                           Account Status
                        </label>
                        <Dropdown
                           title={
                              accountStatus
                                 ? accountStatus
                                 : "Select Account Status"
                           }
                           name="account_status"
                           className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                           block
                        >
                           <Dropdown.Item
                              onClick={() => {
                                 setAccountStatus("active");
                                 props.values.account_status = "active";
                              }}
                           >
                              Active
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => {
                                 setAccountStatus("Inactive");
                                 props.values.account_status = "inactive";
                              }}
                           >
                              Inactive
                           </Dropdown.Item>
                        </Dropdown>
                        {props.errors.account_status &&
                           props.touched.account_status && (
                              <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                                 {props.errors.account_status}
                              </div>
                           )} */}
                <label>Add Photo (Optional)</label>
                <Input
                  placeholder="Add Photo (Optional)"
                  name="image"
                  type="file"
                  onChange={(value, e: any) => {
                    console.log(e);
                    props.values.image = e.target.files[0];
                  }}
                  accept="image/*"
                />
                <label className="block pl-[5px] text-[#888] mb-1">
                  Trainer Type
                </label>
                <Dropdown
                  title={trainerType ? trainerType : "Select Trainer Type"}
                  name="trainer_type_id"
                  className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                  block
                >
                  <Dropdown.Item
                    onClick={() => {
                      setTrainerType("Certificate");
                      props.values.trainer_type_id = 1;
                    }}
                  >
                    Certificate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setTrainerType("UnCertificate");
                      props.values.trainer_type_id = 2;
                    }}
                  >
                    UnCertificate
                  </Dropdown.Item>
                </Dropdown>
                {props.errors.trainer_type_id &&
                  props.touched.trainer_type_id && (
                    <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                      {props.errors.trainer_type_id}
                    </div>
                  )}
                <CustomInput
                  label="Birthdate"
                  name="birth_date"
                  type="date"
                  placeholder="25/6/1998"
                />
                <label className="block pl-[5px] text-[#888] mb-1">
                  Gender
                </label>
                <Dropdown
                  title={gender ? gender : "Select Your Gender"}
                  name="gender"
                  className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                  block
                >
                  <Dropdown.Item
                    onClick={() => {
                      setGender("Male");
                      props.values.gender = "male";
                    }}
                  >
                    Male
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setGender("Female");
                      props.values.gender = "female";
                    }}
                  >
                    Female
                  </Dropdown.Item>
                </Dropdown>
                {props.errors.gender && props.touched.gender && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.gender}
                  </div>
                )}

                <CustomInput
                  label="Domains"
                  name="domains"
                  placeholder="Enter Your Domains"
                />

                {props.errors.domains && props.touched.domains && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.domains}
                  </div>
                )}

                <label className="block pl-[5px] text-[#888] mb-1">
                  Digital Signature
                </label>
                <div className="relative rounded-[6px]">
                  <SignatureComponent
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: "6px",
                    }}
                    ref={(sign) => (signObj = sign)}
                    backgroundColor="white"
                  ></SignatureComponent>
                  {props.errors.digital_signature &&
                    props.touched.digital_signature && (
                      <div className="pl-[5px] ml-[10px] mt-[10px] text-red-600">
                        {props.errors.digital_signature}
                      </div>
                    )}

                  <button
                    onClick={() => {
                      signObj?.clear();
                    }}
                    className="absolute top-0 right-[15px] text-black text-[20px]"
                  >
                    x
                  </button>
                </div>
                <button
                  onClick={() => {
                    let dataURI = signObj?.getSignature("Svg") as string;
                    let svg = atob(
                      dataURI.replace(/data:image\/svg\+xml;base64,/, "")
                    );
                    console.log(svg);
                    props.setFieldValue("digital_signature", svg);
                  }}
                  className="bg-btnColor hover:bg-btnColorHover mt-4 p-[5px] rounded-[6px]"
                >
                  Save Sign
                </button>
              </div>
              <Modal.Footer className="mt-2 pr-1 flex-1 ">
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
                  className="bg-btnColor hover:bg-btnColorHover w-[65px]"
                >
                  Add
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
