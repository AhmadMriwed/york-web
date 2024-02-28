// import "use client"
import { trainerUpdatePassword } from '@/store/trainerStore/slices/trainerSlice'
import { FormControl, FormLabel, Input, FormHelperText, Button, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
const AddTrainerModal = ({ isOpen, onClose, onOpen }) => {
    const dispatch: any = useDispatch()
    const toast = useToast()
    const { errorPass, loadingPass, trainer } = useSelector((state: any) => state.trainerSlice)
    console.log(errorPass, loadingPass, trainer)
    const [data, setData] = useState({
        old_password: "",
        new_password: "",


    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleUpdatePass = async () => {
        console.log(data)
        let cookie = new Cookies()
        let token = await cookie.get("trainer_token")
        console.log(token)
        if (!data.new_password || !data.old_password) {
            alert("please fill data")
            return
        }

        try {
            dispatch(trainerUpdatePassword({ token, data: data })).then((res) => {
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
            setData({ new_password: "", old_password: "" })
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

                    </FormControl>
                    <Button type='button' onClick={handleUpdatePass} colorScheme='blue' w={"full"} mt={3} >
                        {loadingPass ? <Spinner color='red' size={"sm"} /> : "Submit"}
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}

export default AddTrainerModal