import React from "react";
import image1 from "../../assets/image1.webp";
import gallery2 from "../../assets/gallery2.webp";
import gallery3 from "../../assets/gallery3.jpg";
import gallery5 from "../../assets/gallery5.jpg";
import gallery6 from "../../assets/gallery6.jpg";
import gallery7 from "../../assets/gallery7.jpg";
import gallery8 from "../../assets/gallery8.webp";
import gallery9 from "../../assets/gallery9.webp";
import gallery10 from "../../assets/gallery10.webp";
import gallery11 from "../../assets/gallery11.webp";
import living_room from "../../assets/living-room.png";

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="grid gap-4">
        {/* image1 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={image1}
            alt="Gallery"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>

        {/* gallery2 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery2}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>

        {/* gallery3 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery3}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>
      </div>

      <div className="grid gap-4">
        {/* gallery5 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery5}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>

        {/* gallery6 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery6}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>

        {/* living_room */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={living_room}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>
      </div>

      <div className="grid gap-4">
        {/* gallery7 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery7}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>

        {/* gallery8 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery8}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>

        {/* gallery9 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery9}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>
      </div>

      <div className="grid gap-4">
        {/* gallery10 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery10}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>

        {/* gallery11 */}
        <div className="relative group rounded-lg overflow-hidden">
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={gallery11}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50 z-10 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
