import React from "react";
import CONCRETE_LIGHT from "../../assets/CONCRETE & LIGHT.jpeg";
import At_A_Galance from "../../assets/At_A_Galance.webp";

const AboutBuilding = () => {
  return (
    <div>
      {/* part-1 heading */}
      <div className="lg:ml-52 mt-9">
        <h1 className="text-5xl font-bold text-[#4f4a5a]  lora">
          Discover The Heaven Craft
        </h1>
        <br />
        <p className="text-[#352F44] Roboto Mono tracking-[0.3rem]">
          A LANDMARK IN MODERN LIVING
        </p>
        <p className="mt-5 italic pl-16 pr-32 text-gray-800 text-sm/6">
          "Poised at the intersection of innovation and comfort, The{" "}
          <span>Heaven Craft</span> is more than just an address—it's a
          statement. Conceived by the visionary architects at{" "}
          <a
            class="text-blue-600 text-base after:content-['_↗']"
            href="https://perkinswill.com/"
          >
            Perkins & Will
          </a>{" "}
          , our structure is a testament to what is possible when daring design
          meets meticulous craftsmanship. Every line, every material, and every
          space has been thoughtfully curated to create an unparalleled living
          experience in the heart of{" "}
          <span className="text-[#6447a8] font-semibold">
            Banani, Dhaka-1212
          </span>
          . From its iconic silhouette that reshapes the city skyline to the
          sun-drenched interiors of each private residence, this is a place
          designed not just for living, but for thriving."
        </p>
      </div>

      {/* div-2 A VISION IN CONCRETE & LIGHT */}
      <div className="max-w-screen-xl mx-auto mt-12 px-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#5C5470] via-[#DBD8E3] to-white rounded-lg shadow-md">
          {/* Gradient Left Border using a pseudo-element-like div */}
          <div className="absolute top-0 left-0 h-full w-[4px] bg-gradient-to-r from-[#4f4a5a] to-transparent z-10" />

          <div className="relative z-20 flex flex-wrap md:flex-nowrap items-center gap-6 p-9 pb-8">
            {/* text */}
            <div className="w-full md:w-3/5">
              <h1 className="text-3xl font-bold lora text-[#352F44] mb-4">
                A VISION IN CONCRETE & LIGHT
              </h1>
              <p className="mb-4 text-[#352F44] open-sans text-sm/6">
                Our architectural philosophy was simple: to build a sanctuary
                that breathes. The façade, a dynamic interplay of glass, brushed
                steel, and reclaimed brick, captures the shifting light of the
                day, creating an ever-changing canvas. Inside, you'll find
                spaces that flow seamlessly, with panoramic windows that frame
                breathtaking views of the city, the park, the waterfront and
                draw you into the vibrant tapestry of the world outside.
              </p>
              <p className="italic text-white playwrite-de-grund-font px-8 mt-9">
                "We didn't just want to build upwards; we wanted to build
                inwards, crafting a community where every detail enhances the
                art of living and fosters a true sense of belonging." - Donald
                Trump, Lead Architect
              </p>
            </div>

            {/* image */}
            <div className="w-full md:w-2/5 relative group overflow-hidden rounded-lg shadow-md">
              <img
                src={CONCRETE_LIGHT}
                alt="Concrete and Light"
                className="w-full h-[70vh] object-cover transition-all duration-500 group-hover:blur-[1.5px] group-hover:brightness-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* div-3 At A Glance */}
      <div className="max-w-screen-xl mx-auto my-12 px-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-white via-[#DBD8E3] to-[#5C5470] rounded-lg shadow-md">
          {/* Right Border Gradient */}
          <div className="absolute top-0 right-0 h-full w-[4px] bg-gradient-to-l from-[#4f4a5a] to-transparent z-10" />

          <div className="relative z-20 grid md:grid-cols-2 gap-6 p-9 pb-8">
            {/* image */}
            <div className="w-full relative group overflow-hidden rounded-lg shadow-md">
              <img
                src={At_A_Galance}
                alt="Concrete and Light"
                className="w-full h-[70vh] object-cover transition-all duration-500 group-hover:blur-[1.5px] group-hover:brightness-50"
              />
            </div>

            {/* text */}
            <div className="w-full flex flex-col justify-center items-end-safe">
              <h1 className="text-3xl font-bold lora  text-[#352F44] mb-4">
                AT A Glance
              </h1>
              <p className="mb-4 text-[#352F44] open-sans text-sm/6 max-w-md">
                For those who appreciate the finer details, here are the core
                specifications that define our home.
              </p>
              <ul className="list-disc text-[#352F44] space-y-1 open-sans text-sm max-w-md pr-4 pl-14">
                <li>
                  <span>YEAR COMPLETED:</span>{" "}
                  <span className="font-bold"> 2022</span>
                </li>
                <li>
                  ARCHITECTURAL STYLE:{" "}
                  <span className="font-bold">
                    Contemporary Modern, Industrial Chic
                  </span>
                  .
                </li>
                <li>
                  TOTAL RESIDENCES: <span className="font-bold">67 </span>
                </li>
                <li>STORIES: 27</li>
                <li>
                  KEY MATERIALS:{" "}
                  <span className="font-bold">
                    Italian Marble, Sustainable Timber, Bronze Accents
                  </span>
                </li>
                <li>
                  SIGNATURE FEATURE:{" "}
                  <span className="font-bold">
                    The Rooftop Infinity Pool, The Sky Garden, The Double-Height
                    Lobby
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-gray-700 lg:text-[#DBD8E3] max-w-md playwrite-de-grund-font font-bold">
                We invite you to explore the space where your new story begins.
                Welcome home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBuilding;
