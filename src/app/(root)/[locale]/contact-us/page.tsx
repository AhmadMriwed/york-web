import Map from "@/components/review/Map";
import ContactUsForm from "@/components/forms/ContactUsForm";
import {
  contactUsImage,
  ContactUsImageKey,
  isContactUsImageKey,
} from "@/lib/utils";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";
import Loader from "@/components/loading/Loader";
import { fetchContactUsData } from "@/lib/action/root_action";
import { getTranslations } from "next-intl/server";

interface CardProps {
  image: string;
  type: ContactUsImageKey;
  content: string | undefined;
}

const Card = ({ image, type, content }: CardProps) => (
  <div className="col-span-1 flex flex-col items-center space-y-2 border-2 border-gray-200 p-8 rounded-sm h-60 shadow-xl hover:shadow-sm transition-all duration-200">
    <Image src={image} width={65} height={65} alt={"image"} />
    <h1 className="uppercase text-primary-color2 text-xl font-semibold">
      {type}
    </h1>
    <p className="text-gray-600 text-center text-sm">{content}</p>
  </div>
);

const Page = async () => {
  const contactUsData = await fetchContactUsData();
  const t = await getTranslations("ContactUs");
  return (
    <Suspense fallback={<Loader />}>
      <main className="h-full relative">
        {/* Hero Section */}
        <div className="contact-us-bg h-[80vh] flex items-center justify-center">
          <h1 className="custom-title">{t("title")}</h1>
        </div>

        {/* Contact Cards Section */}
        <div className="container px-8 py-12 my-4 items-center justify-evenly space-y-2 md:mx-auto md:grid grid-cols-1 md:grid-cols-2  gap-6">
          {contactUsData?.map((item) => {
            // Validate that item.type.type is a valid key for contactUsImage
            const type = item.type.type as ContactUsImageKey;
            if (isContactUsImageKey(type)) {
              return (
                <Card
                  key={item.id}
                  image={contactUsImage[type] || ""}
                  type={type}
                  content={item.content}
                />
              );
            } else {
              console.warn(`Invalid type: ${type}`);
              return null;
            }
          })}
        </div>

        {/* Contact Form Section */}
        <div className="bg-primary-color4 md:px-16 px-4 md:py-24 gap-16 py-16 ">
          <div className="md:w-[80%] md:mx-auto w-full flex items-center md:items-start gap-12 flex-col md:flex-row">
            <div className="flex flex-col items-start space-y-4 text-white -mt-12 p-4">
              {/* Logo */}
              <Image
                src="/logo.png"
                height={300}
                width={250}
                className=" mx-auto md:ml-24 -mb-16 "
                alt="logo"
              />

              {/* العنوان */}
              <div className="flex -mt-24 items-center transition-all  duration-200 hover:text-primary-color2 space-x-3">
                <Phone className="text-gray-300  w-6 h-6 mx-2" />
                <p className="cursor-pointer md:text-xl font-semibold">
                  +442032900440
                </p>
              </div>
              <div className="flex items-center transition-all duration-200 hover:text-primary-color2">
                <MapPin className="text-gray-300 w-8  h-8 mx-2" />
                <p className="cursor-pointer md:text-xl font-semibold  md:max-w-[400px]">
                  27 Old Gloucester Street, WC1N 3AX, London, United Kingdom
                </p>
              </div>

              {/* البريد الإلكتروني */}
              <div className="flex items-center space-x-3 transition-all duration-200 hover:text-primary-color2">
                <Mail className="text-gray-300 w-6 h-6 mx-2" />
                <p className="cursor-pointer md:text-xl font-semibold ">
                  Info@yorkacademy.uk
                </p>
              </div>
            </div>

            <ContactUsForm />
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default Page;
