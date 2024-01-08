'use client'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import axios, { AxiosError } from 'axios'
import { baseURL } from '@/utils/api'
import SplashLoading from '@/components/loading/SplashLoading'
import Link from 'next/link'



const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    language: 'english',
});

const router = useRouter();
const [loading, setLoading] = useState(true);
const cookie = new Cookies();
const [error, setErr] = useState("");



useEffect(() => {
  const timeoutId = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timeoutId);
}, []);

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({...form, [e.target.name] : e.target.value});
};
const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setForm({...form, [e.target.name] : e.target.value});
};

// const handleSubmit = () => {
//   dispatch(
//     addNewCourse({
//       titleLess,
//       describtion,
//       start_at,
//       end_at,
//       author_name,
//       priceLess,
//       lessonNumber,
//       cardImg,
//       rating,
//       button
//     })
//   ).then(res => {
//           router.push('/courses')
//   });
// };

// async function handleSubmite (e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault();
//   setLoading(true);
//   try{
//       const res = await axios.post(`${baseURL}/`, form);
//       console.log(res);
      
//       // setLoading(false);
//       // const token = res.data.token;
//       // cookie.set('bearer', token);
//       //router.push('/dashboard/users');
//   }catch (err: any) {
//       setLoading(false);
//       if (err.response.status === 401){
//           setErr("wrong email or password");
//       }else {
//           setErr("Internal server error");
//       }
//   }
// }

  return (
    <div className='max-w-[100vw] max-h-[100vh] overflow-hidden'>
      <Image src='/adminlogin.png' alt='' fill className='object-cover z-[-1]' />
      {loading? (
          <SplashLoading/>
      ):(
      <>
      <div className='w-full h-full absolute top-0 left-0 bg-[rgba(0,212,212,0.58)] mix-blend-color z-[-1]'></div>
        
      <div className='flex items-start justify-between p-8'>
        <div className='hidden md:block'>
          <Image src='/logo.png' alt='logo' width={100} height={100}/>
        </div>
        <div className='flex items-center justify-center absolute w-full h-full top-0 right-0  md:top-[50%] md:right-[10.75rem] md:translate-y-[-50%]  md:w-[450px] md:h-[calc(100vh-8rem)] md:rounded-[9px] bg-[rgba(19,24,30,0.9)]'>
          <div className='flex flex-col items-center md:items-start w-[calc(100%-4rem)] h-[calc(100%-4rem)] py-8 px-8 text-[#fff]'>
            <div className=' md:hidden pb-4'>
              <Image src='/logo.png' alt='logo' width={100} height={100}/>
            </div>
            <span className='text-base tracking-widest'>welcome to</span>
            <p className='text-[27px] font-bold pb-9 text-center'>York British Academy</p>

            <form  action="" className='grid w-full costum_form'>
              <span className='text-base tracking-widest mb-3'>Welcome Back!</span>
              <input type='email' placeholder="Enter Your Email" id='email' 
                      className='login-input'
                      name="email"
                      value={form.email}
                      onChange ={onChange } 
                      required />
              <input type='password' placeholder="Enter Your Password" id='password' 
                      className='login-input'
                      name="password"
                      value={form.password} 
                      onChange ={onChange } 
                      required />
              <Link href='/admin-login/recoverpassword' className='justify-self-end'><span className='text-sm tracking-widest leading-8 text-[#16FACD]'>Forgot Your Password ? </span></Link>
              <button type='submit' className='colored-btn'>Sign In</button>

              {error !== "" && <span className="error">{error}</span>}
              <select className='absolute right-8 bottom-4 text-[#13181E] rounded-md h-6 max-w-[70px] text-base'
                  value={form.language} 
                  name='language'
                  onChange ={onSelect } 
                  >
                <option disabled value="">Select Lng</option>
                <option value="english">En</option>
                <option value="arabic">Ar</option>
              </select>
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