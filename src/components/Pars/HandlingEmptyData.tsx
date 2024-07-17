export default function HandlingEmptyData({
   message,
   onClick,
}: {
   message: string;
   onClick: () => void;
}) {
   return (
      <div className="h-[80%] flex items-center justify-center flex-col p-3">
         <p className="center text-[20px]">{message}</p>
         <button
            onClick={onClick}
            className="text-[var(--primary-color1)] hover:text-[var(--primary-color2)]"
         >
            create one
         </button>
      </div>
   );
}
