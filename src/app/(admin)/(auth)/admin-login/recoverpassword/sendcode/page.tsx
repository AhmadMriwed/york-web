"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Flex, Box, FormLabel, Input, Button, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { adminValidateForgotPassword } from '@/store/adminstore/slices/authSlice'

const SendCode = () => {
  const [code, setCode] = useState("")
  const router = useRouter();

  const toast = useToast()
  const dispatch: any = useDispatch()
  const { error, loading, msg } = useSelector((state: any) => state.authSlice)
  console.log(error, loading, msg)
  const email = useSearchParams().get("email")
  console.log(email)
  const handleSubmit = () => {
    console.log(code)

    let data = { email: email, code: code }
    try {
      dispatch(adminValidateForgotPassword(data)).then((res) => {
        console.log(res)
        if (error) {
          console.log(error)
          return
        } else {
          toast({
            title: 'Success.',
            description: msg,
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: "top"
          })
          router.push(`/admin-login/recoverpassword/sendcode/resetpassword?email=${email}&code=${code}`)

        }
      })
    } catch (error: any) {
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