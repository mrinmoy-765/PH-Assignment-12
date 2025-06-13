import React from "react";
import HeavenCraftTeam from "../../assets/HeavenCraftTeam.webp";

const MeetHeavenCraft = () => {
  return (
    <div className="flex items-center gap-6 px-4 py-8 flex-wrap md:flex-nowrap max-w-screen-xl mx-auto">
      {/* text div */}
      <div className="w-full md:w-3/5 max-w-xl">
        <div>
          <h1 className="text-4xl font-bold leading-tight lora text-[#352F44]">
            Meet Heaven Craft
          </h1>
          <p className="mt-2 playwrite-de-grund-font">
            At HavenCraft, we are dedicated to transforming your living space
            into a dream home. Our mission is to provide exceptional home
            contracting services that enhance your quality of life through
            innovative design and sustainable practices.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-14">
          <div>
            <h1 className="text-2xl font-bold text-[#352F44]">
              500 properties
            </h1>
            <p className="text-sm mt-1 text-gray-800 montserrat">
              We have successfully managed a diverse portfolio of rental
              properties, ensuring quality and satisfaction for our tenants.
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#352F44]">
              200 happy tenants
            </h1>
            <p className="text-sm mt-1 text-gray-800 montserrat">
              Our tenants consistently express their satisfaction with our
              services, reflecting our commitment to excellence.
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#352F44]">
              3 team members
            </h1>
            <p className="text-sm mt-1 text-gray-800 montserrat">
              Our dedicated team consists of 3 skilled professionals, each
              bringing unique expertise to ensure your project is a success.
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-[#352F44]">100%</h1>
            <p className="text-sm mt-1 text-gray-800 montserrat">
              We pride ourselves on achieving a 100% customer satisfaction rate,
              ensuring that every client is happy with their new space.
            </p>
          </div>
        </div>
      </div>

      {/* image */}
      <div className="w-full md:w-2/5">
        <img
          src={HeavenCraftTeam}
          alt="HeavenCraft Team"
          className="w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default MeetHeavenCraft;
