"use client";
import BackBtn from "@/components/buttons/BackBtn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
const ConfirmEmail = () => {
   const { admin } = useSelector((state: any) => state.authSlice);
   console.log(admin);
   const Verify = () => {
      let cookie = new Cookies();
      let token = cookie.get("admin_token");
      console.log(token);
      axios
         .get("https://cms.yorkacademy.uk/api/admin/resend_verify_email", {
            headers: {
               Authorization: `Bearer ${token} `,
            },
         })
         .then((res: any) => {
            if (res.status === 200) {
               console.log("success", res);
            }
         })
         .catch((err: any) => {
            console.log(err.message);
         });
   };
   useEffect(() => {
      Verify();
   }, []);
   return (
      <div className="overflow-x-hidden">
         <div className="h-50px w-[100vw] p-4">
            <BackBtn textColor="text-black" />
         </div>
         <div className="flex items-center justify-center w-[100vw] h-[calc(100vh-50px)] backdrop-blur-[3px]">
            <div className="flex flex-col items-center w-[calc(100%-4rem)] h-[calc(100%-4rem)] md:w-[450px] py-8 px-8 text-[#13181E]">
               <div className="">
                  <Image
                     src="/email.png"
                     alt="email"
                     width={300}
                     height={300}
                     className="rounded-[10px]"
                  />
               </div>
               <div className="pt-9 pb-5 text-center">
                  <p className="text-xl font-bold">
                     Verify YourEmail Address..
                     <q className="text-base text-red-500">
                        Within 7 days if you do not confirm your account will be
                        deleted
                     </q>
                  </p>
                  <p>
                     A verification link has been sent to the following email
                     <span className="font-bold">{admin && admin.email}</span>
                  </p>
                  <p>Didn&apos;t receive any verification link</p>
                  <div>
                     <button
                        className="underline text-bold"
                        onClick={() => Verify()}
                     >
                        {" "}
                        Click here to resend
                     </button>
                  </div>
                  <Link href="/admin-login">
                     <button className="colored-btn">Go To Login</button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ConfirmEmail;
