import Image from 'next/image'
import React from 'react'

const SplashLoading = () => {
  return (
    <>
    <div className='w-full h-full absolute top-0 left-0 bg-[rgba(0,212,212,0.7)] z-[-1]'></div>

    <div className='flex items-center justify-center h-[100vh]'>
      <Image src='/logo.png' alt='logo' width={150} height={150}/>
    </div>
    </>
  )
}

export default SplashLoading