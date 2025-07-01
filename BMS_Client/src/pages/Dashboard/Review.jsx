import React from "react";
import reviewImage from "../../assets/review.jpg";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Mutation for submitting review
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axiosSecure.post("/reviews", data);
        if (res.status === 200 || res.status === 201) {
          return res.data;
        } else {
          throw new Error("Review not saved");
        }
      } catch (err) {
        throw err; // triggers onError
      }
    },
    onSuccess: () => {
      reset();
      Swal.fire("Thank you for your feedback! ✅", "", "success");
      navigate("/dashboard/review");
    },
    onError: () => {
      toast.error("Something went wrong! ❌");
    },
  });

  const onSubmit = (data) => {
    const reviewData = {
      review: data.review,
      name: user?.displayName || "Anonymous",
      photo: user?.photoURL || "https://i.ibb.co/8d3TnFD/default-avatar.png",
      email: user?.email || "unknown@example.com",
      date: new Date(),
    };
    mutate(reviewData);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center p-6 gap-8 max-w-5xl mx-auto h-[80vh] mt-10 lg:mt-0">
      {/* Form Section */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5C5470] lora">
          Your feedback helps us to improve
        </h2>
        <p className="text-[#b2a9c1] playwrite-de-grund-font">
          Let us know what you think. We're always looking to improve our
          services. 🚀
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <textarea
              {...register("review", {
                required: "Please write something to submit.",
              })}
              id="review"
              name="review"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5C5470] work-sans"
              placeholder="Write your thoughts here..."
            ></textarea>
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#5C5470] text-white px-6 py-2 rounded-lg hover:bg-[#352F44] transition duration-200 work-sans"
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={reviewImage}
          alt="Review Illustration"
          className="w-full h-auto rounded-xl shadow-md"
        />
      </div>
    </div>
  );
};

export default Review;

