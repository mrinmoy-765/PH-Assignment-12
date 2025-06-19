import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ApartmentCard from "./ApartmentCard";
import Pagination from "../../components/Pagination";
import Drawer from "../../components/Drawer";

const ITEMS_PER_PAGE = 6;

const FetchApartment = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ Use URLSearchParams hook
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Read page and sortOrder from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sortOrder = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";
  const availability = searchParams.get("availability") || "all";


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["apartments", currentPage, sortOrder, search, availability],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/apartments?page=${currentPage}&limit=${ITEMS_PER_PAGE}&sort=${sortOrder}&search=${search}&availability=${availability}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading apartments...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const { result: apartments, totalCount } = data;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // ✅ Handle page change by updating URL param
  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page);
      return newParams;
    });
  };

  // ✅ Handle sort change by updating URL param
  const handleSortChange = (sortValue) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sortValue);
      newParams.set("page", 1); // reset to first page
      return newParams;
    });
  };

  // ✅ Handle search  by updating URL param
  const handleSearch = (searchTerm) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("search", searchTerm);
      newParams.set("page", 1);
      return newParams;
    });
  };

  // ✅ Handle checkbox sort by updating URL param
  const handleCheckBoxSort = (availabilityValue) => {
  setSearchParams((prev) => {
    const newParams = new URLSearchParams(prev);
    newParams.set("availability", availabilityValue);
    newParams.set("page", 1); // reset page to 1 after filtering
    return newParams;
  });
};


  return (
    <>
      <Drawer onSortChange={handleSortChange} onSearch={handleSearch} onCheckBoxClick={handleCheckBoxSort} />

      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6 py-4">
        {apartments.map((apt) => (
          <ApartmentCard key={apt.apartment_no} apartment={apt} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FetchApartment;
