import React from "react";
import image1 from "../assets/image1.webp";
import gallery2 from "../assets/gallery2.webp";
import gallery3 from "../assets/gallery3.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.jpg";
import gallery8 from "../assets/gallery8.webp";
import gallery9 from "../assets/gallery9.webp";
import gallery10 from "../assets/gallery10.webp";
import gallery11 from "../assets/gallery11.webp";

import living_room from "../assets/living-room.png";

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="grid gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={image1}
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center "
            src={gallery2}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={gallery3}
            alt="gallery-photo"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={gallery5}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={gallery6}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center "
            src={living_room}
            alt="gallery-photo"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={gallery7}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center "
            src={gallery8}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={gallery9}
            alt="gallery-photo"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={gallery10}
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={gallery11}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
