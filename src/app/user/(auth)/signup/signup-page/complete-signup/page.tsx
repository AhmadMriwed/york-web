"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckPicker, DatePicker, Input, Loader, SelectPicker } from "rsuite";
import Image from "next/image";
import BackBtn from "@/components/buttons/BackBtn";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getCategories } from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";
import { FaTrashCan } from "react-icons/fa6";
import Location from "@rsuite/icons/Location";
import { getUTCDate } from "@/utils/dateFuncs";
import { CompleteUserProfile } from "@/store/userStore/slices/userSlice";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import dynamic from "next/dynamic";
const LocationModal = dynamic(
  () => import("@/components/accounts/trainers/LocationModal"),
  {
    ssr: false,
  }
);

export interface FormVal {
  url: string;
  phone_number: string;
  image: null | any;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  categories: number[];
  gender: string;
  birth_date: string;
  about_me: string;
}

const UserCompleteSignup = () => {
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const dispatch: any = useDispatch();

  const inputRef: any = useRef();

  const { error, loading } = useSelector(
    (state: GlobalState) => state.userSlice
  );
  const { categories } = useSelector((state: GlobalState) => state.endUser);

  const router = useRouter();

  const validationSchema = yup.object().shape({
    url: yup.string().url("Please enter a valid URL"),
    about_me: yup.string(),
    image: yup.mixed(),
    gender: yup.string().nullable(),
    birth_date: yup.date().nullable(),
    phone_number: yup.string(),
    categories: yup.array(),
    location: yup.object(),
  });

  const handleOnImageRemoveClick = () => {
    formik.setFieldValue("image", "");
    inputRef.current.value = "";
    setImage("");
  };

  const handleSubmit = (values: any, actions: any) => {
    const formData = new FormData();
    for (let dataKey in values) {
      if (dataKey === "location") {
        // append nested object
        for (let previewKey in values[dataKey]) {
          formData.append(
            `location[${previewKey}]`,
            values[dataKey][previewKey]
          );
        }
      } else if (dataKey === "categories") {
        for (var i = 0; i < values.categories.length; i++) {
          formData.append("categories[]", values.categories[i]);
        }
      } else continue;
    }
    formData.append("image", values.image);
    formData.append("gender", values.gender);
    formData.append("about_me", values.about_me);
    formData.append("phone_number", values.phone_number);
    formData.append("birth_date", getUTCDate(values.birth_date));

    dispatch(CompleteUserProfile(formData)).then((res: any) => {
      if (res.error) {
        return;
      } else if (res.payload.is_verified) {
        router.push("/");
      } else {
        router.push("/user/login/confirm-email");
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      url: "",
      phone_number: "",
      image: "",
      location: {
        address: "",
        latitude: position.lat,
        longitude: position.lng,
      },
      categories: [],
      gender: "",
      birth_date: "",
      about_me: "",
    } as FormVal,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const categori = categories.map((category) => ({
    value: category.id,
    label: (
      <div className="flex items-center gap-2">
        {category.image && (
          <Image width={25} height={25} alt="category" src={category.image} />
        )}
        <p>{category.title}</p>
      </div>
    ),
  }));

  useEffect(() => {
    dispatch(getCategories(""));
  }, [dispatch]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { longitude, latitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let newAddress = `${
          data?.address?.city ? `${data.address.city} ,` : ""
        }${data?.address?.country ? data.address.country : ""}`;
        setAddress(newAddress);
        formik.values.location = {
          address: newAddress,
          longitude: position.lng,
          latitude: position.lat,
        };
      })
      .catch((err) => {
        return;
      });
  }, [position.lat, position.lng]);

  return (
    <div
      style={{
        backgroundImage: "url(/register.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div
        className="min-h-[100vh] p-6"
        style={{ backgroundColor: "#13181EDD" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackBtn textColor="text-[#FFF]" />
            <div className="flex flex-col">
              <p className="text-[#FFF] text-[16px]">welcome to</p>
              <p className="text-[#FFF] text-[18px] font-bold">
                York British Academy
              </p>
            </div>
          </div>
          <Image src="/logo.png" alt="logo image" width={50} height={50} />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <Input
            onChange={(value, e: any) => {
              formik.values.image = e.target.files[0];
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
            accept="image/png, image/gif, image/jpeg"
            type="file"
            ref={inputRef}
            hidden
          />

          <div className="flex flex-col lg:flex-row justify-between items-start md:gap-6 mt-9 md:px-20">
            <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 [&>div]:w-md w-full sm:max-w-[750px]">
              <div className="flex flex-col">
                <label htmlFor="gender" className="text-[#FFF] text-[16px]">
                  Gender
                </label>
                <SelectPicker
                  size="lg"
                  className="mt-2"
                  searchable={false}
                  data={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                  onChange={(val: any) => (formik.values.gender = val)}
                  id="gender"
                  name="gender"
                  placeholder="Select gender"
                />
                {formik.touched.gender && formik.errors.gender && (
                  <p className="error-mesage">{formik.errors.gender}</p>
                )}
              </div>

              <div>
                <label htmlFor="" className="text-[#FFF] text-[16px]">
                  Phone
                </label>
                <PhoneInput
                  containerStyle={{ marginTop: "0.5rem", zIndex: 99 }}
                  inputStyle={{ width: "100%", height: 40 }}
                  isValid
                  onChange={(val: string) => (formik.values.phone_number = val)}
                  country="us"
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                  <p className="error-mesage">{formik.errors.phone_number}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="birth_date" className="text-[#FFF] text-[16px]">
                  Birth Date
                </label>
                <DatePicker
                  size="lg"
                  format="yyyy-MM-dd"
                  className="mt-2"
                  oneTap
                  onChange={(val: any) => (formik.values.birth_date = val)}
                  id="birth_date"
                  name="birth_date"
                />
                {formik.touched.birth_date && formik.errors.birth_date && (
                  <p className="error-mesage">{formik.errors.birth_date}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="url" className="text-[#FFF] text-[16px]">
                  Website
                </label>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Enter your website url"
                  className="mt-2"
                  onChange={(val: any) => (formik.values.url = val)}
                  id="url"
                  name="url"
                />
                {formik.touched.url && formik.errors.url && (
                  <p className="error-mesage">{formik.errors.url}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="categories" className="text-[#FFF] text-[16px]">
                  Category
                </label>
                <CheckPicker
                  size="lg"
                  className="mt-2"
                  searchable={false}
                  data={categori}
                  placeholder="Select category"
                  onChange={(val: any) => (formik.values.categories = val)}
                  name="categories"
                  id="categories"
                />
                {formik.touched.categories && formik.errors.categories && (
                  <p className="error-mesage">{formik.errors.categories}</p>
                )}
              </div>

              <div>
                <label htmlFor="about_me" className="text-[#FFF] text-[16px]">
                  About Me
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="text"
                  as="textarea"
                  rows={1}
                  placeholder="Tell us about yourself"
                  onChange={(val: string) => (formik.values.about_me = val)}
                  name="about_me"
                  id="about_me"
                />
                {formik.touched.about_me && formik.errors.about_me && (
                  <p className="error-mesage">{formik.errors.about_me}</p>
                )}
              </div>
            </div>

            <div className="self-center min-w-fit order-first lg:order-last lg:self-start flex justify-center items-center flex-col mb-6 lg:mb-0">
              <div className="relative">
                <Image
                  onClick={() => inputRef?.current?.click()}
                  src={image ? image : "/default.jpg"}
                  width={150}
                  height={150}
                  alt="profile image"
                  className="w-[125px] h-[125px] rounded-sm cursor-pointer object-cover"
                />
                {formik.values.image && (
                  <div
                    className="absolute bottom-1 right-1 p-2 rounded-full"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >
                    <FaTrashCan
                      cursor="pointer"
                      color="red"
                      onClick={() => handleOnImageRemoveClick()}
                      size={20}
                    />
                  </div>
                )}
              </div>
              <p
                className="text-center text-[#fff] font-[600] text-[12px] mt-1.5 cursor-pointer underline"
                onClick={() => inputRef?.current?.click()}
              >
                {image ? "Change profile picture" : "Choose profile picture"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 md:px-20 w-full mt-20">
            <div className="flex flex-col gap-4 w-full">
              <label
                onClick={() => setOpenLocationModal(true)}
                className="text-[#FFF] font-bold text-[16px]"
              >
                Location: <Location color="red" />
                {` ${address} `}
                <span className="text-[#11cdef] cursor-pointer font-[600] text-[16px] underline">
                  Change address
                </span>
              </label>
            </div>
            <LocationModal
              open={openLocationModal}
              setOpen={setOpenLocationModal}
              position={position}
              setPosition={setPosition}
              setLocation={() => {}}
            />
            {error && (
              <p className="error-mesage !text-[14px] !min-w-fit">{error}</p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-end flex-wrap gap-4 w-full">
              <button
                className="colored-btn min-w-full sm:min-w-fit !text-[16px]"
                type="submit"
              >
                {loading ? <Loader size="sm" /> : "Complete Account"}
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 text-[#11cdef] hover:text-[#11cdef] text-[14px] font-bold"
              >
                Skip <FaArrowRight />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCompleteSignup;
