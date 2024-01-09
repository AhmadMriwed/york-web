import { Button, Dropdown, Modal } from "rsuite";

import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomPassword from "@/components/Pars/CustomPassword";
import CustomInput from "@/components/Pars/CustomInput";

interface ModalType {
   open: boolean;
   setOpen: any;
   requestType: string;

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
   userStatus: yup.string().required("Require"),
   userType: yup.string().required("Require"),
});

export default function AddTraineeModal({
   open,
   setOpen,
   requestType,
}: ModalType) {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const [userStatus, setUserStatus] = useState("");
   const [userType, setUserType] = useState("");

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
                     userStatus: "",
                     userType: "",
                  }}
                  validationSchema={addSupervisorSchema}
                  onSubmit={submithandler}
               >
                  {(props) => (
                     <Form className="">
                        <CustomInput
                           label="Full Name"
                           name="fullName"
                           type="text"
                           placeholder="Enter Your Full Name"
                        />

                        <label className="block pl-[5px] text-[#888] mb-1">
                           User Type
                        </label>
                        <Dropdown
                           name="userType"
                           className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                           block
                           title={userType ? userType : "Select User Type"}
                        >
                           <Dropdown.Item
                              onClick={() => {
                                 setUserType("Client");
                                 props.values.userType = "client";
                              }}
                           >
                              Client
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => {
                                 setUserType("Trainee");
                                 props.values.userType = "trainee";
                              }}
                           >
                              Trainee
                           </Dropdown.Item>
                        </Dropdown>
                        {props.errors.userType && props.touched.userType && (
                           <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                              {props.errors.userType}
                           </div>
                        )}

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
                              userStatus ? userStatus : "Select User Statue"
                           }
                           name="userStatus"
                           className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                           block
                        >
                           <Dropdown.Item
                              onClick={() => {
                                 setUserStatus("Active");
                                 props.values.userStatus = "active";
                              }}
                           >
                              Active
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => {
                                 setUserStatus("Inactive");
                                 props.values.userStatus = "Inactive";
                              }}
                           >
                              Inactive
                           </Dropdown.Item>
                        </Dropdown>
                        {props.errors.userStatus &&
                           props.touched.userStatus && (
                              <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                                 {props.errors.userStatus}
                              </div>
                           )}

                        <CustomInput
                           label="Add Photo (Optional)"
                           name="image"
                           type="file"
                        />

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
                              className="bg-btnColor hover:bg-btnColorHover w-[65px]"
                           >
                              Add
                           </Button>
                        </Modal.Footer>
                     </Form>
                  )}
               </Formik>
            </Modal.Body>
         </Modal.Header>
      </Modal>
   );
}
