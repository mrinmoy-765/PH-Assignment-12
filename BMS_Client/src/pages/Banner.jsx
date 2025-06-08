import banner from "../assets/banner.jpeg";

const Banner = () => {
  return (
    <div className="relative h-[90vh] w-full">
      {/* Black overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/80 z-0"></div>

      {/* Background image */}
      <img
        src={banner}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay z-0"
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white  ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 lora">
          Welcome to Heaven Craft
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl playwrite-de-grund-font">
          Discover your perfect home with RentNest. From cozy apartments to
          spacious family homes, we offer a diverse range of rental properties
          to suit your needs. Experience seamless renting with our expert team.
        </p>
      </div>
    </div>
  );
};

export default Banner;
