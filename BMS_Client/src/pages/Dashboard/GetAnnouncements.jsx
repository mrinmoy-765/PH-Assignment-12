import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns"; // Optional for formatting

const GetAnnouncements = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getannoucements`);
      return res.data; // array of announcements
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-600">Error: {error.message}</p>;
  if (!data || data.length === 0) return <p className="text-center">No announcements found.</p>;

  return (
    <div className="px-4 py-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-3">
      {data.map((announcement) => (
        <div key={announcement._id} className="card w-full bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg text-[#5C5470] lora">{announcement.title}</h2>
            <p className="text-sm text-gray-600 mb-2 work-sans">
              {announcement.description}
            </p>
            <p className="text-xs text-[#9c8fc0] font-bold">
              Posted on:{" "}
              {announcement.createdAt
                ? format(new Date(announcement.createdAt), "PPpp")
                : "Unknown"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetAnnouncements;

