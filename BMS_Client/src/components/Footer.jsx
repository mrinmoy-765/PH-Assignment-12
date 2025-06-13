import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#2A2438] text-white py-16">
      <div className="px-6 sm:px-12">
        {/* First Half */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white pb-8">
          {/* Left: Brand */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold pacifico-regular">
              Heaven Craft
            </h1>
          </div>

          {/* Middle: Links */}
          <div className="mb-6 md:mb-0">
            <div className="flex flex-wrap justify-center gap-6 montserrat text-sm">
              <span className="cursor-pointer hover:underline">About Us</span>
              <span className="cursor-pointer hover:underline">Properties</span>
              <span className="cursor-pointer hover:underline">
                Rental Process
              </span>
              <span className="cursor-pointer hover:underline">
                Testimonials
              </span>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex gap-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-gray-300" />
            <FaInstagram className="cursor-pointer hover:text-gray-300" />
            <FaWhatsapp className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        {/* Second Half */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm pt-8 montserrat text-center md:text-left">
          <span>
            © 2025 Heaven Craft. All rights reserved. Contact us:
            info@heavencraft.com | (555) 123-4567
          </span>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:underline">
              Terms and Conditions
            </span>
            <span className="cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
