import Image from 'next/image'
import React from 'react'
import { Input } from 'rsuite'
import 'rsuite/dist/rsuite.min.css';
// import 'rsuite/dist/rsuite-no-reset.min.css';


const Topbar = () => {
  return (
    <div className='flex fixed top-0 left-0 w-[100vw] md:pl-[286px] xl:pl-[316px] h-[70px] bg-[#86858526]'>
      <div className='flex items-center'>
        <div className='hidden'>
          <Image src={'/logo.png'} alt='' width={110} height={100} />
        </div>
        <div>
          <input placeholder="Search" className='rounded-2xl p-2 ' />
        </div>
      </div>
    </div>
  )
}

export default Topbar