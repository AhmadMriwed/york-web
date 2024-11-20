"use client";
import Card from "@/components/cards/Card";
import { courseData, categories } from "@/constants";

interface Props {
  params: { id: number };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const category = categories[id - 1];
  console.log(category);

  // Check if category exists
  if (!category) {
    return (
      <main className="h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">category not found</h1>
      </main>
    );
  }

  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div
        className="h-[80vh] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${category.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className=" text-white text-3xl md:text-7xl font-bold">
          {category.title}
        </h1>
      </div>
      {/*  */}
      <div className="container mx-auto my-6">
        <div className="p-4">
          <h1 className="p-2 my-8 pl-6 border-l-4 border-primary-color2 text-primary-color1 text-xl md:text-2xl font-semibold">
            {category.title}
          </h1>
          <p className="text-gray-700 space-y-6 ">{category.description}</p>
        </div>
        <div className="w-full my-8">
          <Card {...courseData} />
        </div>
      </div>
    </main>
  );
};

export default Page;
