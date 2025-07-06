import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const UseCoupon = () => {
  const { mongoUser } = useAuth();
  const AxiosSecure = useAxiosSecure();

  const query = useQuery({
    enabled: !!mongoUser?.uid,
    queryKey: ["availableCoupons", mongoUser?.uid],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/get-availableCoupons`);
      return res.data;
    },
  });

  return query;
};

export default UseCoupon;
