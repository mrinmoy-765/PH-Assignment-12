import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAgreement = () => {
  const { mongoUser } = useAuth();
  const AxiosSecure = useAxiosSecure();

  const query = useQuery({
    enabled: !!mongoUser?.uid,
    queryKey: ["agreements", mongoUser?.uid],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/get-agreements/${mongoUser.uid}`);
      return res.data;
    },
  });

  return query;
};

export default useAgreement;
