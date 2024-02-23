"use client"
import { Container, Flex, Text, Input, FormLabel, Box, Button, Avatar, Select as Selecter, Spinner } from "@chakra-ui/react"
import Image from "next/image"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import moment from "moment"
import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Location from "@rsuite/icons/Location"
import Select from "react-select"
import { categorie } from "@/utils/categories"
import LocationModal from "@/components/accounts/trainers/LocationModal"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { updateUserProfile } from "@/store/userStore/slices/userSlice"
import Cookies from "universal-cookie"
const UserCompleteSignup = () => {
    const params = useParams()
    console.log(params)
    const cookie = new Cookies()
    const dispatch: any = useDispatch()

    const inputRef = useRef()
    const [lon, setLon] = useState()
    const [lat, setLat] = useState()
    const [loc, setLoc] = useState("")

    const { error, user, loading } = useSelector((state: any) => state.userSlice)
    console.log(error, user, loading)
    const id = user?.id
    console.log(user)
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const [form, setForm] = useState({
        gender: "Male",
        phone_number: "",
        birth_date: moment().format('YYYY-MM-DD'),
        image: "",
        Country: "us",
        categories: "",
        location: {
            address: "address",
            latitude: 3,
            longitude: 0
        },
        url: ""
    })

    console.log(form.categories)
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
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setForm({ ...form, image: URL.createObjectURL(event.target.files[0]) });
        }
    }

    const handleOnImageRemoveClick = () => {
        setForm({ ...form, image: "" })
        inputRef.current.value = ""

    };
    const HandleSubmit = async () => {
        console.log(form)
        const token = cookie.get("userSignUp_token")
        let data = { url: form.url, birth_date: form.birth_date, phone_number: form.phone_number, gender: form.gender, Image: form.image, categories: form.categories }
        try {
            dispatch(updateUserProfile({ token, data: data })).then((res) => {
                
                console.log(res, "success")
            })
        } catch (error: any) {
            console.log(error.mesage)
        }

    }
    const customStyles = {
        control: base => ({
            ...base,
            width: 350
        })
    };



    const categori = categorie.map(category => ({
        value: category.value.toLowerCase(),
        label: (

            <Flex alignItems='center' gap='0.5rem'>
                <Avatar src={category.image} size={"xs"} />
                <Text fontSize={"small"} >{category.title}</Text>
            </Flex>

        )
    }));


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { longitude, latitude } = pos.coords
            console.log(latitude, longitude)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            fetch(url).then(res => res.json()).then(data => setLoc(data.address))
        })

    }, [])

    return (
        <>
            <Box overflow={{ base: "auto", md: "hidden" }} maxH={"100vh"}>
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]'></div>
                <Flex gap={2} justifyContent={{ base: "center", md: "space-between" }} alignItems={{ base: "center", md: "" }} padding={{ base: 2, md: 3 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box >
                        <Text color={"white"} fontSize={"large"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "x-large", md: "xx-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Box>
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={form.Image} />
                    {form.image && <Text display={{ base: "block", md: "none" }} color={"red"} fontWeight={"bold"} fontSize={"medium"} cursor={"pointer"} onClick={handleOnImageRemoveClick}>Delete Image</Text>}
                    <Box><Image src={"/logo.png"} alt="" width={100} height={100} /></Box>
                </Flex>
                <Container maxW={"container"} padding={{ md: 10, lg: 20, xl: 0 }} my={4}>
                    <Flex direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={6} justifyContent={{ base: "center", md: "space-around" }} alignItems={{ base: "center", xl: "start" }}>
                        <Flex gap={6} direction={{ base: "column-reverse", md: "row" }} justifyContent={"center"} alignItems={{ base: "center", md: "start" }}   >
                            <Box >
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>Gender</FormLabel>
                                <Selecter height={50} onChange={onSelect} id="gender" name="gender" required color={"black"} bg={"white"} fontSize={14} size='md' w={350} placeholder='Select option'>
                                    <option value='Famle'>Famle</option>
                                    <option value='Male'>Male</option>
                                </Selecter>
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>Phone</FormLabel>
                                <PhoneInput onChange={(value) => setForm({ ...form, phone_number: value })} inputStyle={{ color: "black", backgroundColor: "white", fontSize: 14, width: 350, height: 50 }} country={form.Country}></PhoneInput>
                                <Input accept="image/png, image/gif, image/jpeg" type="file" name="image" onChange={handleImageChange} hidden ref={inputRef} />
                                <Box className='lg:border-l-2 border-[#11cdef]  p-8 mt-3 '  >
                                    <FormLabel onClick={() => setOpenLocationModal(true)} color={"white"} fontWeight={"bold"}>Location: <Location color="red" />
                                        {loc.country} <span style={{ color: "#11cdef", cursor: "pointer", fontWeight: "bold" }}>change</span></FormLabel>

                                </Box>

                            </Box>
                            <Box>
                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>BirthDate</FormLabel>
                                <Input height={50} onChange={onChangeDate} value={form.birth_date} id="birth_date" required type="date" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />

                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>Website</FormLabel>
                                <Input height={50} onChange={onChange} name="url" value={form.url} id="url" required type="text" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />

                                <FormLabel padding={1} color={"white"} fontWeight={"bold"}>category</FormLabel>
                                <Select styles={customStyles} options={categori}
                                    onChange={(value) => setForm({ ...form, categories: value.map((i) => i.value) })}
                                    name='categories'
                                    id='categories'
                                    isMulti
                                />
                                <LocationModal
                                    open={openLocationModal}
                                    setOpen={setOpenLocationModal}
                                />
                            </Box>
                        </Flex>
                        <Flex direction={"column"} gap={2} justifyContent={{ md: "center", lg: "start" }} alignItems={{ md: "center", lg: "start" }} marginTop={{ md: 10, xl: 0 }}>
                            <Box cursor={"pointer"} border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={120} height={120} onClick={() => inputRef?.current?.click()} >

                                {form.image ? <Image src={form.image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text textAlign={"center"} fontSize={"x-small"} color={"green"} fontWeight={"bold"}>Upload your Image</Text>}
                            </Box>
                            <Text fontWeight={"bold"} cursor={"pointer"} onClick={handleOnImageRemoveClick} display={{ base: "none", md: "block" }} >Delete</Text>
                        </Flex>
                    </Flex>
                    <Flex marginTop={{ base: 2, md: 20 }} gap={4} justifyContent={"flex-end"} alignItems={"center"} >
                        <Button w={200}
                            onClick={HandleSubmit}
                            textColor={"white"}
                            backgroundColor={"#11cdef"}
                            textAlign={"center"}
                            size={"md"}
                            variant={"black"}
                            fontSize={14}>{loading ? <Spinner color="red" size={"sm"} /> : "Complete Account"}</Button>
                        <Link style={{ width: 100, color: "#11cdef", fontSize: 15, fontWeight: "bold" }} href={"/"}
                        >Skip</Link>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}
export default UserCompleteSignup