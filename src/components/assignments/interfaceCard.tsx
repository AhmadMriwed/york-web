import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DeleteOutlined,
  LinkOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
import ImageUploader from "../upload/ImageUploader";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { cn } from "@/lib/utils";
import { Checkbox } from "rsuite";

// Updated validation schema
export const EditValidation = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Invalid URL").optional(),
  image: z.any().optional(),
  files: z.array(z.any()).optional(),
});

interface EditFormProps {
  initialValues: any;
  onSave: (values: any) => void;
  onCancel: () => void;
  allowFiles?: boolean;
}

const EditForm = ({
  initialValues,
  onSave,
  onCancel,
  allowFiles = true,
}: EditFormProps) => {
  type FormValues = z.infer<typeof EditValidation>;

  const form = useForm<FormValues>({
    resolver: zodResolver(EditValidation),
    defaultValues: {
      ...initialValues,
      files: allowFiles ? initialValues.files || [] : undefined,
    },
  });

  const { control, watch, setValue } = form;
  const currentImage = watch("image");
  const currentFiles = watch("files");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setValue("image", e.target.files[0]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && allowFiles) {
      const newFiles = Array.from(e.target.files);
      setValue("files", [...(currentFiles || []), ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    if (!allowFiles) return;
    const updatedFiles = [...(currentFiles || [])];
    updatedFiles.splice(index, 1);
    setValue("files", updatedFiles);
  };

  const onSubmit = (values: FormValues) => {
    onSave(values);
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
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="SubTitle:"
              name="subTitle"
              placeholder="Enter a title"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            label="Description:"
            name="description"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image upload */}
            <FormItem>
              <FormLabel className="text-gray-900 dark:text-gray-100">
                Image:{" "}
              </FormLabel>
              <div className="flex items-center gap-4 w-full">
                {currentImage ? (
                  <div className="relative group w-full">
                    <img
                      src={
                        typeof currentImage === "string"
                          ? currentImage
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
                      <button
                        type="button"
                        onClick={() => setValue("image", undefined)}
                        className="px-4 p-2 bg-white dark:bg-gray-800 rounded-full transition-all flex items-center justify-center h-8 w-8"
                      >
                        <DeleteOutlined className="text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer w-full">
                    <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-primary-color1 transition-all">
                      <PlusOutlined className="text-2xl text-gray-400 dark:text-gray-300 mb-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Upload Image
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

            {/* Files management - only show in exam mode */}
            {allowFiles && (
              <FormItem>
                <FormLabel className="flex my-3 justify-between items-center text-gray-900 dark:text-gray-100">
                  <p>Files: </p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      className="bg-primary-color1 hover:bg-primary-color2 transition-colors duration-200 text-sm md:text-base"
                    >
                      Add Files
                    </Button>
                  </label>
                </FormLabel>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {currentFiles?.length! > 0 ? (
                    currentFiles?.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center truncate">
                          <File className="w-5 h-5 mr-3 text-primary-color1 flex-shrink-0" />
                          <div className="truncate">
                            <p className="font-medium truncate text-gray-900 dark:text-gray-100">
                              {file.name || `File ${index + 1}`}
                            </p>
                            {file.size && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant={"ghost"}
                          onClick={() => removeFile(index)}
                          className="flex-shrink-0"
                        >
                          <Trash className="text-xl text-red-600 dark:text-red-400" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No files added
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            className="border-primary-color1 text-primary-color1 hover:bg-primary-color1 hover:text-white dark:text-gray-100 dark:hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-color1 hover:bg-primary-color2 transition-colors duration-200"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

interface InterfaceModalProps {
  open: boolean;
  onCancel: () => void;
  title?: string;
  subTitle?: string;
  description: string;
  image: string;
  files?: any[];
  link?: string;
  mode?: "exam" | "evaluation";
  type?: "starting" | "ending";
}

const InterfaceModal = ({
  open,
  onCancel,
  title,
  subTitle,
  description,
  image,
  files = [],
  link,
  mode = "exam",
  type,
}: InterfaceModalProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (values: any) => {
    console.log("Saved values:", values);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent
        className={cn(
          "w-full custom-scrollbar md:max-w-[70%] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700",
          mode === "evaluation" ? "md:max-w-[60%]" : ""
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-primary-color1 font-semibold dark:text-primary-color2">
            {title}
          </DialogTitle>
          {subTitle && (
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {subTitle}
            </DialogDescription>
          )}
        </DialogHeader>

        {isEditing ? (
          <EditForm
            initialValues={{ title, subTitle, description, link, image, files }}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            allowFiles={mode === "exam"}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {image && (
              <div className="w-full lg:w-1/3 xl:w-1/4">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto rounded-lg object-contain border border-gray-200 dark:border-gray-600"
                  style={{
                    maxHeight: "300px",
                  }}
                />
              </div>
            )}

            <div
              className={`flex flex-col ${
                image ? "w-full lg:w-2/3 xl:w-3/4" : "w-full"
              }`}
            >
              <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />

              <div
                className="flex-1 overflow-y-auto pr-2 mb-4"
                style={{ maxHeight: "calc(70vh - 200px)" }}
              >
                <p
                  className="text-gray-800 dark:text-gray-200 max-w-full truncate"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {description}
                </p>
              </div>

              {/* Only show files section in exam mode */}
              {mode === "exam" && (files?.length > 0 || link) && (
                <>
                  <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />
                  <div className="space-y-2">
                    {files?.length > 0 && (
                      <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {files.map((file: any, index: number) => (
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

                    {link && (
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <LinkOutlined className="text-gray-600 dark:text-gray-300" />
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          Link:
                        </span>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate block max-w-full text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {link}
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
              {mode === "exam" && type === "starting" && (
                <div className="mt-4 space-y-2 flex items-center gap-4 ">
                  <div className="flex items-center space-x-2">
                    <Checkbox>Show conditions</Checkbox>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox>Show settings</Checkbox>
                  </div>
                </div>
              )}

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

export default InterfaceModal;
