import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements?status=pending");
      return res.data;
    },
  });

  const handleDecision = async (agreement, accept) => {
    try {
      // 1. Update agreement status to "checked"
      await axiosSecure.patch(`/agreements/${agreement._id}`, {
        status: "checked",
      });

      // 2. If accepted, update user role AND apartment availability
      if (accept) {
        // Update user role to "member"
        await axiosSecure.patch(`/users/role/${agreement.userId}`, {
          role: "member",
        });

        // Update apartment to is_available: false
        await axiosSecure.patch(
          `/apartments/${agreement.apartment_no}/availability`,
          {
            is_available: false,
          }
        );
      }

      Swal.fire(
        "Success",
        `Agreement ${accept ? "accepted" : "rejected"} successfully.`,
        "success"
      );

      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (requests.length === 0) return <p>No agreement requests at this time.</p>;

  {
    isLoading && <p>Loading...</p>;
  }
  {
    isError && error?.response?.status === 403 && (
      <p className="text-red-500">Forbidden: You are not an admin.</p>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="table table-zebra w-full text-[#5C5470]">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>DP</th>
            <th>User</th>
            <th>Email</th>
            <th>Apartment Image</th>
            <th>Apartment No</th>
            <th>Floor</th>
            <th>Block</th>
            <th>Rent</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {requests.map((req, index) => (
            <tr key={req._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={req.user_image}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>
                <img src={req.image} alt="user" className="w-auto h-15" />
              </td>
              <td>{req.apartment_no}</td>
              <td>{req.floor_no}</td>
              <td>{req.block_name}</td>
              <td>{req.rent} BDT</td>
              <td>{moment(req.createdAt).format("LL")}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleDecision(req, true)}
                  className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(req, false)}
                  className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgreementRequest;
