"use client";
import Card from "@/components/cards/Card";
import { courseData, venues } from "@/constants";

interface Props {
  params: { id: number };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const venue = venues[id - 1];
  console.log(venue);

  // Check if venue exists
  if (!venue) {
    return (
      <main className="h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">Venue not found</h1>
      </main>
    );
  }

  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div
        className="h-[80vh] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${venue.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="custom-title text-white text-4xl font-bold">
          {venue.title}
        </h1>
      </div>
      {/*  */}
      <div className="container mx-auto my-6">
        <div className="p-4">
          <h1 className="p-2 my-8 pl-6 border-l-4 border-primary-color2 text-primary-color1 text-xl md:text-2xl font-semibold">
            {venue.title}
          </h1>
          <p className="text-gray-700 space-y-6 ">{venue.description}</p>
        </div>
        <div className="w-full my-8">
          <Card {...courseData} />
        </div>
      </div>
    </main>
  );
};

export default Page;
