"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const schema = z.object({
  courseTitle: z.string().min(1, "Course title is required"),
  registrationType: z.enum(["in-person", "online"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  duration: z.enum(["weekdays", "weekend"]),
  sessionTime: z.string().min(1, "Session time is required"),
  venue: z.string().min(1, "Venue is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobPosition: z.string().min(1, "Job position is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  companyName: z.string().min(1, "Company name is required"),
  taxRegistration: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  paymentMethod: z.enum(["bank-transfer", "credit-card"]),
  additionalServices: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof schema>;

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container mx-auto w-full h-[90vh] mt-32 flex  justify-center p-6 bg-white rounded-lg shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-h-[80%] overflow-y-auto w-2/3"
      >
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Title
          </label>
          <input
            {...register("courseTitle")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.courseTitle && (
            <p className="text-red-500">{errors.courseTitle.message}</p>
          )}
        </div>

        {/* Registration Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Type
          </label>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="in-person"
                {...register("registrationType")}
                className="mr-2"
              />
              In-person course
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="online"
                {...register("registrationType")}
                className="mr-2"
              />
              Online course
            </label>
          </div>
          {errors.registrationType && (
            <p className="text-red-500">{errors.registrationType.message}</p>
          )}
        </div>

        {/* Course Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              {...register("startDate")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              {...register("endDate")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.endDate && (
              <p className="text-red-500">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="weekdays"
                {...register("duration")}
                className="mr-2"
              />
              Weekdays
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="weekend"
                {...register("duration")}
                className="mr-2"
              />
              Weekend
            </label>
          </div>
          {errors.duration && (
            <p className="text-red-500">{errors.duration.message}</p>
          )}
        </div>

        {/* Session Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Session Time
          </label>
          <input
            type="time"
            {...register("sessionTime")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.sessionTime && (
            <p className="text-red-500">{errors.sessionTime.message}</p>
          )}
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Venue
          </label>
          <input
            {...register("venue")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.venue && (
            <p className="text-red-500">{errors.venue.message}</p>
          )}
        </div>

        {/* Applicant's Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Position
            </label>
            <input
              {...register("jobPosition")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.jobPosition && (
              <p className="text-red-500">{errors.jobPosition.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              {...register("country")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* Company Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            {...register("companyName")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.companyName && (
            <p className="text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        {/* Tax Registration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            TAX Registration (EU / UK)
          </label>
          <input
            {...register("taxRegistration")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.taxRegistration && (
            <p className="text-red-500">{errors.taxRegistration.message}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mr-2"
            />
            I accept the terms and conditions
          </label>
          {errors.acceptTerms && (
            <p className="text-red-500">{errors.acceptTerms.message}</p>
          )}
        </div>

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
        className=""
        alt="registeration"
      />
      ;
    </div>
  );
};

export default RegistrationForm;
