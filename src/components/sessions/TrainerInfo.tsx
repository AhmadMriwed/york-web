import { Avatar } from "rsuite";
import { Admin } from "@rsuite/icons";
import EmailIcon from "@rsuite/icons/Email";
import PhoneIcon from "@rsuite/icons/Phone";
import { FaInfoCircle } from "react-icons/fa";

const TrainerInfo = () => {
  return (
    <div>
      <div className="bg-[var(--primary-color1)] py-1 px-3 flex gap-3 items-center w-fit rounded-full">
        <Avatar size="sm" circle>
          <Admin />
        </Avatar>
        <p className="text-white">Simon Minter</p>
      </div>
      <div className="flex gap-1 items-center mt-6 text-[18px] text-[#888]">
        <FaInfoCircle />
        <h6>About</h6>
      </div>
      <p className="max-w-[300px] mt-2 text-[12px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus quod
        corporis necessitatibus suscipit praesentium aliquid aperiam veniam
        quasi, ad saepe nesciunt? Rem praesentium eius perspiciatis repellendus
        corporis ex earum minus!
      </p>
      <div className="text-[#888] mt-6 flex gap-2 items-center">
        <EmailIcon />
        <p>jake@gmail.com</p>
      </div>
      <div className="text-[#888] mt-3 flex gap-2 items-center">
        <PhoneIcon />
        <p>00 000 00 00</p>
      </div>
    </div>
  );
};

export default TrainerInfo;
