import React from 'react'

const SendCode = () => {
  const failds= ['Email']
  return (
    <>
    <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Code Verification</p>
    <div className='flex items-center justify-center h-[calc(100vh-142px)]'>
      <div className='border-l-2 border-[#01989F] md:w-[450px] p-8'>
        <label htmlFor="" className='text-base text-white'>Enter The Code</label>
        <input type="email" className='login-input' />
        <div className='flex flex-col md:flex-row justify-between'>
          <button className='colored-btn'>confirm</button>
          <button className='self-end text-base text-[#01989F] underline mt-3 md:mt-0'>Resend code</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default SendCode