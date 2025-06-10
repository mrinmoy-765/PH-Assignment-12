import React from "react";
import ourStory from "../assets/our_story.png";

const OurStory = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 p-6 ">
      <div className="basis-full md:basis-1/3 flex justify-center md:justify-start">
        <img
          src={ourStory}
          alt="Our Story"
          className="w-[275px] h-[357px] object-cover rounded-md"
        />
      </div>
      <div className="basis-full md:basis-2/3 lg:mt-10">
        <p className="text-lg font-semibold mb-4 lg:mb-6 md:mb-6  text-[#5C5470] lora">
          Our Story
        </p>
        <h1 className="text-2xl font-bold text-[#352F44] leading-relaxed playwrite-de-grund-font">
          Heaven Craft offers a unique experience with our stylish urban
          apartment rentals. Situated in the heart of the city, our
          accommodations blend modern amenities with cozy aesthetics. Each unit
          is carefully curated with unique decor and local artwork, providing a
          comfortable and culturally rich stay for travelers seeking a home away
          from home.
        </h1>
      </div>
    </div>
  );
};

export default OurStory;
