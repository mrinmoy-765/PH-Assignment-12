import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GrUserAdmin } from "react-icons/gr";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { MdRoomPreferences } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { TbUserStar } from "react-icons/tb";

const AdminDashboard = () => {
  const { mongoUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin-stats");
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  const {
    totalRooms = 0,
    availableRooms = 0,
    unavailableRooms = 0,
    totalUsers = 0,
    memberUsers = 0,
  } = stats || {};

  const availablePercentage = totalRooms
    ? ((availableRooms / totalRooms) * 100).toFixed(1)
    : 0;

  const unavailablePercentage = totalRooms
    ? ((unavailableRooms / totalRooms) * 100).toFixed(1)
    : 0;

  return (
    <div>
      <div className="badge badge-soft badge-accent mb-3.5">
        {mongoUser?.role} <GrUserAdmin className="text-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Rooms */}
        <StatCard title="Total Apartments" value={totalRooms} icon={<PiBuildingApartmentFill />} />

        {/* Available Rooms */}
        <StatCard title="Available Rooms (%)" value={`${availablePercentage}%`} icon={<MdMeetingRoom />} />

        {/* Unavailable Rooms */}
        <StatCard title="agreement/unavailable rooms (%)" value={`${unavailablePercentage}%`} icon={<MdRoomPreferences />} />

        {/* Total Users */}
        <StatCard title="Users" value={totalUsers} icon={<FaUserFriends />} />

        {/* Member Users */}
        <StatCard title="Members" value={memberUsers} icon={<TbUserStar />} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="card w-full bg-base-100 shadow-sm mt-3.5">
    <div className="card-body flex flex-row items-center justify-between">
      <div>
        <span className="text-4xl font-bold text-[#6c6482]">{value}</span>
        <p className="mt-1 text-[#5C5470]">{title}</p>
      </div>
      <div className="text-4xl text-[#5C5470]">{icon}</div>
    </div>
  </div>
);

export default AdminDashboard;

