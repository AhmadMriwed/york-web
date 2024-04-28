"use client"
import { Container, Flex, Text, Input, FormLabel, Box, Button, Avatar, Select as Selecter, Spinner, useToast } from "@chakra-ui/react"
import Image from "next/image"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import moment from "moment"
import React, { useRef, useState, useEffect, ChangeEvent } from "react"
import Link from "next/link"
import Location from "@rsuite/icons/Location"
import Select from "react-select"
import { categorie } from "@/utils/categories"
import LocationModal from "@/components/accounts/trainers/LocationModal"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import { CompleteUserProfile } from "@/store/userStore/slices/userSlice"
import Cookies from "universal-cookie"
import { useFormik } from "formik"
import * as yup from "yup"
import { AiFillDelete } from "react-icons/ai"
import { Input as Inputt } from "rsuite"
export interface FormVal {
    url: string;
    phone_number: string;
    image: null | string;
    location: {
    
        lat: number;
        lng: number;
     };
    categories: number[];
    gender: string;
    birth_date: string;
    about_me: string;

}
const UserCompleteSignup = () => {
    const toast = useToast()
    const cookie = new Cookies()
    const dispatch: any = useDispatch()
    const router = useRouter()
    const inputRef: any = useRef()
    const [address, setAddress] = useState("")
    console.log(location)
    const { error, user, loading } = useSelector((state: any) => state.userSlice)
    console.log(error, user, loading)
    const [position, setPosition] = useState<{
        lat: number;
        lng: number;
     }>({
        lat: 0,
        lng: 0,
     });
     const [openLocationModal, setOpenLocationModal] = useState(false);
    const [image, setImage] = useState("")
    const validationSchema = yup.object().shape({
        about_me: yup.string().required("Please add the Your info "),
        url: yup.string().required("Please add the Your URL "),
        image: yup.mixed(),
        gender: yup.string().required("Required"),
        birth_date: yup
            .date()
            .required("Birthdate is required")
        ,
        phone_number: yup
            .string()
            .required("Phone number is required"),
        categories: yup
            .array()
            .min(1, "At least one category is required")
            .required("Categories are required"),
            location: yup.object().required("Location is required"),
    });

    const HandleSubmit = (values: any, actions: any) => {
        console.log(values)
        let formData = new FormData()
        for (let dataKey in values) {
            if (dataKey === 'location') {
                // append nested object
                for (let previewKey in values[dataKey]) {
                    formData.append(`location[${previewKey}]`, values[dataKey][previewKey]);
                }
            }
            else {
                formData.append("image", values.image)
                formData.append("url", values.url)
                formData.append("gender", values.gender)
                formData.append("about_me", values.about_me)
                formData.append("phone_number", values.phone_number)
                formData.append("birth_date", values.birth_date)
                for (var i = 0; i < values.categories.length; i++) {
                    formData.append('categories[]', values.categories[i]);
                }
            }
        }
        let token = cookie.get("user_token")
        console.log(token)
        dispatch(CompleteUserProfile({ token, data: formData }))
            .then((res: any) => {
                console.log(res)
                if (res.error) {
                    toast({
                        title: 'Error',
                        description: "We could not update your account.",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top"
                    })
                    console.log(error)
                    return
                }
                else if (res.payload.is_verified) {
                    toast({
                        title: 'Success',
                        description: "Account is Updated successfully.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: "top"
                    })
                    router.push("/")
                } else {
                    router.push("/user-login/confirmemail")
                }
            })

    }
    const formik = useFormik({
        initialValues: {
            url: "",
            phone_number: "",
            image: "",
            location:{
                lat :position.lat ,
                lng: position.lng
             },
            categories: [],
            gender: "Male",
            birth_date: "",
            about_me: "",
        } as FormVal,
        validationSchema,
        onSubmit: HandleSubmit
    })
    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        formik.setFieldValue("birth_date", newDate)
    };
    const onValueChange = (phoneNum: any) => {
        formik.setFieldValue("phone_number", phoneNum)
    }
    const handleOnImageRemoveClick = () => {
        formik.setFieldValue("image", "")
        inputRef.current.value = ""
        setImage("")
    };


    const customStyles = {
        control: (base: any) => ({
            ...base,
            width: 350
        })
    };
    const categori = categorie.map(category => ({
        id: category.id,
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
            fetch(url).then(res => res.json()).then(data => {
                setAddress(data.address.country)
               
            })
        })
    }, [])

    return (
        <>
            <Box overflow={{ base: "auto", md: "auto" }} maxH={"100vh"}>
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background ' />
                <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]'></div>
                <Flex gap={2} justifyContent={{ base: "center", md: "space-between" }} alignItems={{ base: "center", md: "" }} padding={{ base: 2, md: 3 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box >
                        <Text color={"white"} fontSize={"large"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "x-large", md: "xx-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Box>
                    <Box style={{ position: "relative" }} display={{ base: "block", md: "none" }}>
                        <Avatar
                            onClick={() => inputRef?.current?.click()}
                            size={"lg"}
                            src={image ? image : "/default.jpg"}
                        />
                        {formik.values.image && (


                            <AiFillDelete cursor={"pointer"} onClick={() => handleOnImageRemoveClick()} style={{ position: "absolute", bottom: -10, right: 0 }} color="red" size={30} />


                        )}
                    </Box>
                    <Box><Image src={"/logo.png"} alt="" width={100} height={100} /></Box>
                </Flex>
                <Container maxW={"container"} padding={{ md: 10, lg: 20, xl: 0 }} my={4}>
                    <form onSubmit={formik.handleSubmit} >
                        <Flex direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={6} justifyContent={{ base: "center", md: "space-around" }} alignItems={{ base: "center", xl: "start" }}>
                            <Flex gap={6} direction={{ base: "column-reverse", md: "row" }} justifyContent={"center"} alignItems={{ base: "center", md: "start" }}   >
                                <Box >
                                    <FormLabel padding={1} color={"white"} fontWeight={"bold"}>Gender</FormLabel>
                                    <Selecter height={50} value={formik.values.gender} onChange={formik.handleChange} id="gender" name="gender" color={"black"} bg={"white"} fontSize={14} size='md' w={350} placeholder='Select option'>
                                        <option value='Famle'>Famle</option>
                                        <option value='Male'>Male</option>
                                    </Selecter>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <p className="error-mesage">{formik.errors.gender}</p>
                                    )}
                                    <FormLabel padding={1} color={"white"} fontWeight={"bold"}>Phone_Number</FormLabel>
                                    <PhoneInput value={formik.values.phone_number} onChange={onValueChange} inputStyle={{ color: "black", backgroundColor: "white", fontSize: 14, width: 350, height: 50 }} country={"us"}></PhoneInput>
                                    {formik.touched.phone_number && formik.errors.phone_number && (
                                        <p className="error-mesage">{formik.errors.phone_number}</p>
                                    )}
                                    <Inputt onChange={(value, e: any) => {
                                        console.log(e);
                                        formik.values.image = e.target.files[0]
                                        setImage(URL.createObjectURL(e.target.files[0]))
                                    }} accept="image/png, image/gif, image/jpeg" type="file" ref={inputRef} hidden name="image" id="image" color={"black"} size='md' />

                                    <Box className='lg:border-l-2 border-[#11cdef]  p-8 mt-3 '  >
                                        <FormLabel onClick={() => setOpenLocationModal(true)} color={"white"} fontWeight={"bold"}>Location: <Location color="red" />
                                            {address} <span style={{ color: "#11cdef", cursor: "pointer", fontWeight: "bold" }}>change</span></FormLabel>
                                    </Box>
                                </Box>
                                <Box>
                                    <FormLabel padding={1} color={"white"} fontWeight={"bold"}>BirthDate</FormLabel>
                                    <Input height={50} onChange={onChangeDate} name="birth_date" value={formik.values.birth_date} id="birth_date" type="date" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.birth_date && formik.errors.birth_date && (
                                        <p className="error-mesage">{formik.errors.birth_date}</p>
                                    )}
                                    <FormLabel padding={1} color={"white"} fontWeight={"bold"}>Website</FormLabel>
                                    <Input height={50} name="url" value={formik.values.url} onChange={formik.handleChange} id="url" type="text" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.url && formik.errors.url && (
                                        <p className="error-mesage">{formik.errors.url}</p>
                                    )}
                                    <FormLabel padding={1} color={"white"} fontWeight={"bold"}>About Me</FormLabel>
                                    <Input height={50} value={formik.values.about_me} onChange={formik.handleChange} name="about_me" id="about_me" type="text" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.about_me && formik.errors.about_me && (
                                        <p className="error-mesage">{formik.errors.about_me}</p>
                                    )}
                                    <FormLabel padding={1} color={"white"} fontWeight={"bold"}>categories</FormLabel>
                                    <Select styles={customStyles} options={categori}
                                        onChange={(value) => {
                                            formik.values.categories = value.map((i) => i.id)
                                        }
                                        }
                                        name='categories'
                                        id='categories'
                                        isMulti
                                    />
                                    {formik.touched.categories && formik.errors.categories && (
                                        <p className="error-mesage">{formik.errors.categories}</p>
                                    )}
                                    <LocationModal
                                        open={openLocationModal}
                                        setOpen={setOpenLocationModal}
                                        position={position}
                                        setPosition={setPosition}
                                        setLocation={() => {
                                            formik.setFieldValue("location", position)
                                        }} />
                                </Box>
                            </Flex>
                            <Flex direction={"column"} gap={2} justifyContent={{ md: "center", lg: "start" }} alignItems={{ md: "center", lg: "start" }} marginTop={{ md: 10, xl: 0 }}>
                                <Box cursor={"pointer"} border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={120} height={120} onClick={() => inputRef?.current?.click()} >

                                    {formik.values.image ? <Image src={image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text textAlign={"center"} fontSize={"x-small"} color={"green"} fontWeight={"bold"}>Upload your Image</Text>}
                                </Box>
                                {formik.values.image && <Text fontWeight={"bold"} cursor={"pointer"} onClick={handleOnImageRemoveClick} display={{ base: "none", md: "block" }} >Delete</Text>}
                                {formik.touched.image && formik.errors.image && (
                                    <p className="error-mesage">{formik.errors.image}</p>
                                )}
                            </Flex>
                        </Flex>
                        <Flex marginTop={{ base: 2, md: 20 }} gap={4} justifyContent={"flex-end"} alignItems={"center"} >
                            <Button w={200}
                                type="submit"
                                disabled={loading}
                                textColor={"white"}
                                backgroundColor={"#11cdef"}
                                textAlign={"center"}
                                size={"md"}
                                variant={"black"}
                                fontSize={14}>{loading ? <Spinner color="red" size={"sm"} /> : "Complete Account"}</Button>
                            <Link style={{ width: 100, color: "#11cdef", fontSize: 15, fontWeight: "bold" }} href={"/"}
                            >Skip</Link>
                        </Flex>
                    </form>
                </Container>
            </Box>
        </>
    )
}
export default UserCompleteSignup