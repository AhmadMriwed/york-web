import { Modal, Button, InputPicker, Dropdown, Input } from "rsuite";
import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/Pars/CustomInput";
import CustomPassword from "@/components/Pars/CustomPassword";

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
   role: yup.string().required("Require"),
   status: yup.string().required("Require"),
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
});

export default function AddSupervisorModal({
   open,
   setOpen,
   requestType,
   operation,
}: ModalType) {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const [status, setStatus] = useState("");

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

   const handleSelect = (eventKey: any, event: any) => {
      console.log(`You selected ${eventKey}`);
   };

   return (
      <Modal
         backdrop={true}
         open={open}
         onClose={() => setOpen(false)}
         className={`rounded-[17px]  border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] w-[calc(1000px)] h-auto ${
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
                  role: "",
                  status: "",
                  password: "",
                  confirmPassword: "",
                  image: "",
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
                     <CustomInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                     />
                     <label className="block pl-[5px] text-[#888] mb-1">
                        Role
                     </label>
                     <InputPicker
                        data={data}
                        block
                        placeholder="Select Role"
                        name="role"
                        className="border border-[#c1c1c1] mb-[10px] outline-none text-black"
                        onChange={(value: string, event) =>
                           (props.values.role = value)
                        }
                     />
                     {props.errors.role && props.touched.role && (
                        <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                           {props.errors.role}
                        </div>
                     )}
                     <label className="block pl-[5px] text-[#888] mb-1">
                        Supervisor Status
                     </label>
                     <Dropdown
                        title={status ? status : "Select Statue"}
                        name="status"
                        className="w-full bg-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-white [&>button.rs-btn:focus]:!text-[#888] [&>*]:!text-left mb-[10px] hover:text-[#888] !blur-none"
                        block
                        onSelect={() => handleSelect}
                     >
                        <Dropdown.Item
                           onClick={() => {
                              setStatus("active");
                              props.values.status = "active";
                           }}
                        >
                           Active
                        </Dropdown.Item>
                        <Dropdown.Item
                           onClick={() => {
                              setStatus("Inactive");
                              props.values.status = "Inactive";
                           }}
                        >
                           Inactive
                        </Dropdown.Item>
                     </Dropdown>
                     {props.errors.status && props.touched.status && (
                        <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                           {props.errors.status}
                        </div>
                     )}
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
      </Modal>
   );
}
