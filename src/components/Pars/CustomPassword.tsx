import { useField } from "formik";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
interface CustomPsaswordProps {
   label: string;
}

function CustomPassword({
   label,
   bgColor,
   ...props
}: CustomPsaswordProps & any) {
   const [field, meta] = useField<any>(props.name);
   const [showPassword, setShowPassword] = useState(false);

   return (
      <div>
         <label className="block pl-[5px] text-[#888]">{label}</label>
         <div className="flex h-auto mb-[10px] mt-1 rounded-[6px]">
            <input
               {...field}
               {...props}
               className={
                  meta.error && meta.touched
                     ? `border-[2px] border-red-500 text-black outline-none p-[7px] w-full rounded-[6px_0px_0px_6px] `
                     : `border-[#c1c1c1] text-black outline-none py-[7px] px-[15px] w-full rounded-[6px_0px_0px_6px] `
               }
               type={showPassword ? "text" : "password"}
            />
            <div className="bg-white w-[40px] rounded-[0px_6px_6px_0px] element-center">
               {showPassword ? (
                  <FiEye
                     onClick={() => setShowPassword(false)}
                     className="text-[18px]"
                  />
               ) : (
                  <FiEyeOff
                     onClick={() => setShowPassword(true)}
                     className="text-[18px]"
                  />
               )}
            </div>
         </div>
         {meta.error && meta.touched && (
            <div className="pl-[5px] mb-[10px] text-red-600">{meta.error}</div>
         )}
      </div>
   );
}

export default CustomPassword;
