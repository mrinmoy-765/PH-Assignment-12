import React from "react";
import Lottie from "lottie-react";
import announcement from "../../assets/Animation/announcement.json";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const PostAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/announcements", formData);
      return res.data;
    },

    onSuccess: () => {
      reset(); // reset form
      toast.success("Announcement Posted");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-xl flex flex-col md:flex-row overflow-hidden">
        {/* Lottie animation */}
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center bg-[#F7F7FA] p-6 md:p-10">
          <Lottie
            animationData={announcement}
            className="w-full max-w-sm h-auto"
            style={{ maxHeight: "400px" }}
          />
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 order-2 md:order-1 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-[#5C5470] lora">
            Post an Announcement
          </h2>
          <p className="text-base text-[#8c7cb1] work-sans">
            Let your community stay informed! Add a title and detailed
            description below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full input-info"
              placeholder="Announcement Title"
            />
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full textarea-info resize-none"
              placeholder="Announcement Description"
              rows={5}
            />
            <button
              type="submit"
              className="btn btn-info w-full text-white"
              disabled={isPending}
            >
              {isPending ? "Posting..." : "Post Announcement"}
            </button>

            {isSuccess && (
              <p className="text-green-600 text-sm text-center">
                Announcement posted successfully!
              </p>
            )}
            {isError && <p className="text-red-600">Error: {error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAnnouncement;
