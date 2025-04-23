// 'use client';
// import { useRef, useState } from "react";
// import {
//   DeleteOutlined,
//   LinkOutlined,
//   EditOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";
// import { File, Trash } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import CustomFormField, { FormFieldType } from "@/components/review/CustomFormField";
// import { Button } from "@/components/ui/button";
// import { Header } from "rsuite";
// // Updated validation schema
// export const EditValidation = z.object({
//   title: z.string().min(1, "Title is required"),
//   subTitle: z.string().optional(),
//   description: z.string().min(1, "Description is required"),
//   link: z.string().url("Invalid URL").optional(),
//   image: z.any().optional(),
//   files: z.array(z.any()).optional(),
// });

import { InterfaceModal } from "@/components/assignments/assignmentSessionA/InterfaceModal";


// // Enhanced Edit Component with file management
// const EditForm = ({
//   initialValues,
//   onSave,
//   onCancel,
// }: {
//   initialValues: any;
//   onSave: (values: any) => void;
//   onCancel: () => void;
// }) => {
//   type FormValues = z.infer<typeof EditValidation>;

//   const form = useForm<FormValues>({
//     resolver: zodResolver(EditValidation),
//     defaultValues: {
//       ...initialValues,
//       files: initialValues.files || [],
//     },
//   });

//   const { control, watch, setValue } = form;
//   const currentImage = watch("image");
//   const currentFiles = watch("files");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setValue("image", e.target.files[0]);
//     }
//   };

//   const removeFile = (index: number) => {
//     const updatedFiles = [...(currentFiles || [])];
//     updatedFiles.splice(index, 1);
//     setValue("files", updatedFiles);
//   };

//   const onSubmit = (values: FormValues) => {
//     onSave(values);
//   };

//   // Create a ref for the file input
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setValue("files", [...(currentFiles || []), ...newFiles]);
//       // Reset input value to allow selecting the same file again
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <div className="grid grid-cols-1 gap-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <CustomFormField
//               fieldType={FormFieldType.INPUT}
//               control={form.control}
//               label="Title:"
//               name="title"
//               placeholder="Enter a title"
//             />
//             <CustomFormField
//               fieldType={FormFieldType.INPUT}
//               control={form.control}
//               label="SubTitle:"
//               name="subTitle"
//               placeholder="Enter a title"
//             />
//           </div>

//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             label="Description:"
//             name="description"
//           />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Image upload */}
//             <FormItem>
//               <FormLabel className="text-gray-900 dark:text-gray-100">
//                 Image:{" "}
//               </FormLabel>
//               <div className="flex items-center gap-4 w-full">
//                 {currentImage ? (
//                   <div className="relative group w-full">
//                     <img
//                       src={
//                         typeof currentImage === "string"
//                           ? currentImage
//                           : URL.createObjectURL(currentImage)
//                       }
//                       alt="Preview"
//                       className="w-full h-auto max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center gap-2">
//                       <label className="cursor-pointer flex items-center justify-center h-8 w-8 bg-white dark:bg-gray-800 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
//                         <EditOutlined className="text-gray-700 dark:text-gray-300" />
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                           className="hidden"
//                         />
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() => setValue("image", undefined)}
//                         className="px-4 p-2 bg-white dark:bg-gray-800 rounded-full transition-all flex items-center justify-center h-8 w-8"
//                       >
//                         <DeleteOutlined className="text-red-500 dark:text-red-400" />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <label className="cursor-pointer w-full">
//                     <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-primary-color1 transition-all">
//                       <PlusOutlined className="text-2xl text-gray-400 dark:text-gray-300 mb-2" />
//                       <span className="text-sm text-gray-500 dark:text-gray-400">
//                         Upload Image
//                       </span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                     </div>
//                   </label>
//                 )}
//               </div>
//             </FormItem>

//             {/* Files management */}
//             <FormItem>
//               <FormLabel className="flex my-3 justify-between items-center text-gray-900 dark:text-gray-100">
//                 <p>Files: </p>
//                 <label className="cursor-pointer">
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     multiple
//                     onChange={handleFileUpload}
//                     className="hidden"
//                   />
//                   <Button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()} // Trigger input click
//                     className="bg-primary-color1 px-5 py-4 hover:bg-primary-color2 transition-colors duration-200 text-sm md:text-base"
//                   >
//                     <h1 className="text-white text-lg sm:text-[19px] tracking-wide">Add Files</h1>
//                   </Button>
//                 </label>
//               </FormLabel>
//               <div className="space-y-2 max-h-64 overflow-y-auto">
//                 {currentFiles?.length! > 0 ? (
//                   currentFiles?.map((file, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
//                     >
//                       <div className="flex items-center truncate">
//                         <File className="w-5 h-5 mr-3 text-primary-color1 flex-shrink-0" />
//                         <div className="truncate">
//                           <p className="font-medium truncate text-gray-900 dark:text-gray-100">
//                             {file.name || `File ${index + 1}`}
//                           </p>
//                           {file.size && (
//                             <p className="text-sm text-gray-500 dark:text-gray-400">
//                               {(file.size / 1024).toFixed(2)} KB
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <Button
//                         type="button"
//                         size="sm"
//                         variant={"ghost"}
//                         onClick={() => removeFile(index)}
//                         className="flex-shrink-0"
//                       >
//                         <Trash className="text-xl text-red-600 dark:text-red-400" />
//                       </Button>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-4 text-gray-500 dark:text-gray-400">
//                     No files added
//                   </div>
//                 )}
//               </div>
//             </FormItem>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 sm:pt-0">
//           <Button
//             type="button"
//             variant="outline"
//             className="border-primary-color1 px-5 py-4 sm:px-8 sm:py-6  text-primary-color1 hover:bg-primary-color1 hover:text-white dark:text-gray-100 dark:hover:text-white"
//             onClick={onCancel}
//           >
//             <h1 className="text-white sm:text-lg">Cancel</h1>
//           </Button>
//           <Button
//             type="submit"
//             className="bg-primary-color1 hover:bg-primary-color2 px-5 py-4 sm:px-8 sm:py-6 transition-colors duration-200"
//           >
//             <h1 className="text-white sm:text-lg">Save</h1>

//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// const InterfaceModal = ({

//   title,
//   subTitle,
//   description,
//   image,
//   files,
//   link,
// }: {

//   title?: string;
//   subTitle?: string;
//   description: string;
//   image: string;
//   files: any;
//   link?: string;
// }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSave = (values: any) => {
//     console.log("Saved values:", values);
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-start mb-5 pt-2">
//         <Header className="flex items-center px-5 sm:px-5 py-2 gap-2 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
//           <h3 className="text-[22px]  sm:text-2xl lg:text-3xl font-semibold tracking-wider">End Interface</h3>
//         </Header>
//       </div>
//       <div className=" bg-white dark:bg-gray-900 px-4 py-6 pb-8 sm:px-10  sm:py-8 sm:pb-12 min-h-[80vh] border-gray-200 dark:border-gray-700">
//         <div className="pb-5 sm:pb-8">
//           <h1 className="text-primary-color1 text-[18px] sm:text-xl lg:text-2xl tracking-wide font-semibold dark:text-primary-color2">
//             {title}
//           </h1>
//           {subTitle && (
//             <p className="text-gray-600 text-[15px] sm:text-[17px]  dark:text-gray-400">
//               {subTitle}
//             </p>
//           )}
//         </div>

//         {isEditing ? (
//           <EditForm
//             initialValues={{ title, subTitle, description, link, image, files }}
//             onSave={handleSave}
//             onCancel={() => setIsEditing(false)}
//           />
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
//             {image && (
//               <div className="w-full lg:w-1/3 max-sm:p-3">
//                 <img
//                   src={image}
//                   alt={title}
//                   className=" rounded-lg object-contain border border-gray-200 dark:border-gray-600"
//                   width={400}
//                   height={400}

//                 />
//               </div>
//             )}


//             <div
//               className={`flex flex-col ${image ? "w-full lg:w-2/3 xl:w-3/4" : "w-full"
//                 }`}
//             >
//               <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />

//               <div
//                 className="flex-1 overflow-y-auto pr-2 mb-4"
//                 style={{ maxHeight: "calc(70vh - 200px)" }}
//               >
//                 <p
//                   className="text-gray-800 text-[16px] max-sm:text-[14px] dark:text-gray-200"
//                   style={{ whiteSpace: "pre-line" }}
//                 >
//                   {description}
//                 </p>
//               </div>

//               {(files?.length > 0 || link) && (
//                 <>
//                   <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-3" />
//                   <div className="space-y-2">
//                     {files?.length > 0 && (
//                       <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         {files.map((file: any, index: number) => (
//                           <div
//                             key={index}
//                             className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                           >
//                             <div className="mr-4 p-2 bg-[#037f85]/20 dark:bg-blue-900/50 rounded-full">
//                               <File className="w-5 h-5 text-primary-color1 dark:text-primary-color2" />
//                             </div>
//                             <div className="truncate">
//                               <p className="font-medium truncate text-gray-900 dark:text-gray-100">
//                                 {file.name}
//                               </p>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">
//                                 {file.size}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {link && (
//                       <div className="py-3 flex items-center gap-2 flex-wrap">
//                         <LinkOutlined className="text-gray-600 dark:text-gray-300" />
//                         <span className="font-semibold text-gray-900 dark:text-gray-100">
//                           Link:
//                         </span>
//                         <a
//                           href={link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="truncate block max-w-full text-blue-600 dark:text-blue-400 hover:underline"
//                         >
//                           {link}
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">

//                 <Button
//                   type="button"
//                   className="bg-primary-color1 hover:bg-primary-color2 transition-colors py-5 px-8 duration-200"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   <EditOutlined className="mr-2 text-white" />
//                   <h1 className="text-white text-lg sm:text-xl">

//                     Edit
//                   </h1>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// const EndInterface = () => {
//   const mockModalData2 = {
//     title: "Ending Interface ",
//     subTitle: "Essential documentation for new users",
//     description:
//       "This comprehensive guide will walk you through all the key features of our platform. You'll learn how to set up your account, navigate the interface, and use advanced tools to maximize your productivity. Our documentation includes step-by-step tutorials and best practices gathered from thousands of successful users.",
//     image:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//     files: [
//       {
//         name: "User Manual.pdf",
//         url: "https://example.com/files/user-manual.pdf",
//       },
//       {
//         name: "Quick Start Guide.docx",
//         url: "https://example.com/files/quick-start.docx",
//       },
//       {
//         name: "API Reference v2.3",
//         url: "https://example.com/files/api-reference.pdf",
//       },
//     ],
//     link: "https://help.example.com/getting-started",
//   };
//   return (
//     <InterfaceModal {...mockModalData2} />
//   )
// }
// export default EndInterface;









const EndInterface = () => {
  const mockModalData2 = {
    title: "Ending Interface",
    subTitle: "Essential documentation for new users",
    description: "This comprehensive guide will walk you through all the key features...",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71...",
    files: [
      { name: "User Manual.pdf", url: "https://example.com/files/user-manual.pdf", size: 1024 },
      { name: "Quick Start Guide.docx", url: "https://example.com/files/quick-start.docx", size: 1024 },
      { name: "API Reference v2.3", url: "https://example.com/files/api-reference.pdf" , size: 1024}
    ],
    link: "https://help.example.com/getting-started"
  };

  return <InterfaceModal {...mockModalData2} header={"Start Interface"} />;
};

export default EndInterface;