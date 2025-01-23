// File: src/app/(root)/contact-us/page.tsx
"use client";
import Map from "@/components/Map";
import { fetchContactUsData } from "@/lib/action/root_action";
import {
  contactUsImage,
  ContactUsImageKey,
  isContactUsImageKey,
} from "@/lib/utils";
import Image from "next/image";

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

  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="contact-us-bg h-[80vh] flex items-center justify-center">
        <h1 className="custom-title">Contact Us</h1>
      </div>

      {/* Contact Cards Section */}
      <div className="container px-8 py-12 my-4 items-center space-y-2 md:mx-auto md:grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactUsData.map((item) => {
          // Validate that item.type.type is a valid key for contactUsImage
          if (isContactUsImageKey(item.type.type)) {
            return (
              <Card
                key={item.id}
                image={contactUsImage[item.type.type]}
                type={item.type.type}
                content={item.content}
              />
            );
          } else {
            console.warn(`Invalid type: ${item.type.type}`);
            return null;
          }
        })}
      </div>

      {/* Map Section */}
      <div className="w-[70vw] mx-auto text-center my-14">
        <h1 className="text-2xl text-primary-color1 mb-8 font-semibold">
          Our Location
        </h1>
        <div className="w-[80%] mx-auto">
          <Map />
        </div>
      </div>
    </main>
  );
};

export default Page;
