"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getLatestTrainingPlan } from "@/lib/action/root_action";
import { Training_Plan } from "@/types/rootTypes/rootTypes";
import PlanRegisterForm from "@/components/forms/PlanRegisterForm";
import Loader from "@/components/loading/Loader";

const Page = () => {
  const [trainingPlan, setTrainingPlan] = useState<Training_Plan | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        setLoading(true);
        const data = await getLatestTrainingPlan();
        setTrainingPlan(data);
      } catch (error: any) {
        console.error("Error fetching training plan:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlan();
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="training-plan-bg h-[80vh]  " />
      <div className="container py-16 px-8 md:px-2 mx-auto">
        <div className="border-b border-gray-300 py-8">
          <>
            <div>
              <h1 className="text-primary-color1 text-xl md:text-2xl font-semibold mb-6">
                {trainingPlan?.title} {trainingPlan?.year}
              </h1>
              <h2 className="text-gray-500 text-base  mb-3">
                {trainingPlan?.sub_title || "No title available"}
              </h2>
            </div>
            <Dialog>
              <div className="w-full flex justify-end mt-3">
                <DialogTrigger className="w-fit bg-primary-color1 text-white font-semibold hover:bg-primary-color2 p-3 rounded-sm ml-auto">
                  Register
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
                {trainingPlan && (
                  <PlanRegisterForm training_plan_id={trainingPlan.id} />
                )}
              </DialogContent>
            </Dialog>
          </>
        </div>
      </div>
    </main>
  );
};

export default Page;
