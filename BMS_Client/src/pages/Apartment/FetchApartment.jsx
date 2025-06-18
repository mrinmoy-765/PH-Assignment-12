import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ApartmentCard from "./ApartmentCard";
import Pagination from "../../components/Pagination";
import Drawer from "../../components/Drawer";


const ITEMS_PER_PAGE = 6;

const FetchApartment = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  



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
      <Drawer/>
      
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
