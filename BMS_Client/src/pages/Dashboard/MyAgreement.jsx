import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyAgreement = () => {
  const { mongoUser, loading } = useAuth();
  const AxiosSecure = useAxiosSecure();

  const {
    data: agreements = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: !!mongoUser?.uid, // Ensures query only runs if user exists
    queryKey: ["agreements", mongoUser?.uid],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/get-agreements/${mongoUser.uid}`);
      return res.data;
    },
  });

  if (loading || isLoading) return <p>Loading Agreements...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Agreement</h2>
      {agreements.length === 0 ? (
        <p>No agreements found.</p>
      ) : (
        agreements.map((agreement) => (
          <div
            key={agreement._id}
            className="card lg:card-side bg-base-100 shadow-sm mt-5"
          >
            <figure>
              <img src={agreement.image} alt="Album" />
            </figure>
            <div className="card-body text-[#5C5470] work-sans">
              <h2 className="card-title  text-xl">
                Apartment No:{agreement.apartment_no}
              </h2>
              <h1>
                <strong>Block:</strong> {agreement.block_name}
              </h1>
              <h1>
                <strong>Floor:</strong> {agreement.floor_no}
              </h1>
              <h1>
                <strong>Rent:</strong> {agreement.rent}
              </h1>
              <h1>
                <strong>Status:</strong> {agreement.status}
              </h1>
              <br />
              <br />
              {agreement.decisionTime && (
                <h1>
                  <strong>Agreement Accepted Date:</strong>{" "}
                  {new Date(agreement.decisionTime).toLocaleString()}
                </h1>
              )}
              {agreement.decisionTime && (
                <h1>
                  <strong>Agreement Requested Date:</strong>{" "}
                  {new Date(agreement.createdAt).toLocaleString()}
                </h1>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAgreement;
