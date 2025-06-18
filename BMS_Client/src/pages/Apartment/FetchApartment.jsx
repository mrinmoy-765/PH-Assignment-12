import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ApartmentCard from "./ApartmentCard";
import Pagination from "../../components/Pagination";
import { FaFilter } from "react-icons/fa";
import SortDropdown from "../../components/SortDropdown";
import CustomRangeSlider from "../../components/CustomSlider";

const ITEMS_PER_PAGE = 6;

const FetchApartment = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (order) => {
    setSortOrder(order);
    // apply your sorting logic here
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["apartments", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/apartments?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading apartments...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const { result: apartments, totalCount } = data;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-end">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn bg-[#5C5470] drawer-button mt-1.5 mr-6 text-white text-lg work-sans"
          >
            <FaFilter />
            Filter
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <h1 className="pacifico-regular md:text-xl lg:text-3xl text-[#5C5470]">
              Heaven Craft
            </h1>

            <div className="mt-2">
              {/* sorting dropdown */}
              <SortDropdown onSortChange={handleSortChange} />

              {/* Range Slider */}
              <div className="mt-8">
               <CustomRangeSlider/> 
              </div>

              {/* checkbox */}
              <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-auto border p-4 mt-3">
                <legend className="fieldset-legend text-base text-[#5C5470] work-sans">
                  Availability
                </legend>
                <label className="label work-sans">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  All
                </label>
                <label className="label work-sans">
                  <input type="checkbox " className="checkbox" />
                  Available
                </label>
                <label className="label work-sans">
                  <input type="checkbox" className="checkbox" />
                  Rented out
                </label>
              </fieldset>
            </div>
          </ul>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6 py-4">
        {apartments.map((apt) => (
          <ApartmentCard key={apt.apartment_no} apartment={apt} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default FetchApartment;
