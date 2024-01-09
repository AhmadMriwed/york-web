import React from 'react'

const RecoverPassword = () => {
  return (
    <>
    <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Email</p>
    <div className='flex items-center justify-center h-[calc(100vh-142px)]'>
      <div className='border-l-2 border-[#01989F] md:w-[450px] p-8'>
        <label htmlFor="" className='text-base text-white'>Email</label>
        <input type="email" className='login-input' />
        <button className='colored-btn'>confirm</button>
      </div>
    </div>
    </>
  )
}

export default RecoverPassword