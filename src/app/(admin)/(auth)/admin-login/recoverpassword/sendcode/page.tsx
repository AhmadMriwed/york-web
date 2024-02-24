"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Flex, Box, FormLabel, Input, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
const SendCode = () => {
  const [code, setCode] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()
  const {error,loading,msg}=useSelector((state:any)=>state.authSlice)
  console.log(error,loading,msg)
  // () => router.push("/admin-login/recoverpassword/sendcode/resetpassword")
  const handleSubmit=()=>{
console.log(code)
try {
  
} catch (error:any) {
  console.log(error.mesage)
}
  }
  return (
    <>
      <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Code Verification</p>
      <Flex alignItems={"center"} justifyContent={"center"} className=' h-[calc(100vh-142px)]'>
        <Box className='lg:border-l-2 border-[#01989F] md:w-[450px] p-8'>
          <FormLabel htmlFor="" className='text-base text-white'>Enter The Code</FormLabel>
          <Input type="number" width={300} backgroundColor={"white"} color={"black"} onChange={(e) => setCode(e.target.value)} />
          <Flex direction={{ base: "column", md: "row" }} justifyContent={"space-between"}>
            <Button width={{ base: 300, lg: 200 }} backgroundColor={"#11cdef"} textColor={"white"} variant={"black"} marginTop={3} onClick={handleSubmit}>confirm</Button>
            <button className='self-end text-base text-[#11cdef] underline mt-3 md:mt-0'>Resend code</button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default SendCode