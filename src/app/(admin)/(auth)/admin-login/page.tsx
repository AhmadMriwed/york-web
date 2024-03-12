'use client'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import axios, { AxiosError } from 'axios'
import { baseURL } from '@/utils/api'
import SplashLoading from '@/components/loading/SplashLoading'
import Link from 'next/link'
import { FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Languages } from "@/utils/categories"
import Select from "react-select"
import { ReactCountryFlag } from "react-country-flag"
import { Flex, Button, Text, Spinner, useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProfile, loginAdmin } from '@/store/adminstore/slices/authSlice'
import { GlobalState } from '@/types/storeTypes'
import UpdatePasswordModal from '@/components/UpdatePassModal/UpdatePasswordModal'
import { Email } from '@rsuite/icons'
import { useFormik } from 'formik'
import * as Yup from "yup"
interface FormValues {
  email: string;
  password: string;

}
const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: any = useDispatch()
  const router = useRouter()
  const cookies = new Cookies();
  const { error, loading, admin } = useSelector((state: GlobalState) => state.authSlice)
  console.log(error, loading, admin)
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .required('Password is required'),

  });
  const handleSubmit = (values: FormValues) => {
    console.log(values)
    let data = { email: values.email, password: values.password }
    try {
      dispatch(loginAdmin(data)).then((res: any) => {
        console.log(res)
        if (res.error) {
          console.log("request rejected")
          return
        } else if (res.payload.is_verified) {
          router.push("/")
        } else {
          router.push("/admin-login/confirmemail")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      language: "english"
    } ,
    validationSchema,
    onSubmit: handleSubmit
  })

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 40,
      width: 150
    })
  };

  const Language = Languages.map(language => ({
    value: language.value.toLowerCase(),
    label: (
      <Flex alignItems='center' gap='0.5rem'>
        <ReactCountryFlag countryCode={language.countryCode} svg />
        <Text fontSize={"small"} >{language.name}</Text>
      </Flex>
    ),
  }));
  // useEffect(() => {
  //   console.log(cookies.get("token"))
  //   const token = cookies.get("admin_token")
  //   if (token !== undefined) {
  //     dispatch(getAdminProfile(token)).then((res: any) => {
  //       console.log(res)
  //       if (res.payload.is_verified) {
  //         router.push("/")
  //       } else {
  //         router.push("/admin-login/confirmemail")
  //       }

  //     })

  //   }

  // }, [])
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className='max-w-[100vw] max-h-[100vh] overflow-hidden'>
      <Image src='/adminlogin.png' alt='' fill className='object-cover z-[-1]' />
      {isLoading ? (
        <SplashLoading />
      ) : (
        <>
          <div className='w-full h-full absolute top-0 left-0 bg-[rgba(0,212,212,0.58)] mix-blend-color z-[-1]'></div>

          <div className='flex items-start justify-between px-8 py-4'>
            <div className='hidden md:block'>
              <Image src='/logo.png' alt='logo' width={100} height={100} />
            </div>
            <div className='flex items-center justify-center absolute w-full h-full top-0 right-0  md:top-[50%] md:right-[10.75rem] md:translate-y-[-50%]  md:w-[450px] md:h-[calc(100vh-2rem)] md:rounded-[9px] bg-[rgba(19,24,30,0.9)]'>
              <div className='flex flex-col items-center md:items-start w-[calc(100%-4rem)] h-[calc(100%-4rem)] py-8 px-8 text-[#fff]'>
                <div className=' md:hidden pb-4'>
                  <Image src='/logo.png' alt='logo' width={100} height={100} />
                </div>
                <span className='text-base tracking-widest'>welcome to</span>
                <p className='text-[27px] font-bold pb-9 text-center'>York British Academy</p>

                <form onSubmit={formik.handleSubmit} className='grid w-full costum_form'>
                  <span className='text-base tracking-widest mb-3'>Welcome Back!</span>
                  <input
                    className='login-input'
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="error-mesage">{formik.errors.email}</p>
                  )}
                  <div className='relative w-full md:w-[350px] mt-1'>
                    <input
                      className='login-input'
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
                    <p className="error-mesage">{formik.errors.password}</p>
                  )}

                  <Link href='/admin-login/recoverpassword' className='justify-self-end hover:no-underline'><span className='text-sm tracking-widest leading-8 text-[#16FACD]'>Forgot Your Password ? </span>
                  </Link>
                  <div className='justify-self-end ' >
                    <UpdatePasswordModal type={"admin"} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                    <button onClick={onOpen} type='button' className='text-sm tracking-widest leading-8 text-[#16FACD]'>change your password</button>
                  </div>

                  <div className=" rounded-[5px] text-sm text-white p-2 max-w-fit mt-2">
                    {/* <Link href={`http://127.0.0.1:8000/login-google`} className='flex items-center gap-3 hover:no-underline hover:text-inherit '>
                      <div>
                        <FaGoogle />
                      </div>
                      <p>
                        <b>Login with Google</b>
                      </p>
                    </Link> */}
                  </div>
                  <button type='submit' className='colored-btn mt-6'>{loading ? <Spinner size={"sm"} color='red' /> : "Sign In"}</button>

                  {error && <span className="error">{error}</span>}

                  <div style={{ width: 150, color: "black", position: "absolute", bottom: 10, right: 4, borderRadius: 20 }}>
                    <Select placeholder="Languages" menuPlacement='top' styles={customStyles} options={Language}
                      onChange={(e) => formik.setFieldValue("language", e?.value)}
                      name='language'
                      id='language'
                      components={{ IndicatorSeparator: () => null }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}


export default AdminLogin