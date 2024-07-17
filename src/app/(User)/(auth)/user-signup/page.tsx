"use client"
import { Container, Flex, Text, Center } from "@chakra-ui/react"
import Image from "next/image"
import {Reveal} from "react-awesome-reveal"
import Link from "next/link"
const UserSignup = () => {
    return (
        <>
            <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} >
                <Container maxW={"container.lg"}>
                    <div className='max-w-[100vw] max-h-[100vh] overflow-hidden'>
                        <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                        <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]'></div>
                       <Reveal triggerOnce  duration={2000}>
                       <Center>
                            <Flex direction={"column"}>
                                <Text color={"white"} fontSize={"20"}>welcome to</Text>
                                <Text color={"white"} fontSize={"35"} fontWeight={"bold"}>York British Academy</Text>
                                <Text color={"white"} fontSize={"20"}>welcome to York British Academy </Text>
                            </Flex>
                        </Center>
                        <Flex marginTop={20} gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Link href={{
                                pathname: "/user-signup/user-signupPage", query: {
                                    user_type: "Client"
                                }
                            }} className="btn-wrap rounded flex items-center justify-center  hover:no-underline hover:text-inherit ">
                                <Text className="text-white text-xl p-2 hover:no-underline">Client</Text>
                            </Link>
                            <Link href={{
                                pathname: "/user-signup/user-signupPage", query: {
                                    user_type: "Trainee"
                                }
                            }} className="btn-wrap rounded flex items-center justify-center  hover:no-underline hover:text-inherit ">
                                <Text className="text-white text-xl p-2 hover:no-underline">Trainee</Text>
                            </Link>
                        </Flex>
                       </Reveal>
                    </div>
                </Container>
            </Flex>
        </>
    )
}
export default UserSignup