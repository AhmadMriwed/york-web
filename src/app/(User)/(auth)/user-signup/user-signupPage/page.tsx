"use client"
import BackBtn from "@/components/backbtn/BackBtn"
import { Container, Flex, Text, Input, FormLabel, Box, Button, Avatar, Center, useToast, Spinner } from "@chakra-ui/react"
import Image from "next/image"
import { Input as Inputt } from "rsuite"
import React, { useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from "@/store/userStore/slices/userSlice"
import { useFormik } from "formik"
import { AiFillDelete } from "react-icons/ai"
import * as Yup from "yup"
const UserSignupPage = () => {
    const user_type = useSearchParams().get("user_type")
    const router = useRouter()
    const toast = useToast()
    const inputRef: any = useRef()
    const [image, setImage] = useState('')
    const { error, user, loading } = useSelector((state: any) => state.userSlice)
    console.log(error, user, loading)
    const dispatch: any = useDispatch()
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("Please add the Your first Name"),
        last_name: Yup.string().required("Please add the Your last Name"),
        email: Yup.string().email("Invalid email").required("Email Is Required"),
        image: Yup.mixed(),
        password: Yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        password_confirmation: Yup
            .string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        language: Yup.string(),
    })
    const HandleSubmit = async (values: any, actions: any) => {
        console.log("submitted");
        console.log(values);
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        dispatch(userRegister(formData)).then((res: any) => {
            console.log(res)
            if (res.error) {
                toast({
                    title: 'Error',
                    description: "We couldnot create your account.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
                console.log(error)
                return
            } else {
                toast({
                    title: 'Account created',
                    description: "we have created your account successfully.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
                router.push(`/user-signup/user-signupPage/user-completeSignup`)
            }
        })
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            password: "",
            password_confirmation: "",
            image: "",
            last_name: "",
            user_type: user_type
        },
        validationSchema,
        onSubmit: HandleSubmit
    })
    const handleOnImageRemoveClick = () => {
        formik.setFieldValue("image", "")
        inputRef.current.value = ""
        setImage("")

    };
    return (
        <>
            <Box overflow={"auto"} maxH={"100vh"} >
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                <div className='w-full h-full  absolute top-0 left-0 mix-blend-color z-[-1]' ></div>
                <Flex gap={4} justifyContent={{ base: "center", md: "space-between" }} alignItems={{ base: "center", md: "" }} padding={{ base: 5, md: 2 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box display={{ base: "none", md: "block" }} ><BackBtn textColor="text-white" /></Box>
                    <Box style={{ position: "relative" }} display={{ base: "block", md: "none" }}>
                        <Avatar
                            onClick={() => inputRef?.current?.click()}
                            size={"lg"}
                            src={image ? image : "/default.jpg"}
                        />
                        {formik.values.image && (


                            <AiFillDelete cursor={"pointer"} onClick={() => handleOnImageRemoveClick()} style={{ position: "absolute", bottom: -10, right: 0 }} color="red" size={30} />


                        )}
                    </Box>
                    <Box><Image src={"/logo.png"} alt="" width={100} height={100} /></Box>
                </Flex>
                <Center>
                    <Box>
                        <Text color={"white"} fontSize={"large"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "x-large", md: "xx-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Box>
                </Center>
                <Container maxW={"container"} padding={{ lg: 10, xl: 0 }} my={2}>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <Flex marginBottom={10} direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={6} justifyContent={{ base: "center", md: "space-evenly" }} alignItems={{ base: "center", xl: "start" }}>
                            <Flex direction={"column"} alignItems={"center"} gap={2}>
                                <Flex gap={4} direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={{ base: "center", md: "start" }}   >
                                    <Box >
                                        <FormLabel padding={1} color={"white"} fontWeight={"bold"}>First Name</FormLabel>
                                        <Input height={50} type="text" value={formik.values.first_name} required onChange={formik.handleChange} name="first_name" id="first_name" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                        <FormLabel padding={1} color={"white"} fontWeight={"bold"}>email</FormLabel>
                                        <Input height={50} type="email" name="email" value={formik.values.email} id="email" onChange={formik.handleChange} color={"black"} bg={"white"} fontSize={14} placeholder='example@gmail.com' size='md' w={350} />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="error-mesage">{formik.errors.email}</div>
                                        )}
                                        <Inputt accept="image/png, image/gif, image/jpeg" type="file" name="image"
                                            onChange={(value, e: any) => {
                                                console.log(e);
                                                formik.values.image = e.target.files[0];
                                                setImage(URL.createObjectURL(e.target.files[0]))
                                            }}
                                            hidden
                                            ref={inputRef}
                                        />
                                    </Box>
                                    <Box display={"flex"} flexDirection={"column"}>
                                        <FormLabel padding={1} color={"white"} fontWeight={"bold"}>last_name</FormLabel>
                                        <Input height={50} type="text" name="last_name" value={formik.values.last_name} id="last_name" onChange={formik.handleChange} color={"black"} bg={"white"} fontSize={14} placeholder='' size='md' w={350} />
                                        {formik.touched.last_name && formik.errors.last_name && (
                                            <div className="error-mesage">{formik.errors.last_name}</div>
                                        )}
                                        <FormLabel color={"white"} fontWeight={"bold"} padding={1}>Password</FormLabel>
                                        <Input height={50} type="password" value={formik.values.password} onChange={formik.handleChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                        {formik.touched.password && formik.errors.password && (
                                            <div className="error-mesage">{formik.errors.password}</div>
                                        )}

                                    </Box>
                                </Flex>
                                <Box >
                                    <FormLabel padding={1} color={"white"} textAlign={{ base: "start", md: "center" }} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                    <Input height={50} type="password" id="password_confirmation" name="password_confirmation" value={formik.values.password_confirmation} onChange={formik.handleChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                        <div className="error-mesage">{formik.errors.password_confirmation}</div>
                                    )}
                                </Box>
                            </Flex>
                            <Flex direction={"column"} gap={2} justifyContent={{ md: "center", lg: "start" }} alignItems={{ md: "center", lg: "start" }} marginTop={{ md: 10, xl: 0 }}>
                                <Box cursor={"pointer"} border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={120} height={120} onClick={() => inputRef?.current?.click()} >
                                    {formik.values.image ? <Image src={image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text textAlign={"center"} fontSize={"x-small"} color={"green"} fontWeight={"bold"}>Upload your Image</Text>}
                                </Box>
                              {formik.values.image &&  <Text fontWeight={"bold"} cursor={"pointer"} onClick={handleOnImageRemoveClick} display={{ base: "none", md: "block" }} >Delete</Text>}
                            </Flex>
                        </Flex>
                        <Flex my={2} direction={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"} marginTop={{ base: 0, md: 20 }} gap={5}>
                            <Box marginLeft={{ base: 0, md: 20 }} w={{ base: 350, md: 200 }} className="bg-[rgba(204,76,76,0.1)]  rounded-[5px] text-sm text-white p-2  ">
                                {/* <Link href={`http://localhost:8000/google/login`} className='flex items-center gap-2 justify-center  hover:no-underline hover:text-inherit  '>
                                    <div>
                                        <FaGoogle />
                                    </div>
                                    <p>
                                        <b>Login with Google</b>
                                    </p>
                                </Link> */}
                            </Box>
                            <Box marginRight={{ base: 0, md: 20 }} >
                                <Button type="submit" textColor={"white"} variant={"black"} fontSize={"small"} w={{ base: 350, md: 200 }} backgroundColor={"#11cdef"}>{loading ? <Spinner color="red" size={"sm"} /> : "Create account"}</Button>
                            </Box>
                        </Flex>
                    </form>
                </Container>
            </Box>
        </>
    )
}
export default UserSignupPage