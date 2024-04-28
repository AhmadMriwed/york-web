import BackBtn from '@/components/backbtn/BackBtn'
import Image from 'next/image'
import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
const PasswordLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='bg-[#13181E] h-[100vh] overflow-hidden mix-blend-multiply px-4 p-5'>
      <Flex alignItems={"center"} justifyContent={{ base: "center", md: "space-between" }} paddingY={2} height={70}>
        <Box display={{ base: "none", md: "block" }}><BackBtn textColor='text-white' /></Box>
        <Image src='/logo.png' alt='' width={55} height={55} />
      </Flex>
      <div className='min-h-[calc(100vh-70px)]'>
        {children}
      </div>
    </div>
  )
}

export default PasswordLayout