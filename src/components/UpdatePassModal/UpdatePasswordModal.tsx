// import "use client"
import { userUpdatePassword } from "@/store/userStore/slices/userSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import * as yup from "yup";
import { useFormik } from "formik";

import { trainerUpdatePassword } from "@/store/trainerStore/slices/trainerSlice";
import { adminUpdatePassword } from "@/store/adminstore/slices/authSlice";
import { Button, Input, Loader, Modal } from "rsuite";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import Image from "next/image";
export interface ModalType {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  type: string;
}
const UpdatePasswordModal = ({ isOpen, onClose, onOpen, type }: ModalType) => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const updatePasswordSchema = yup.object().shape({
    old_password: yup
      .string()
      .required("old password is required")
      .min(8, "Password must be at least 8 characters"),
    new_password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    new_password_confirmation: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("new_password")], "Passwords must match"),
  });
  const handleUpdatePass = async (values: any, actions: any) => {
    if (type === "trainer") {
      setLoading(true);
      console.log("trainer");
      let cookie = new Cookies();
      let token = cookie.get("trainer_token");

      try {
        dispatch(trainerUpdatePassword(values)).then((res: any) => {
          console.log(res);
          setLoading(false);
          formik.values.old_password = "";
          formik.values.new_password = "";
          formik.values.new_password_confirmation = "";
        });
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    } else if (type === "user") {
      setLoading(true);
      console.log("user");
      let cookie = new Cookies();
      let token = await cookie.get("user_token");
      try {
        dispatch(userUpdatePassword(values)).then((res: any) => {
          if (res.error) {
            console.log("some thing went wrong");
            setLoading(false);
            return;
          } else {
            console.log(res);
            setLoading(false);
            formik.values.old_password = "";
            formik.values.new_password = "";
            formik.values.new_password_confirmation = "";
          }
        });
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    } else if (type === "admin") {
      setLoading(true);
      console.log("admin");
      let cookie = new Cookies();
      let token = await cookie.get("admin_token");
      try {
        dispatch(adminUpdatePassword(values)).then((res: any) => {
          if (res.error) {
            console.log("some thing went wrong");
            setLoading(false);
            return;
          } else {
            console.log(res);
            setLoading(false);
            formik.values.old_password = "";
            formik.values.new_password = "";
            formik.values.new_password_confirmation = "";
            router.push("/admin/login");
          }
        });
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    }
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: handleUpdatePass,
  });
  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <ModalHeader className="font-semibold text-lg">
        Change your password :
      </ModalHeader>
      <ModalBody className="flex items-center  gap-2 flex-col md:flex-row ">
        <Image
          src={"/information/reset_password.svg"}
          height={32}
          width={32}
          alt="reset"
          className="size-80"
        />
        <form onSubmit={formik.handleSubmit} className="flex-1 space-y-5">
          <div>
            <FormControlLabel className="text-gray-700 mb-2">
              Old password :{" "}
            </FormControlLabel>
            <Input
              name="old_password"
              onChange={(value) => (formik.values.old_password = value)}
              type="password"
              className="mt-2"
            />
            {formik.touched.old_password && formik.errors.old_password && (
              <p className="error-mesage">{formik.errors.old_password}</p>
            )}
          </div>

          <div>
            <FormControlLabel className="text-gray-700 mb-2">
              new password :
            </FormControlLabel>
            <Input
              onChange={(value) => (formik.values.new_password = value)}
              name="new_password"
              type="password"
              className="mt-2"
            />
            {formik.touched.new_password && formik.errors.new_password && (
              <p className="error-mesage">{formik.errors.new_password}</p>
            )}
          </div>
          <div>
            <FormControlLabel className="text-gray-700 mb-2">
              confirm password :
            </FormControlLabel>
            <Input
              onChange={(value) =>
                (formik.values.new_password_confirmation = value)
              }
              name="new_password_confirmation"
              type="password"
              className="mt-2"
            />
            {formik.touched.new_password_confirmation &&
              formik.errors.new_password_confirmation && (
                <p className="error-mesage">
                  {formik.errors.new_password_confirmation}
                </p>
              )}
          </div>
          <Button type="submit" className="colored-btn w-full">
            {loading ? (
              <span>
                <Loader color="red" size={"sm"} /> Submitting
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default UpdatePasswordModal;
