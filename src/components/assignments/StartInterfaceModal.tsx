"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { File, Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { cn } from "@/lib/utils";
import { Checkbox } from "rsuite";
import { useFetchWithId } from "@/hooks/useFetch";
import { StartFormType } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  fetchStartFormById,
  UpdateStartForm,
  uploadFileToStartForm,
} from "@/lib/action/assignment_action";
import Image from "next/image";
import { toast } from "sonner";
import ImageUploader from "../upload/ImageUploader";

interface InterfaceModalProps {
  open: boolean;
  onCancel: () => void;
  startFormId?: number;
  type?: string;
  refetchStartForm: () => void;
}

const StartInterfaceModal = ({
  open,
  onCancel,
  startFormId,
  type,
  refetchStartForm,
}: InterfaceModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: startForm,
    isLoading: startFormLoading,
    error: startFormError,
    refetch: refetchData,
  } = useFetchWithId<StartFormType>(fetchStartFormById, startFormId!);

  if (startFormLoading) {
    return (
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className="w-full md:max-w-[60%]">
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-40">
            <p>Loading form data...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (startFormError || !startForm) {
    return (
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent className="w-full md:max-w-[60%]">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center h-40">
            <p>Failed to load form data</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent
        className={cn(
          "w-full md:max-w-[60%] custom-scrollbar max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-primary-color1 font-semibold dark:text-primary-color2">
            {startForm.title}
          </DialogTitle>
          {startForm.sub_title && (
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {startForm.sub_title}
            </DialogDescription>
          )}
        </DialogHeader>

        {isEditing ? (
          <EditForm
            onCancel={() => setIsEditing(false)}
            id={startForm.id}
            type={type}
            refetch={refetchData}
            refetchStartForm={refetchStartForm}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {startForm.image && (
              <div className="w-full lg:w-1/3 xl:w-1/4">
                <Image
                  src={
                    startForm?.image
                      ? `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${startForm?.image}`
                      : "/register.png"
                  }
                  alt={startForm.title}
                  className="w-full h-auto rounded-lg object-contain border border-gray-200 dark:border-gray-600"
                  height={300}
                  width={250}
                />
              </div>
            )}

            <div
              className={`flex flex-col ${
                startForm.image ? "w-full lg:w-2/3 xl:w-3/4" : "w-full"
              }`}
            >
              <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />

              <div
                className="flex-1 overflow-y-auto pr-2 mb-4"
                style={{ maxHeight: "calc(70vh - 200px)" }}
              >
                <h3 className="font-bold text-medium mb-3">Description :</h3>
                <p
                  className="text-gray-800 dark:text-gray-200"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {startForm.description}
                </p>
              </div>

              {type === "assignment" && startForm.files?.length > 0 && (
                <>
                  <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />
                  <div className="space-y-2">
                    {startForm.files?.length > 0 && (
                      <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {startForm.files.map((file: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="mr-4 p-2 bg-[#037f85]/20 dark:bg-blue-900/50 rounded-full">
                              <File className="w-5 h-5 text-primary-color1 dark:text-primary-color2" />
                            </div>
                            <div className="truncate">
                              <p className="font-medium truncate text-gray-900 dark:text-gray-100">
                                {file.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {file.size}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="mt-4 space-y-2 flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox disabled checked={startForm.show_condition === 1}>
                    Show conditions
                  </Checkbox>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    disabled
                    checked={startForm.show_configration === 1}
                  >
                    Show settings
                  </Checkbox>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  className="border-primary-color1 text-primary-color1 hover:bg-primary-color1 hover:text-white dark:text-gray-100 dark:hover:text-white"
                  onClick={onCancel}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  className="bg-primary-color1 hover:bg-primary-color2 transition-colors duration-200"
                  onClick={() => setIsEditing(true)}
                >
                  <EditOutlined className="mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StartInterfaceModal;

export const EditValidation = z.object({
  title: z.string().min(1, "Title is required"),
  sub_title: z.string().optional(),
  form_id: z.number().optional(),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Invalid URL").optional(),
  image: z.any().optional(),

  show_configration: z.number().min(0).max(1).default(0),
  show_condition: z.number().min(0).max(1).default(0),
});

interface EditFormProps {
  onCancel: () => void;
  id: number;
  type?: string;
  refetch: () => void;
  refetchStartForm: () => void;
}

const EditForm = ({
  onCancel,
  id,
  type = "assignment",
  refetch,
  refetchStartForm,
}: EditFormProps) => {
  type FormValues = z.infer<typeof EditValidation>;

  const {
    data: startForm,
    isLoading: startFormLoading,
    error: startFormError,
  } = useFetchWithId<StartFormType>(fetchStartFormById, id);

  const form = useForm<FormValues>({
    resolver: zodResolver(EditValidation),
    defaultValues: {
      form_id: startForm?.form_id || undefined,
      title: startForm?.title || "",
      sub_title: startForm?.sub_title || "",
      description: startForm?.description || "",
      show_configration: startForm?.show_configration || 0,
      show_condition: startForm?.show_condition || 0,
      image: startForm?.image || undefined,
    },
  });

  useEffect(() => {
    if (startForm) {
      form.reset({
        title: startForm.title || "",
        sub_title: startForm.sub_title || "",
        description: startForm.description || "",
        image: startForm.image || "",
        show_configration: Number(startForm.show_configration),
        show_condition: Number(startForm.show_condition),
      });
      setFiles(startForm.files || []);
    }
  }, [startForm, form]);

  const { control, watch, setValue, handleSubmit } = form;
  const [files, setFiles] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setValue("image", e.target.files[0]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    const filesToUpload = Array.from(e.target.files);
    setIsUploading(true);

    try {
      const uploadResults = await Promise.allSettled(
        filesToUpload.map((file) => uploadFileToStartForm(id, file))
      );

      const successfulUploads = uploadResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<any>).value);

      if (successfulUploads.length) {
        setFiles((prevFiles) => [...prevFiles, ...successfulUploads]);
      }

      const failedUploads = uploadResults.filter(
        (result) => result.status === "rejected"
      );
      if (failedUploads.length) {
        toast.error(`${failedUploads.length} file(s) failed to upload`);
      }
    } catch (error) {
      console.error("File upload error:", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const removeFile = async (fileId: number) => {
    try {
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      toast.success("File removed successfully");
    } catch (error) {
      console.error("Error removing file:", error);
      toast.error("Failed to remove file");
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.sub_title) {
        formData.append("sub_title", values.sub_title);
      }

      if (startForm?.form_id) {
        formData.append("form_id", String(startForm.form_id));
      }

      formData.append("show_configration", String(values.show_configration));
      formData.append("show_condition", String(values.show_condition));

      if (
        values.image &&
        values.image instanceof Object &&
        !(values.image instanceof String)
      ) {
        formData.append("image", values.image);
      }
      await UpdateStartForm(formData, startForm?.id!);

      if (refetch) {
        await refetch();
        await refetchStartForm();
      }

      toast.success("Start Form updated successfully");
      onCancel();
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("Failed to update form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Title:"
              name="title"
              placeholder="Enter a title"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="SubTitle:"
              name="sub_title"
              placeholder="Enter a subtitle"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Description:"
            name="description"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={control}
              name="image"
              label="Image"
              renderSkeleton={(field) => (
                <FormControl>
                  <ImageUploader
                    file={field.value}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
              )}
            />
            {type === "assignment" && (
              <FormItem>
                <FormLabel className="flex justify-between items-center mb-3 text-gray-900 dark:text-gray-100">
                  <div className="flex items-center space-x-2">
                    <File className="w-5 h-5 text-primary-color1 dark:text-primary-color2" />
                    <span className="font-medium">Files</span>
                    {files.length > 0 && (
                      <span className="text-xs bg-primary-color1/10 text-primary-color1 dark:text-primary-color2 dark:bg-primary-color2/10 px-2 py-1 rounded-full">
                        {files.length} {files.length === 1 ? "file" : "files"}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Button
                      asChild
                      type="button"
                      className="bg-primary-color1 hover:bg-primary-color2 transition-colors duration-200"
                      disabled={isUploading}
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        {isUploading ? "Uploading..." : "Add Files"}
                      </label>
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                      style={{ display: "none" }} // Hide the actual input
                    />
                  </div>
                </FormLabel>

                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <div
                        key={file.id || index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all duration-200 hover:border-primary-color1/30 dark:hover:border-primary-color2/30"
                      >
                        <div className="flex items-center min-w-0">
                          <div className="p-2 mr-3 rounded-lg bg-primary-color1/10 dark:bg-primary-color2/10">
                            <File className="w-5 h-5 text-primary-color1 dark:text-primary-color2" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate text-gray-900 dark:text-gray-100">
                              {file.name || `File ${index + 1}`}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                •
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {file.type || "Unknown type"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(file.id)}
                          className="flex-shrink-0 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          disabled={isUploading}
                        >
                          <Trash className="w-4 h-4 text-red-500 dark:text-red-400" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 px-4 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-color1 dark:hover:border-primary-color2 transition-colors duration-200">
                      <File className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        No files uploaded yet
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Click Add Files to upload documents
                      </p>
                    </div>
                  )}
                </div>

                {files.length > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {files.length} {files.length === 1 ? "file" : "files"} •{" "}
                    {(
                      files.reduce((acc, file) => acc + (file.size || 0), 0) /
                      1024
                    ).toFixed(2)}{" "}
                    KB total
                  </p>
                )}
              </FormItem>
            )}
          </div>

          <div className="mt-4 space-y-2 flex items-center gap-4">
            <FormField
              control={control}
              name="show_condition"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value === 1}
                      onChange={(value, checked) => {
                        console.log("Checkbox changed:", checked);
                        field.onChange(checked ? 1 : 0);
                      }}
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
                      onChange={(value, checked) =>
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

        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
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
            className="bg-primary-color1 hover:bg-primary-color2 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
