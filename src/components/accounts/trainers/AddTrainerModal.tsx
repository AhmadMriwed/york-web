import { Modal, Button, Dropdown, CheckPicker } from "rsuite";
import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/Pars/CustomInput";
import CustomPassword from "@/components/Pars/CustomPassword";
import LocationModal from "./LocationModal";

interface ModalType {
   open: boolean;
   setOpen: any;
   requestType: string;
   operation: string;
   serviceId?: any;
}

const addSupervisorSchema = yup.object().shape({
   fullName: yup.string().required("Please add the Your full Name"),
   email: yup.string().email("Invalid email").required("Email Is Required"),
   password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
   confirmPassword: yup
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
               return supportedFormats.includes(value?.split(".").pop());
            }
            return true;
         }
      ),
   accountStatus: yup.string().required("Require"),
   userStatus: yup.string().required("Require"),
   trainerType: yup.string().required("Require"),
   gender: yup.string().required("Require"),
   birthdate: yup
      .date()
      .required("Birthdate is required")
      .max(new Date(), "Birthdate must be in the past")
      .min(
         new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
         "You must be at least 120 years old"
      ),
   phoneNumber: yup
      .string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
      .required("Phone number is required"),
   categories: yup
      .array()
      .min(1, "At least one category is required")
      .required("Categories are required"),
   location: yup.string(),
});

export default function AddTrainerModal({
   open,
   setOpen,
   requestType,
}: ModalType) {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const [openLocationModal, setOpenLocationModal] = useState(false);
   const [userStatus, setUserStatus] = useState("");
   const [trainerType, setTrainerType] = useState("");
   const [accountStatus, setAccountStatus] = useState("");
   const [gender, setGender] = useState("");

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

   const submithandler = async (values: any, actions: any) => {
      const data = { ...values };
      console.log(values);
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
            className={`${
               mode === "dark" ? "text-light" : "text-dark"
            } px-3 mb-3`}
         >
            <Formik
               initialValues={{
                  fullName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  image: "",
                  accountStatus: "",
                  userStatus: "",
                  trainerType: "",
                  birthdate: "",
                  gender: "",
                  phoneNumber: "",
                  categories: [],
                  location: "defualt value",
               }}
               validationSchema={addSupervisorSchema}
               onSubmit={submithandler}
            >
               {(props) => (
                  <Form className="flex flex-wrap flex-col sm:flex-row gap-[15px] justify-between">
                     <div className="basis-[48%]">
                        <CustomInput
                           label="Full Name"
                           name="fullName"
                           type="text"
                           placeholder="Enter Your Full Name"
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
                           name="confirmPassword"
                           placeholder="Confirm The Password"
                        />

                        <label className="block pl-[5px] text-[#888] mb-1">
                           User Status
                        </label>
                        <Dropdown
                           title={
                              userStatus ? userStatus : "Select User Status"
                           }
                           name="userStatus"
                           className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                           block
                        >
                           <Dropdown.Item
                              onClick={() => {
                                 setUserStatus("Rejected");
                                 props.values.userStatus = "rejected";
                              }}
                           >
                              Rejected
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => {
                                 setUserStatus("Accepted");
                                 props.values.userStatus = "accepted";
                              }}
                           >
                              Accepted
                           </Dropdown.Item>
                        </Dropdown>
                        {props.errors.userStatus &&
                           props.touched.userStatus && (
                              <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                                 {props.errors.userStatus}
                              </div>
                           )}
                        <label className="block pl-[5px] text-[#888] mb-1">
                           Location
                        </label>
                        <Button
                           onClick={() => setOpenLocationModal(true)}
                           block
                           className="text-left bg-white text-black outline-none w-full rounded-[6px] mb-[10px] mt-1 hover:!bg-whit focus:!bg-white focus:!text-[#888] [&>*]:!text-left  hover:text-[#888] !blur-none"
                           name="location"
                        >
                           {props.initialValues.location}
                        </Button>

                        {props.errors.location && props.touched.location && (
                           <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                              {props.errors.location}
                           </div>
                        )}
                        <LocationModal
                           open={openLocationModal}
                           setOpen={setOpenLocationModal}
                        />
                        <label className="block pl-[5px] text-[#888] mb-1">
                           Category
                        </label>
                        <CheckPicker
                           data={data}
                           block
                           placeholder="Select Category"
                           onChange={(value: any) =>
                              (props.values.categories = value)
                           }
                           name="categories"
                        />
                        {props.errors.categories &&
                           props.touched.categories && (
                              <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                                 {props.errors.categories}
                              </div>
                           )}
                     </div>
                     <div className="basis-[48%]">
                        <label className="block pl-[5px] text-[#888] mb-1">
                           Account Status
                        </label>
                        <Dropdown
                           title={
                              accountStatus
                                 ? accountStatus
                                 : "Select Account Status"
                           }
                           name="status"
                           className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                           block
                        >
                           <Dropdown.Item
                              onClick={() => {
                                 setAccountStatus("active");
                                 props.values.accountStatus = "active";
                              }}
                           >
                              Active
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => {
                                 setAccountStatus("Inactive");
                                 props.values.accountStatus = "Inactive";
                              }}
                           >
                              Inactive
                           </Dropdown.Item>
                        </Dropdown>
                        {props.errors.accountStatus &&
                           props.touched.accountStatus && (
                              <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                                 {props.errors.accountStatus}
                              </div>
                           )}

                        <CustomInput
                           label="Add Photo (Optional)"
                           name="image"
                           type="file"
                        />

                        <label className="block pl-[5px] text-[#888] mb-1">
                           Trainer Type
                        </label>
                        <Dropdown
                           title={
                              trainerType ? trainerType : "Select Trainer Type"
                           }
                           name="trainerType"
                           className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                           block
                        >
                           <Dropdown.Item
                              onClick={() => {
                                 setTrainerType("Certificate");
                                 props.values.trainerType = "certificate";
                              }}
                           >
                              Certificate
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => {
                                 setTrainerType("UnCertificate");
                                 props.values.trainerType = "unCertificate";
                              }}
                           >
                              UnCertificate
                           </Dropdown.Item>
                        </Dropdown>
                        {props.errors.trainerType &&
                           props.touched.trainerType && (
                              <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                                 {props.errors.trainerType}
                              </div>
                           )}

                        <CustomInput
                           label="Birthdate"
                           name="birthdate"
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
                           label="Phone"
                           name="phoneNumber"
                           type="number"
                           placeholder="+963999999999"
                        />
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
