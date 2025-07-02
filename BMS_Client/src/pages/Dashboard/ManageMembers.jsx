import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MemberTable from "./MemberTable";
import UserTable from "./UserTable";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 5;

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  const [isUser, setIsUser] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // reset page on new search
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const role = isUser ? "user" : "member";

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["people", role, debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/people?role=${role}&search=${debouncedSearch}`
      );
      return res.data;
    },
  });

  // Calculate pagination
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data?.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRemove = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This member will be removed and turned into a user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/people/${id}`, {
          role: "user",
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire("Removed!", "User role updated.", "success");
          // refetch members
          refetch();
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-4 work-sans text-[#5C5470]">
      {/* Responsive: reverse for mobile */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 lg:mr-12">
        {/* Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="toggle"
            checked={isUser}
            onChange={() => setIsUser(!isUser)}
          />
          <span>{isUser ? "Viewing Users" : "Viewing Members"}</span>
        </div>

        {/* Search */}
        <label className="input input-bordered flex items-center gap-2 max-w-xs">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search"
            className="grow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Table */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && paginatedData?.length === 0 && (
        <p>No {role}s found</p>
      )}
      {!isLoading &&
        !isError &&
        paginatedData?.length > 0 &&
        (isUser ? (
          <UserTable data={paginatedData} />
        ) : (
          <MemberTable data={paginatedData} onRemove={handleRemove} />
        ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ManageMembers;
