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
                <Container maxW={"container"} padding={{ lg: 10, xl: 0 }} my={4}>
                    <Flex marginBottom={10} direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={6} justifyContent={{ base: "center", md: "space-evenly" }} alignItems={"center"}>
                        <Flex gap={4} direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={{ base: "center" }}   >
                            <Box >
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>First Name</FormLabel>
                                <Input height={50} type="text" value={form.firstName} required onChange={onChange} name="firstName" id="firstName" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>email</FormLabel>
                                <Input height={50} required type="email" name="email" value={form.email} id="email" onChange={onChange} color={"black"} bg={"white"} fontSize={14} placeholder='example@gmail.com' size='md' w={350} />
                                <Input type="file" name="image" onChange={(e) => setForm({ ...form, Image: URL.createObjectURL(e.target.files[0]) })} hidden ref={inputRef} />
                            </Box>
                            <Box display={"flex"} flexDirection={"column"}>
                                <FormLabel color={"white"} fontWeight={"bold"} padding={1}>Password</FormLabel>
                                <Input height={50} required type="password" value={form.password} onChange={onChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                <Input height={50} required type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />

                            </Box>
                        </Flex>
                        <Box border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={150} height={150}>
                            {form.Image ? <Image src={form.Image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text onClick={() => inputRef?.current?.click()} cursor={"pointer"} color={"green"} fontWeight={"bold"}>Choose your Image</Text>}
                        </Box>

                    </Flex>









                </Container>
                <Flex my={2} direction={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"} marginTop={{base:5,md:20}} gap={5}>

                    
                    <Box  marginLeft={{base:0,md:20}} w={{ base: 350, md: 200 }} backgroundColor={"brown"} className=" rounded-[5px] text-sm text-white p-2  ">
                        <Link href={`http://127.0.0.1:8000/login-google`} className='flex items-center gap-2 justify-center  hover:no-underline hover:text-inherit  '>
                            <div>
                                <FaGoogle />
                            </div>
                            <p>
                                <b>Login with Google</b>
                            </p>
                        </Link>
                    </Box>
                    <Box  marginRight={{base:0,md:20}} >
                        <Button onClick={()=>router.push("/user-signup/user-signupPage/user-completeSignup")} textColor={"white"} variant={"black"} fontSize={"small"} w={{ base: 350, md: 200 }} backgroundColor={"#01989f"}>Create account</Button>
                    </Box>
                </Flex>


            </Box>
        </>
    )
}
export default UserSignupPage