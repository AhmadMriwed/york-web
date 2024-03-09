// import "use client"
import { userUpdatePassword } from '@/store/userStore/slices/userSlice'
import { FormControl, FormLabel, Input, FormHelperText, Button, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import * as yup from "yup"
import { useFormik } from 'formik'
const AddUserModal = ({ isOpen, onClose, onOpen }) => {
    const dispatch: any = useDispatch()
    const toast = useToast()
    const { errorPass, loadingPass, user } = useSelector((state: any) => state.userSlice)
    console.log(errorPass, loadingPass, user)
    const updateUserPasswordSchema =
        yup.object().shape({
            old_password: yup.string().required("old password is required").min(8, "Password must be at least 8 characters"),
            new_password: yup
                .string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters"),
            new_password_confirmation: yup
                .string()
                .required("Confirm password is required")
                .oneOf([yup.ref("new_password")], "Passwords must match"),
        })
    const handleUpdatePass = async (values: any, actions: any) => {
        console.log(values)
        let cookie = new Cookies()
        let token = await cookie.get("user_token")
        console.log(token)
        try {
            dispatch(userUpdatePassword({ token, data: values })).then((res) => {
                if (res.error) {
                    console.log("some thing went wrong")
                    toast({
                        title: 'Error.',
                        description: 'some thing went wrong',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: "top",

                    })
                    return
                } else {
                    console.log(res)
                    toast({
                        title: 'Success',
                        description: "you have updated your password successfully.",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: "top"
                    })
                }

            })

        } catch (error: any) {
            console.log(error.message)
        }

    }

    const formik = useFormik({
        initialValues: {
            old_password: "",
            new_password: "",
            new_password_confirmation: ""
        },
        validationSchema: updateUserPasswordSchema,
        onSubmit: handleUpdatePass
    })
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>change your password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl >
                            <FormLabel>old password</FormLabel>
                            <Input name='old_password' value={formik.values.old_password} onChange={formik.handleChange} type='password' />
                            {formik.touched.old_password && formik.errors.old_password && (
                                <p className="error-mesage">{formik.errors.old_password}</p>
                            )}
                            <FormLabel>new password</FormLabel>
                            <Input onChange={formik.handleChange} value={formik.values.new_password} name='new_password' type='password' />
                            {formik.touched.new_password && formik.errors.new_password && (
                                <p className="error-mesage">{formik.errors.new_password}</p>
                            )}
                            <FormLabel>confirm password</FormLabel>

                            <Input onChange={formik.handleChange} value={formik.values.new_password_confirmation} name='new_password_confirmation' type='password' />
                            {formik.touched.new_password_confirmation && formik.errors.new_password_confirmation && (
                                <p className="error-mesage">{formik.errors.new_password_confirmation}</p>
                            )}
                        </FormControl>
                        <Button type='submit' colorScheme='blue' w={"full"} mt={3} >
                            {loadingPass ? <Spinner color='red' size={"sm"} /> : "Submit"}
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}

export default AddUserModal