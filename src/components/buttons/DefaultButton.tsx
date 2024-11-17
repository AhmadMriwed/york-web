"use client";
export default function DefaultButton({
   label,
   onClick,
}: {
   label: string;
   onClick?: () => any;
}) {
   return (
      <button
         className="bg-[var(--primary-color1)] w-fit text-white px-10 py-2 rounded-[8px] capitalize hover:bg-[var(--primary-color2)] transition-all duration-300"
         onClick={onClick}
      >
         {label}
      </button>
   );
}
