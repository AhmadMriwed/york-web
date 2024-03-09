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
import { Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { Languages } from "@/utils/categories"
import { ReactCountryFlag } from "react-country-flag"
import Select from "react-select"
import { getTrainerProfile, trainerLogin } from '@/store/trainerStore/slices/trainerSlice'
import { useDispatch, useSelector } from 'react-redux'
import AddTrainerModal from '@/components/trainer/AddTrainerModal'
import { useFormik } from 'formik'
import * as Yup from "yup"

const TrainerLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch: any = useDispatch()
  const { error, loading, trainer } = useSelector((state: any) => state.trainerSlice)

  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const cookies = new Cookies()
  console.log(trainer, loading, error)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setisLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const customStyles = {
    control: base => ({
      ...base,
      height: 40,
      width: 150
    })
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
      language:Yup.string()

  });
  const handleSubmit = (values: any, actions: any) => {

    console.log(values)
    let data = { email: values.email, password: values.password }
    try {
      dispatch(trainerLogin(data)).then((res) => {
        console.log(res)
        console.log("logged in success")
        if (res.error) {
          console.log("request rejected")
          return
        } else if (res.payload.is_verified) {
          router.push("/")
        } else {
          router.push("/trainer-login/confirmemail")
        }
      })
    } catch (error: any) {
      console.log(error.message)
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      language: "english",

    },
    validationSchema,
    onSubmit: handleSubmit
  })
  const Language = Languages.map(language => ({
    value: language.value.toLowerCase(),
    label: (
      <Flex alignItems='center' gap='0.5rem'>
        <ReactCountryFlag countryCode={language.countryCode} svg />
        <Text fontSize={"small"} >{language.name}</Text>
      </Flex>
    ),
  }));

  useEffect(() => {
    console.log(cookies.get("trainer_token"))
    const token = cookies.get("trainer_token")
    if (token !== undefined) {
      dispatch(getTrainerProfile(token)).then((res) => {
        console.log(res)
        if (res.payload.is_verified) {
          router.push("/")
        } else {
          router.push(`/trainer-login/confirmemail`)
        }

      })

    }

  }, [])
  return (
    <div className='max-w-[100vw] max-h-[100vh] overflow-hidden'>
      <Image src='/userlogin.png' alt='' fill className='object-cover z-[-1]' />
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
                  <input type='email' placeholder="Enter Your Email" id='email'
                    className='login-input'
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error-mesage">{formik.errors.email}</div>
                  )}
                  <input type='password' placeholder="Enter Your Password" id='password'
                    className='login-input'
                    name="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />

                  {formik.touched.password && formik.errors.password && (
                    <p className="error-mesage">{formik.errors.password}</p>
                  )}
                  <Link href='/trainer-login/recoverpassword' className='justify-self-end hover:no-underline'><span className='text-sm tracking-widest leading-8 text-[#16FACD]'>Forgot Your Password ? </span></Link>
                  <div className='justify-self-end' >
                    <AddTrainerModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                    <button onClick={onOpen} type='button' className='text-sm tracking-widest leading-8 text-[#16FACD]'>change your password</button>
                  </div>
                  <div className="bg-[rgba(204,76,76,0.1)] rounded-[5px] text-sm text-white p-2 max-w-fit mt-2">
                    <Link href={`http://127.0.0.1:8000/login-google`} className='flex items-center gap-3 hover:no-underline hover:text-inherit '>
                      <div>
                        <FaGoogle />
                      </div>
                      <p>
                        <b>Login with Google</b>
                      </p>
                    </Link>
                  </div>
                  <button type='submit' className='colored-btn mt-6'>{loading ? <Spinner size={"sm"} color='red' /> : "Sign In"}</button>
                  <p className='justify-self-center mt-2'>Not a Member ? <Link href='/trainer-signup' className='text-[#16FACD] underline hover:text-[#16FACD]'>Sign Up</Link></p>
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

export default TrainerLogin
