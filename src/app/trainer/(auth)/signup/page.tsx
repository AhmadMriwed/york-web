"use client";
import Image from "next/image";
import Link from "next/link";
import Reveal from "react-awesome-reveal";
const TrainerSignup = () => {
  return (
    <div className="min-h-[100dvh] min-w-[100vw] flex items-center justify-center">
      <div className="w-full h-full overflow-hidden">
        <Image
          src="/register.png"
          alt="background image"
          fill
          className="object-cover z-0 dark_gradient_background"
        />
        <Image
          src="/loo.png"
          alt="background image"
          fill
          className="object-cover z-1 opacity-[0.05]"
        />
        <div className="w-full h-full absolute top-0 left-0 mix-blend-color z-[-1]"></div>
        <Reveal triggerOnce duration={1000}>
          <div className="flex flex-col gap-20 min-w-[100vw]">
            <div className="flex items-center justify-center">
              <div className="flex flex-col text-center gap-2">
                <p className="text-[whitesmoke] text-lg sm:text-xl tracking-widest">
                  welcome to
                </p>
                <p className="text-[#FFF] text-3xl sm:text-4xl font-bold">
                  York British Academy
                </p>
                <p className="text-[#FFF] text-lg sm:text-xl">
                  Choose the type of coach you want
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <Link
                href={{
                  pathname: "/trainer/signup/signup-page",
                  query: {
                    trainer_type: "Usncertified",
                    id: 2,
                  },
                }}
                className="colored-btn !px-[2rem] hover:text-[#FFF]"
              >
                Uncertified Trainer
              </Link>
              <Link
                href={{
                  pathname: "/trainer/signup/signup-page",
                  query: {
                    trainer_type: "Certified",
                    id: 1,
                  },
                }}
                className="colored-btn !px-[2rem] hover:text-[#FFF]"
              >
                Certified Trainer
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
export default TrainerSignup;
