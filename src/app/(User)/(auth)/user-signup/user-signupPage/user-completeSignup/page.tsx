"use client"
import { Container, Flex, Text, Input, FormLabel, Box, Select, Button, Avatar } from "@chakra-ui/react"
import Image from "next/image"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import moment from "moment"
import React, { useRef, useState } from "react"
import Link from "next/link"
const UserCompleteSignup = () => {
    const inputRef = useRef()
    const [form, setForm] = useState({
        Gender: "Male",
        phone: "",
        BirthDate: moment().format('YYYY-MM-DD'),
        Image: "",
        Country: "us",
        Category: "",
        location: "",
        Website: ""
    })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setForm({ ...form, BirthDate: newDate })

    };

    const HandleSubmit = async () => {
        console.log(form)
    }
    return (
        <>
            <Box overflow={"auto"} maxH={"100vh"}>
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]'></div>
                <Flex gap={2} justifyContent={{ base: "center", md: "space-between" }} alignItems={{ base: "center", md: "" }} padding={{ base: 2, md: 3 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box >
                        <Text color={"white"} fontSize={"large"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "x-large", md: "xx-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Box>
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={form.Image} />
                    <Box><Image src={"/logo.png"} alt="" width={100} height={100} /></Box>
                </Flex>
                <Container maxW={"container"} padding={{ md: 10, lg: 20, xl: 0 }} my={4}>
                    <Flex direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={6} justifyContent={{ base: "center", md: "space-evenly" }} alignItems={"center"}>
                        <Flex gap={4} direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={{ base: "center" }}   >
                            <Box >
                                <FormLabel color={"white"} fontWeight={"bold"}>Gender</FormLabel>
                                <Select onChange={onSelect} value={form.Gender} id="Gender" name="Gender" required color={"black"} bg={"white"} fontSize={14} size='md' w={350} placeholder='Select option'>
                                    <option value='Famle'>Famle</option>
                                    <option value='Male'>Male</option>
                                </Select>
                                <FormLabel color={"white"} fontWeight={"bold"}>Phone</FormLabel>
                                <PhoneInput onChange={(value) => setForm({ ...form, phone: value })} inputStyle={{ color: "black", backgroundColor: "white", fontSize: 14, width: 350, height: 45 }} country={form.Country}></PhoneInput>
                                <Input type="file" name="image" onChange={(e) => setForm({ ...form, Image: URL.createObjectURL(e.target.files[0]) })} hidden ref={inputRef} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Website</FormLabel>
                                <Input onChange={onChange} name="Website" value={form.Website} id="Website" required type="text" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                            </Box>
                            <Box>
                                <FormLabel color={"white"} fontWeight={"bold"}>BirthDate</FormLabel>
                                <Input onChange={onChangeDate} value={form.BirthDate} id="BirthDate" required type="date" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Location</FormLabel>
                                <Input required type="text" name="location" value={form.location} onChange={onChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Category</FormLabel>
                                <Select value={form.Category} name="Category" onChange={onSelect} required color={"black"} bg={"white"} fontSize={14} size='md' w={350} >
                                    <option value='Science'>
                                        Science
                                    </option>
                                    <option style={{ width: 20 }} value='physics'>physics</option>
                                    <option value='technology'>technology</option>
                                    <option value='litarature'>litarature'</option>
                                </Select>
                            </Box>
                        </Flex>
                        <Box border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "block" }} textAlign={"center"} borderRadius={20} width={200} height={200}>
                            {form.Image ? <Image src={form.Image} alt="" width={300} height={300} style={{ position: "absolute", borderRadius: 20 }} /> : <Text onClick={() => inputRef?.current?.click()} padding={6} cursor={"pointer"} color={"green"} fontSize={"md"} fontWeight={"bold"}>Choose your Image</Text>}
                        </Box>
                    </Flex>
                    <Flex marginTop={{ base: 2, md: 20 }} gap={4} justifyContent={"flex-end"} alignItems={"center"} >
                        <Button w={200}
                            onClick={HandleSubmit}
                            colorScheme="green"
                            textAlign={"center"}
                            size={"lg"}
                            fontSize={14}>Complete Account</Button>
                        <Link style={{ width: 100, color: "blue", fontSize: 15, fontWeight: "bold" }} href={"/"}
                        >Skip</Link>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}
export default UserCompleteSignup