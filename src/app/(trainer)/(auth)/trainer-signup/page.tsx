import { Container, Flex, Text, Center } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
const TrainerSignup = () => {
    return (
        <>
            <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} >
                <Container maxW={"container.lg"}>
                    <div className='max-w-[100vw] max-h-[100vh] overflow-hidden'>
                        <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                        <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]'></div>
                        <Center>
                            <Flex direction={"column"}>
                                <Text color={"white"} fontSize={"20"}>welcome to</Text>
                                <Text color={"white"} fontSize={"35"} fontWeight={"bold"}>York British Academy</Text>
                                <Text color={"white"} fontSize={"20"}>welcome to York British Academy Yes</Text>
                            </Flex>
                        </Center>
                        <Flex marginTop={20} gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Link href={{
                                pathname: "/trainer-signup/trainer-signupPage", query: {
                                    account_type: "Uncertified"
                                }
                            }} className="btn-wrap rounded flex items-center justify-center  hover:no-underline hover:text-inherit ">
                                <Text className="text-white text-xl p-2 hover:no-underline">UnCertified  Trainer</Text>
                            </Link>
                            <Link href={{
                                pathname: "/trainer-signup/trainer-signupPage", query: {
                                    account_type: "certified"
                                }
                            }} className="btn-wrap rounded flex items-center justify-center  hover:no-underline hover:text-inherit ">
                                <Text className="text-white text-xl p-2 hover:no-underline">Certified  Trainer</Text>
                            </Link>
                        </Flex>
                    </div>
                </Container>
            </Flex>
        </>
    )
}
export default TrainerSignup