"use client";
import { useRef, useState } from "react";
import {
  DeleteOutlined,
  LinkOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { File, Trash } from "lucide-react";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import { Button } from "@/components/ui/button";
import { Checkbox, Header } from "rsuite";
import { EditValidation } from "@/schemas/interface";
import { z } from "zod";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { StartInterfaceType } from "@/types/adminTypes/assignments/interfaceTypes";
import { toast } from "sonner";
import { uploadFileToStartForm } from "@/lib/action/exam_action";
import Loading from "@/components/Pars/Loading";

export const InterfaceModalEvaluation = ({
  interfaceData,
  header,
  interface_id,
  id,
  assignment_id,
  loader,
  interf,
}: {
  interfaceData: StartInterfaceType | null;
  header: string;
  interface_id: number;
  id: number;
  assignment_id: number;
  loader: any;
  interf: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (values: any) => {
    console.log("Saved values:", values);
    setIsEditing(false);
  };
  const router = useRouter();

  return (
    <div className=" px-1 sm:px-4 pt-3 sm:pt-5 ">
      <div className="flex justify-between items-start mb-5 pt-2">
        <Header className="flex justify-start items-center gap-2 max-sm:pt-1 max-sm:px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-lg sm:text-xl sm:mr-4 cursor-pointer"
            onClick={() => router.back()}
          />
          <h3 className="text-[20px]  sm:text-2xl  font-semibold tracking-wide">
            {" "}
            {header}
          </h3>
        </Header>
      </div>
      {loader ? (
        <div className="flex justify-center my-16">
          <Loading />
        </div>
      ) : interfaceData === null ? (
        <div className="flex justify-center my-20  ">
          <h1 className="sm:text-2xl">No Data To Display</h1>
        </div>
      ) : (
        <div className=" bg-white dark:bg-gray-900 px-4 py-1 rounded-[5px] pb-8 sm:px-10  sm:py-8 sm:pb-12 min-h-[80vh] border-gray-200 dark:border-gray-700">
          <div className="pb-5 sm:pb-8">
            <h2 className="text-primary-color1 text-[18px] sm:text-xl lg:text-2xl tracking-wide font-semibold dark:text-primary-color2">
              {interfaceData?.title}
            </h2>
            {interfaceData?.sub_title && (
              <p className="text-gray-600 text-[15px] sm:text-[17px]  dark:text-gray-400">
                {interfaceData?.sub_title}
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="w-full lg:w-1/3 max-sm:p-3">
              {interfaceData?.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${interfaceData?.image}`}
                  alt={interfaceData?.title}
                  className="  object-contain aspect-[9/7] border border-gray-200 dark:border-gray-600"
                  width={400}
                  height={400}
                />
              )}

              {interf == "start" && (
                <div className="mt-4 md:mt-5 space-y-2 flex items-center gap-4 ">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={interfaceData?.show_condition === 1}>
                      Show conditions
                    </Checkbox>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={interfaceData?.show_configration === 1}>
                      Show settings
                    </Checkbox>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`flex flex-col ${
                interfaceData?.image ? "w-full lg:w-2/3 xl:w-3/4" : "w-full"
              }`}
            >
              <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />

              <div
                className="flex-1 overflow-y-auto pr-2 mb-4"
                style={{ maxHeight: "calc(70vh - 200px)" }}
              >
                <h6 className="text-[16px] mb-3 sm:text-[20px] text-semibold">
                  Description :{" "}
                </h6>

                <p
                  className="text-gray-800 text-[16px] max-sm:text-[14px] dark:text-gray-200"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {interfaceData?.description}
                </p>
              </div>

              <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />

              {interfaceData?.url && (
                <div className="py-3 flex items-center gap-2 flex-wrap">
                  <LinkOutlined className="text-gray-600 dark:text-gray-300" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Link:
                  </span>
                  <a
                    href={interfaceData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate block max-w-full text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {interfaceData.url}
                  </a>
                </div>
              )}
              {/* </div> */}

              <div className="  mt-2 md:mt-10 flex flex-row justify-end gap-4 sm:pt-4">
                <Button
                  type="button"
                  className="bg-primary-color1 hover:bg-primary-color2 transition-colors py-2 sm:py-[14px] px-3 sm:px-4 duration-200"
                  onClick={() => {
                    interf === "start"
                      ? router.push(
                          `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${assignment_id}/start-interface/${interface_id}/update`
                        )
                      : router.push(
                          `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${assignment_id}/end-interface/${interface_id}/update`
                        );
                  }}
                >
                  <EditOutlined className="mr-2  size-4 text-white" />
                  <p className="text-white text-sm sm:text-lg ">Edit</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
