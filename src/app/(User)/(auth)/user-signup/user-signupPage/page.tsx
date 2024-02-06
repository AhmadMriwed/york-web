"use client"
import BackBtn from "@/components/backbtn/BackBtn"
import { Container, Flex, Text, Input, FormLabel, Box, Button, Avatar, Center } from "@chakra-ui/react"
import Image from "next/image"
import React, { useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
    const HandleSubmit = async () => {
        console.log(form)
        router.push("/user-signup/user-signupPage/user-completeSignup")
    }
    return (
        <>
            <Box overflow={"auto"} maxH={"100vh"}>
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]'></div>
                <Flex gap={4} justifyContent={{ base: "center", md: "space-between" }} alignItems={{ base: "center", md: "" }} padding={{ base: 5, md: 2 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box display={{ base: "none", md: "block" }} ><BackBtn textColor="text-white" /></Box>
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={form.Image} />
                    <Box><Image src={"/logo.png"} alt="" width={100} height={100} /></Box>
                </Flex>
                <Center>
                    <Box>
                        <Text color={"white"} fontSize={"large"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "x-large", md: "xx-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Box>
                </Center>
                <Container maxW={"container"} padding={{ lg: 20, xl: 0 }} my={4}>
                    <Flex direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={6} justifyContent={{ base: "center", md: "space-evenly" }} alignItems={"center"}>
                        <Flex gap={4} direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={{ base: "center" }}   >
                            <Box >
                                <FormLabel color={"white"} fontWeight={"bold"}>First Name</FormLabel>
                                <Input type="text" value={form.firstName} required onChange={onChange} name="firstName" id="firstName" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>email</FormLabel>
                                <Input required type="email" name="email" value={form.email} id="email" onChange={onChange} color={"black"} bg={"white"} fontSize={14} placeholder='example@gmail.com' size='md' w={350} />
                                <Input type="file" name="image" onChange={(e) => setForm({ ...form, Image: URL.createObjectURL(e.target.files[0]) })} hidden ref={inputRef} />
                            </Box>
                            <Box>
                                <FormLabel color={"white"} fontWeight={"bold"}>Password</FormLabel>
                                <Input required type="password" value={form.password} onChange={onChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                <Input required type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                            </Box>
                        </Flex>
                        <Box border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "block" }} textAlign={"center"} borderRadius={20} width={200} height={200}>
                            {form.Image ? <Image src={form.Image} alt="" width={300} height={300} style={{ position: "absolute", borderRadius: 20 }} /> : <Text onClick={() => inputRef?.current?.click()} padding={6} cursor={"pointer"} color={"green"} fontSize={"md"} fontWeight={"bold"}>Choose your Image</Text>}
                        </Box>
                    </Flex>
                    <Center>
                        <Button w={{ base: "full", md: 300, lg: 400 }}
                            onClick={HandleSubmit}
                            colorScheme="blue"
                            marginTop={{ base: 10, md: 20 }}
                            textAlign={"center"}
                            size={"lg"}
                            fontSize={14}>Create Account</Button>
                    </Center>
                </Container>
            </Box>
        </>
    )
}
export default UserSignupPage