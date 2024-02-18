"use client"
import BackBtn from "@/components/backbtn/BackBtn"
import { Container, Flex, Text, Input, FormLabel, Box, Button, Avatar, Center } from "@chakra-ui/react"
import Image from "next/image"
import React, { useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"
const UserSignupPage = () => {
    const router = useRouter()
    const inputRef = useRef()
    const searchParams = useSearchParams().get("user")
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        password: "",
        confirmPassword: "",
        Image: "",
        type: searchParams
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setForm({ ...form, Image: URL.createObjectURL(event.target.files[0]) });
        }
    }

    const handleOnImageRemoveClick = () => {
        setForm({ ...form, Image: "" })
        inputRef.current.value = ""

    };
    const HandleSubmit = async () => {
        console.log(form)
        router.push("/user-signup/user-signupPage/user-completeSignup")
    }
    return (
        <>
            <Box overflow={"auto"} maxH={"100vh"} >
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                <div className='w-full h-full  absolute top-0 left-0 mix-blend-color z-[-1]' ></div>
                <Flex gap={4} justifyContent={{ base: "center", md: "space-between" }} alignItems={{ base: "center", md: "" }} padding={{ base: 5, md: 2 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box display={{ base: "none", md: "block" }} ><BackBtn textColor="text-white" /></Box>
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={form.Image} />
                    {form.Image && <Text display={{ base: "block", md: "none" }} color={"red"} fontWeight={"bold"} fontSize={"medium"} cursor={"pointer"} onClick={handleOnImageRemoveClick}>Delete Image</Text>}
                    <Box><Image src={"/logo.png"} alt="" width={100} height={100} /></Box>
                </Flex>
                <Center>
                    <Box>
                        <Text color={"white"} fontSize={"large"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "x-large", md: "xx-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Box>
                </Center>
                <Container maxW={"container"} padding={{ lg: 10, xl: 0 }} my={4}>
                    <Flex marginBottom={10} direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={6} justifyContent={{ base: "center", md: "space-evenly" }} alignItems={{ base: "center", xl: "start" }}>
                        <Flex gap={4} direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={{ base: "center" }}   >
                            <Box >
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>First Name</FormLabel>
                                <Input height={50} type="text" value={form.firstName} required onChange={onChange} name="firstName" id="firstName" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>email</FormLabel>
                                <Input height={50} required type="email" name="email" value={form.email} id="email" onChange={onChange} color={"black"} bg={"white"} fontSize={14} placeholder='example@gmail.com' size='md' w={350} />
                                <Input accept="image/png, image/gif, image/jpeg" type="file" name="image" onChange={handleImageChange} hidden ref={inputRef} />
                            </Box>
                            <Box display={"flex"} flexDirection={"column"}>
                                <FormLabel color={"white"} fontWeight={"bold"} padding={1}>Password</FormLabel>
                                <Input height={50} required type="password" value={form.password} onChange={onChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                <Input height={50} required type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                            </Box>
                        </Flex>
                        <Flex direction={"column"} gap={2} justifyContent={{ md: "center", lg: "start" }} alignItems={{ md: "center", lg: "start" }} marginTop={{ md: 10, xl: 0 }}>
                            <Box cursor={"pointer"} border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={120} height={120} onClick={() => inputRef?.current?.click()} >

                                {form.Image ? <Image src={form.Image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text textAlign={"center"} fontSize={"x-small"} color={"green"} fontWeight={"bold"}>Upload your Image</Text>}
                            </Box>
                            <Text fontWeight={"bold"} cursor={"pointer"} onClick={handleOnImageRemoveClick} display={{ base: "none", md: "block" }} >Delete</Text>
                        </Flex>
                    </Flex>
                </Container>
                <Flex my={2} direction={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"} marginTop={{ base: 0, md: 20 }} gap={5}>
                    <Box marginLeft={{ base: 0, md: 20 }} w={{ base: 350, md: 200 }} className="bg-[rgba(204,76,76,0.1)]  rounded-[5px] text-sm text-white p-2  ">
                        <Link href={`http://127.0.0.1:8000/login-google`} className='flex items-center gap-2 justify-center  hover:no-underline hover:text-inherit  '>
                            <div>
                                <FaGoogle />
                            </div>
                            <p>
                                <b>Login with Google</b>
                            </p>
                        </Link>
                    </Box>
                    <Box marginRight={{ base: 0, md: 20 }} >
                        <Button onClick={() => router.push("/user-signup/user-signupPage/user-completeSignup")} textColor={"white"} variant={"black"} fontSize={"small"} w={{ base: 350, md: 200 }} backgroundColor={"#11cdef"}>Create account</Button>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}
export default UserSignupPage