import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApartmentCard = ({ apartment }) => {
  const axiosSecure = useAxiosSecure();
  const {
    apartment_no,
    block_name,
    floor_no,
    rent,
    image,
    description,
    is_available,
  } = apartment;

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const apartmentDetails = [
    { label: `Apartment no: ${apartment_no}` },
    { label: `Block: ${block_name}` },
    { label: `Floor: ${floor_no}` },
    { label: `Rent: BDT ${rent}` },
  ];

  const handleAgreement = () => {
    //validate if appartment is available or not
    if (is_available === false) {
      Swal.fire({
        title: "This Apartment is not available for Agreement.",
        text: "Please try another Apartment.",
        icon: "warning",
        customClass: {
          popup: "my-swal-popup",
          title: "my-swal-title",
          htmlContainer: "my-swal-text",
          confirmButton: "my-swal-button",
        },
      });
      return;
    }

    if (user && user.email) {
      //send agreement details in database
      const agreementItem = {
        email: user.email,
        name: user.name,
        apartment_no,
        block_name,
        floor_no,
        rent,
        image,
        status: "pending",
      };
      axiosSecure.post("/agreement", agreementItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success(
            <span>
              Apartment <b>{apartment_no}</b> is requested for Agreement
            </span>
          );
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to make an Agreement?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //   send the user to the login page
          navigate("/signIn", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="group card max-w-sm w-full bg-base-100 shadow-sm mx-auto transform transition duration-300 hover:scale-105">
      <div className="card-body">
        <span className="badge badge-xs badge-warning mb-2">
          {apartment_no} - Block {block_name}
        </span>

        <div className="flex justify-between items-center mb-2">
          <h2
            className={`text-2xl font-bold work-sans ${
              is_available ? "text-green-600" : "text-red-600"
            }`}
          >
            {is_available ? "Available" : "Rented out"}
          </h2>
          <span className="text-base montserrat text-[#5C5470] ">
            BDT {rent}
          </span>
        </div>

        {/* Image wrapper with hover effects */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-md">
          <img
            src={image}
            alt="apartment"
            className="w-full h-full object-cover transition duration-300 group-hover:blur-[.50px]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/50 opacity-0 group-hover:opacity-100 transition duration-300" />
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {apartmentDetails.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-success mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-sm">{description}</p>

        <div className="mt-6">
          <button
            onClick={handleAgreement}
            className="btn bg-[#5C5470] btn-block text-white"
          >
            Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
