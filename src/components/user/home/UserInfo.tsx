import Image from "next/image";
import photo from "../../../../public/avatar.png";

export default function UserInfo() {
   return (
      <section className="bg-[var(--home-color)] flex justify-between items-center px-[10px] sm:px-[30px] py-[10px] gap-2">
         <div className="flex justify-center items-center gap-3">
            <Image
               src={photo}
               width={30}
               height={30}
               alt="user-phot"
               className="rounded-[50%]"
            />
            <div className="">
               <p className="text-[16px] font-semibold m-0 capitalize text-white leading-[1.2]">
                  hussam ALi{" "}
               </p>
               <p className="text-[12px] text-[#ddd] mt-[3px] leading-[1.2]">
                  hussamAli@gmail.com
               </p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <p className="text-[14px] font-semibold m-0 text-[var(--primary-color2)]">
               Admin
            </p>
            <p className="text-[14px] m-0 text-white ">
               Id : <span>042129141</span>
            </p>
         </div>
      </section>
   );
}
