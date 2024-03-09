// import "use client"
import { trainerUpdatePassword } from '@/store/trainerStore/slices/trainerSlice'
import { FormControl, FormLabel, Input, FormHelperText, Button, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Spinner, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import * as yup from 'yup'
const AddTrainerModal = ({ isOpen, onClose, onOpen }) => {
    const dispatch: any = useDispatch()
    const toast = useToast()
    const { errorPass, loadingPass, trainer } = useSelector((state: any) => state.trainerSlice)
    console.log(errorPass, loadingPass, trainer)


    const updateTrainerPasswordSchema =
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


    const handleUpdatePass = (values: any, actions: any) => {
        console.log(values)
        let cookie = new Cookies()
        let token = cookie.get("trainer_token")
        console.log(token)



        try {
            dispatch(trainerUpdatePassword({ token, data: values })).then((res) => {
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
        validationSchema: updateTrainerPasswordSchema,
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

export default AddTrainerModal