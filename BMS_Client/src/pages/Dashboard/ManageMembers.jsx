import React from "react";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/people`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error:{error.message}</p>;
  if (!data || data.length === 0) return <p>No members found</p>;


  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((people) => (
              <tr key={people._id}>
                <th></th>
                <td>
                  <img
                    src={people.photoUrl}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{people.name}</td>
                <td>{people.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
