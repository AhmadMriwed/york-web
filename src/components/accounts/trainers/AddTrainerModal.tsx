

import { Modal, Button, Dropdown, CheckPicker, Input } from "rsuite";
import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/Pars/CustomInput";
import CustomPassword from "@/components/Pars/CustomPassword";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsMenue } from "@/store/adminstore/slices/enums/categoriesSlice";
import { GlobalState } from "@/types/storeTypes";
import { createTrainer } from "@/store/adminstore/slices/accounts/trainersSlice";
import dynamic from "next/dynamic";
import SignaturePad from "react-signature-pad-wrapper";

const LocationModal = dynamic(() => import("./LocationModal"), {
  ssr: false
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
          return supportedFormats.includes(value.name?.split(".").pop());
        }
        return true;
      }
    ),
  account_status: yup.string().required("Account status is required"),
  status: yup.string().required("User status is required"),
  trainer_type_id: yup.number().required("Trainer type is required"),
  gender: yup.string().required("Gender is required"),
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
    .required("Sign is required, Sign and press the Save button"),
  domains: yup.string().required("Domains are required"),
  about_me: yup.string().required("Please add your info"),
});

export default function AddTrainerModal({
  open,
  setOpen,
  requestType,
}: ModalType) {
  let signObj: any;
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
    console.log(values);
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === "location") {
          // Append latitude and longitude with corrected keys
          if (values.location.lat) {
            formData.append("location[latitude]", values.location.lat.toString());
          }
          if (values.location.lng) {
            formData.append("location[longitude]", values.location.lng.toString());
            formData.append("location[address]","address");

          }
        }else if (key === "categories") {
          // Append categories array
          values.categories.forEach((category: any, index: number) => {
            formData.append("categories[]", category);
          });
        } else if (key === "image") {
          // Append image only if it exists
          if (values.image) {
            formData.append(key, values.image);
          }
        } else {
          // Append other fields
          formData.append(key, values[key]);
        }
      });

      console.log("Form Data:", formData);

      await dispatch(createTrainer(formData));
      console.log("Trainer created successfully");

      // actions.resetForm(); // Reset the form after successful submission
      // setOpen(false); // Close the modal
    } catch (error) {
      console.error("Error creating trainer:", error);
      // actions.setSubmitting(false); // Ensure the form is no longer in "submitting" state
    }
  };

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => setOpen(false)}
      size="lg"
      className={`rounded-[17px] border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] w-[1200px] h-auto ${
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
            account_status: "",
            status: "",
            trainer_type_id: 1,
            birth_date: "",
            gender: "",
            phone_number: "",
            categories: [],
            digital_signature: "",
            location: { latitude: position.lat, longitude: position.lng },
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
                {/* User Status Dropdown */}
                <label className="block pl-[5px] text-[#888] mb-1">
                  User Status
                </label>
                <Dropdown
                  title={userStatus ? userStatus : "Select User Status"}
                  name="status"
                  className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                  block
                >
                  <Dropdown.Item
                    onClick={() => {
                      setUserStatus("Rejected");
                      props.setFieldValue("status", "Rejected");
                    }}
                  >
                    Rejected
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setUserStatus("Accepted");
                      props.setFieldValue("status", "Accepted");
                    }}
                  >
                    Accepted
                  </Dropdown.Item>
                </Dropdown>
                {props.errors.status && props.touched.status && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.status}
                  </div>
                )}
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
                    props.setFieldValue("categories", value || []);
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
                    props.setFieldValue("about_me", value);
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
                  className="text-left bg-white text-black outline-none w-full rounded-[6px] mb-[10px] mt-1 hover:!bg-whit focus:!bg-white focus:!text-[#888] [&>*]:!text-left hover:text-[#888] !blur-none"
                  name="location"
                >
                  {position.lat === 0
                    ? "Select your location"
                    : `${position.lat}, ${position.lng}`}
                </Button>
                {props.errors.location && props.touched.location && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.location.latitude}
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
                {/* Account Status Dropdown */}
                <label className="block pl-[5px] text-[#888] mb-1">
                  Account Status
                </label>
                <Dropdown
                  title={
                    accountStatus ? accountStatus : "Select Account Status"
                  }
                  name="account_status"
                  className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                  block
                >
                  <Dropdown.Item
                    onClick={() => {
                      setAccountStatus("Active");
                      props.setFieldValue("account_status", "active");
                    }}
                  >
                    Active
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setAccountStatus("Inactive");
                      props.setFieldValue("account_status", "inactive");
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
                  )}
                <label>Add Photo (Optional)</label>
                <Input
                  placeholder="Add Photo (Optional)"
                  name="image"
                  type="file"
                  onChange={(e: any) => {
                    props.setFieldValue("image", e.target.files[0]);
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
                      props.setFieldValue("trainer_type_id", 1);
                    }}
                  >
                    Certificate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setTrainerType("UnCertificate");
                      props.setFieldValue("trainer_type_id", 2);
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
                      props.setFieldValue("gender", "Male");
                    }}
                  >
                    Male
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setGender("Female");
                      props.setFieldValue("gender", "Female");
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
                  <SignaturePad
                    options={{
                      minWidth: 1.5,
                      dotSize: 1.5,
                      penColor: "#000",
                      backgroundColor: "#FFF",
                    }}
                    ref={(sign) => (signObj = sign)}
                  />
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
                    let dataURI = signObj?.toDataURL("image/svg+xml");
                    let svg = atob(
                      dataURI.replace(/data:image\/svg\+xml;base64,/, "")
                    );
                    props.setFieldValue("digital_signature", svg);
                  }}
                  className="bg-btnColor hover:bg-btnColorHover mt-4 p-[5px] rounded-[6px]"
                >
                  Save Sign
                </button>
              </div>
              <Modal.Footer className="mt-2 pr-1 flex-1">
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