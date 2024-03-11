"use client"
import BackBtn from "@/components/backbtn/BackBtn"
import { Container, Flex, Text, Input, FormLabel, Box, Select as Selecter, Button, Avatar, Center, Spinner, Circle, CloseButton, useToast, Img } from "@chakra-ui/react"
import Image from "next/image"
import Location from "@rsuite/icons/Location"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import moment from "moment"
import SignatureCanvas from "react-signature-canvas"
import Select from "react-select"
import { categorie } from "@/utils/categories"
import React, { useEffect, useRef, useState } from "react"
import LocationModal from "@/components/trainer/LocationModal"
import { Input as Inputt } from "rsuite"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { trainerRegister } from "@/store/trainerStore/slices/trainerSlice"
import { useFormik, validateYupSchema } from "formik"
import { SignatureComponent, Signature } from "@syncfusion/ej2-react-inputs"
import * as yup from "yup"
const TrainerSignupPage = () => {
    const [long, setLong] = useState("")
    const [address, setAddress] = useState("")
    const dispatch: any = useDispatch()
    const [lat, setLat] = useState("")
    const [image, setImage] = useState("")
    let trainer_type = useSearchParams().get("trainer_type")
    let trainer_type_id = useSearchParams().get("id")
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState("")
    console.log(trainer_type_id)
    // let sign = useRef(null)
    let signObj: Signature | null
    const inputRef: any = useRef()
    const resumeRef: any = useRef()
    const { error, trainer, loading } = useSelector((state: any) => state.trainerSlice)
    console.log(error, loading, trainer)
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const toast = useToast()
    const router = useRouter()
    const validationSchema = yup.object().shape({
        about_me: yup.string().required("Please add the Your info "),
        domains: yup.string().required("Required "),
        digital_signature: yup.string().required("Required "),
        email: yup.string().email("Invalid email").required("Email Is Required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        password_confirmation: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
        image: yup.mixed(),
        resume: yup.mixed(),
        last_name: yup.string().required("Required"),
        first_name: yup.string().required("Required"),
        trainer_type_id: yup.string().required("Required"),
        gender: yup.string().required("Required"),
        birth_date: yup
            .date()
            .required("Birthdate is required")
        ,
        phone_number: yup
            .string()
            .required("Phone number is required"),
        Category: yup
            .array()
            .min(1, "At least one category is required")
            .required("Categories are required"),
        // location: yup.string(),
    });


    const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        formik.setFieldValue("birth_date", newDate)

    };
    const onValueChange = (phoneNum: any) => {
        formik.setFieldValue("phone_number", phoneNum)
    }

    const SaveSign = async () => {
        let dataURI = signObj?.getSignature("Svg")
        let svg = atob(dataURI.replace(/data:image\/svg\+xml;base64,/, ''));
        console.log(svg);
        formik.setFieldValue("digital_signature", svg)
    }

    const RemoveSign = () => {
        signObj?.clear()
        formik.setFieldValue("digital_signature", "")

    }
    const handleOnImageRemoveClick = () => {
        formik.setFieldValue("image", "")
        inputRef.current.value = ""
        setImage("")
    };
    const handleSubmit = (values: any, actions: any) => {
        console.log(values)
        const formData = new FormData();
        for (let dataKey in values) {
            if (dataKey === 'location') {
                // append nested object
                for (let previewKey in values[dataKey]) {
                    formData.append(`location[${previewKey}]`, values[dataKey][previewKey]);
                }
            }
            else {
                formData.append("digital_signature", values.digital_signature)
                formData.append("domains", values.domains)
                formData.append("image", values.image)
                formData.append("resume", values.resume)
                formData.append("first_name", values.first_name)
                formData.append("last_name", values.last_name)
                formData.append("gender", values.gender)
                formData.append("about_me", values.about_me)
                formData.append("phone_number", values.phone_number)
                formData.append("birth_date", values.birth_date)
                formData.append("trainer_type_id", values.trainer_type_id)
                formData.append("account_type", values.account_type)
                formData.append("password_confirmation", values.password_confirmation)
                formData.append("password", values.password)
                formData.append("email", values.email)
                for (var i = 0; i < values.Category.length; i++) {
                    formData.append('Category[]', values.Category[i]);
                }
            }
        }

        dispatch(trainerRegister(formData)).then((res) => {
            console.log(res)
            if (res.error) {
                console.log(error)
                toast({
                    title: 'Error.',
                    description: 'we couldnot create your account',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "top",

                })
                return
            } else if (res.payload.is_verified) {
                toast({
                    title: 'Account created',
                    description: "we have created your account successfully.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
                router.push("/")
            } else {
                router.push(`/trainer-login/confirmemail`)
            }
        })
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            password_confirmation: "",
            phone_number: "",
            image: "",
            location: {
                address: "address",
                latitude: 3,
                longitude: 0
            },
            Category: [],
            digital_signature: "default_value",
            gender: "Male",
            birth_date: "",
            resume: "",
            trainer_type_id: Number(trainer_type_id),
            domains: "",
            about_me: "",
            account_type: trainer_type,
        },
        // validationSchema: validationSchema,
        onSubmit: handleSubmit
    })
    const customStyles = {
        control: base => ({
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
                formik.setFieldValue("location", { address: data.address.country, latitude: latitude, longitude: longitude })
            })
        })
    }, [])


    return (
        <>
            <Box overflow={"auto"} h={"full"}  >
                <Image src='/register.png' alt='' fill className='object-cover z-[-1] dark_gradient_background' />
                <div className='w-full h-full absolute top-0 left-0 mix-blend-color z-[-1] ' ></div>
                <Flex gap={4} justifyContent={{ base: "center", md: "" }} alignItems={{ base: "center", md: "start" }} padding={{ base: 0, md: 3 }} direction={{ base: "column-reverse", md: "row" }}>
                    <Box display={{ base: "none", md: "block" }} ><BackBtn textColor="text-white" /></Box>
                    <Avatar onClick={() => inputRef?.current?.click()} display={{ base: "block", md: "none" }} size={"lg"} src={image} />
                    {formik.values.image && <Text display={{ base: "block", md: "none" }} color={"red"} fontWeight={"bold"} fontSize={"medium"} cursor={"pointer"} onClick={handleOnImageRemoveClick}>Delete Image</Text>}
                    <Flex direction={"column"} marginLeft={{ md: 2 }} marginRight={{ base: "", md: "auto" }}>
                        <Text color={"white"} fontSize={"medium"} textAlign={{ base: "center", md: "start" }}>welcome to</Text>
                        <Text color={"white"} fontSize={{ base: "medium", md: "x-large" }} fontWeight={"bold"}>York British Academy</Text>
                    </Flex>
                    <Image src={"/logo.png"} alt="" width={90} height={90} />
                </Flex>
                <Container maxW={"container"} padding={{ lg: 20, xl: 0 }} my={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <Flex direction={{ lg: "column", md: "column", base: "column", xl: "row" }} gap={4} justifyContent={{ base: "center", xl: "space-around" }} alignItems={{ base: "center", xl: "start" }} >
                            <Flex gap={4} direction={{ base: "column-reverse", md: "row" }} justifyContent={"center"} alignItems={{ base: "center", md: "start" }}   >
                                <Box  >
                                    <FormLabel color={"white"} fontWeight={"bold"}>Last Name</FormLabel>
                                    <Input placeholder="Enter Your Last Name" type="text" value={formik.values.last_name} id="last_name" onChange={formik.handleChange} name="last_name" color={"black"} bg={"white"} size='md' w={350} />
                                    {formik.touched.last_name && formik.errors.last_name && (
                                        <p className="error-mesage">{formik.errors.last_name}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>email</FormLabel>
                                    <Input placeholder="example@gmail.com" type="email" name="email" value={formik.values.email} id="email" onChange={formik.handleChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="error-mesage">{formik.errors.email}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>Password</FormLabel>
                                    <Input placeholder="Enter Your Password" type="password" value={formik.values.password} onChange={formik.handleChange} name="password" id="password" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="error-mesage">{formik.errors.password}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>Gender</FormLabel>
                                    <Selecter onChange={formik.handleChange} value={formik.values.gender} id="gender" name="gender" color={"black"} bg={"white"} fontSize={14} size='md' w={350} placeholder='Select option'>
                                        <option value='Famle'>Famle</option>
                                        <option value='Male'>Male</option>
                                    </Selecter>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <p className="error-mesage">{formik.errors.gender}</p>
                                    )}
                                    <Inputt accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" name="resume" ref={resumeRef} id="resume"
                                        onChange={(value, e: any) => {
                                            console.log(e);
                                            formik.values.resume = e.target.files[0];
                                            setFileName(e.target.files[0].name)
                                            setFileSize(e.target.files[0].size)

                                        }} hidden />
                                    <FormLabel color={"white"} fontWeight={"bold"}>category</FormLabel>
                                    <Select styles={customStyles} options={categori}
                                        onChange={(choice) => {
                                            formik.values.Category = choice.map((i) => i.id)
                                        }
                                        }
                                        name='Category'
                                        id='Category'
                                        isMulti
                                    />
                                    {formik.touched.Category && formik.errors.Category && (
                                        <p className="error-mesage">{formik.errors.Category}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>domains</FormLabel>
                                    <Input placeholder="fjfjfj" type="text" value={formik.values.domains} onChange={formik.handleChange} name="domains" id="domains" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.domains && formik.errors.domains && (
                                        <p className="error-mesage">{formik.errors.domains}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>about_me</FormLabel>
                                    <Input placeholder="tell us about your self" type="text" value={formik.values.about_me} onChange={formik.handleChange} name="about_me" id="about_me" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.about_me && formik.errors.about_me && (
                                        <p className="error-mesage">{formik.errors.about_me}</p>
                                    )}
                                    <Box className='lg:border-l-2 border-[#11cdef]  p-8 mt-3 '  >
                                        <FormLabel onClick={() => setOpenLocationModal(true)} color={"white"} fontWeight={"bold"}>Location: <Location color="red" />
                                            {address} <span style={{ color: "#11cdef", cursor: "pointer", fontWeight: "bold" }}>change</span></FormLabel>
                                        <Text fontSize={"medium"} fontWeight={"bold"} onClick={() => resumeRef.current.click()} color={"#11cdef"} cursor={"pointer"}> Upload your resume  </Text>
                                        <Box width={300} padding={3}>
                                            {fileName && fileSize ?
                                                <>
                                                    <Text fontWeight={"bold"} > FileName : {fileName} </Text>
                                                    <Text fontWeight={"bold"}> FileSize :  {fileSize}</Text>
                                                </>
                                                : ""
                                            }
                                        </Box>
                                    </Box>
                                    <LocationModal
                                        open={openLocationModal}
                                        setOpen={setOpenLocationModal}
                                    />
                                </Box>
                                <Box >
                                    <FormLabel color={"white"} fontWeight={"bold"}>First Name</FormLabel>
                                    <Input placeholder="Enter Your Full Name" type="text" value={formik.values.first_name} onChange={formik.handleChange} name="first_name" id="first_name" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.first_name && formik.errors.first_name && (
                                        <p className="error-mesage">{formik.errors.first_name}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>Phone</FormLabel>
                                    <PhoneInput value={formik.values.phone_number} isValid onChange={onValueChange} inputStyle={{ color: "black", backgroundColor: "white", fontSize: 14, width: 350, height: 45 }} country={"us"}></PhoneInput>
                                    {formik.touched.phone_number && formik.errors.phone_number && (
                                        <p className="error-mesage">{formik.errors.phone_number}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>ConfirmPassword</FormLabel>
                                    <Input id="password_confirmation" placeholder="Confirm Your Password" type="password" name="password_confirmation" value={formik.values.password_confirmation} onChange={formik.handleChange} color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                        <p className="error-mesage">{formik.errors.password_confirmation}</p>
                                    )}
                                    <FormLabel color={"white"} fontWeight={"bold"}>BirthDate</FormLabel>
                                    <Input onChange={onChangeDate} value={formik.values.birth_date} id="birth_date" name="birth_date" type="date" color={"black"} bg={"white"} fontSize={14} size='md' w={350} />
                                    {formik.touched.birth_date && formik.errors.birth_date && (
                                        <p className="error-mesage">{formik.errors.birth_date}</p>
                                    )}

                                    <Inputt onChange={(value, e: any) => {
                                        console.log(e);
                                        formik.values.image = e.target.files[0];
                                        setImage(URL.createObjectURL(e.target.files[0]))
                                    }} accept="image/png, image/gif, image/jpeg" type="file" ref={inputRef} hidden name="image" id="image" color={"black"} size='md' />

                                    <FormLabel color={"white"} fontWeight={"bold"}>digital signature</FormLabel>
                                    <Box border={"1px solid gray"} margin={{ base: "auto", md: 0 }} bg={"white"} position={"relative"} borderRadius={20} padding={3} width={{ base: "auto", md: 345 }} height={150}  >
                                        <SignatureComponent style={{ width: "full", height: 120 }} ref={sign => signObj = sign} backgroundColor="white" ></SignatureComponent>
                                        {/* <SignatureCanvas name="digital_signature" canvasProps={{ width: "full", height: 120, className: 'sigCanvas' }} ref={sign} /> */}
                                        <CloseButton size={"sm"} color={"black"} position={"absolute"} top={0} right={2} onClick={RemoveSign} />
                                    </Box >
                                    <Button size={"sm"} mt={5} onClick={() => SaveSign()}>Save Sign</Button>
                                </Box>
                            </Flex>
                            <Flex direction={"column"} gap={2} justifyContent={{ md: "center", lg: "start" }} alignItems={{ md: "center", lg: "start" }} marginTop={{ md: 10, xl: 0 }}>
                                <Box cursor={"pointer"} border={"1px solid gray"} bg={"black"} position={"relative"} display={{ base: "none", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={120} height={120} onClick={() => inputRef?.current?.click()} >

                                    {formik.values.image ? <Image src={image} alt="" width={300} height={300} style={{ position: "absolute" }} /> : <Text textAlign={"center"} fontSize={"x-small"} color={"green"} fontWeight={"bold"}>Upload your Image</Text>}
                                </Box>
                                <Text fontSize={15} fontWeight={"bold"} cursor={"pointer"} onClick={() => handleOnImageRemoveClick()} display={{ base: "none", md: "block" }} >Delete</Text>
                                {formik.touched.image && formik.errors.image && (
                                    <p className="error-mesage">{formik.errors.image}</p>
                                )}
                            </Flex>
                        </Flex>
                        <Box display={"flex"} justifyContent={{ base: "center", xl: "flex-end" }} alignItems={"center"} marginTop={{ md: 10, xl: 0 }} padding={{ base: 0, md: 20 }} w={"full"}>
                            <Button disabled={loading} backgroundColor="#11cdef"
                                textColor={"white"}
                                type="submit"
                                variant={"black"}
                                size={{ base: "lg", md: "sm" }}
                                w={{ base: "full", md: 300, lg: 200 }}
                            >{loading ? <Spinner color="red" size={"sm"} /> : "Create Account"}</Button>
                        </Box>
                    </form>
                </Container>
            </Box >
        </>
    )
}


export default TrainerSignupPage