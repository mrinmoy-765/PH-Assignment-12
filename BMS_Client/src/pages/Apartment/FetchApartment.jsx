import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ApartmentCard from "./ApartmentCard";
import Pagination from "../../components/Pagination";
import Drawer from "../../components/Drawer";

const ITEMS_PER_PAGE = 6;

const FetchApartment = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sortOrder = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";
  const availability = searchParams.get("availability") || "all";
  const slider = parseInt(searchParams.get("slider")) || 22000;

  // Hooks must always be top-level
  const handleSlider = useCallback(
    (sliderValue) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("slider", sliderValue);
        newParams.set("page", 1);
        return newParams;
      });
    },
    [setSearchParams]
  );

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page);
      return newParams;
    });
  };

  const handleSortChange = (sortValue) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sortValue);
      newParams.set("page", 1); // Reset to page 1
      return newParams;
    });
  };

  const handleSearch = (searchTerm) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("search", searchTerm);
      newParams.set("page", 1);
      return newParams;
    });
  };

  const handleCheckBoxSort = (availabilityValue) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("availability", availabilityValue);
      newParams.set("page", 1);
      return newParams;
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "apartments",
      currentPage,
      sortOrder,
      search,
      availability,
      slider,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/apartments?page=${currentPage}&limit=${ITEMS_PER_PAGE}&sort=${sortOrder}&search=${search}&availability=${availability}&slider=${slider}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  // UI: Loading & Error Handling
  if (isLoading) return <p>Loading apartments...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !data.result) return <p>No apartments found.</p>;

  // Safe destructuring
  const { result: apartments, totalCount } = data;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <>
      <Drawer
        onSortChange={handleSortChange}
        onSearch={handleSearch}
        onCheckBoxClick={handleCheckBoxSort}
        onSlide={handleSlider}
        slider={slider} 
      />

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
