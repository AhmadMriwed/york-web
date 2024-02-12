"use client"
import BackBtn from "@/components/backbtn/BackBtn"
import { Container, Flex, Text, Input, FormLabel, Box, Select as Selecter, Button, Avatar, Center } from "@chakra-ui/react"
import Image from "next/image"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import moment from "moment"
import SignatureCanvas from "react-signature-canvas"
import Select from "react-select"
import { categories } from "@/utils/categories"
import React, { useRef, useState } from "react"
import LocationModal from "@/components/accounts/trainers/LocationModal"
// import axios from "axios"
import { useSearchParams } from "next/navigation"
const TrainerSignupPage = () => {
    const [sign, setSign] = useState()
    const inputRef = useRef()
    const resumeRef = useRef()
    const searchParams = useSearchParams().get("trainer")
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        phone: "",
        Country: "us",
        Image: "",
        location: "",
        Category: "technology",
        digitalSign: "",
        Gender: "Male",
        BirthDate: moment().format('YYYY-MM-DD'),
        resume: null,
        type: searchParams
    })

    const customStyles = {
        control: base => ({
            ...base,
            height: 40,
        })
    };


    const categori = categories.map(category => ({
        value: category.value.toLowerCase(),
        label: (
            <Flex alignItems='center' gap='0.5rem'>
                <Avatar src={category.image} size={"sm"} />
                <Text fontSize={"small"} >{category.title}</Text>
            </Flex>
        ),
    }));


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
        await setForm({ ...form, digitalSign: sign.getTrimmedCanvas().toDataURL("image/svg") })
        // if(!form.resume){
        //     console.log("no file selectetd")
        //     return
        // }
        // const fd= new FormData()
        // fd.append('file',form.resume)
        // axios.post("",fd,{
        //     onUploadProgress:(ProgressEvent)=>{console.log(ProgressEvent.progress*100)},
        //     headers:{
        //         "Custome Header":"value"
        //     }
        // }).then((res)=>console.log(res.data))
        // .catch((err)=>console.log(err))

        console.log(form)

    }





    return (
        <>
            <Box overflow={{ base: "auto", lg: "hidden" }} h={{ base: "100vh" }} >
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]'></div>
                <Flex gap={4} justifyContent={{ base: "center", md: "" }} alignItems={{ base: "center", md: "start" }} padding={{ base: 0, md: 3 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box display={{ base: "none", md: "block" }} ><BackBtn textColor="text-white" /></Box>
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={form.Image} />
                    <Text display={{ base: "block", md: "none" }} color={"white"} fontWeight={"bold"} fontSize={"small"} cursor={"pointer"} onClick={() => setForm({ ...form, Image: "" })}>Delete Image</Text>
                    <Flex direction={"column"} marginLeft={{ md: 2 }} marginRight={{ base: "", md: "auto" }}>
                        <Text color={"white"} fontSize={"large"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "x-large", md: "xx-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Flex>
                    <Image src={"/logo.png"} alt="" width={100} height={100} />
                </Flex>
                <Container maxW={"container"} padding={{ lg: 20, xl: 0 }} my={4}>
                    <Flex direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={4} justifyContent={{ base: "center", md: "space-evenly" }}>
                        <Flex gap={4} direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={{ base: "center" }}   >
                            <Box >
                                <FormLabel color={"white"} fontWeight={"bold"}>First Name</FormLabel>
                                <Input placeholder="Enter Your Full Name" type="text" value={form.firstName} required onChange={onChange} name="firstName" id="firstName" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>email</FormLabel>
                                <Input  placeholder="example@gmail.com" required type="email" name="email" value={form.email} id="email" onChange={onChange} color={"black"} bg={"white"} fontSize={14} placeholder='example@gmail.com' size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Password</FormLabel>
                                <Input  placeholder="Enter Your Password" required type="password" value={form.password} onChange={onChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Location</FormLabel>
                                <Input  placeholder="Enter Your Location" name="location" required cursor={"pointer"} type="text" onClick={() => setOpenLocationModal(true)} id="location" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <Input type="file" name="resume" ref={resumeRef} id="resume" onChange={(e) => setForm({ ...form, resume: e.target.files[0] })} hidden />
                                <FormLabel color={"white"} fontWeight={"bold"}>Category</FormLabel>
                                <Select   styles={customStyles} options={categori}
                                    onChange={(choice) => setForm({ ...form, Category: choice.value })}
                                    name='Category'
                                    id='Category'
                                    components={{ IndicatorSeparator: () => null }}
                                />
                                <LocationModal
                                    open={openLocationModal}
                                    setOpen={setOpenLocationModal}
                                />
                            </Box>
                            <Box>
                                <FormLabel color={"white"} fontWeight={"bold"}>Last Name</FormLabel>
                                <Input  placeholder="Enter Your Last Name" required type="text" value={form.lastName} id="lastName" onChange={onChange} name="lastName" color={"black"} bg={"white"} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Phone</FormLabel>
                                <PhoneInput onChange={(value) => setForm({ ...form, phone: value })} inputStyle={{ color: "black", backgroundColor: "white", fontSize: 14, width: 350, height: 45 }} country={form.Country}></PhoneInput>
                                <FormLabel color={"white"} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                <Input  placeholder="Confirm Your Password" required type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>BirthDate</FormLabel>
                                <Input onChange={onChangeDate} value={form.BirthDate} id="BirthDate" required type="date" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <Input required type="file" ref={inputRef} hidden name="image" onChange={(e) => setForm({ ...form, Image: URL.createObjectURL(e.target.files[0]) })} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Gender</FormLabel>
                                <Selecter onChange={onSelect} value={form.Gender} id="Gender" name="Gender" required color={"black"} bg={"white"} fontSize={14} size='md' w={350} placeholder='Select option'>
                                    <option value='Famle'>Famle</option>
                                    <option value='Male'>Male</option>
                                </Selecter>
                            </Box>
                        </Flex>
                        <Flex direction={"column"} gap={{ md: 4, lg: 8, xl: 4 }} justifyContent={{ base: "center" }}  >
                            <Flex gap={{ md: 4, lg: 4, xl: 2 }} justifyContent={{ md: "center" }} marginTop={{ md: 5 }}>
                                <Box border={"1px solid gray"} margin={{ base: "auto", md: 0 }} bg={"white"} borderRadius={20} padding={3} width={150} height={150} >
                                    <SignatureCanvas canvasProps={{ width: 120, height: 120, className: 'sigCanvas' }} ref={data => setSign(data)} />
                                </Box >
                                <Box border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={150} height={150}>
                                    {form.Image ? <Image src={form.Image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text onClick={() => inputRef?.current?.click()} cursor={"pointer"} color={"green"} fontWeight={"bold"}>Choose your Image</Text>}
                                </Box>
                            </Flex>


                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
                                <Button size={"xs"} w={100} onClick={() => sign.clear()} marginBottom={{ base: 3 }} marginTop={1}>clear</Button>
                                <Button size={"xs"} w={100} onClick={() => setForm({ ...form, Image: "" })} display={{ base: "none", md: "block" }}>delete image</Button>

                                <Button onClick={() => inputRef?.current?.click()} size={"xs"} display={{ base: "none", md: "block" }} >update image</Button>
                            </Box>

                            <Button w={{ base: "full", md: 150, lg: 150 }} onClick={() => resumeRef?.current?.click()} color={"black"}
                                marginRight={{ md: "auto", lg: "auto", xl: 0 }}
                                marginLeft={"auto"}
                                textAlign={"center"}
                                size={"lg"}
                                fontSize={14}>Upload Resume</Button>
                        </Flex>
                    </Flex>

                    <Box w={"full"} display={"flex"} justifyContent={{ base: "center", md: "center", lg: "flex-end" }}  >
                        <Button
                            onClick={HandleSubmit}
                            colorScheme="blue"
                            marginTop={{ base: 5, md: 20 }}
                            textAlign={"center"}
                            w={{ base: "full", md: "full", lg: 200 }}
                            size={"lg"}
                            m={{ xl: 20 }}
                            fontSize={14}>Create Account</Button>

                    </Box>
                </Container>
            </Box>
        </>
    )
}



export default TrainerSignupPage