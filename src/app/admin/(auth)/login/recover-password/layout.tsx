import BackBtn from "@/components/buttons/BackBtn";
import Image from "next/image";
import { PropsWithChildren } from "react";

const PasswordLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[#13181E] h-[100dvh] overflow-hidden mix-blend-multiply p-6">
      <div className="flex justify-between items-center gap-2.5">
        <div>
          <BackBtn textColor="text-white" />
        </div>
        <Image src="/logo.png" alt="logo" width={75} height={75} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PasswordLayout;
