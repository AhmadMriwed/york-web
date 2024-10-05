"use client";
import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Languages } from "@/utils/categories";
import Image from "next/image";
import Link from "next/link";
import { ReactCountryFlag } from "react-country-flag";
import { Loader, SelectPicker } from "rsuite";
import Reveal from "react-awesome-reveal";
import VisibleIcon from "@rsuite/icons/Visible";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import RemindOutlineIcon from "@rsuite/icons/RemindOutline";
import { trainerLogin } from "@/store/trainerStore/slices/trainerSlice";
import { GlobalState } from "@/types/storeTypes";
import axios from "axios";
import { loginAdmin } from "@/store/adminstore/slices/authSlice";
import { userLogin } from "@/store/userStore/slices/userSlice";

interface FormValues {
  email: string;
  password: string;
}

const ShowError = ({ error }: { error: any }) => {
  if (error)
    return (
      <div
        className="w-full flex justify-between items-center py-[10px] px-[15px] mb-4 border-[var(--secondary-color-red)] border-[1px]
                      rounded-[8px]"
      >
        <RemindOutlineIcon
          style={{
            color: "var(--secondary-color-red)",
            fontSize: "20px",
          }}
        />
        <p className="text-[16px] text-[var(--secondary-color-red)] font-bold">
          {error}
        </p>
      </div>
    );
  else return;
};

const Login = ({ userType }: { userType: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const dispatch: any = useDispatch();
  const { error: trainerError, loading: trainerLoading } = useSelector(
    (state: GlobalState) => state.trainerSlice
  );
  const { error: userError, loading: userLoading } = useSelector(
    (state: GlobalState) => state.userSlice
  );
  const { error: adminError, loading: adminLoading } = useSelector(
    (state: GlobalState) => state.authSlice
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values: FormValues) => {
    let data = { email: values.email, password: values.password };

    if (userType === "admin") {
      dispatch(loginAdmin(data)).then((res: any) => {
        if (res.error) {
          return;
        } else if (!res?.payload?.is_verified) {
          router.push("/admin/login/confirm-email");
        } else {
          router.push("/admin/dashboard");
        }
      });
    } else if (userType === "trainer") {
      dispatch(trainerLogin(data)).then((res: any) => {
        if (res.error) {
          return;
        } else if (!res?.payload?.is_verified) {
          router.push("/trainer/login/confirm-email");
        } else {
          router.push("/");
        }
      });
    } else {
      dispatch(userLogin(data)).then((res: any) => {
        if (res.error) {
          return;
        } else if (!res?.payload?.is_verified) {
          router.push("/user/login/confirm-email");
        } else {
          router.push("/");
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const Language = Languages.map((language) => ({
    label: (
      <div className="flex items-center justify-center gap-[0.5rem]">
        <ReactCountryFlag countryCode={language.countryCode} svg />
        <p className="text-sm">{language.name}</p>
      </div>
    ),
    value: language.value.toLowerCase(),
  }));

  return (
    <div className="max-w-[100vw] max-h-[100vh] overflow-hidden">
      <Image
        src={userType === "admin" ? "/adminlogin.png" : "/userlogin.png"}
        alt="background image"
        fill
        className="object-cover z-[-1]"
      />
      <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,212,212,0.58)] mix-blend-color z-[-1]"></div>

      <Reveal triggerOnce duration={1000}>
        <div className="min-h-[100vh] min-w-[100vw] flex items-start justify-between px-8 py-4">
          <div className="hidden md:block">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>

          <div
            className="flex items-center justify-center absolute w-full h-full top-0 right-0  md:top-[50%] md:right-[10.75rem] md:translate-y-[-50%]
              md:w-[500px] md:h-[calc(100vh-2rem)] md:rounded-[9px] bg-[rgba(19,24,30,0.9)]"
          >
            <div className="flex flex-col items-center w-[calc(100%-4rem)] h-[calc(100%-4rem)] md:py-8 md:px-4 text-[#FFF]">
              <div className="md:hidden pb-4">
                <Image src="/logo.png" alt="logo" width={100} height={100} />
              </div>
              <span className="text-base text-xl md:text-2xl mb-1.5 tracking-widest">
                welcome to
              </span>
              <p className="text-3xl sm:text-3xl md:text-4xl font-semibold mb-10">
                York British Academy
              </p>

              <form
                onSubmit={formik.handleSubmit}
                className="grid w-full costum_form"
              >
                {userType === "admin" && <ShowError error={adminError} />}
                {userType === "trainer" && <ShowError error={trainerError} />}
                {userType === "user" && <ShowError error={userError} />}

                <span className="text-base tracking-widest mb-4">
                  Welcome Back!
                </span>
                {formik.touched.email && formik.errors.email && (
                  <p className="error-mesage">{formik.errors.email}</p>
                )}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className={`login-input mb-4 ${
                    formik.errors.email
                      ? "!border-[var(--secondary-color-red)]"
                      : ""
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="error-mesage">{formik.errors.password}</p>
                )}
                <div className="w-full relative">
                  <div
                    className="absolute top-[50%] translate-y-[-95%] right-3.5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeCloseIcon style={{ fontSize: "16px" }} />
                    ) : (
                      <VisibleIcon style={{ fontSize: "16px" }} />
                    )}
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className={`login-input mb-4 ${
                      formik.errors.password
                        ? "!border-[var(--secondary-color-red)]"
                        : ""
                    }`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>

                <Link
                  href={
                    userType === "admin"
                      ? "/admin/login/recover-password"
                      : userType === "trainer"
                      ? "/trainer/login/recover-password"
                      : "/user/login/recover-password"
                  }
                  className="justify-self-end hover:no-underline"
                >
                  <span className="text-md leading-8 text-[#16FACD]">
                    Forgot Your Password?
                  </span>
                </Link>

                {userType !== "admin" && (
                  <div className="my-4">
                    <GoogleOAuthProvider clientId="507710031458-l9ir69lm854cg4ag6bfsumsneh6mg1s1.apps.googleusercontent.com">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          // console.log(credentialResponse);
                          let token = credentialResponse.credential;
                          try {
                            axios
                              .post(
                                `https://cms.yorkacademy.uk/api/google/callback?token=${token}`
                              )
                              .then((res) => {
                                console.log(res);
                              });
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </GoogleOAuthProvider>
                  </div>
                )}

                <button type="submit" className="colored-btn !text-[16px] mt-4">
                  {adminLoading || trainerLoading || userLoading ? (
                    <Loader size="sm" />
                  ) : (
                    "Sign in"
                  )}
                </button>

                {userType !== "admin" && (
                  <p className="w-full flex items-center justify-center mt-6">
                    Not a Member?
                    <Link
                      href={
                        userType === "trainer"
                          ? "/trainer/signup"
                          : "/user/signup"
                      }
                      className="text-[#16FACD] hover:text-[#16FACD] ml-1.5"
                    >
                      Signup
                    </Link>
                  </p>
                )}

                <div
                  style={{
                    width: 150,
                    position: "absolute",
                    bottom: 15,
                    right: 15,
                  }}
                >
                  <SelectPicker
                    data={Language}
                    placement="top"
                    className="w-full"
                    searchable={false}
                    id="language"
                    name="language"
                    placeholder="Language"
                    onChange={() => {}}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Login;
