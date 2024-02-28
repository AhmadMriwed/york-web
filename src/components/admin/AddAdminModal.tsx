// import "use client"
import { adminUpdatePassword } from '@/store/adminstore/slices/authSlice'
import { FormControl, FormLabel, Input, FormHelperText, Button, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
const AddAdminModal = ({ isOpen, onClose, onOpen }) => {
    const dispatch: any = useDispatch()
    const toast = useToast()
    const { errorPass, loadingPass, admin } = useSelector((state: any) => state.authSlice)
    console.log(errorPass, loadingPass, admin)
    const [data, setData] = useState({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",


    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleUpdatePass = async () => {
        console.log(data)
        let cookie = new Cookies()
        let token = await cookie.get("token")
        console.log(token)
        if (!data.new_password || !data.old_password || !data.new_password_confirmation) {
            alert("please fill data")
            return
        }

        try {
            dispatch(adminUpdatePassword({ token, data: data })).then((res) => {
                console.log(res)
                toast({
                    title: 'Success',
                    description: "you have updated your password successfully.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                })
            })
            setData({ new_password_confirmation: "", new_password: "", old_password: "" })
        } catch (error: any) {
            console.log(error.message)
        }

    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>change your password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl >
                        <FormLabel>old password</FormLabel>
                        <Input name='old_password' value={data.old_password} onChange={handleChange} type='password' />
                        <FormLabel>new password</FormLabel>
                        <Input onChange={handleChange} value={data.new_password} name='new_password' type='password' />
                        <FormLabel>confirm password</FormLabel>
                        <Input onChange={handleChange} value={data.new_password_confirmation} name='new_password_confirmation' type='password' />
                    </FormControl>
                    <Button type='button' onClick={handleUpdatePass} colorScheme='blue' w={"full"} mt={3} >
                        {loadingPass ? <Spinner color='red' size={"sm"} /> : "Submit"}
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}

export default AddAdminModal