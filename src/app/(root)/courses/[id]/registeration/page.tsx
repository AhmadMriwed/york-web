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
} from "@/lib/action/root_action";

// Define the schema for the form
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fee: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  hours: z.number().min(1, "Hours are required"),
  language: z.string().min(1, "Language is required"),
  venue_id: z.number().min(1, "Venue ID is required"),
  category_id: z.number().min(1, "Category ID is required"),
  name: z.string().min(1, "name is required"),
  email: z.string().email("Invalid email"),
  url: z.string().min(1, "url is required"),
  job_title: z.string().min(1, "job title is required"),
  cv_trainer: z.string().min(1, "cv trainer title is required"),

  course_ad_id: z.number().optional(),
  num_people: z.number().min(1, "Number of people is required").optional(),
  selection_training: z
    .object({
      name: z.string().optional(),
      email: z.string().email("Invalid email").optional(),
      functional_specialization: z.string().optional(),
      phone_number: z.string().optional(),
      trainer_id: z.number().optional(),
    })
    .optional(),
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

  const [registrationType, setRegistrationType] = useState<
    "direct" | "indirect"
  >("direct");
  const [isTrainer, setIsTrainer] = useState(false);
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
        console.error("Error fetching course:", error);
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
          setValue("description", course.description);
          setValue("start_date", course.start_date);
          setValue("end_date", course.end_date);
          setValue("hours", course.hours);
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
  };
  console.log(course);

  return (
    <div className="container mx-auto w-full h-[90vh] p-3 mt-32 flex justify-center bg-white rounded-lg shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-h-[80%] overflow-y-auto w-full md:w-2/3 p-4"
      >
        <div className="border border-primary-color1 p-2 rounded-lg">
          <ul>
            <li className="font-semibold">
              course title:{" "}
              <span className="text-gray-600">{course?.title}</span>
            </li>
            <li className="font-semibold">
              course start_date:
              <span className="text-gray-600">{course?.end_date}</span>
            </li>
            <li className="font-semibold">
              course end_date :
              <span className="text-gray-600">{course?.start_date}</span>
            </li>
            <li className="font-semibold">
              course language :
              <span className="text-gray-600">{course?.language}</span>
            </li>
            <li className="font-semibold">
              course code :<span className="text-gray-600">{course?.code}</span>
            </li>
          </ul>
        </div>

        {/* Registration Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Type
          </label>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="direct"
                checked={registrationType === "direct"}
                onChange={() => setRegistrationType("direct")}
                className="mr-2"
              />
              Direct Registration
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="indirect"
                checked={registrationType === "indirect"}
                onChange={() => setRegistrationType("indirect")}
                className="mr-2"
              />
              Indirect Registration
            </label>
          </div>
        </div>

        {/* Direct Registration Fields */}
        {registrationType === "direct" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                name
              </label>
              <input
                {...register("email")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                email
              </label>
              <input
                {...register("name")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                url
              </label>
              <input
                {...register("url")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                job title
              </label>
              <input
                {...register("job_title")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                cv trainer
              </label>
              <input
                type="file"
                {...register("cv_trainer")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Trainer Selection */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isTrainer}
                  onChange={() => setIsTrainer(!isTrainer)}
                  className="mr-2"
                />
                Are you a trainer?
              </label>
            </div>

            {/* Trainer Fields */}
            {isTrainer && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trainer Name
                  </label>
                  <input
                    {...register("selection_training.name")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trainer Email
                  </label>
                  <input
                    type="email"
                    {...register("selection_training.email")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Functional Specialization
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
                    Phone Number
                  </label>
                  <input
                    {...register("selection_training.phone_number")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trainer ID
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of People
              </label>
              <input
                type="number"
                {...register("num_people", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.num_people && (
                <p className="text-red-500">{errors.num_people.message}</p>
              )}
            </div>
          </>
        )}

        {/* Indirect Registration Fields */}
        {registrationType === "indirect" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register("title")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                {...register("description")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fee
              </label>
              <input
                {...register("fee")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.fee && (
                <p className="text-red-500">{errors.fee.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                {...register("start_date")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.start_date && (
                <p className="text-red-500">{errors.start_date.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                {...register("end_date")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.end_date && (
                <p className="text-red-500">{errors.end_date.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hours
              </label>
              <input
                type="number"
                {...register("hours", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.hours && (
                <p className="text-red-500">{errors.hours.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                {...register("language")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category_id", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500">{errors.category_id.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Venue
              </label>
              <select
                {...register("venue_id", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a venue</option>
                {venues?.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.title}
                  </option>
                ))}
              </select>
              {errors.venue_id && (
                <p className="text-red-500">{errors.venue_id.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Ad ID
              </label>
              <input
                type="number"
                {...register("course_ad_id", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.course_ad_id && (
                <p className="text-red-500">{errors.course_ad_id.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                name
              </label>
              <input
                {...register("email")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                email
              </label>
              <input
                {...register("name")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                url
              </label>
              <input
                {...register("url")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                job title
              </label>
              <input
                {...register("job_title")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                cv trainer
              </label>
              <input
                type="file"
                {...register("cv_trainer")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Trainer Selection */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isTrainer}
                  onChange={() => setIsTrainer(!isTrainer)}
                  className="mr-2"
                />
                Are you a trainer?
              </label>
            </div>
            {/* Trainer Fields */}
            {isTrainer && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trainer Name
                  </label>
                  <input
                    {...register("selection_training.name")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trainer Email
                  </label>
                  <input
                    type="email"
                    {...register("selection_training.email")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Functional Specialization
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
                    Phone Number
                  </label>
                  <input
                    {...register("selection_training.phone_number")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trainer ID
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <Image
        src={"/information/registeration.svg"}
        width={500}
        height={500}
        className="hidden md:block"
        alt="registeration"
      />
    </div>
  );
};

export default RegistrationForm;
