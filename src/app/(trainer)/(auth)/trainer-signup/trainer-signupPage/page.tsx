"use client"
import BackBtn from "@/components/backbtn/BackBtn"
import { Container, Flex, Text, Input, FormLabel, Box, Select as Selecter, Button, Avatar, Center, Spinner, Circle, CloseButton, useToast } from "@chakra-ui/react"
import Image from "next/image"
import Location from "@rsuite/icons/Location"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import aa from "../../../../../../public/adminlogin.png"
import moment from "moment"
import SignatureCanvas from "react-signature-canvas"
import Select from "react-select"
import { categorie } from "@/utils/categories"
import React, { useEffect, useRef, useState } from "react"
import LocationModal from "@/components/accounts/trainers/LocationModal"
// import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { trainerRegister } from "@/store/trainerStore/slices/trainerSlice"
const TrainerSignupPage = () => {
    const [long, setLong] = useState("")
    const [address, setAddress] = useState("")
    const dispatch: any = useDispatch()
    const [lat, setLat] = useState("")
    console.log(address)
    const [sign, setSign] = useState()
    const inputRef = useRef()
    const resumeRef = useRef()
    const { error, trainer, loading } = useSelector((state: any) => state.trainerSlice)
    console.log(error, loading, trainer)
    const searchParams = useSearchParams().get("trainer")
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const toast = useToast()
    const [form, setForm] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        Country: "us",
        image: "",
        location: "",
        Category: [1, 2],
        digital_signature: "",
        gender: "Male",
        birth_date: moment().format('YYYY-MM-DD'),
        resume: null,
        type: 1
    })
    const customStyles = {
        control: base => ({
            ...base,
            width: 350
        })
    };
    console.log(form.image)

    const categori = categorie.map(category => ({
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
        setForm({ ...form, birth_date: newDate })

    };

    const fileUpload = () => {
        resumeRef?.current?.click()
    }
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {

            setForm({ ...form, image: URL.createObjectURL((event.target.files[0])) });
        }
    }
    // 

    const handleOnImageRemoveClick = () => {
        setForm({ ...form, image: "" })
        inputRef.current.value = ""

    };
    const HandleSubmit = async (e) => {
        e.preventDefault()
        await setForm({ ...form, digital_signature: sign.getTrimmedCanvas().toDataURL("image/svg") })
        console.log(form)

        if (form.password !== form.password_confirmation) {
            toast({
                title: 'Error.',
                description: "Password must match.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            return


        }

        let data = { gender: form.gender, trainer_type_id: form.type, image: aa, domains: "ddddd", about_me: "adel", last_name: form.last_name, email: form.email, password_confirmation: form.password_confirmation, password: form.password, first_name: form.first_name, digital_signature: form.digital_signature, phone_number: form.phone_number, birth_date: form.birth_date }
        try {

            dispatch(trainerRegister(data)).then((res) => {
                console.log(res)
                if (error) {
                    console.log(error)
                    return
                } else {


                    toast({
                        title: 'Account created',
                        description: "we have created your account successfully.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position: "top"
                    })
                    // router.push(`/user-signup/user-signupPage/user-completeSignup`)
                }
            })

        } catch (error: any) {
            console.log(error.mesage)
            toast({
                title: 'Error',
                description: "we Can not  create your account .",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
            })

        }





    }

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
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={form.image} />
                    {form.image && <Text display={{ base: "block", md: "none" }} color={"red"} fontWeight={"bold"} fontSize={"medium"} cursor={"pointer"} onClick={handleOnImageRemoveClick}>Delete Image</Text>}
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
                                <Input placeholder="Enter Your Full Name" type="text" value={form.first_name} required onChange={onChange} name="first_name" id="first_name" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>email</FormLabel>
                                <Input placeholder="example@gmail.com" required type="email" name="email" value={form.email} id="email" onChange={onChange} color={"black"} bg={"white"} fontSize={14} placeholder='example@gmail.com' size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Password</FormLabel>
                                <Input placeholder="Enter Your Password" required type="password" value={form.password} onChange={onChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Gender</FormLabel>
                                <Selecter onChange={onSelect} value={form.gender} id="gender" name="gender" required color={"black"} bg={"white"} fontSize={14} size='md' w={350} placeholder='Select option'>
                                    <option value='Famle'>Famle</option>
                                    <option value='Male'>Male</option>
                                </Selecter>
                                <Input type="file" name="resume" ref={resumeRef} id="resume" onChange={(e) => setForm({ ...form, resume: e.target.files[0] })} hidden />
                                <FormLabel color={"white"} fontWeight={"bold"}>category</FormLabel>
                                <Select styles={customStyles} options={categori}
                                    onChange={(choice) => setForm({ ...form, Category: choice.map((i) => i.value) })}
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
                                <Input placeholder="Enter Your Last Name" required type="text" value={form.last_name} id="last_name" onChange={onChange} name="last_name" color={"black"} bg={"white"} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>Phone</FormLabel>
                                <PhoneInput onChange={(value) => setForm({ ...form, phone_number: value })} inputStyle={{ color: "black", backgroundColor: "white", fontSize: 14, width: 350, height: 45 }} country={form.Country}></PhoneInput>
                                <FormLabel color={"white"} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                <Input placeholder="Confirm Your Password" required type="password" name="password_confirmation" value={form.password_confirmation} onChange={onChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>BirthDate</FormLabel>
                                <Input onChange={onChangeDate} value={form.birth_date} id="birth_date" required type="date" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <Input accept="image/png, image/gif, image/jpeg" required type="file" ref={inputRef} hidden name="image" onChange={handleImageChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                <FormLabel color={"white"} fontWeight={"bold"}>digital signature</FormLabel>
                                <Box border={"1px solid gray"} margin={{ base: "auto", md: 0 }} bg={"white"} position={"relative"} borderRadius={20} padding={3} width={{ base: "auto", md: 345 }} height={150} >
                                    <SignatureCanvas canvasProps={{ width: "full", height: 120, className: 'sigCanvas' }} ref={data => setSign(data)} />
                                    <CloseButton size={"sm"} color={"black"} position={"absolute"} top={0} right={2} onClick={() => sign.clear()} />
                                </Box >
                            </Box>
                        </Flex>
                        <Flex direction={"column"} gap={2} justifyContent={{ md: "center", lg: "start" }} alignItems={{ md: "center", lg: "start" }} marginTop={{ md: 10, xl: 0 }}>
                            <Box cursor={"pointer"} border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={120} height={120} onClick={() => inputRef?.current?.click()} >

                                {form.image ? <Image src={form.image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text textAlign={"center"} fontSize={"x-small"} color={"green"} fontWeight={"bold"}>Upload your Image</Text>}
                            </Box>
                            <Text fontWeight={"bold"} cursor={"pointer"} onClick={handleOnImageRemoveClick} display={{ base: "none", md: "block" }} >Delete</Text>
                        </Flex>
                    </Flex>
                    <Box display={"flex"} justifyContent={{ base: "center", xl: "flex-end" }} alignItems={"center"} marginTop={{ md: 10, xl: 0 }} padding={{ base: 0, md: 20 }} w={"full"}>
                        <Button backgroundColor="#11cdef"
                            textColor={"white"}
                            variant={"black"}
                            onClick={HandleSubmit}
                            size={{ base: "lg", md: "sm" }}
                            w={{ base: "full", md: 300, lg: 200 }}
                        >{loading ? <Spinner color="red" size={"sm"} /> : "Create Account"}</Button>
                    </Box>
                </Container>
            </Box>
        </>
    )
}


export default TrainerSignupPage