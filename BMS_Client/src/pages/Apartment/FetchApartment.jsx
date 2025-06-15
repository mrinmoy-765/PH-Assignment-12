import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ApartmentCard from './ApartmentCard';

const FetchApartment = () => {
  const axiosPublic = useAxiosPublic();

  const { data: apartments = [], isLoading, isError, error } = useQuery({
    queryKey: ['apartments'],
    queryFn: async () => {
      const response = await axiosPublic.get('/apartments');
      return response.data;
    },
  });

  if (isLoading) return <p>Loading apartments...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 items-center space-y-7 py-4">
      {apartments.map((apt) => (
        <ApartmentCard key={apt.apartment_no} apartment={apt} />
      ))}
    </div>
  );
};

export default FetchApartment;

