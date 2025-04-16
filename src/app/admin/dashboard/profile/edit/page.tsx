"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { CalendarIcon, EditIcon, Loader2 } from "lucide-react";
import { z } from "zod";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import Loading from "@/components/Pars/Loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Types and Schemas
import { GlobalState } from "@/types/storeTypes";
import { AdminFormValidation } from "@/lib/admin/adminValidation";

// Context and Utils
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { cn } from "@/lib/utils";

// Store
import {
  editProfile,
  getAdminProfile,
} from "@/store/adminstore/slices/authSlice";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type FormValues = z.infer<typeof AdminFormValidation>;

const EditProfilePage = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { adminProfile, profileLoading } = useSelector(
    (state: GlobalState) => state.authSlice
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(AdminFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      user_name: "",
      phone_number: "",
      email: "",
      birth_date: undefined,
      gender: "",
      job_type: "",
      about_me: "",
    },
  });

  useEffect(() => {
    if (!adminProfile) {
      dispatch(getAdminProfile());
    }
  }, [adminProfile, dispatch]);

  useEffect(() => {
    if (adminProfile) {
      form.reset({
        first_name: adminProfile.first_name || "",
        last_name: adminProfile.last_name || "",
        user_name: adminProfile.user_name || "",
        phone_number: adminProfile.phone_number || "",
        email: adminProfile.email || "",
        //@ts-ignore
        birth_date: adminProfile.birth_date || undefined,
        job_type: adminProfile.job_type || "",
        about_me: adminProfile.about_me || "",
        gender: adminProfile.gender || "",
      });

      if (adminProfile.image) {
        setPreviewImage(adminProfile.image);
      }
    }
  }, [adminProfile, form]);

  // Handle image preview
  useEffect(() => {
    if (newImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(newImage);
    }
  }, [newImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key !== "image" && key !== "birth_date") {
          formData.append(key, value.toString());
        }
      });
      if (values.birth_date) {
        const date = new Date(values.birth_date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate() + 1).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        formData.append("birth_date", formattedDate);
      }

      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await editProfile(formData);

      dispatch(getAdminProfile());
      router.push("/admin/dashboard/profile");
    } catch (error: any) {
    } finally {
      setIsSubmitting(false);
    }
  };
  if (profileLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen ",
        mode === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="pt-8 pb-2 relative md:mx-8 mx-6">
            <header className="flex items-center mx-2 py-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="font-bold text-lg hover:text-primary-color1 hover:no-underline"
                      href="/admin/dashboard/profile"
                    >
                      Profile
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink className="font-bold text-lg hover:text-primary-color1 hover:no-underline">
                      Edit Profile
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Left Column - Personal Info */}
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Image
                      src={previewImage || "/avatar.png"}
                      width={120}
                      height={120}
                      alt="Profile photo"
                      className="rounded-full mx-auto"
                      priority
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-[75%] w-8 h-8 bg-primary-color1 rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => inputRef.current?.click()}
                    >
                      <EditIcon className="text-white h-4 w-4" />
                    </button>
                    <input
                      type="file"
                      className="hidden"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      ref={inputRef}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    label="First Name"
                    name="first_name"
                    iconSrc="/icons/user.svg"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    label="Last Name"
                    name="last_name"
                    iconSrc="/icons/user.svg"
                  />
                </div>

                <div className="space-y-4">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    label="Phone Number"
                    name="phone_number"
                    iconSrc="/icons/phone.svg"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    label="Email"
                    name="email"
                    iconSrc="/icons/mail.svg"
                    disabled // Email might not be editable
                  />
                </div>
              </div>

              {/* Right Column - Additional Info */}
              <div className="space-y-6">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  label="Username"
                  name="user_name"
                  iconSrc="/icons/user.svg"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="grid-cols-1">
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birth_date"
                    render={({ field }) => (
                      <FormItem className="grid-cols-1 w-full">
                        <FormLabel className="mb-2">Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="w-full">
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal dark:bg-gray-700 mt-4",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <span>
                                  {field.value
                                    ? format(field.value, "PPP")
                                    : "Pick a date"}
                                </span>
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  label="About Me"
                  name="about_me"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                className="bg-primary-color1 hover:bg-primary-color2 shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="text-gray-300 flex items-center gap-2 font-semibold">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfilePage;
