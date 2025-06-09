import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery from "./Gallery";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full max-w-screen overflow-hidden px-5 pb-9 pt-4">
      <Slider {...settings}>
        <div className="w-full">
          <Gallery />
        </div>
        <div className="w-full">
          <h3 className="text-center text-xl">This is it 2</h3>
        </div>
        <div className="w-full">
          <h3 className="text-center text-xl">This is it 3</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
