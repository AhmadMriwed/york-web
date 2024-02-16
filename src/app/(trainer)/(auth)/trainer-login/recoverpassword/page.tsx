"use client"
import RecoverPassword from '@/components/RecoverPassword/RecoverPassword'
import { FormLabel, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import { Flex, Box } from '@chakra-ui/react'
const RecoverPassword1 = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const HandleSubmit = () => {
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
            />
          </Box>
          <Box width={"full"}>
            <Link href={{ pathname: '/trainer-login/recoverpassword/sendcode', query: { emaile: email } }}  >
              <Text className=" hover:no-underline" color={"white"} textAlign={"center"} backgroundColor={"#01989f"} width={{ base: "100%", md: 150 }} height={10} justifySelf={"center"} padding={2} fontSize={16} borderRadius={6} marginTop={{ base: 3, md: 7 }}>Confirm</Text>
            </Link>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default RecoverPassword1