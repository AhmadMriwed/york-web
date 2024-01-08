import React from 'react'

const RecoverPassword = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='py-11 text-xl font-bold text-white tracking-wider'>Password Recovery: Email</p>
      <div className='flex flex-col px-8 py-8 border-l-2 border-[#01989F] md:w-[450px]'>
        <label htmlFor="" className='text-base'>Email</label>
        <input type="email" className='login-input' />
        <button className='colored-btn'>confirm</button>
      </div>
    </div>
  )
}

export default RecoverPassword