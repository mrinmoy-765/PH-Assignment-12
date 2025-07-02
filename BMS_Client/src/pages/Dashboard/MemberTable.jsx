import React from "react";
import PropTypes from "prop-types";

const MemberTable = ({ data, onRemove }) => {
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
              <th>Action</th>
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
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => onRemove(people._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

MemberTable.propTypes = {
  data: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default MemberTable;
