import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/getReview");
      return res.data;
    },
  });

  return (
    <div className="bg-gray-50 py-12 px-4">
      <h1 className="text-center text-4xl lora text-[#5C5470]">
        What Our Tenants Say
      </h1>
      <p className="text-center mt-3 text-lg work-sans text-[#9282a6]">
        Discover how RentNest has transformed the rental experience for our
        valued tenants.
      </p>

      {isLoading ? (
        <p className="text-center mt-10 text-gray-500">Loading reviews...</p>
      ) : (
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4"
            >
               <div className="flex text-[#DBD8E3]">
                     <FaStar /><FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar />
               </div>
              <p className="text-[#5C5470] text-base work-sans">
                “{review.review}”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border border-[#5C5470]"
                />
                <div>
                  <h3 className=" text-[#5C5470] work-sans">
                    {review.name}
                  </h3>
                  <p className="text-[.8rem] text-gray-500 open-sans">{review.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
