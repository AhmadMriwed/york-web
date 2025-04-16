import { Modal, Button, Dropdown, Input, Loader } from "rsuite";
import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/Pars/CustomInput";
import CustomPassword from "@/components/Pars/CustomPassword";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";
import ImageUploadComponent from "../supervisors/ImageUploadComponent";
import { completedUserOperation, createUser } from "@/store/adminstore/slices/accounts/usersSlice";

interface ModalType {
    open: boolean;
    setOpen: any;
}

const addSupervisorSchema = yup.object().shape({
    first_name: yup.string().required("Please add your first name"),
    last_name: yup.string().required("Please add your last name"),
    user_name: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    user_type: yup.string().oneOf(["Admin", "Trainer", "Trainee"]).required("User type is required"),
    status: yup.string().oneOf(["Accepted", "Rejected"]).required("Status is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    password_confirmation: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    cause: yup.string(),
    image: yup.mixed(),
});

export default function AddUserModal({
    open,
    setOpen,
}: ModalType) {
    const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
    const [status, setStatus] = useState("");
    const [userType, setUserType] = useState("");
    const dispatch: any = useDispatch();

    const { status: operationStatus, isLoading } = useSelector(
        (state: GlobalState) => state.users
    );

    const addSupervisorHandler = (values: any, actions: any) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        dispatch(createUser(formData));
    };

    const initialValues = {
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        user_type: "",
        status: "",
        password: "",
        password_confirmation: "",
        cause: "",
        image: "",
    };

    useEffect(() => {
        if (open && operationStatus) {
            dispatch(completedUserOperation());
            setOpen(false);
        }
    }, [open, operationStatus, dispatch, setOpen]);

    return (
        <Modal
            backdrop={true}
            open={open}
            onClose={() => setOpen(false)}
            className={`rounded-[17px] border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] w-[calc(1000px)] h-auto ${mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
                }`}
            size={"md"}
        >
            <Modal.Header closeButton={true}>
                <Modal.Title className={`${mode === "dark" ? "text-white" : "text-dark"} font-bold`}>
                    Add User
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={`${mode === "dark" ? "text-light" : "text-dark"} px-3 mb-3`}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={addSupervisorSchema}
                    onSubmit={addSupervisorHandler}
                >
                    {(props) => (
                        <Form className="">
                            <div className="grid grid-cols-2 gap-4">
                                <CustomInput
                                    label="First Name"
                                    name="first_name"
                                    type="text"
                                    placeholder="Enter first name"
                                />

                                <CustomInput
                                    label="Last Name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Enter last name"
                                />

                                <CustomInput
                                    label="Username"
                                    name="user_name"
                                    type="text"
                                    placeholder="Enter username"
                                />

                                <CustomInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                />

                                <CustomPassword
                                    label="Password"
                                    name="password"
                                    placeholder="At least 8 characters"
                                />

                                <CustomPassword
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block pl-[5px] text-[#888] mb-1">User Type</label>
                                    <Dropdown
                                        title={userType || "Select user type"}
                                        name="user_type"
                                        className="w-full bg-white !text-left rounded-[6px] border-[#c1c1c1] mb-[10px]
                                            [&_.rs-dropdown-toggle]:text-left
                                            "
                                        block
                                    >

                                        <Dropdown.Item onClick={() => {
                                            setUserType("Admin");
                                            props.values.user_type = "Admin";
                                        }}>
                                            Admin
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            setUserType("Trainer");
                                            props.values.user_type = "Trainer";
                                        }}>
                                            Trainer
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            setUserType("Trainee");
                                            props.values.user_type = "Trainee";
                                        }}>
                                            Trainee
                                        </Dropdown.Item>
                                    </Dropdown>
                                    {props.errors.user_type && props.touched.user_type && (
                                        <div className="pl-[5px] ml-[10px] text-red-600">
                                            {props.errors.user_type}
                                        </div>
                                    )}

                                </div>

                                <div>
                                    <label className="block pl-[5px] text-[#888] mb-1">Status</label>

                                    <Dropdown
                                        title={status || "Select status"}
                                        name="status"
                                        className="w-full bg-white !text-left rounded-[6px] border-[#c1c1c1] mb-[10px]
                                            [&_.rs-dropdown-toggle]:text-left
                                      "
                                        block
                                    >
                                        <Dropdown.Item
                                            onClick={() => {
                                                setStatus("Accepted");
                                                props.values.status = "Accepted";
                                            }}
                                            className="!text-left"  // Force left alignment for items
                                        >
                                            Accepted
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setStatus("Rejected");
                                                props.values.status = "Rejected";
                                            }}
                                            className="!text-left"  // Force left alignment for items
                                        >
                                            Rejected
                                        </Dropdown.Item>
                                    </Dropdown>
                                    {props.errors.status && props.touched.status && (
                                        <div className="pl-[5px] ml-[10px] text-red-600">
                                            {props.errors.status}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block pl-[5px] text-[#888] mb-1">Cause (Optional)</label>
                                <Input
                                    placeholder="Add status reason"
                                    name="cause"
                                    as="textarea"
                                    rows={3}
                                    onChange={(value) => {
                                        props.values.cause = value;
                                    }}
                                    className="mb-[10px]"
                                />
                            </div>

                            <ImageUploadComponent
                                storageURL={storageURL}
                                formikProps={{
                                    setFieldValue: props.setFieldValue,
                                    errors: props.errors,
                                    touched: props.touched,
                                    values: props.values
                                }}
                            />

                            <Modal.Footer className="mt-8 pr-1">
                                <Button
                                    onClick={() => setOpen(false)}
                                    appearance="subtle"
                                    className="bg-red-500 text-white hover:bg-red-400 w-[120px] hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    appearance="primary"
                                    className="bg-btnColor hover:!bg-btnColorHover w-[120px]"
                                >
                                    {isLoading ? <Loader /> : "Add"}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}