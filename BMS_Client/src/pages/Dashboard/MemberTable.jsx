import React from "react";

const MemberTable = ({ data }) => {
  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-[#5b5174]">
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="text-[#5C5470]">
            {data.map((people, index) => (
              <tr key={people._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={people.image}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{people.name}</td>
                <td>{people.email}</td>
                <td className="badge badge-outline badge-accent mt-3.5">
                  {people.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;
