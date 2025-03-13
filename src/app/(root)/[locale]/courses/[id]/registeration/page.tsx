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
  getCourseById,
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
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { MdCategory, MdDescription } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { Building, Code2, Map, TypeIcon } from "lucide-react";
import { CiMoneyBill } from "react-icons/ci";
import { toast } from "sonner";
import { TiThLarge } from "react-icons/ti";
import { PiMapPin } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import TermAndPrivacy from "@/components/review/TermAndPrivacy";
import { RegisterationFormValidation } from "@/lib/validation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type FormValues = z.infer<typeof RegisterationFormValidation>;

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(RegisterationFormValidation),
  });

  const [customize, setCustomize] = useState<boolean>(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [categories, setCategories] = useState<Category[]>();
  const [venues, setVenues] = useState<Venue[]>();
  const [accept, setAccept] = useState(false);
  const [termDailogOpen, setTermDialogOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState<{
    code: string;
    percentage: number;
    fee: number;
  } | null>(null);
  const [totalFee, setTotalFee] = useState<number>(0);
  const t = useTranslations("Courses");
  const locale = useLocale();

  useEffect(() => {
    const fetch = async () => {
      try {
        const venues = await fetchVenues(locale);
        setVenues(venues);
        const categories = await fetchCategories(locale);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        //@ts-expect-error
        const course = await getCourseById(id);
        setCourse(course);

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
          setTotalFee(Number(course.fee));
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
      toast.success("Registration completed successfully");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscountCodeValidation = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/discounts/search?code=${discountCode}`
      );
      const discountData = await response.json();

      if (discountData && discountData.code) {
        setDiscountInfo(discountData);
        const fee = Number(course?.fee) || 0;
        let appliedDiscountFee = 0;

        if (discountData.percentage > 0) {
          appliedDiscountFee = (fee * discountData.percentage) / 100;
        } else if (discountData.fee > 0) {
          appliedDiscountFee = discountData.fee;
        }

        setTotalFee(fee - appliedDiscountFee);
        toast.success(`Discount applied: ${discountData.code}`);
      } else {
        setDiscountInfo(null);
        toast.error("Invalid discount code");
      }
    } catch (error) {
      console.error("Error validating discount code:", error);
      setDiscountInfo(null);
      toast.error("Error validating discount code");
    }
  };

  const handleRemoveDiscount = () => {
    setDiscountInfo(null);
    setDiscountCode("");
    setTotalFee(Number(course?.fee));
    toast.success("Discount removed");
  };

  const languages = [
    {
      code: "en",
      title: locale === "ar" ? "الاجنبية" : "English",
    },
    {
      code: "ar",
      title: locale === "ar" ? "العربية" : "Arabic",
    },
  ];

  const entities = [
    {
      title: locale === "en" ? "Public" : "عام",
    },
    {
      title: locale === "en" ? "Private" : "خاص",
    },
  ];

  return (
    <>
      <p className="mt-28 -mb-24 w-fit mx-auto text-3xl text-primary-color1 font-serif ">
        {t("registeration.title")}
      </p>
      <div className="container mx-auto w-full p-3 mt-32 flex  flex-col-reverse md:flex-row justify-center bg-white rounded-lg shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full md:w-2/3 md:p-4"
        >
          {/* Registration Type Selection */}
          <div>
            <div className={cn("mt-1  gap-4  mb-6 ml-4")}>
              <ul>
                <LiComponent>
                  <input
                    type="checkbox"
                    checked={customize}
                    onChange={() => setCustomize(!customize)}
                    className="mr-2"
                  />
                  <label className="flex items-center">
                    {t("registeration.CourseInfo.question")}
                  </label>
                </LiComponent>
              </ul>
            </div>
          </div>

          {/* Course Information */}
          {customize && (
            <div className=" p-4 md:p-8 relative w-full rounded-md shadow-lg">
              <p
                className={cn(
                  "text-lg font-bold  flex text-primary-color1 mb-10 ml-auto w-full"
                )}
              >
                {t("registeration.CourseInfo.main_title")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <LabelComponent>
                    <FaUser className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.title")}
                  </LabelComponent>
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
                  <LabelComponent>
                    <FaCalendarAlt className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.start_date")}
                  </LabelComponent>

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
                  <LabelComponent>
                    <FaCalendarAlt className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.end_date")}
                  </LabelComponent>
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
                  <LabelComponent>
                    <FaClock className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.hours")}
                  </LabelComponent>

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
                  <LabelComponent>
                    <FaLanguage className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.language")}
                  </LabelComponent>

                  <select
                    {...register("language")}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.venue_id ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">
                      {locale === "ar" ? "اختر لغة " : "Select a language "}
                    </option>
                    {languages?.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.title}
                      </option>
                    ))}
                  </select>
                  {errors.language && (
                    <p className="text-red-500 flex items-center">
                      <FaExclamationCircle className="inline-block mr-2" />
                      {errors.language.message}
                    </p>
                  )}
                </div>

                <div>
                  <LabelComponent>
                    <FaMapMarkerAlt className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.venue")}
                  </LabelComponent>
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
                  <LabelComponent>
                    <MdCategory className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.category")}
                  </LabelComponent>
                  <select
                    {...register("category_id", { valueAsNumber: true })}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                      errors.category_id ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">
                      {locale === "en" ? "Select a category" : "اختر فئة"}
                    </option>
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
                  <LabelComponent>
                    <CiMoneyBill className="inline-block mr-2 size-5 text-primary-color2" />
                    {t("registeration.CourseInfo.fee_range")}
                  </LabelComponent>
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
                <LabelComponent>
                  <MdDescription className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.CourseInfo.description")}
                </LabelComponent>

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
            <p
              className={cn(
                "text-lg font-bold  flex text-primary-color1 mb-10 ml-auto w-full"
              )}
            >
              {t("registeration.personalInfo.title")}
            </p>
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-4">
              <div>
                <LabelComponent>
                  <FaUser className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.first_name")}
                </LabelComponent>

                <input
                  {...register("name")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>
              <div>
                <LabelComponent>
                  <FaUser className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.last_name")}
                </LabelComponent>

                <input
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>
              <div>
                <LabelComponent>
                  <FaPhone className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.phone_number")}
                </LabelComponent>

                <input
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>
              <div>
                <LabelComponent>
                  <Map className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.country")}
                </LabelComponent>

                <input
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 border-gray-300
                    rounded-md`}
                />
              </div>
              <div>
                <LabelComponent>
                  <PiMapPin className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.city")}
                </LabelComponent>
                <input
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 border-gray-300
               rounded-md`}
                />
              </div>
              <div>
                <LabelComponent>
                  <Building className="inline-block size-5 mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.company_name")}
                </LabelComponent>

                <input
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 border-gray-300
                    rounded-md`}
                />
              </div>

              <div>
                <LabelComponent>
                  <FaEnvelope className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.email")}
                </LabelComponent>

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
                <LabelComponent>
                  <FaBriefcase className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.job_title")}
                </LabelComponent>

                <input
                  {...register("job_title")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.job_title ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>
              <div>
                <LabelComponent>
                  <TypeIcon className="inline-block size-4 mr-2 text-primary-color2" />
                  {t("registeration.personalInfo.entity_type")}
                </LabelComponent>

                <select
                  {...register("entity_type")}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
                    errors.venue_id ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                >
                  <option value="">
                    {locale === "en" ? "Select an entity " : "اختر النوع"}
                  </option>
                  {entities?.map((entity) => (
                    <option key={entity.title} value={entity.title}>
                      {entity.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className={cn("flex mt-3 gap-2 items-center w-full ")}>
                <input
                  type="checkbox"
                  onChange={() => setAccept(true)}
                  className="mr-2"
                />
                <label className={cn("flex items-center")}>
                  {locale === "ar" ? "انا اقبل " : "I accept "}{" "}
                  <p
                    className="mx-1 text-primary-color1 font-semibold cursor-pointer"
                    onClick={() => setTermDialogOpen(true)}
                  >
                    {locale === "ar"
                      ? "الشروط والخصوصية؟"
                      : "terms and policy ?"}
                  </p>
                </label>
              </div>
            </div>
          </div>
          <TermAndPrivacy
            setTermDialogOpen={setTermDialogOpen}
            termDialogOpen={termDailogOpen}
          />

          {/* Trainer Selection */}
          <div>
            <ul className="my-8">
              <LiComponent>
                <input
                  type="checkbox"
                  checked={isTrainer}
                  onChange={() => setIsTrainer(!isTrainer)}
                  className="mr-2 "
                />
                {t("registeration.TrainerInfo.question")}
              </LiComponent>
            </ul>
          </div>

          {/* Trainer Fields */}
          {isTrainer && (
            <div className="p-4 md:p-8 relative w-full rounded-md shadow-lg">
              <p
                className={cn(
                  "text-lg font-bold  flex text-primary-color1 mb-10 ml-auto w-full"
                )}
              >
                {t("registeration.TrainerInfo.title")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <LiComponent>
                    <FaUser className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.TrainerInfo.trainer_name")}
                  </LiComponent>
                  <input
                    {...register("selection_training.name")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-primary-color2"
                  />
                </div>

                <div>
                  <LiComponent>
                    <FaEnvelope className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.TrainerInfo.trainer_email")}
                  </LiComponent>
                  <input
                    type="email"
                    {...register("selection_training.email")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-primary-color2"
                  />
                </div>

                <div>
                  <LiComponent>
                    <FaBriefcase className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.TrainerInfo.functional")}
                  </LiComponent>

                  <input
                    {...register(
                      "selection_training.functional_specialization"
                    )}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-primary-color2"
                  />
                </div>

                <div>
                  <LiComponent>
                    <FaPhone className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.TrainerInfo.phone_number")}
                  </LiComponent>
                  <input
                    {...register("selection_training.phone_number")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-primary-color2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}

          <div className="p-4 md:p-8 shadow-xl">
            <p
              className={cn(
                "text-lg font-bold  flex text-primary-color1 mb-10 ml-auto w-full"
              )}
            >
              {t("registeration.additionalInfo.title")}
            </p>
            <div className="grid grid-cols-1  gap-2">
              <div>
                <LiComponent>
                  <BsPeople className="inline-block mr-2 text-primary-color2 size-4" />
                  {t("registeration.additionalInfo.number_of_people")}
                </LiComponent>
                <input
                  type="number"
                  {...register("num_people", { valueAsNumber: true })}
                  className={`mt-1 block w-full p-2 border focus:outline-primary-color2 ${
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
            </div>
          </div>

          {/* Discount Code Section */}
          <div className="p-4 md:p-8 shadow-xl">
            <p
              className={cn(
                "text-lg font-bold  flex text-primary-color1 mb-10 ml-auto w-full"
              )}
            >
              {t("registeration.discount_code.code")}
            </p>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FaCheck className="inline-block mr-2 text-primary-color2" />
                  {t("registeration.discount_code.code")}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className={`mt-1 block w-full p-2 border focus:outline-primary-color2 border-gray-300 rounded-md`}
                    disabled={!!discountInfo}
                  />
                  {discountInfo ? (
                    <button
                      type="button"
                      onClick={handleRemoveDiscount}
                      className="mt-1 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                    >
                      <FaTimes className="inline-block mr-2" />
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDiscountCodeValidation}
                      className="mt-1 bg-primary-color2 text-white p-2 rounded-md hover:bg-primary-color1"
                    >
                      <FaCheck className="inline-block mr-2" />
                      Validate
                    </button>
                  )}
                </div>
              </div>
            </div> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={accept}
            className="w-full bg-primary-color2 text-white p-2 rounded-md hover:bg-primary-color1 flex items-center justify-center"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin inline-block mr-2" />
            ) : (
              <FaPaperPlane className="inline-block mr-2" />
            )}
            {isSubmitting
              ? locale === "en"
                ? "Submitting..."
                : "جاري التسجيل"
              : locale === "en"
              ? "Submit"
              : "ارسال"}
          </button>
        </form>

        {/* Course Details Section */}
        <div>
          {!customize && (
            <>
              <div className="border-2 relative border-dashed bg-gray-100 p-6 border-primary-color1  rounded-lg mb-6 mx-2">
                <p
                  className={cn(
                    "absolute px-4 py-1 rounded-full -top-4 bg-primary-color1 text-white"
                  )}
                >
                  {t("registeration.CourseInfo.main_title")}
                </p>
                <ul className="space-y-4">
                  <LiComponent>
                    <TiThLarge className="inline-block mr-2 text-primary-color2 mt-1" />
                    <p>
                      {t("registeration.CourseInfo.title")}
                      {" : "}
                      <span className="text-gray-600">{course?.title}</span>
                    </p>
                  </LiComponent>
                  <LiComponent>
                    <FaCalendarAlt className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.start_date")}

                    <span className="text-gray-600">{course?.start_date}</span>
                  </LiComponent>

                  <LiComponent>
                    <FaCalendarAlt className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.end_date")}

                    <span className="text-gray-600">{course?.end_date}</span>
                  </LiComponent>
                  <LiComponent>
                    <FaLanguage className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.language")}

                    <span className="text-gray-600">{course?.language}</span>
                  </LiComponent>
                  <LiComponent>
                    <Code2 className="inline-block mr-2 text-primary-color2" />
                    {t("registeration.CourseInfo.code")}
                    <span className="text-gray-600">{course?.code}</span>
                  </LiComponent>
                </ul>
              </div>

              <div className="border-2 relative border-dashed bg-gray-100 mt-4 p-6 border-[#025c63]  rounded-lg mb-6 mx-2">
                <p
                  className={cn(
                    "absolute px-4 py-1 rounded-full -top-4  bg-[#025c63] text-white",
                    locale === "ar" ? "right-5" : "left-5"
                  )}
                >
                  {locale === "ar" ? "تكلفة الكورس" : "Course Fee"}
                </p>
                <ul className="space-y-4">
                  <LiComponent>
                    <CiMoneyBill className="inline-block mr-2 text-primary-color2 mt-1" />

                    <p>
                      {locale === "ar" ? ": سعر الكورس " : "Course Fee : "}
                      {"  "}
                    </p>
                    <span className="text-gray-600 mx-2">{course?.fee} </span>
                  </LiComponent>
                  <LiComponent>
                    <CiMoneyBill className="inline-block mr-2 text-primary-color2 mt-1" />
                    {locale === "ar" ? ":الخصم " : "Discount : "}
                    <p>
                      <span className="text-gray-600">
                        {discountInfo?.code
                          ? `${discountInfo.code} (${
                              discountInfo.percentage || 0
                            }% or ${discountInfo.fee || 0}$)`
                          : "0 $"}
                      </span>
                    </p>
                  </LiComponent>
                  <LiComponent>
                    <CiMoneyBill className="inline-block mr-2 text-primary-color2" />
                    {locale === "ar" ? " السعر الكلي: " : "Total: "}
                    {"  "} <span className="text-gray-600">{totalFee} </span>
                  </LiComponent>
                </ul>
              </div>
            </>
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

const LiComponent = ({ children }: { children: React.ReactNode }) => {
  return <li className={cn("font-semibold flex gap-2")}>{children}</li>;
};
const LabelComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className={cn(" flex  gap-1 text-sm font-medium text-gray-700")}>
      {children}
    </label>
  );
};
