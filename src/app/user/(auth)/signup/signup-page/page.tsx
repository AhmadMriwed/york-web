"use client";
import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Loader } from "rsuite";
import Image from "next/image";
import BackBtn from "@/components/buttons/BackBtn";
import { GlobalState } from "@/types/storeTypes";
import { FaTrashCan } from "react-icons/fa6";
import {
  userAuthOperationCompleted,
  userRegister,
} from "@/store/userStore/slices/userSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import OperationAlert from "@/components/Pars/OperationAlert";
import { Suspense } from "react";
export interface FormVal {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  image: null | any;
}

const UserSignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActualComponent />
    </Suspense>
  );
};

const ActualComponent = () => {
  let user_type = useSearchParams().get("user_type");
  const [image, setImage] = useState("");

  const dispatch: any = useDispatch();

  const inputRef: any = useRef();

  const { error, loading, status } = useSelector(
    (state: GlobalState) => state.userSlice
  );

  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    image: yup.mixed(),
    last_name: yup.string().required("Last name is required"),
    first_name: yup.string().required("First name is required"),
  });

  const handleOnImageRemoveClick = () => {
    formik.setFieldValue("image", "");
    inputRef.current.value = "";
    setImage("");
  };

  const handleSubmit = async (values: any, actions: any) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    dispatch(userRegister(formData)).then((res: any) => {
      if (res.error) {
        return;
      } else {
        router.push(`/user/signup/signup-page/complete-signup`);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      image: "",
      user_type: user_type,
    } as FormVal,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div
      style={{
        backgroundImage: "url(/register.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <OperationAlert
        status={status}
        error={error}
        messageOnError={error}
        messageOnSuccess="Created successfuly"
        completedAction={userAuthOperationCompleted}
      />
      <div
        className="min-h-[100vh] p-6"
        style={{ backgroundColor: "#13181EDD" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackBtn textColor="text-[#FFF]" />
            <div className="flex flex-col">
              <p className="text-[#FFF] text-[16px]">welcome to</p>
              <p className="text-[#FFF] text-[18px] font-bold">
                York British Academy
              </p>
            </div>
          </div>
          <Image src="/logo.png" alt="logo image" width={50} height={50} />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <Input
            onChange={(value, e: any) => {
              console.log(e);
              formik.values.image = e.target.files[0];
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
            accept="image/png, image/gif, image/jpeg"
            type="file"
            ref={inputRef}
            hidden
          />

          <div className="flex flex-col lg:flex-row justify-between items-start md:gap-6 mt-9 md:px-20">
            <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 [&>div]:w-md w-full sm:max-w-[750px]">
              <div>
                <label htmlFor="first_name" className="text-[#FFF] text-[16px]">
                  First Name
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="text"
                  placeholder="Enter your first name"
                  onChange={(val: string) => (formik.values.first_name = val)}
                  name="first_name"
                  id="first_name"
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="error-mesage">{formik.errors.first_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="text-[#FFF] text-[16px]">
                  Last Name
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  placeholder="Enter your last name"
                  type="text"
                  onChange={(val: string) => (formik.values.last_name = val)}
                  name="last_name"
                  id="last_name"
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="error-mesage">{formik.errors.last_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-[#FFF] text-[16px]">
                  Email
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="email"
                  placeholder="example@gmail.com"
                  id="email"
                  name="email"
                  onChange={(val: string) => (formik.values.email = val)}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error-mesage">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="text-[#FFF] text-[16px]">
                  Password
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(val: string) => (formik.values.password = val)}
                  name="password"
                  id="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="error-mesage">{formik.errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="text-[#FFF] text-[16px]"
                >
                  Confirm Password
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={(val: string) =>
                    (formik.values.password_confirmation = val)
                  }
                  id="password_confirmation"
                  name="password_confirmation"
                />
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <p className="error-mesage">
                      {formik.errors.password_confirmation}
                    </p>
                  )}
              </div>
            </div>

            <div className="self-center min-w-fit order-first lg:order-last lg:self-start flex justify-center items-center flex-col mb-6 lg:mb-0">
              <div className="relative">
                <Image
                  onClick={() => inputRef?.current?.click()}
                  src={image ? image : "/default.jpg"}
                  width={150}
                  height={150}
                  alt="profile image"
                  className="w-[125px] h-[125px] rounded-sm cursor-pointer object-cover"
                />
                {formik.values.image && (
                  <div
                    className="absolute bottom-1 right-1 p-2 rounded-full"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >
                    <FaTrashCan
                      cursor="pointer"
                      color="red"
                      onClick={() => handleOnImageRemoveClick()}
                      size={20}
                    />
                  </div>
                )}
              </div>
              <p
                className="text-center text-[#fff] font-[600] text-[12px] mt-1.5 cursor-pointer underline"
                onClick={() => inputRef?.current?.click()}
              >
                {image ? "Change profile picture" : "Choose profile picture"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 md:px-20 w-full mt-20">
            <GoogleOAuthProvider clientId="507710031458-l9ir69lm854cg4ag6bfsumsneh6mg1s1.apps.googleusercontent.com">
              <GoogleLogin
                text="signup_with"
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  // let token = credentialResponse.credential;
                  // try {
                  //   axios
                  //     .post(
                  //       `https://cms.yorkacademy.uk/api/google/callback?token=${token}`
                  //     )
                  //     .then((res) => {
                  //       console.log(res);
                  //     });
                  // } catch (error) {
                  //   console.log(error);
                  // }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>

            <button
              className="colored-btn min-w-full sm:min-w-fit !text-[16px]"
              type="submit"
            >
              {loading ? <Loader size="sm" /> : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignupPage;
