'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {

  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      // Perform form submission logic here
      console.log(values);
      // Set submitting to false after successful submission
      setSubmitting(false);
    } catch (error) {
      // Handle form submission error
      console.error(error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Password Change</p>
      <div className='flex items-center justify-center h-[calc(100vh-142px)]'>
        <form onSubmit={formik.handleSubmit} className='border-l-2 border-[#01989F] md:w-[750px] p-8'>
          <div className='flex flex-col md:flex-row justify-between gap-2'>
            <div>
              <label htmlFor="" className='text-base text-white'>Password</label>
              <div className='relative w-full md:w-[350px]'>
                <input className='login-input'
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
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
            <div>
              <label htmlFor="" className='text-base text-white'>Confirm Password</label>
              <div className='relative w-full md:w-[350px]'>
                <input className='login-input'
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
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="error">{formik.errors.confirmPassword}</div>
              )}
            </div>
          </div>
          <button className='colored-btn'>submit</button>
        </form>
      </div>
    </>
  )
}

export default ResetPassword