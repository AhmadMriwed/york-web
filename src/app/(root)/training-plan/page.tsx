"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  downloadFile,
  getLatestTrainingPlan,
  readFile,
} from "@/lib/action/root_action";
import { Training_Plan } from "@/types/rootTypes/rootTypes";
import PlanRegisterForm from "@/components/forms/PlanRegisterForm";
import Loader from "@/components/loading/Loader";
import { Button } from "@/components/ui/button";
import PDF from "@/components/PDF/PDF/PDF";

const Page = () => {
  const [trainingPlan, setTrainingPlan] = useState<Training_Plan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        setLoading(true);
        const data = await getLatestTrainingPlan();
        setTrainingPlan(data);
      } catch (error) {
        console.error("Error fetching training plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlan();
  }, []);

  const handleViewTypeSelection = (type: "browser" | "flipbook") => {
    if (type === "browser") {
      window.open(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${trainingPlan?.file?.path}`,
        "_blank"
      );
    } else if (type === "flipbook") {
      setModalOpen(true);
      setDialogOpen(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="h-full relative">
      <div className="training-plan-bg h-[80vh] bg-cover bg-center" />
      <div className="container py-16 px-8 md:px-2 mx-auto">
        <div className="border-b border-gray-300 py-8">
          <h1 className="text-primary-color1 text-xl md:text-2xl font-semibold mb-6">
            {trainingPlan?.title} {trainingPlan?.year}
          </h1>
          <h2 className="text-gray-500 text-base mb-3">
            {trainingPlan?.sub_title || "No title available"}
          </h2>
          {!isRegistered && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <div className="w-full flex justify-end mt-3">
                <DialogTrigger className="bg-primary-color1 text-white font-semibold hover:bg-primary-color2 p-3 rounded-sm ml-auto">
                  Register
                </DialogTrigger>
              </div>
              <DialogContent className="bg-slate-800 border-none p-6 max-w-md mx-auto rounded-lg">
                <DialogHeader>
                  <Image
                    src="/logo.png"
                    height={180}
                    width={180}
                    alt="logo"
                    className="mx-auto"
                  />
                </DialogHeader>
                {trainingPlan && (
                  <PlanRegisterForm
                    training_plan_id={trainingPlan.id}
                    onRegistrationSuccess={() => setIsRegistered(true)}
                  />
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
        {isRegistered && (
          <div className="flex flex-col gap-4">
            <p className="text-primary-color2 font-semibold mt-3">
              Registration successful! Now,you can download or view the training
              plan.
            </p>
            {trainingPlan?.file && (
              <div className="flex gap-4">
                <Button
                  className="bg-primary-color1 text-white px-4 py-2 rounded-md hover:bg-primary-color2 hover:text-white"
                  onClick={() => downloadFile(trainingPlan.file.path)}
                >
                  Download File
                </Button>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger className="bg-primary-color1 text-white px-4 py-2 rounded-md hover:bg-primary-color2 hover:text-white">
                    View File
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-none p-6 max-w-md shadow-lg mx-auto rounded-lg">
                    <DialogHeader>
                      <Image
                        src="/logo.png"
                        height={200}
                        width={200}
                        alt="logo"
                        className="mx-auto"
                      />
                      <div className=" text-center">
                        <p className="text-white mb-8">
                          How would you like to view the PDF?
                        </p>
                        <div className="flex justify-center gap-4">
                          <Button
                            onClick={() => handleViewTypeSelection("browser")}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                          >
                            Browser
                          </Button>
                          <Button
                            onClick={() => handleViewTypeSelection("flipbook")}
                            className="bg-primary-color2 hover:bg-primary-color1 text-white px-6 py-2 rounded-md"
                          >
                            Flipbook
                          </Button>
                        </div>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        )}
      </div>

      <PDF
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        PDF={trainingPlan?.file}
      />
    </main>
  );
};

export default Page;
