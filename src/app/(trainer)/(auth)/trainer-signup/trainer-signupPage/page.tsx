"use client"
import BackBtn from "@/components/backbtn/BackBtn"
import { Container, Flex, Text, Input, FormLabel, Box, Select as Selecter, Button, Avatar, Center, Spinner, Circle, CloseButton } from "@chakra-ui/react"
import Image from "next/image"
import Location from "@rsuite/icons/Location"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import moment from "moment"
import SignatureCanvas from "react-signature-canvas"
import Select from "react-select"
import { categories } from "@/utils/categories"
import React, { useEffect, useRef, useState } from "react"
import LocationModal from "@/components/accounts/trainers/LocationModal"
// import axios from "axios"
import { useSearchParams } from "next/navigation"
const TrainerSignupPage = () => {
    const [long, setLong] = useState("")
    const [address, setAddress] = useState("")
    const [lat, setLat] = useState("")
    console.log(address)
    const [sign, setSign] = useState()
    const inputRef = useRef()
    const [loading, setLoading] = useState(false)
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
        Category: "",
        digitalSign: "",
        Gender: "Male",
        BirthDate: moment().format('YYYY-MM-DD'),
        resume: null,
        type: searchParams
    })
    const customStyles = {
        control: base => ({
            ...base,
            width: 350
        })
    };


    const categori = categories.map(category => ({
        value: category.value.toLowerCase(),
        label: (

            <Flex alignItems='center' gap='0.5rem'>
                <Avatar src={category.image} size={"xs"} />
                <Text fontSize={"small"} >{category.title}</Text>
            </Flex>

        )
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
    const fileUpload = () => {
        resumeRef?.current?.click()
    }
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setForm({ ...form, Image: URL.createObjectURL(event.target.files[0]) });
        }
    }

    const handleOnImageRemoveClick = () => {
        setForm({ ...form, Image: "" })
        inputRef.current.value = ""

    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { longitude, latitude } = pos.coords
            console.log(latitude, longitude)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            fetch(url).then(res => res.json()).then(data => setAddress(data.address))
        })
    }, [])
    return (
        <>
            <Box overflow={"auto"} h={"full"}  >
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background' />
                <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1] ' ></div>
                <Flex gap={4} justifyContent={{ base: "center", md: "" }} alignItems={{ base: "center", md: "start" }} padding={{ base: 0, md: 3 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box display={{ base: "none", md: "block" }} ><BackBtn textColor="text-white" /></Box>
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={form.Image} />
                    {form.Image && <Text display={{ base: "block", md: "none" }} color={"red"} fontWeight={"bold"} fontSize={"medium"} cursor={"pointer"} onClick={handleOnImageRemoveClick}>Delete Image</Text>}
                    <Flex direction={"column"} marginLeft={{ md: 2 }} marginRight={{ base: "", md: "auto" }}>
                        <Text color={"white"} fontSize={"medium"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "medium", md: "x-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Flex>
                    <Image src={"/logo.png"} alt="" width={90} height={90} />
                </Flex>
                <Container maxW={"container"} padding={{ lg: 20, xl: 0 }} my={4}>
                    <Flex direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={4} justifyContent={{ base: "center", xl: "space-around" }} alignItems={{ base: "center", xl: "start" }} >
                        <Flex gap={4} direction={{ base: "column-reverse", md: "row" }} alignItems={"start"}   >
                            <Box  >
                                <FormLabel color={"white"} fontWeight={"bold"}>First Name</FormLabel>
                                <Input placeholder="Enter Your Full Name" type="text" value={form.firstName} required onChange={onChange} name="firstName" id="firstName" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>email</FormLabel>
                                <Input placeholder="example@gmail.com" required type="email" name="email" value={form.email} id="email" onChange={onChange} color={"black"} bg={"white"} fontSize={14} placeholder='example@gmail.com' size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Password</FormLabel>
                                <Input placeholder="Enter Your Password" required type="password" value={form.password} onChange={onChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Gender</FormLabel>
                                <Selecter onChange={onSelect} value={form.Gender} id="Gender" name="Gender" required color={"black"} bg={"white"} fontSize={14} size='md' w={350} placeholder='Select option'>
                                    <option value='Famle'>Famle</option>
                                    <option value='Male'>Male</option>
                                </Selecter>
                                <Input type="file" name="resume" ref={resumeRef} id="resume" onChange={(e) => setForm({ ...form, resume: e.target.files[0] })} hidden />
                                <FormLabel color={"white"} fontWeight={"bold"}>category</FormLabel>
                                <Select styles={customStyles} options={categori}
                                    onChange={(choice) => setForm({ ...form, Category: choice })}
                                    name='Category'
                                    id='Category'
                                    isMulti
                                />
                                <Box className='lg:border-l-2 border-[#11cdef]  p-8 mt-3 '  >
                                    <FormLabel onClick={() => setOpenLocationModal(true)} color={"white"} fontWeight={"bold"}>Location: <Location color="red" />
                                        {address.country} <span style={{ color: "#11cdef", cursor: "pointer", fontWeight: "bold" }}>change</span></FormLabel>
                                    <Text fontSize={"medium"} fontWeight={"bold"} onClick={fileUpload} color={"#11cdef"} cursor={"pointer"}> Upload your resume  </Text>
                                    <Box width={300} padding={3}>
                                        {form.resume &&
                                            <>
                                                <Text fontWeight={"bold"} > FileName : {form?.resume?.name} </Text>
                                                <Text fontWeight={"bold"}> FileSize :  {form?.resume?.size}</Text>
                                            </>

                                        }
                                    </Box>
                                </Box>
                                <LocationModal
                                    open={openLocationModal}
                                    setOpen={setOpenLocationModal}
                                />
                            </Box>
                            <Box>
                                <FormLabel color={"white"} fontWeight={"bold"}>Last Name</FormLabel>
                                <Input placeholder="Enter Your Last Name" required type="text" value={form.lastName} id="lastName" onChange={onChange} name="lastName" color={"black"} bg={"white"} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Phone</FormLabel>
                                <PhoneInput onChange={(value) => setForm({ ...form, phone: value })} inputStyle={{ color: "black", backgroundColor: "white", fontSize: 14, width: 350, height: 45 }} country={form.Country}></PhoneInput>
                                <FormLabel color={"white"} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                <Input placeholder="Confirm Your Password" required type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>BirthDate</FormLabel>
                                <Input onChange={onChangeDate} value={form.BirthDate} id="BirthDate" required type="date" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <Input required type="file" ref={inputRef} hidden name="image" onChange={handleImageChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>digital signature</FormLabel>
                                <Box border={"1px solid gray"} margin={{ base: "auto", md: 0 }} bg={"white"} position={"relative"} borderRadius={20} padding={3} width={{ base: "auto", md: 345 }} height={150} >
                                    <SignatureCanvas canvasProps={{ width: "full", height: 120, className: 'sigCanvas' }} ref={data => setSign(data)} />
                                    <CloseButton size={"sm"} color={"black"} position={"absolute"} top={0} right={2} onClick={() => sign.clear()} />
                                </Box >
                            </Box>
                        </Flex>
                        <Flex direction={"column"} gap={2} justifyContent={{ md: "center", lg: "start" }} alignItems={{ md: "center", lg: "start" }} marginTop={{ md: 10, xl: 0 }}>
                            <Box cursor={"pointer"} border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={120} height={120} onClick={() => inputRef?.current?.click()} >

                                {form.Image ? <Image src={form.Image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text textAlign={"center"} fontSize={"x-small"} color={"green"} fontWeight={"bold"}>Upload your Image</Text>}
                            </Box>
                            <Text fontWeight={"bold"} cursor={"pointer"} onClick={handleOnImageRemoveClick} display={{ base: "none", md: "block" }} >Delete</Text>
                        </Flex>
                    </Flex>
                    <Box display={"flex"} justifyContent={{ base: "center", xl: "flex-end" }} alignItems={"center"} marginTop={{ md: 10, xl: 0 }} padding={{ base: 0, md: 20 }} w={"full"}>
                        <Button backgroundColor="#11cdef"
                            textColor={"white"}
                            size={{ base: "lg", md: "sm" }}
                            w={{ base: "full", md: 300, lg: 200 }}
                        >Create Account</Button>
                    </Box>


                </Container>

            </Box>
        </>
    )
}


export default TrainerSignupPage