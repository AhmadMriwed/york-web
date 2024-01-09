import { useField } from "formik";

interface CustomInputProps {
   label: string;
}

function CustomInput({ label, bgColor, ...props }: CustomInputProps & any) {
   const [field, meta] = useField<any>(props.name);
   return (
      <div>
         <label className="block pl-[5px] text-[#888]">{label}</label>

         <input
            className={`bg-white text-black outline-none w-full rounded-[6px] mb-[10px] mt-1
               ${
                  meta.error && meta.touched
                     ? `border-[2px] border-red-500 p-[7px]`
                     : `border border-[#c1c1c1] py-[7px] px-[15px]`
               }
               ${props.type && props.type === "file" && `!p-[4px]`}
               ${props.type && props.type === "date" && `!p-[5px]`}
               `}
            {...field}
            {...props}
         />
         {meta.error && meta.touched && (
            <div className="pl-[5px] mb-[10px] text-red-600">{meta.error}</div>
         )}
      </div>
   );
}

export default CustomInput;
