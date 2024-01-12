import RecoverPassword from '@/components/RecoverPassword/RecoverPassword'
import React, { useState } from 'react'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// interface FormValues {
//   email: string;
// }

const RecoverPassword1 = () => {

  // const [submitting, setSubmitting] = useState(false);

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().email('Invalid email').required('Email is required'),
  //   });

  //   const handleSubmit = async (values: FormValues) => {
  //     try {
  //       setSubmitting(true);
  //       // Perform form submission logic here
  //       console.log(values);
  //       // Set submitting to false after successful submission
  //       setSubmitting(false);
  //     } catch (error) {
  //       // Handle form submission error
  //       console.error(error);
  //       setSubmitting(false);
  //     }
  //   };

  //   const formik = useFormik({
  //     initialValues: {
  //       email: '',
  //     },
  //     validationSchema,
  //     onSubmit: handleSubmit,
  //   });

  return (
    <RecoverPassword title='Email'/>
    // <>
    // <p className='py-5 text-xl font-bold text-white tracking-wider leading-8'>Password Recovery: Email</p>
    // <div className='flex items-center justify-center h-[calc(100vh-142px)]'>
    //   <form onSubmit={formik.handleSubmit} className='border-l-2 border-[#01989F] md:w-[450px] p-8'>
    //     <label htmlFor="" className='text-base text-white'>Email</label>
    //     <input className='login-input' 
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formik.values.email}
    //         onChange={formik.handleChange}
    //     />
    //      {formik.touched.email && formik.errors.email && (
    //         <div className="error">{formik.errors.email}</div>
    //       )}
    //     <button className='colored-btn'>confirm</button>
    //   </form>
    // </div>
    // </>
  )
}

export default RecoverPassword1