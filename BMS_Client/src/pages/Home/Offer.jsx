import React from "react";
import video from "../../assets/Video/3188887-hd_1920_1080_25fps.mp4";
import Lottie from "lottie-react";

const Offer = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl shadow-md">
      {/* Background video */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full h-full bg-black/50 text-white p-6 md:p-12 gap-10">
        {/* Left: Text content and Lottie */}
        <div className="w-full lg:w-1/2 space-y-11">
          <h2 className="text-4xl md:text-5xl font-extrabold pacifico-regular">
            Community <br />
            <span className="ml-24 block">Event Special</span>
          </h2>
          <p className="text-base md:text-lg mt-6 playwrite-de-grund-font">
            Get 15% off on community hall booking for any private event this
            season.
          </p>
          <p className="text-base md:text-lg mt-2 font-semibold open-sans block ml-20">
            Coupon Code:{" "}
            <span className="ml-2 font-normal montserrat">EVENT15</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
