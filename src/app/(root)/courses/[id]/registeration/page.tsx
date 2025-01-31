"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Category, Course, Venue } from "@/types/rootTypes/rootTypes";
import {
  fetchCategories,
  fetchVenues,
  getCoursesById,
  registration,
} from "@/lib/action/root_action";
import {
  FaUser,
  FaEnvelope,
  FaLink,
  FaBriefcase,
  FaCalendarAlt,
  FaClock,
  FaLanguage,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaExclamationCircle,
  FaSpinner,
  FaPhone,
} from "react-icons/fa";
import { MdCategory, MdDescription } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { TypeIcon } from "lucide-react";
import { CiDollar, CiMoneyBill } from "react-icons/ci";
import { toast } from "sonner";

// Define the schema for the form
const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().nullable().optional(),
  fee: z.string().min(1, "Fee is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  houres: z.number().min(1, "Hours are required"),
  language: z.string().min(1, "Language is required"),
  code: z.string().optional(),
  category_id: z.number().min(1, "Category ID is required").int(),
  venue_id: z.number().min(1, "Venue ID is required").int(),
  name: z.string().nullable().optional(),
  email: z.string().email("Invalid email").nullable().optional(),
  url: z.string().nullable().optional(),
  job_title: z.string().nullable().optional(),
  cv_trainer: z.instanceof(File).optional(),
  selection_training: z
    .object({
      name: z.string().optional(),
      email: z.string().email("Invalid email").nullable().optional(),
      functional_specialization: z.string().optional(),
      phone_number: z.string().optional(),
      trainer_id: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  num_people: z.number().min(1, "Number of people is required").int(),
  entity_type: z.string().min(1, "Entity type is required"),
  user_id: z.number().nullable().optional(),
  course_ad_id: z.number().nullable().optional(),
});
type FormValues = z.infer<typeof schema>;

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [customize, setCustomize] = useState<boolean>(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [categories, setCategories] = useState<Category[]>();
  const [venues, setVenues] = useState<Venue[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venues = await fetchVenues();
        setVenues(venues);
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getCoursesById(Number(id));
        setCourse(course);

        // Pre-fill form fields with course data
        if (course) {
          setValue("title", course.title);
          setValue("description", course.description || "");
          setValue("course_ad_id", course.id);
          setValue("start_date", course.start_date);
          setValue("end_date", course.end_date);
          setValue("fee", course.fee);
          //@ts-ignore
          setValue("houres", course.houres || 0);
          setValue("code", course.code || "");
          setValue("language", course.language);
          setValue("category_id", course.category.id);
          setValue("venue_id", course.venue.id);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      //@ts-ignore
      await registration(data);
      toast.success("Registeration completed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="mt-28 -mb-24 w-fit mx-auto text-3xl text-primary-color1 font-serif ">
        Course registeration
      </p>
      <div className="container mx-auto w-full p-3 mt-32 flex  flex-col-reverse md:flex-row justify-center bg-white rounded-lg shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full md:w-2/3 md:p-4"
        >
          {/* Registration Type Selection */}
          <div>
            <div className="mt-1 flex gap-4 mb-6 ml-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={customize}
                  onChange={() => setCustomize(!customize)}
                  className="mr-2"
                />
                Customize your course ?
              </label>
            </div>
          </div>

          {/* Course Information */}
          {customize && (
            <div className=" p-4 md:p-8 relative w-full rounded-md shadow-lg">
              <p className="text-lg font-bold text-primary-color1 mb-10">
                Course Information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaUser className="inline-block mr-2 text-primary-color2" />
                    Title
                  </label>
                  <input
                    {...register("title")}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.title && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaCalendarAlt className="inline-block mr-2 text-primary-color2" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register("start_date")}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.start_date ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.start_date && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.start_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaCalendarAlt className="inline-block mr-2 text-primary-color2" />
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register("end_date")}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.end_date ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.end_date && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.end_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaClock className="inline-block mr-2 text-primary-color2" />
                    Hours
                  </label>
                  <input
                    type="number"
                    {...register("houres", { valueAsNumber: true })}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.houres ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.houres && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.houres.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaLanguage className="inline-block mr-2 text-primary-color2" />
                    Language
                  </label>
                  <input
                    {...register("language")}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.language ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.language && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.language.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaMapMarkerAlt className="inline-block mr-2 text-primary-color2" />
                    Venue
                  </label>
                  <select
                    {...register("venue_id", { valueAsNumber: true })}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.venue_id ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">Select a venue</option>
                    {venues?.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.title}
                      </option>
                    ))}
                  </select>
                  {errors.venue_id && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.venue_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <MdCategory className="inline-block mr-2 text-primary-color2" />
                    Category :
                  </label>
                  <select
                    {...register("category_id", { valueAsNumber: true })}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.category_id ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">Select a category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.category_id.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <CiMoneyBill className="inline-block mr-2 size-5 text-primary-color2" />
                    Fee Range
                  </label>
                  <input
                    {...register("fee")}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.fee && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.fee.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700">
                  <MdDescription className="inline-block mr-2 text-primary-color2" />
                  Description
                </label>
                <textarea
                  rows={4}
                  {...register("description")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="p-4 md:p-8 relative w-full rounded-md shadow-lg">
            <p className="text-lg font-bold text-primary-color1 mb-10">
              Personal Information:
            </p>
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FaUser className="inline-block mr-2 text-primary-color2" />
                  Name :
                </label>
                <input
                  {...register("name")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FaEnvelope className="inline-block mr-2 text-primary-color2" />
                  Email :
                </label>
                <input
                  {...register("email")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.email && (
                  <p className="text-red-500 flex items-center">
                    <FaExclamationCircle className="inline-block mr-2" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FaLink className="inline-block mr-2 text-primary-color2" />
                  URL :
                </label>
                <input
                  {...register("url")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.url ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FaBriefcase className="inline-block mr-2 text-primary-color2" />
                  Job Title :
                </label>
                <input
                  {...register("job_title")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.job_title ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>
            </div>
          </div>

          {/* Trainer Selection */}
          <div>
            <label className="flex items-center ml-4">
              <input
                type="checkbox"
                checked={isTrainer}
                onChange={() => setIsTrainer(!isTrainer)}
                className="mr-2"
              />
              Do you have a specific trainer ?
            </label>
          </div>

          {/* Trainer Fields */}
          {isTrainer && (
            <div className="p-4 md:p-8 relative w-full rounded-md shadow-lg">
              <p className="text-lg font-bold text-primary-color1 mb-10">
                Trainer Information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaUser className="inline-block mr-2 text-primary-color2" />
                    Trainer Name :
                  </label>
                  <input
                    {...register("selection_training.name")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaEnvelope className="inline-block mr-2 text-primary-color2" />
                    Trainer Email :
                  </label>
                  <input
                    type="email"
                    {...register("selection_training.email")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaBriefcase className="inline-block mr-2 text-primary-color2" />
                    Functional Specialization :
                  </label>
                  <input
                    {...register(
                      "selection_training.functional_specialization"
                    )}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <FaPhone className="inline-block mr-2 text-primary-color2" />
                    Phone Number
                  </label>
                  <input
                    {...register("selection_training.phone_number")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}

          <div className="p-4 md:p-8 shadow-xl">
            <p className="text-lg font-bold text-primary-color1 mb-10">
              Additional Information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <BsPeople className="inline-block mr-2 text-primary-color2 size-4" />
                  Number of People :
                </label>
                <input
                  type="number"
                  {...register("num_people", { valueAsNumber: true })}
                  className={`mt-1 block w-full p-2 border ${
                    errors.num_people ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.num_people && (
                  <p className="text-red-500 flex items-center">
                    <FaExclamationCircle className="inline-block mr-2" />
                    {errors.num_people.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <TypeIcon className="inline-block size-4 mr-2 text-primary-color2" />
                  Entity type :
                </label>
                <input
                  {...register("entity_type")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.entity_type ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {errors.entity_type && (
                  <p className="text-red-500 flex items-center">
                    <FaExclamationCircle className="inline-block mr-2" />
                    {errors.entity_type.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={() => console.log(errors)}
            className="w-full bg-primary-color2 text-white p-2 rounded-md hover:bg-primary-color1 flex items-center justify-center"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin inline-block mr-2" />
            ) : (
              <FaPaperPlane className="inline-block mr-2" />
            )}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Course Details Section */}
        <div>
          {!customize && (
            <div className="border-2 relative border-dashed bg-gray-100 p-6 border-primary-color1  rounded-lg mb-6 mx-2">
              <p className="absolute px-4 py-1 rounded-full -top-4 left-5 bg-primary-color1 text-white">
                Course Information
              </p>
              <ul className="space-y-4">
                <li className="font-semibold">
                  Course Title:{" "}
                  <span className="text-gray-600">{course?.title}</span>
                </li>
                <li className="font-semibold">
                  Start Date:{" "}
                  <span className="text-gray-600">{course?.start_date}</span>
                </li>
                <li className="font-semibold">
                  End Date:{" "}
                  <span className="text-gray-600">{course?.end_date}</span>
                </li>
                <li className="font-semibold">
                  Language:{" "}
                  <span className="text-gray-600">{course?.language}</span>
                </li>
                <li className="font-semibold">
                  Course Code:{" "}
                  <span className="text-gray-600">{course?.code}</span>
                </li>
                <li className="font-semibold">
                  Course Fee:{" "}
                  <span className="text-gray-600">{course?.fee}</span>
                </li>
              </ul>
            </div>
          )}

          <Image
            src={"/information/registeration.svg"}
            width={500}
            height={500}
            className="hidden md:block"
            alt="registration"
          />
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
