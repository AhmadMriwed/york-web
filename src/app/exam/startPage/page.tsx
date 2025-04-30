"use client";
import { images } from "@/constants/images";
import { Modal, Space } from "antd";
import Image from "next/image";
import {
  FaClock,
  FaCalendarAlt,
  FaBook,
  FaUserAlt,
  FaQuestionCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaPlayCircle,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import { Loader2, Router } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const UserFormValidation = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters."),
  last_name: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address"),
});

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const onSubmit = async ({
    first_name,
    last_name,
    email,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      router.push("/exam/questions/1");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to start exam");
    } finally {
      setIsLoading(false);
    }
  };
  // Sample exam data - replace with your actual data
  const examInfo = {
    title: "Final Medical Examination",
    description:
      "This exam covers all topics studied during the semester including anatomy, physiology, and pathology.",
    duration: "120 minutes",
    date: "June 15, 2023",
    totalQuestions: 50,
    instructor: "Dr. Sarah Johnson",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="flex h-screen max-h-screen w-full items-center rounded-lg overflow-hidden">
        <section className="remove-scrollbar container mb-16 w-[50%] h-full bg-white ">
          <div className="max-w-[600px] mx-auto py-12 px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#037f85] mb-2">
                {examInfo.title}
              </h1>
              <p className="text-2xl font-semibold mb-6 text-center text-gray-700">
                Exam Titlee
              </p>

              {/* Test Instructions Section */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-blue-600" /> Test
                  Instructions
                </h2>

                <div className="space-y-3 text-blue-900">
                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      This test consists of{" "}
                      <span className="font-bold">7 questions</span>.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      The time to solve one question is{" "}
                      <span className="font-bold">2 minutes</span>.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      Make sure you have enough time and then start the test.
                    </p>
                  </div>

                  <div className="pt-2 mt-3 border-t border-blue-200">
                    <p className="text-lg font-semibold text-blue-700">
                      Good luck!
                    </p>
                  </div>
                </div>
              </div>

              {/* Exam Details Section */}
              <div className="bg-[#f8fafc] rounded-lg p-6 border border-gray-200 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaBook className="mr-2 text-[#037f85]" /> Exam Details
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaClock className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{examInfo.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{examInfo.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaQuestionCircle className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Total Questions</p>
                        <p className="font-medium">{examInfo.totalQuestions}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaUserAlt className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="font-medium">{examInfo.instructor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  color="yellow"
                  onClick={showModal}
                  className="w-full bg-[#037f85] hover:bg-[#036a70] text-white h-10 rounded-lg text-lg font-medium"
                >
                  Start Exam
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center w-[50%] bg-[#037f85]/20 min-h-screen z-50">
          <Image
            src={images.onlineTest}
            width={480}
            height={480}
            alt="Online exam illustration"
            className="object-contain"
          />
        </div>
      </main>

      <Modal
        title={
          <div className="flex items-center">
            <FaPlayCircle className="mr-2 text-primary-color1" />
            <span>Start The Exam</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <Space className="mt-4">
            <Button
              onClick={handleCancel}
              disabled={isLoading}
              color="danger"
              variant={"outline"}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white "
            >
              <FaTimes />
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="bg-primary-color1 hover:bg-primary-color2"
            >
              {isLoading ? (
                <>
                  <Loader2 className=" animate-spin" /> Starting..
                </>
              ) : (
                <>
                  <FaPlay className=" text-xs size-2 h-1" />
                  Start Exam
                </>
              )}
            </Button>
          </Space>
        }
      >
        <p className="mb-4">Fill in the form before starting the test.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1 text-white mb-4"
          >
            {/* Your form fields remain the same */}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="first_name"
              label={"First Name : "}
              placeholder={"Enter your first name "}
              iconSrc="/icons/user.svg"
              iconAlt="user"
              required={true}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="last_name"
              label={"Last Name : "}
              placeholder={"Enter your last name "}
              iconSrc="/icons/user.svg"
              iconAlt="user"
              required={true}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label={"Email : "}
              placeholder={"Enter your email"}
              iconSrc="/icons/mail.svg"
              iconAlt="email"
              required={true}
            />
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default Page;
