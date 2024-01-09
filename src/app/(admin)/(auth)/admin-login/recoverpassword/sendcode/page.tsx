import React from 'react'

const SendCode = () => {
  const failds= ['Email']
  return (
    <>
    <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Code Verification</p>
    <div className='flex items-center justify-center h-[calc(100vh-142px)]'>
      <div className='border-l-2 border-[#01989F] md:w-[450px] p-8'>
        <label htmlFor="" className='text-base'>Email</label>
        <input type="email" className='login-input' />
        <button className='colored-btn'>confirm</button>
      </div>
    </div>
    </>
  )
}

export default SendCode