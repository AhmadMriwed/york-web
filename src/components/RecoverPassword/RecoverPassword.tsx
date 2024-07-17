"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface FormValues {
   email?: string;
   password?: string;
   confirmPassword?: string;
   code?: number | undefined;
}
type PasswordTitleProps = {
   title: "Email" | "Code Verification" | "Password Change";
};
import { useRouter } from "next/navigation";
const RecoverPassword = ({ title }: PasswordTitleProps) => {
   const [submitting, setSubmitting] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const router = useRouter();

   const validationSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
         .min(6, "Password must be at least 6 characters")
         .required("Password is required"),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref("password")], "Passwords must match")
         .required("Confirm Password is required"),
      code: Yup.number().required("Enter the code"),
   });

   const handleSubmit = async (values: FormValues) => {
      try {
         // Perform form submission logic here
         router.push("/");

         console.log(values);
         // Set submitting to false after successful submission
         //   setSubmitting(false);
      } catch (error) {
         // Handle form submission error
         console.error(error);
         setSubmitting(false);
      }
   };

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
         confirmPassword: "",
         code: undefined,
      },
      validationSchema,
      onSubmit: handleSubmit,
   });

   console.log(formik.errors, "error");

   return (
      <>
         <p className="py-5 text-xl font-bold text-white tracking-wider leading-8">
            Password Recovery: {title}
         </p>
         <div className="flex items-center justify-center h-[calc(100vh-142px)]">
            <form
               onSubmit={formik.handleSubmit}
               className="border-l-2 border-[#01989F] md:w-[450px] p-8"
            >
               {title === "Email" && (
                  <>
                     <label htmlFor="" className="text-base text-white">
                        Email
                     </label>
                     <input
                        className="login-input"
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                     />
                     {formik.touched.email && formik.errors.email && (
                        <div className="error">{formik.errors.email}</div>
                     )}
                     <button type="submit" className="colored-btn">
                        confirm
                     </button>
                  </>
               )}

               {title === "Password Change" && (
                  <>
                     <div className="flex flex-col md:flex-row justify-between gap-2 flex-wrap">
                        <div>
                           <label htmlFor="" className="text-base text-white">
                              Password
                           </label>
                           <div className="relative w-full md:w-[350px]">
                              <input
                                 className="login-input"
                                 type={showPassword ? "text" : "password"}
                                 id="password"
                                 name="password"
                                 value={formik.values.password}
                                 onChange={formik.handleChange}
                              />
                              <div className="absolute right-0 top-[50%] -translate-y-1/2 w-[40px] element-center">
                                 {showPassword ? (
                                    <FiEye
                                       onClick={() => setShowPassword(false)}
                                       className="text-[18px]"
                                    />
                                 ) : (
                                    <FiEyeOff
                                       onClick={() => setShowPassword(true)}
                                       className="text-[18px]"
                                    />
                                 )}
                              </div>
                           </div>
                           {formik.touched.password &&
                              formik.errors.password && (
                                 <div className="error">
                                    {formik.errors.password}
                                 </div>
                              )}
                        </div>
                        <div>
                           <label htmlFor="" className="text-base text-white">
                              Confirm Password
                           </label>
                           <div className="relative w-full md:w-[350px]">
                              <input
                                 className="login-input"
                                 type={showPassword ? "text" : "password"}
                                 id="confirmPassword"
                                 name="confirmPassword"
                                 value={formik.values.confirmPassword}
                                 onChange={formik.handleChange}
                              />
                              <div className="absolute right-0 w-[40px] top-[50%] -translate-y-1/2 element-center">
                                 {showPassword ? (
                                    <FiEye
                                       onClick={() => setShowPassword(false)}
                                       className="text-[18px]"
                                    />
                                 ) : (
                                    <FiEyeOff
                                       onClick={() => setShowPassword(true)}
                                       className="text-[18px]"
                                    />
                                 )}
                              </div>
                           </div>
                           {formik.touched.confirmPassword &&
                              formik.errors.confirmPassword && (
                                 <div className="error">
                                    {formik.errors.confirmPassword}
                                 </div>
                              )}
                        </div>
                     </div>
                     <button type="submit" className="colored-btn">
                        submit
                     </button>
                  </>
               )}

               {title === "Code Verification" && (
                  <>
                     <label htmlFor="" className="text-base text-white">
                        Enter The Code
                     </label>
                     <input
                        type="text"
                        className="login-input"
                        id="code"
                        name="code"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                     />
                     <div className="flex flex-col md:flex-row justify-between">
                        <button className="self-end text-base text-[#01989F] underline mt-3 md:mt-0">
                           Resend code
                        </button>
                        <button type="submit" className="colored-btn">
                           confirm
                        </button>
                     </div>
                  </>
               )}
            </form>
         </div>
      </>
   );
};

export default RecoverPassword;
