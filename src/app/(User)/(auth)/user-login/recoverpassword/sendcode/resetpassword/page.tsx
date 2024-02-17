'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Input, FormLabel, Box, Text, Button, Flex } from '@chakra-ui/react';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {

  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      // Perform form submission logic here
      console.log(values);
      // Set submitting to false after successful submission
      setSubmitting(false);
    } catch (error) {
      // Handle form submission error
      console.error(error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

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
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Box>



            <Box >

              <FormLabel display={{ base: "none", md: "block" }} htmlFor="" className='text-base text-white'>Confirm Password</FormLabel>

              <Input
                width={300}
                placeholder='Confirm Password<'
                backgroundColor={"white"}
                color={"black"}
                type='password'
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />

            </Box>


          </Flex>

          <Button textColor={"white"} variant={"black"} backgroundColor={"#11cdef"} marginTop={5} marginLeft={1} width={{ base: 300, md: 150 }}>setUp</Button>
        </Box>
      </Flex>
    </>
  )
}

export default ResetPassword