import React from 'react'

const ResetPassword = () => {
  return (
    <>
    <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Password Change</p>
    <div className='flex items-center justify-center h-[calc(100vh-142px)]'>
      <div className='border-l-2 border-[#01989F] md:w-[750px] p-8'>
        <div className='flex flex-col md:flex-row justify-between gap-2'>
          <div>
            <label htmlFor="" className='text-base text-white'>Password</label>
            <input type="email" className='login-input' />
          </div>
          <div>
            <label htmlFor="" className='text-base text-white'>Confirm Password</label>
            <input type="email" className='login-input' />
          </div>
        </div>
        <button className='colored-btn'>submit</button>
      </div>
    </div>
    </>
  )
}

export default ResetPassword