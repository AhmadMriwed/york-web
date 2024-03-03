import { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import EmailIcon from "@rsuite/icons/Email";
import PhoneIcon from "@rsuite/icons/Phone";
import { PiInfo } from "react-icons/pi";
import { Avatar } from "rsuite";

const TrainerInfo = ({ trainer }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div
      className={`p-4 rounded-[16px] ${
        mode === "dark" ? "bg-[var(--dark-color)]" : "bg-[var(--light-color)]"
      }`}
    >
      <div className="bg-[var(--primary-color1)] py-1 px-2 flex gap-2 items-center w-fit rounded-full">
        {trainer?.image && <Avatar src={trainer?.image} size="sm" circle />}
        <p className="text-white font-bold">
          {trainer?.first_name &&
            trainer?.last_name &&
            trainer?.id &&
            `${trainer.id}. ${trainer?.first_name} ${trainer.last_name}`}
        </p>
      </div>
      <h6 className="mt-3 text-[14px] font-bold flex items-center gap-2">
        <PiInfo /> About
      </h6>

      <p className="sm:max-w-[325px] mt-1 text-[12px]">
        {trainer?.about_me && trainer.about_me}
      </p>
      <div className="mt-3 flex gap-2 items-center">
        <EmailIcon />
        <p className="text-[12px] sm:text-[14px]">
          {trainer?.email && trainer.email}
        </p>
      </div>
      <div className="mt-3 flex gap-2 items-center">
        <PhoneIcon />
        <p className="text-[12px] sm:text-[14px]">
          {trainer?.phone_number && trainer.phone_number}
        </p>
      </div>
    </div>
  );
};

export default TrainerInfo;
