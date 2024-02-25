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
import { useFormik } from 'formik';
import { Languages } from "@/utils/categories"
import Select from "react-select"
import { ReactCountryFlag } from "react-country-flag"
import { Flex, Avatar, Text, Spinner } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProfile, loginAdmin } from '@/store/adminstore/slices/authSlice'
import { GlobalState } from '@/types/storeTypes'
const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch: any = useDispatch()
  const router = useRouter()
  const cookies = new Cookies();
  const { error, loading, admin } = useSelector((state: GlobalState) => state.authSlice)
  console.log(error, loading, admin)
  const [form, setForm] = useState({
    email: "",
    password: "",
    language: 'english',
  });
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    let data = { email: form.email, password: form.password }
    try {
      dispatch(loginAdmin(data)).then((res) => {
        console.log(res)
        console.log("logged in success")
      })
    } catch (error: any) {
      console.log(error.message)
    }
  };

  const customStyles = {
    control: base => ({
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
  useEffect(() => {
    console.log(cookies.get("token"))
    const token = cookies.get("token")
    if (token) {
      dispatch(getAdminProfile(token)).then(() => {
        router.push("/")
      })

    }

  }, [admin])
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

                <form onSubmit={handleSubmit} className='grid w-full costum_form'>
                  <span className='text-base tracking-widest mb-3'>Welcome Back!</span>
                  <input
                    className='login-input'
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={onChange}
                  />
                  {/* {error && (
                    <div className="error-mesage">{error}</div>
                  )} */}
                  <div className='relative w-full md:w-[350px] mt-1'>
                    <input
                      className='login-input'
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={form.password}
                      required
                      onChange={onChange}
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
                  {/* {error && (
                    <div className="error-mesage">{error}</div>
                  )} */}
                  <Link href='/admin-login/recoverpassword' className='justify-self-end hover:no-underline'><span className='text-sm tracking-widest leading-8 text-[#16FACD]'>Forgot Your Password ? </span></Link>
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
                  <button type='submit' disabled={submitting} className='colored-btn'>{loading ? <Spinner size={"sm"} color='red' /> : "Sign In"}</button>

                  {error && <span className="error">{error}</span>}

                  <div style={{ width: 150, color: "black", position: "absolute", bottom: 10, right: 4, borderRadius: 20 }}>
                    <Select placeholder="Languages" menuPlacement='top' styles={customStyles} options={Language}
                      onChange={(e) => setForm({ ...form, language: e.value })}
                      name='Category'
                      id='Category'
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