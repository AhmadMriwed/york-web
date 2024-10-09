"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckPicker, DatePicker, Input, Loader, SelectPicker } from "rsuite";
import Image from "next/image";
import BackBtn from "@/components/buttons/BackBtn";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SignaturePad from "react-signature-pad-wrapper";
import { trainerRegister } from "@/store/trainerStore/slices/trainerSlice";
import { getCategories } from "@/store/endUser/endUserSlice";
import { GlobalState } from "@/types/storeTypes";
import { TrainerAxios } from "@/utils/axios";
import { FaTrashCan } from "react-icons/fa6";
import Location from "@rsuite/icons/Location";
import { getUTCDate } from "@/utils/dateFuncs";
import { formatFileSize } from "@/utils/helpers";

import dynamic from "next/dynamic";
const LocationModal = dynamic(
  () => import("@/components/accounts/trainers/LocationModal"),
  {
    ssr: false,
  }
);

export interface FormVal {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  image: null | string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  categories: number[];
  digital_signature: string;
  gender: string;
  birth_date: string;
  resume_id: number;
  trainer_type_id: number;
  domains: string;
  about_me: string;
  account_type: string;
}

const TrainerSignupPage = () => {
  let trainer_type = useSearchParams().get("trainer_type");
  let trainer_type_id = useSearchParams().get("id");
  const [loadingResume, setLoadingResume] = useState(false);
  const [errorResume, setErrorResume] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const dispatch: any = useDispatch();

  let signObj: any | null;
  const inputRef: any = useRef();
  const resumeRef: any = useRef();

  const { error, loading } = useSelector(
    (state: GlobalState) => state.trainerSlice
  );
  const { categories } = useSelector((state: GlobalState) => state.endUser);

  const router = useRouter();

  const validationSchema = yup.object().shape({
    about_me: yup.string().required("Please type something about you"),
    domains: yup.string().required("Domains are required"),
    digital_signature: yup
      .string()
      .required("Sign is required, Sign and press the Save button"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    image: yup.mixed().required("Image is required"),
    resume_id: yup
      .number()
      .positive("Resume is required")
      .required("Resume is required"),
    last_name: yup.string().required("Last name is required"),
    first_name: yup.string().required("First name is required"),
    trainer_type_id: yup.string().required("Trainer type is required"),
    gender: yup.string().required("Gender is required"),
    birth_date: yup.date().required("Birthdate is required"),
    phone_number: yup.string().required("Phone number is required"),
    categories: yup
      .array()
      .min(1, "At least one category is required")
      .required("Categories are required"),
    location: yup.object().required("Location is required"),
  });

  const SaveSign = async () => {
    let dataURI = signObj?.toDataURL("image/svg+xml");
    let svg = atob(dataURI.replace(/data:image\/svg\+xml;base64,/, ""));
    formik.setFieldValue("digital_signature", svg);
  };
  const RemoveSign = () => {
    signObj?.clear();
    formik.setFieldValue("digital_signature", "");
  };

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
    formData.append("digital_signature", values.digital_signature);
    formData.append("domains", values.domains);
    formData.append("image", values.image);
    formData.append("resume_id", values.resume_id);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("gender", values.gender);
    formData.append("about_me", values.about_me);
    formData.append("phone_number", values.phone_number);
    formData.append("birth_date", getUTCDate(values.birth_date));
    formData.append("trainer_type_id", values.trainer_type_id);
    formData.append("account_type", values.account_type);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("password", values.password);
    formData.append("email", values.email);

    dispatch(trainerRegister(formData)).then((res: any) => {
      if (res.error) {
        return;
      } else if (!res.payload.is_verified) {
        router.push("/trainer/login/confirm-email");
      } else {
        router.push(`/`);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      image: "",
      location: {
        address: "",
        latitude: position.lat,
        longitude: position.lng,
      },
      categories: [],
      digital_signature: "",
      gender: "",
      birth_date: "",
      resume_id: -1,
      trainer_type_id: Number(trainer_type_id),
      domains: "",
      about_me: "",
      account_type: trainer_type,
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
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            type="file"
            name="resume"
            ref={resumeRef}
            id="resume"
            onChange={(value, e: any) => {
              let formData = new FormData();
              formData.append("file", e.target.files[0]);
              setLoadingResume(true);
              TrainerAxios.post(`trainer/upload_resume`, formData)
                .then((res) => {
                  setErrorResume("");
                  setFileName(res.data.data.name);
                  setFileSize(res.data.data.size);
                  formik.values.resume_id = res.data.data.id;
                })
                .catch((err) => {
                  setErrorResume("Resume upload failed");
                })
                .finally(() => {
                  setLoadingResume(false);
                });
            }}
            hidden
          />
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
              <div>
                <label htmlFor="first_name" className="text-[#FFF] text-[16px]">
                  First Name
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="text"
                  placeholder="Enter your first name"
                  onChange={(val: string) => (formik.values.first_name = val)}
                  name="first_name"
                  id="first_name"
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="error-mesage">{formik.errors.first_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="text-[#FFF] text-[16px]">
                  Last Name
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  placeholder="Enter your last name"
                  type="text"
                  onChange={(val: string) => (formik.values.last_name = val)}
                  name="last_name"
                  id="last_name"
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="error-mesage">{formik.errors.last_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-[#FFF] text-[16px]">
                  Email
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="email"
                  placeholder="example@gmail.com"
                  id="email"
                  name="email"
                  onChange={(val: string) => (formik.values.email = val)}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error-mesage">{formik.errors.email}</p>
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

              <div>
                <label htmlFor="password" className="text-[#FFF] text-[16px]">
                  Password
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(val: string) => (formik.values.password = val)}
                  name="password"
                  id="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="error-mesage">{formik.errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="text-[#FFF] text-[16px]"
                >
                  Confirm Password
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={(val: string) =>
                    (formik.values.password_confirmation = val)
                  }
                  id="password_confirmation"
                  name="password_confirmation"
                />
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <p className="error-mesage">
                      {formik.errors.password_confirmation}
                    </p>
                  )}
              </div>

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

              <div>
                <label htmlFor="domains" className="text-[#FFF] text-[16px]">
                  Domains
                </label>
                <Input
                  size="lg"
                  className="mt-2"
                  type="text"
                  placeholder="Enter your domains"
                  onChange={(val: any) => (formik.values.domains = val)}
                  name="domains"
                  id="domains"
                />
                {formik.touched.domains && formik.errors.domains && (
                  <p className="error-mesage">{formik.errors.domains}</p>
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
                  rows={2}
                  placeholder="Tell us about yourself"
                  onChange={(val: string) => (formik.values.about_me = val)}
                  name="about_me"
                  id="about_me"
                />
                {formik.touched.about_me && formik.errors.about_me && (
                  <p className="error-mesage">{formik.errors.about_me}</p>
                )}
              </div>

              <div>
                <label className="text-[#FFF] text-[16px]">
                  Digital Signature
                </label>
                <div className="mt-2 rounded-md overflow-hidden">
                  <SignaturePad
                    options={{
                      minWidth: 1.5,
                      dotSize: 1.5,
                      penColor: "#000",
                      backgroundColor: "#FFF",
                    }}
                    ref={(sign) => (signObj = sign)}
                  />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="button"
                    className="text-[#11cdef] cursor-pointer font-[600] text-[14px] underline"
                    onClick={() => RemoveSign()}
                  >
                    Remove Sign
                  </button>
                  <button
                    type="button"
                    className="text-[#11cdef] cursor-pointer font-[600] text-[14px] underline"
                    onClick={() => SaveSign()}
                  >
                    Save Sign
                  </button>
                </div>
                {formik.touched.digital_signature &&
                  formik.errors.digital_signature && (
                    <p className="error-mesage">
                      {formik.errors.digital_signature}
                    </p>
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
              {formik.touched.image && formik.errors.image && (
                <p className="error-mesage">{formik.errors.image}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 md:px-20 w-full">
            <div className="lg:border-l-2 border-[#11cdef] mt-11 sm:pl-6 flex flex-col gap-4 w-full">
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

              {loadingResume ? (
                <div className="text-[#FFF] flex items-center gap-2">
                  <Loader /> Sending resume...
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => resumeRef?.current?.click()}
                  className="text-[#11cdef] cursor-pointer font-[600] text-[16px] underline self-start"
                >
                  Click here to upload your resume
                </button>
              )}

              {formik.touched.resume_id && formik.errors.resume_id && (
                <p className="error-mesage">{formik.errors.resume_id}</p>
              )}
              {errorResume && <p className="error-mesage">{errorResume}</p>}
              <div className="text-[12px] text-[#FFF]">
                {fileName && fileSize ? (
                  <>
                    <p> File Name : {fileName}</p>
                    <p> File Size : {formatFileSize(Number(fileSize))}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
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
            <button
              className="colored-btn min-w-full sm:min-w-fit !text-[16px]"
              type="submit"
            >
              {loading ? <Loader size="sm" /> : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerSignupPage;
