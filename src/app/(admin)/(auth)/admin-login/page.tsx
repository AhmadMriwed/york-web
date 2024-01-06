'use client'
import SplashLoading from '@/components/loading/SplashLoading'
import Image from 'next/image'
import React, { useState } from 'react'
import './adminlogin.css'
import { Dropdown, Input } from 'rsuite'

const AdminLogin = () => {

  return (
    <div className='w-screen h-screen relative'>
      <Image src='/adminlogin.png' alt='' fill className='object-cover z-[-1]' />
      <div className='w-full h-full absolute top-0 left-0 bg-[#00d4d494] mix-blend-color z-[-1]'></div>
      <div className='flex items-start justify-between p-8'>
        <div className='hidden md:block'>
          <Image src='/logo.png' alt='logo' width={100} height={100}/>
        </div>
        <div className='flex items-center justify-center absolute w-full h-full top-0 right-0  md:top-[50%] md:right-[10.75rem] md:translate-y-[-50%]  md:w-[450px] md:h-[calc(100vh-8rem)] md:rounded-[9px] bg-[#13181ef3] backdrop-blur-[3px]'>
          <div className='flex flex-col items-center md:items-start w-[calc(100%-4rem)] h-[calc(100%-4rem)] py-8 px-8 text-[#fff]'>
            <div className=' md:hidden pb-4'>
              <Image src='/logo.png' alt='logo' width={100} height={100}/>
            </div>
            <span className='text-base tracking-widest'>welcome to</span>
            <p className='text-[27px] font-bold pb-9 text-center'>York British Academy</p>
            <form action="" className='grid w-full costum_form'>
              <span className='text-base tracking-widest mb-3'>Welcome Back!</span>
              <Input type='email' placeholder="Enter Your Email" id='email' required />
              <Input type='password' placeholder="Enter Your Password" id='email' required />
              <span className='justify-self-end text-sm tracking-widest leading-8 text-[#16FACD] cursor-pointer'>Forgot Your Password ? </span>
              <button className='justify-self-center bg-[#01989F] text-white w-[150px] h-[44px] px-4 py-2 rounded-[6px] mt-11'>Sign In</button>
              <Dropdown title="Select Lang" placement="topEnd" className='absolute right-0 bottom-0 px-2 py-2 languag-btn'>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
              </Dropdown>
              {/* <select className='absolute left-0 bottom-0'
                  value={priority} onChange={(e) => setPriority(e.target.value)}
              >
                <option disabled value="">Select Lng</option>
                <option value="english">En</option>
                <option value="arabic">Ar</option>
              </select> */}
            </form>
          </div>
        </div>
      </div>

      
        {/* <div className='logo_splash'>
          <SplashLoading/>
        </div> */}
    
    </div>
  )
}

export default AdminLogin