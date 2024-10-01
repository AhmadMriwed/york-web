"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Languages } from "@/utils/categories";
import {
  getAdminProfile,
  loginAdmin,
} from "@/store/adminstore/slices/authSlice";
import { GlobalState } from "@/types/storeTypes";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import SplashLoading from "@/components/loading/SplashLoading";
import { ReactCountryFlag } from "react-country-flag";
import { Loader, SelectPicker } from "rsuite";
import Reveal from "react-awesome-reveal";

interface FormValues {
  email: string;
  password: string;
}
const cookies = new Cookies();

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const dispatch: any = useDispatch();
  const { error, loading, admin } = useSelector(
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

    try {
      dispatch(loginAdmin(data)).then((res: any) => {
        if (res.error) {
          console.log("request rejected");
          return;
        } else if (res.payload.is_verified) {
          router.push("/admin-dashboard");
        } else {
          router.push("/url/admin/admin-login/confirmemail");
        }
      });
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    // MOVE THIS TO root LAYOUT
    const token = cookies.get("admin_token");
    if (token !== undefined) {
      dispatch(getAdminProfile(token)).then((res: any) => {
        console.log(res);
        if (res.payload.is_verified) {
          router.push("/admin-dashboard");
        } else {
          console.log(token);
          router.push("/url/admin/admin-login/confirmemail");
        }
      });
    }
  }, [dispatch, router]);

  useEffect(() => {
    // Show the loading splash before the UI
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="max-w-[100vw] max-h-[100vh] overflow-hidden">
      <Image
        src="/adminlogin.png"
        alt="background image"
        fill
        className="object-cover z-[-1]"
      />

      {isLoading ? (
        <SplashLoading />
      ) : (
        <>
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
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={100}
                      height={100}
                    />
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
                    <input
                      type="password"
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

                    <Link
                      href="/admin/login/recoverpassword"
                      className="justify-self-end hover:no-underline"
                    >
                      <span className="text-md leading-8 text-[#16FACD]">
                        Forgot Your Password?
                      </span>
                    </Link>

                    <button
                      type="submit"
                      className="colored-btn !text-[16px] mt-4"
                    >
                      {loading ? <Loader size="sm" /> : "Sign in"}
                    </button>

                    {error && <span className="error">{error}</span>}

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
        </>
      )}
    </div>
  );
};

export default AdminLogin;
