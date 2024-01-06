import Image from 'next/image'
import React from 'react'

const SplashLoading = () => {
  return (
    <div className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] relative'>
      <Image src='/logo.png' alt='logo' fill/>
    </div>
  )
}

export default SplashLoading