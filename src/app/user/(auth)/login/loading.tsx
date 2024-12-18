import SplashLoading from "@/components/loading/SplashLoading";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <Image
        src="/userlogin.png"
        alt="background image"
        fill
        className="z-[-1]"
      />

      <SplashLoading />
    </div>
  );
}
