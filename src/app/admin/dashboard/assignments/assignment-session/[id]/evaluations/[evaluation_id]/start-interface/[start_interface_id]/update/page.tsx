"use client";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { File, Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import { Button } from "@/components/ui/button";
import { Header } from "rsuite";
import { z } from "zod";
import { IoArrowBackSharp } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { StartInterfaceType } from "@/types/adminTypes/assignments/interfaceTypes";
import { toast } from "sonner";
import {
  getStartInterface,
  updateStartInterface,
  uploadFileToStartForm,
} from "@/lib/action/exam_action";
import { Checkbox } from "@/components/ui/checkbox";
import Loading from "@/components/Pars/Loading";

// Updated validation schema - only title is required
const EditValidation = z.object({
  title: z.string().min(1, "Title is required"),
  sub_title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  image: z
    .union([z.string(), z.instanceof(Blob)])
    .nullable()
    .optional(),
  show_condition: z.number().min(0).max(1).default(0),
  show_configration: z.number().min(0).max(1).default(0),
  url: z.string().nullable().optional(),
});

const EditForm = ({
  initialValues,
  onSave,
  onCancel,
  start_interface_id,
  isSubmitting,
  setIsSubmitting,
  refreshData,
}: {
  initialValues: StartInterfaceType | null;
  onSave: (values: any) => void;
  onCancel: () => void;
  start_interface_id: string | number;
  isSubmitting: any;
  setIsSubmitting: any;
  refreshData: () => void;
}) => {
  type FormValues = z.infer<typeof EditValidation>;

  const defaultValues = {
    title: initialValues?.title ?? "",
    sub_title: initialValues?.sub_title ?? null,
    description: initialValues?.description ?? null,
    image: initialValues?.image ?? null,
    show_condition: initialValues?.show_condition ?? 0,
    show_configration: initialValues?.show_configration ?? 0,
    url: initialValues?.url ?? null,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(EditValidation),
    defaultValues,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.reset(defaultValues);
      setImageRemoved(false);
    }
  }, [initialValues, form]);

  const { control, watch, setValue } = form;
  const currentImage = watch("image");
  const currentFiles = initialValues?.files;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setValue("image", e.target.files[0]);
      setImageRemoved(false);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", null);
    setImageRemoved(true);
  };

  const removeFile = async (index: number) => {
    try {
      // File removal logic
    } catch (error: any) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file", {
        description: error.message,
      });
    }
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();

    // Append all fields, converting null to empty string where needed
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image" && value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Handle image field
    if (values.image instanceof Blob) {
      // New image file was uploaded
      formData.append("image", values.image);
    } else if (typeof values.image === "string" && !imageRemoved) {
      // Existing image URL - send as reference if not removed
      formData.append("existing_image", values.image);
    } else if (imageRemoved) {
      // Image was explicitly removed
      formData.append("image", "");
    } else if (initialValues?.image && !imageRemoved) {
      // No image change - keep original
      formData.append("keep_original_image", "true");
    } else {
      // No image - clear it
      formData.append("image", "");
    }

    onSave(formData);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const response = await uploadFileToStartForm(
          Number(start_interface_id),
          file
        );
        toast.success("File uploaded successfully");
        refreshData();
      } catch (error: any) {
        toast.error("Oops! Something went wrong", {
          description: error.message,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Title:"
              name="title"
              placeholder="Enter a title"
              required
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="SubTitle:"
              name="sub_title"
              placeholder="Enter a subtitle (optional)"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Description:"
            name="description"
            placeholder="Enter description (optional)"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormItem>
              <FormLabel className="text-gray-900 dark:text-gray-100">
                Image (optional):
              </FormLabel>
              <div className="flex items-center gap-4 w-full">
                {currentImage && !imageRemoved ? (
                  <div className="relative group w-full">
                    <img
                      src={
                        typeof currentImage === "string"
                          ? `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${currentImage}`
                          : URL.createObjectURL(currentImage)
                      }
                      alt="Preview"
                      className="w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center gap-2">
                      <label className="cursor-pointer flex items-center justify-center h-8 w-8 bg-white dark:bg-gray-800 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                        <EditOutlined className="text-gray-700 dark:text-gray-300" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer w-full">
                    <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-primary-color1 transition-all">
                      <PlusOutlined className="text-2xl text-gray-400 dark:text-gray-300 mb-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Upload Image (optional)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </label>
                )}
              </div>
            </FormItem>
          </div>
          <div className="mt-4 space-y-2 flex items-center gap-4 md:gap-6">
            <FormField
              control={control}
              name="show_condition"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value === 1}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 1 : 0)
                      }
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">Show conditions</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="show_configration"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value === 1}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 1 : 0)
                      }
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">Show settings</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row justify-end gap-2 pt-4 sm:pt-0">
          <Button
            type="button"
            variant="outline"
            className="border-primary-color1 text-primary-color1 hover:bg-primary-color1 hover:text-white dark:text-gray-100 dark:hover:text-white"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-color1 !text-white hover:bg-primary-color2 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const Page = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const { start_interface_id } = useParams();
  const [loader, setLoader] = useState(false);
  const [isThereErrorWhileFetchData, setIsThereErrorWhileFetchData] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interfaceData, setInterfaceData] = useState<StartInterfaceType | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      try {
        if (!start_interface_id) {
          throw new Error("Missing session ID in URL");
        }
        const data = await getStartInterface(Number(start_interface_id));
        setInterfaceData(data?.data);
      } catch (err) {
        setIsThereErrorWhileFetchData(true);
        setError(
          err instanceof Error ? err.message : "Failed to fetch session"
        );
      } finally {
        setLoading(false);
        setLoader(false);
      }
    };
    fetch();
  }, [refreshCount]);

  const refreshData = () => {
    setRefreshCount((prev) => prev + 1);
  };

  const handleSave = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await updateStartInterface(
        Number(start_interface_id),
        formData
      );
      toast.success("Start interface updated successfully");
      router.back();
    } catch (error: any) {
      toast.error("Oops! Something went wrong", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-1 sm:px-4 pt-3 sm:pt-5">
      <div className="flex justify-between items-start mb-5 pt-2">
        <Header className="flex justify-start items-center gap-2 max-sm:pt-1 max-sm:px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-lg sm:text-xl cursor-pointer"
            onClick={() => router.back()}
          />
          <h3 className="text-[20px] sm:text-2xl font-semibold tracking-wide">
            Update Interface
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
        <div className="bg-white dark:bg-gray-900 px-4 py-1 rounded-[5px] pb-8 sm:px-10 sm:py-8 sm:pb-12 min-h-[80vh] border-gray-200 dark:border-gray-700">
          <EditForm
            initialValues={interfaceData}
            onSave={handleSave}
            onCancel={() => router.back()}
            start_interface_id={Number(start_interface_id)}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            refreshData={refreshData}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
