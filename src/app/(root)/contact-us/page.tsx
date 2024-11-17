"use client";
import Map from "@/components/Map";
import { contactUs } from "@/constants";
import Image from "next/image";

const Card = ({
  image,
  title,
  paragraph,
}: {
  image: string;
  title: string;
  paragraph: string;
}) => (
  <div className=" col-span-1 flex flex-col items-center space-y-2 border-2 border-gray-200 p-8 rounded-sm  h-60 shadow-xl hover:shadow-sm transition-all duration-200 ">
    <Image src={image} width={65} height={65} alt={title} />
    <h1 className="uppercase text-primary-color2 text-xl font-semibold">
      {title}
    </h1>
    <p className="text-gray-600  text-center text-sm">{paragraph}</p>
  </div>
);

const page = () => {
  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="contact-us-bg h-[80vh] flex items-center justify-center">
        <h1 className="custom-title">contract us</h1>
      </div>

      <div className="container px-8  py-12 my-4 items-center space-y-2 md:mx-auto md:grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactUs.map((item) => (
          <Card
            image={item.image}
            title={item.title}
            paragraph={item.paragraph}
          />
        ))}
      </div>
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

export default page;
