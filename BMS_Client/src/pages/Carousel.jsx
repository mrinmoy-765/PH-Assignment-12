import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery from "./Gallery";
import OurStory from "./OurStory";
import MeetHeavenCraft from "./MeetHeavenCraft";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="w-full max-w-screen overflow-hidden px-5 pb-9 pt-4">
      <Slider {...settings}>
        <div className="w-full h-full">
          {" "}
          {/* Adjust height as needed */}
          <OurStory />
        </div>
        <div className="w-full h-full">
          <Gallery />
        </div>
        <div className="w-full h-full">
          <MeetHeavenCraft />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
