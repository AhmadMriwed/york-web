import { useContext, useEffect, useState } from "react";
import { Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPerson } from "react-icons/md";

import profilePhoto from "../../../public/avatar.png";
import Image from "next/image";
import { Axios } from "@/utils/axios";
import Loading from "../Pars/Loading";
import { UsersType } from "@/types/adminTypes/accounts/accountsTypes";

export default function Profile({
   open,
   setOpen,
}: {
   open: boolean;
   setOpen: any;
}) {
   const handleClose = () => setOpen(false);
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const [user, setUser] = useState<UsersType>();
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   const getProfile = async () => {
      console.log("saf");
      try {
         const res = await Axios.get("admin");

         console.log("res profile", res);
         if (res.status === 200) {
            setUser(res.data.data);
            setIsLoading(false);
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         setError(error.message || "Error Occure , please try again");
         setIsLoading(false);
      }
   };
   useEffect(() => {
      if (open) {
         getProfile();
      }
   }, [open]);

   console.log("dara", user);

   return (
      <Modal
         open={open}
         onClose={handleClose}
         className={`${
            mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
         }
   
   `}
         size={"lg"}
      >
         {isLoading && <Loading />}
         {!isLoading && user && (
            <Modal.Body
               className={`${mode === "dark" ? "text-light" : "text-dark"}`}
            >
               <header className="mt-5 ms-10 p-2 flex gap-7 items-center flex-col sm:flex-row">
                  {user.image && (
                     <div className="relative">
                        <Image
                           src={profilePhoto}
                           width={150}
                           height={150}
                           alt="photo"
                           className="rounded-[50%]"
                        />

                        <div className="absolute right-0 top-[75%] w-[30px] bg-[var(--primary-color1)] h-[30px] rounded-[50%] element-center">
                           <FaCamera className="text-white text-[14px]" />
                        </div>
                     </div>
                  )}

                  <div className="text-center sm:text-left">
                     <p className="mb-3 text-[28px] font-semibold">
                        {user.first_name + " " + user.last_name}
                     </p>
                     <p className="mb-3 text-[#777]">
                        <MdEmail className="text-[var(--primary-color2)] inline me-2" />
                        {user.email}
                     </p>
                     {user.job_type && (
                        <p className="mb-3 text-[#777]">
                           <MdPerson className="text-[var(--primary-color2)] inline me-2" />{" "}
                           {user.job_type}
                        </p>
                     )}
                     <p className="text-[var(--primary-color2)]">
                        {user.role?.name}
                     </p>
                  </div>
               </header>

               <div className="mt-5 ms-10 p-2">
                  <div className="flex justify-between flex-wrap w-[80%] gap-3">
                     <div className="flex gap-2">
                        {" "}
                        <p className="text-[#777]">Birthday :</p>{" "}
                        <span>{user.birth_date}</span>
                     </div>
                     <div className="flex gap-2">
                        {" "}
                        <p className="text-[#777]">Phone Number : </p>{" "}
                        <span>{user.phone_number}</span>
                     </div>
                  </div>
                  <div className="mt-8">
                     <p className="text-[#777]">About me :</p>
                     <p className="text-wrap pe-5 leading-6 ">
                        {user.about_me}
                     </p>
                  </div>
               </div>

               <hr className="mt-8 mx-10 p-2 opacity-8 border-[#777]" />

               <div className="flex gap-2 mt-2 mx-auto p-2 justify-between w-[80%]">
                  <button className="element-center bg-[var(--primary-color1)] text-white p-3 rounded-[10px] w-[150px] text-[16px] hover:bg-[var(--primary-color2)] transition-all duration-300">
                     Change Password
                  </button>
                  <button className="element-center border border-[var(--primary-color1)] text-[var(--primary-color1)] p-3 rounded-[10px] text-[16px] w-[150px] hover:bg-[var(--primary-color2)] hover:text-white transition-all duration-300">
                     Change Profile
                  </button>
               </div>
            </Modal.Body>
         )}
         {!isLoading && error && (
            <p className="text-red-400 text-center">{error}</p>
         )}
      </Modal>
   );
}
