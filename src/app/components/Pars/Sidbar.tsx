import Image from 'next/image'
import React from 'react'



const Sidbar = () => {
  return (
    <div className='hidden md:flex flex-col md:w-[270px] lg:w-[300px] h-[100vh] dark_gradient_background items-center gap-3 p-5 text-[#FFFEFE] fixed top-0 left-0'>
      <div className='flex flex-col items-center justify-center '>
        <Image src={'/logo.png'} alt='' width={110} height={100} />
        <span className='pt-5 pb-0 text-xs font-montserrat' >welcom to</span>
        <p className='font-montserrat'>Admin Dashboard</p>
      </div>
      <div className='w-[150px] bg-[var(--primary-color1)] h-[0.5px]'></div>
      <div>

      </div>
    </div>
  )
}

export default Sidbar