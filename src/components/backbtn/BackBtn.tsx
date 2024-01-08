'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

const BackBtn = ({textColor}:{textColor: string}) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={textColor}>back</button>
  )
}

export default BackBtn