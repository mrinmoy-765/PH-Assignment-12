import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://bms-server-flame.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
