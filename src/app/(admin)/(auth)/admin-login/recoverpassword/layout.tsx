import BackBtn from '@/components/backbtn/BackBtn'
import Image from 'next/image'
import React from 'react'

const PasswordLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div className='bg-[#13181E] mix-blend-multiply'>
        <div className='flex items-center justify-between w-[100vw] h-[70px] px-4 py-2'>
            <BackBtn textColor='text-white'/>
            <Image src='/logo.png' alt='' width={55} height={55} />
        </div>
        <div className='w-[100vw] px-4 min-h-[calc(100vh-70px)]'>
            {children}
        </div>
    </div>
  )
}

export default PasswordLayout