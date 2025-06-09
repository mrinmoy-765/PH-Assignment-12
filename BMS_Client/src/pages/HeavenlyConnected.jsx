import React from "react";
import image1 from "../assets/image1.webp";

const HeavenlyConnected = () => {
  return (
    <div className="py-7 px-4">
      <div className="flex flex-col justify-between md:flex-row items-center lg:gap-6 gap-14">
        <img
          src={image1}
          alt="Living Room"
          className="w-[224px] h-[300px] object-cover rounded-lg shadow-md lg:ml-52 md:ml-36"
        />
        <div className="text-center md:text-left lg:mr-52 md:mr-44">
          <h1 className="text-6xl font-bold leading-tight pacifico-regular text-[#5C5470]">
            Heavenly <br />
            <span className="ml-24 block">Connected</span>
          </h1>
          <h2 className="text-lg text-gray-800 mt-2 roboto-mono">
            Stylish Urban Apartment Rentals
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeavenlyConnected;
