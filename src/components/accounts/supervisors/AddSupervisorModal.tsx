import { Modal, Button, InputPicker, Dropdown, Input } from "rsuite";
import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/Pars/CustomInput";
import CustomPassword from "@/components/Pars/CustomPassword";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { getRolesAsMenue } from "@/store/adminstore/slices/accounts/rolesSlice";
import { CiEdit } from "react-icons/ci";
import {
  completedSupervisorOperation,
  createSupervisor,
  updateSupervisor,
} from "@/store/adminstore/slices/accounts/supervisorsSlice";
import Image from "next/image";
import Loading from "@/components/Pars/Loading";
import { getSingleUser } from "@/store/adminstore/slices/accounts/singleUserSlice";
import mergeDifferentProperties from "@/utils/mergeDifferentProperties";
import OperationAlert from "@/components/Pars/OperationAlert";

interface ModalType {
  open: boolean;
  setOpen: any;
  requestType: "edit" | "create";
  operation: string;
  label: string;
  id?: number;
}

const editSupervisorSchema = yup.object().shape({
  first_name: yup.string().required("Please add the Your first Name"),
  last_name: yup.string().required("Please add the Your last Name"),
  email: yup.string().email("Invalid email").required("Email Is Required"),
  role_id: yup.string().required("Require"),
  status: yup.string().required("Require"),

  cause: yup.string(),
  image: yup.mixed(),
});

const addSupervisorSchema = editSupervisorSchema.concat(
  yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
);

export default function AddSupervisorModal({
  open,
  setOpen,
  requestType,
  operation,
  label,
  id,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [status, setStatus] = useState("");
  const dispatch: any = useDispatch();
  const inputRef: any = useRef();

  const {
    isLoading: roleLoading,
    error,
    roles,
  } = useSelector((state: GlobalState) => state.roles);
  const { isLoading, singleUser } = useSelector(
    (state: GlobalState) => state.singleUser
  );
  const { status: operationStatus } = useSelector(
    (state: GlobalState) => state.supervisors
  );

  const addSupervisorHandler = (values: any, actions: any) => {
    console.log("submitted");

    console.log(values);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    console.log(formData);
    dispatch(createSupervisor(formData));
  };

  const editSupervisorHandler = (values: any, actions: any) => {
    console.log("submitted");
    const data = mergeDifferentProperties(initialValuesEdit, values);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log(formData);
    dispatch(updateSupervisor({ id, data: formData }));
  };

  useEffect(() => {
    if (open) {
      dispatch(getRolesAsMenue());
      if (requestType === "edit") {
        dispatch(getSingleUser(`superviosr/${id}`));
      }
    }
  }, [open, requestType, dispatch, id]);

  const initialValuesAdd = {
    first_name: "",
    last_name: "",
    email: "",
    role_id: "",
    status: "",
    password: "",
    confirm_password: "",
    cause: "",
    image: "",
  };

  const initialValuesEdit = {
    first_name: singleUser.first_name,
    last_name: singleUser.last_name,
    email: singleUser.email,
    role_id: singleUser.role?.id,
    status: singleUser.status?.status,

    cause: singleUser.status?.cause ? singleUser.status.cause : "",
    image: singleUser.image ? singleUser.image : "",
  };

  useEffect(() => {
    if (open && operationStatus) {
      dispatch(completedSupervisorOperation());
      setOpen(false);
    }
  }, [open, operationStatus, dispatch, setOpen]);

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => setOpen(false)}
      className={`rounded-[17px]  border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] w-[calc(1000px)] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
      size={"md"}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title
          className={`${
            mode === "dark" ? "text-white" : "text-dark"
          } font-bold`}
        >
          {label}
        </Modal.Title>
      </Modal.Header>
      {isLoading && <Loading />}
      {!isLoading && (
        <Modal.Body
          className={`${
            mode === "dark" ? "text-light" : "text-dark"
          } px-3 mb-3`}
        >
          <Formik
            initialValues={
              requestType === "edit" ? initialValuesEdit : initialValuesAdd
            }
            validationSchema={
              requestType === "edit"
                ? editSupervisorSchema
                : addSupervisorSchema
            }
            onSubmit={
              requestType === "edit"
                ? editSupervisorHandler
                : addSupervisorHandler
            }
          >
            {(props) => (
              <Form className="">
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

                {requestType === "create" && (
                  <>
                    <CustomPassword
                      label="Enter Password"
                      name="password"
                      placeholder="Enter at least 8 characters"
                    />

                    <CustomPassword
                      label="Confirm Password"
                      name="confirm_password"
                      placeholder="Confirm The Password"
                    />
                  </>
                )}

                <label className="block pl-[5px] text-[#888] mb-1">Role</label>

                <InputPicker
                  data={roles}
                  block
                  loading={roleLoading}
                  placeholder="Select Role"
                  name="role_id"
                  className="border border-[#c1c1c1] mb-[10px] outline-none text-black"
                  onChange={(value: string, event) =>
                    (props.values.role_id = value)
                  }
                />
                {props.errors.role_id && props.touched.role_id && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.role_id}
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
                >
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("Accepted");
                      props.values.status = "Accepted";
                    }}
                  >
                    Accepted
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("Rejected");
                      props.values.status = "Rejected";
                    }}
                  >
                    Rejected
                  </Dropdown.Item>
                </Dropdown>
                {props.errors.status && props.touched.status && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.status}
                  </div>
                )}

                <label className="block pl-[5px] text-[#888] mb-1">
                  Cause (Optional)
                </label>
                <Input
                  placeholder="add a cause for the status"
                  name="cause"
                  as="textarea"
                  rows={3}
                  onChange={(value) => {
                    props.values.cause = value;
                  }}
                  className="mb-[10px]"
                />

                <label className="block pl-[5px] text-[#888] mb-1">
                  Add Photo (Optional)
                </label>

                <Input
                  placeholder="Enter an image"
                  name="image"
                  type="file"
                  onChange={(value, e: any) => {
                    console.log(e);
                    props.values.image = e.target.files[0];
                  }}
                  className={`mb-[10px] ${requestType === "edit" && "hidden"}`}
                  accept="image/*"
                  ref={inputRef}
                />

                {requestType === "edit" && initialValuesEdit.image && (
                  <div className="w-[120px] h-[120px] element-center relative">
                    <Image
                      src={initialValuesEdit.image}
                      alt="supervisor photo"
                      width={80}
                      height={80}
                    />
                    <CiEdit
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                      }}
                      onClick={() => inputRef.current.click()}
                    />
                  </div>
                )}

                {props.errors.image && props.touched.image && (
                  <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                    {props.errors.image}
                  </div>
                )}

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
                    {operation}
                  </Button>
                  
                </Modal.Footer>
              </Form>
              
            )}
          </Formik>
        </Modal.Body>
      )}
    </Modal>
  );
}
