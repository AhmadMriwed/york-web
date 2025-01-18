import LinkButton from "@/components/buttons/LinkButton";
import DefaultButton from "@/components/buttons/LinkButton";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from "@/components/ui/carousel";
import { Slider } from "@/types/rootTypes/rootTypes";
import React from "react";

type Props = {
  sliders: Slider[];
};

const Hero = ({ sliders }: Props) => {
  return (
    <main
      id="home"
      className="flex justify-center w-full mb-80 md:mb-4  items-center  h-[calc(100%_-_125px)]  md:px-[50px] relative"
    >
      <Carousel className="w-full">
        <CarouselContent className=" w-full realtive">
          {sliders?.map((slider) => (
            <CarouselItem
              className="px-6 md:px-20 md:p-6 w-full"
              key={slider.id}
            >
              <div className="flex aspect-square w-full flex-col items-center justify-center dark:border-zinc-800">
                <h1 className="animation text-white  mx-auto md:w-full mt-44 md:mt-0 lg:w-[815px] leading-[1.4] text-[23px] sm:text-[32px] md:text-[40px] font-semibold capitalize mb-[30px]">
                  {slider.title}
                </h1>
                <p className="animation text-[#c2c2c2]  mx-auto md:w-full lg:w-[815px]">
                  {slider.description}
                </p>
                <div className="animation my-5 md:w-full lg:w-[815px] flex items-center gap-4">
                  <LinkButton
                    text={slider.first_btn_text}
                    link={slider.first_btn_url}
                    className="border-2 border-primary-color2 bg-transparent text-xs md:text-base"
                  />
                  <LinkButton
                    text={slider.second_btn_text}
                    link={slider.second_btn_url}
                    className="text-xs md:text-base"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation className=" hidden md:absolute" />
        <CarouselIndicator className="md:mb-96" />
      </Carousel>
    </main>
  );
};

export default Hero;
