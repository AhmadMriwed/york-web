import UserRregisterForm from "@/components/forms/UserRegisterForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const page = () => {
  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="training-plan-bg h-[80vh] bg-black " />
      <div className=" container py-16 px-8 md:px-2 mx-auto">
        <h1 className="text-primary-color1 text-xl md:text-2xl font-semibold">
          TRAINING PLAN 2024 - 2025
        </h1>
        <div className="border-b border-gray-300 py-8">
          <h2 className="text-primary-color1 text-base font-semibold mb-3">
            TITLE
          </h2>
          <p className="text-gray-500">
            York British Academy specialized in the following training programs:
            Quality & Insurance - Statistics - Systems & Information Technology
            Management - Banks & Investments - Oil - Security & Safety
            Professional Project Management as well as Strategic Planning
            Programs - Human Resources - Media - Marketing & Sales - Legal
            Skills.
          </p>
        </div>
        <div className="w-full">
          <Dialog>
            <div className="w-full  flex justify-end mt-3">
              <DialogTrigger className=" w-fit bg-primary-color1  text-white font-semibold hover:bg-primary-color2 p-3 rounded-sm ml-auto">
                register
              </DialogTrigger>
            </div>
            <DialogContent className="bg-slate-800 border-none">
              <DialogHeader>
                <Image
                  src={"/logo.png"}
                  height={100}
                  width={100}
                  alt="logo"
                  className="mx-auto"
                />
              </DialogHeader>
              <UserRregisterForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
};

export default page;
