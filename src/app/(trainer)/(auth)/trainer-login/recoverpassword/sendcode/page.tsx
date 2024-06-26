"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Flex, Box, FormLabel, Input, Button, useToast, Spinner } from '@chakra-ui/react'
import { trainerValidateForgotPassword } from '@/store/trainerStore/slices/trainerSlice'
import { useSelector, useDispatch } from 'react-redux'
import { trainerForgotPassword } from '@/store/trainerStore/slices/trainerSlice'
import Image from 'next/image'
const SendCode = () => {
  const router = useRouter()
  const [code, setCode] = useState("")
  const toast = useToast()
  const dispatch: any = useDispatch()
  const { error, loading, msg } = useSelector((state: any) => state.trainerSlice)
  console.log(error, loading, msg)
  const email = useSearchParams().get("email")
  console.log(email)
  const resendCode = () => {
    try {
      let data = { email: email }
      dispatch(trainerForgotPassword(data)).then((res:any) => {
        console.log(res)
        if (res.error) {
          console.log(error)
          toast({
            title: 'Error.',
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: "top"
          })
          return
        } else {
          toast({
            title: 'success',
            description: "code has been sent successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top"
          })
        }
      })
    } catch (error: any) {
      console.log(error.mesage)
    }
  }
  const handleSubmit = () => {
    console.log(code)
    if (!code) {
      toast({
        title: 'Error.',
        description: "please fill the data",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      })
      return
    }
    let data = { email: email, code: code }
    try {
      dispatch(trainerValidateForgotPassword(data)).then((res:any) => {
        console.log(res)
        if (res.error) {
          console.log(error)
          return
        } else {
          toast({
            title: 'Success.',
            description: "code has been verified successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top"
          })
          router.push(`/trainer-login/recoverpassword/sendcode/resetpassword?email=${email}&code=${code}`)

        }
      })
    } catch (error: any) {
      console.log(error.mesage)
    }
  }
  return (
    <>
      <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Code Verification</p>
      <Image src='/loo.png'  style={{opacity:0.1}}  alt='' fill objectFit='contain' />
      <Flex alignItems={"center"} justifyContent={"center"} className=' h-[calc(100vh-142px)]'>
        <Box className='lg:border-l-2 border-[#01989F] md:w-[450px] p-8'>
          <FormLabel htmlFor="" className='text-base text-white'>Enter The Code</FormLabel>
          <Input onChange={(e) => setCode(e.target.value)} type="number" name='code' width={300} backgroundColor={"white"} color={"black"} />
          <Flex direction={{ base: "column", md: "row" }} justifyContent={"space-between"} marginTop={10}>
            <Button width={{ base: 300, lg: 150 }} backgroundColor={"#11cdef"} textColor={"white"} variant={"black"} marginTop={3} onClick={handleSubmit}>{loading ? <Spinner size={"sm"} color='red' /> : "Confirm"}</Button>
            <button className='self-end text-base text-[#11cdef] underline mt-3 md:mt-0' onClick={() => resendCode()}>Resend code</button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default SendCode