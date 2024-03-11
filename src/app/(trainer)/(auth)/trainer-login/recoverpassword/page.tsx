"use client"
import RecoverPassword from '@/components/RecoverPassword/RecoverPassword'
import { FormLabel, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import { Flex, Box, useToast, Spinner } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { trainerForgotPassword } from '@/store/trainerStore/slices/trainerSlice'
const RecoverPassword1 = () => {
  const router = useRouter()
  const dispatch: any = useDispatch()
  const toast = useToast()
  const { error, loading, msg } = useSelector((state: any) => state.trainerSlice)
  console.log(error, msg, loading)
  const [email, setEmail] = useState("")
  const HandleSubmit = async () => {
    if (!email) {
      toast({
        title: 'Error',
        description: "please fill the data .",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top"
      })
      return
    }
    try {

      let data = { email: email }
      dispatch(trainerForgotPassword(data)).then((res) => {
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
          router.push(`/trainer-login/recoverpassword/sendcode?email=${email}`)

        }

      })
    } catch (error: any) {
      console.log(error.mesage)
    }
  }
  return (
    <>
      <Text className='py-5 text-xl font-bold text-white tracking-wider leading-8 ' display={{ base: "none", md: "block" }}  >Password Recovery:  Email</Text>
      <Flex w={"full"} alignItems={"center"} direction={{ base: "column", md: "row" }} justifyContent={"center"} className="h-[calc(100vh-142px)]">
        <Box className='lg:border-l-2 border-[#01989F]  p-8 '>
          <Box width={"full"}>
            <FormLabel display={{ base: "none", md: "block" }} color={"white"}>Email</FormLabel>
            <Box marginBottom={3}><Text color={"white"} display={{ base: "block", md: "none" }} textAlign={"center"}>Password Recovery:  </Text>
              <Text display={{ base: "block", md: "none" }} textAlign={"center"} color={"white"} >Email</Text></Box>
            <Input
              width={300}
              backgroundColor={"white"}
              color={"black"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name='email'
              id='email'
            />
          </Box>
          <Box width={"full"}>
            <Text cursor={"pointer"} onClick={HandleSubmit} className="hover:no-underline" color={"white"} textAlign={"center"} backgroundColor={"#01989f"} width={{ base: "100%", md: 150 }} height={10} justifySelf={"center"} padding={2} fontSize={16} borderRadius={6} marginTop={{ base: 3, md: 7 }}>{loading ? <Spinner color='red' size={"sm"} /> : "Confirm"}</Text>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default RecoverPassword1