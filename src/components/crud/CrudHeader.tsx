import SearchIcon from "@rsuite/icons/Search";
import { useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
export default function CrudHeader({
   crudName,
   setOpen,
}: {
   crudName: string;
   setOpen: any;
}) {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   return (
      <div
         className={`flex flex-col justify-between pb-2 crudCustom1:flex-row crudCustom1:items-center px-3 ${
            mode === "dark" ? "bg-dark" : "bg-light"
         } ${mode === "dark" ? "text-light" : "text-dark"}`}
      >
         <header>
            <span>{crudName}</span>
            <button
               className="mx-[15px] bg-btnColor rounded-[6px] text-white py-[5px] px-[10px] text-center text-[14px]"
               onClick={() => setOpen(true)}
            >
               + Add
            </button>
         </header>

         <div className="p-2">
            <div className="flex gap-[3px] flex-col crudCustom2:flex-row">
               <button className="bg-btnColor text-white h-[40px] w-fit px-[10px] text-[14px] rounded-[6px]">
                  sort & filter
               </button>
               <div className="flex h-[40px]  w-fit rounded-[6px]">
                  <input
                     type="text"
                     placeholder="Search"
                     className="px-[10px] outline-none w-[250px] sm:w-[300px]  text-[14px] border border-blue-400"
                  />
                  <div className="bg-[#ededed] w-[45px] element-center cursor-pointer rounded-[0_6px_6px_0]">
                     <SearchIcon className="text-black" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
