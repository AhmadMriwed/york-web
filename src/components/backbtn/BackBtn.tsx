'use client'
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from "react-icons/fa6";
import React from 'react'

const BackBtn = ({textColor}:{textColor: string}) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={textColor} ><FaArrowLeftLong  className='text-xl'/></button>
  )
}

export default BackBtn