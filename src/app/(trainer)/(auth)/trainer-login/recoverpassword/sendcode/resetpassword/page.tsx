'use client'
import React, { useState } from 'react'
import { Input, FormLabel, Box, Text, Button, Flex, useToast, Spinner } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { trainerResetPassword } from '@/store/trainerStore/slices/trainerSlice';
const ResetPassword = () => {
  const email = useSearchParams().get("email")
  const code = useSearchParams().get("code")
  const toast = useToast()
  const router = useRouter()
  const dispatch: any = useDispatch()
  const { admin, error, loading } = useSelector((state: any) => state.authSlice)
  console.log(error, loading, admin)
  const [form, setForm] = useState({
    email: email,
    code: code,
    password: "",
    password_confirmation: "",

  })
  const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async () => {
    if (!form.password || !form.password_confirmation) {
      toast({
        title: 'Error.',
        description: 'please fill the data',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top",

      })
      return
    }
    if (form.password !== form.password_confirmation) {
      toast({
        title: 'Error.',
        description: 'password must match',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top",

      })
      return
    }
    let data = { email: email, code: code, password: form.password, password_confirmation: form.password_confirmation }
    try {
      dispatch(trainerResetPassword(data)).then((res:any) => {
        console.log(res)
        if (res.error) {
          console.log(error)
          toast({
            title: 'Error.',
            description: 'some thing went wrong',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top",

          })
          return
        } else {
          toast({
            title: 'Success.',
            description: 'Password reset success',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top",

          })
          router.push("/trainer-login")
        }
      })
    } catch (error: any) {
      toast({
        title: 'Error.',
        description: 'failed to reset password',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      })
      console.error(error.message);
    }
  }

  return (
    <>
      <Text className='py-5 text-xl font-bold text-white tracking-wider leading-8' display={{ base: "none", md: "block" }}>Password Recovery: Password Change</Text>
      <Flex justifyContent={"center"} alignItems={"center"} className='h-[calc(100vh-142px)]'>
        <Box className='lg:border-l-2 border-[#01989F] p-8'>
          <Flex direction={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"} gap={2}>
            <Box marginBottom={3}><Text color={"white"} display={{ base: "block", md: "none" }} fontSize={"sm"} textAlign={"center"}>Password Recovery:  </Text>
              <Text display={{ base: "block", md: "none" }} fontSize={"md"} textAlign={"center"} color={"white"} >Password Change</Text></Box>
            <Box><FormLabel display={{ base: "none", md: "block" }} htmlFor="" className='text-base text-white'>Password</FormLabel>
              <Input
                backgroundColor={"white"}
                width={300}
                placeholder='Password'
                type='password'
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel display={{ base: "none", md: "block" }} htmlFor="" className='text-base text-white'>Confirm Password</FormLabel>
              <Input
                width={300}
                placeholder='Confirm Password<'
                backgroundColor={"white"}
                color={"black"}
                type='password'
                id="password_confirmation"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
              />
            </Box>
          </Flex>
          <Button onClick={handleSubmit} backgroundColor={"#11cdef"} textColor={"white"} variant={"black"} marginTop={5} marginLeft={1} width={{ base: 300, md: 150 }}>{loading ? <Spinner color='red' size={"sm"} /> : "SetUp"}</Button>
        </Box>
      </Flex>
    </>
  )
}
export default ResetPassword