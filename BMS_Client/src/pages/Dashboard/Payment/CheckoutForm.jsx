import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAgreement from "../../../hooks/useAgreement";
import useCoupon from "../../../hooks/UseCoupon";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const { data: agreements = [] } = useAgreement();
  const { data: coupons = [], isLoading, isError } = useCoupon();

  const [baseRent, setBaseRent] = useState(0);
  const [discountedRent, setDiscountedRent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [selectedCoupon, setSelectedCoupon] = useState(null); // store coupon object

  const rent = agreements[0]?.rent || 0;
  const apartment = agreements[0]?.apartment_no || "";
  const name = agreements[0]?.name || "";
  const email = agreements[0]?.email || "";

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState("Choose Month ⬇️");
  // const [selectedCoupon, setSelectedCoupon] = useState("Select Coupon ⬇️");

  useEffect(() => {
    if (agreements.length > 0) {
      const rentAmount = agreements[0]?.rent || 0;
      setBaseRent(rentAmount);
      setDiscountedRent(rentAmount);
      setDiscountAmount(0);
    }
  }, [agreements]);

  useEffect(() => {
    if (discountedRent > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: discountedRent })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [discountedRent, axiosSecure]);

  const handleSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleCoupon = (coupon) => {
    setSelectedCoupon(coupon);

    const discount = (baseRent * parseFloat(coupon.percentage)) / 100;
    const updatedRent = baseRent - discount;

    setDiscountAmount(discount.toFixed(2));
    setDiscountedRent(updatedRent.toFixed(2));
  };

  const removeCoupon = () => {
    setSelectedCoupon(null);
    setDiscountAmount(0);
    setDiscountedRent(baseRent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error:", confirmError);
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}`,
        });
        // Optional: redirect or further DB logic
        const payment = {
          email: user.email,
          name: user.displayName,
          UserId: user.uid,
          Rent: rent,
          Coupon: selectedCoupon,
          Amount_Paid: discountedRent,
          Rent_Month: selectedMonth,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        if (res.data?.paymentResult?.insertedId) {
          toast.success("Check Payment History for Transaction Details");
          navigate("/dashboard/payment-history");
        }
      }
    }

    if (isLoading) return <p>Loading coupons...</p>;
    if (isError) return <p>Failed to load coupons.</p>;
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#5C5470]">
        Rent Payment
      </h2>

      {/* Display Info */}
      <div className="space-y-2 text-sm text-gray-700 mb-6">
        <p>
          <span className="font-semibold">Name:</span> {name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">Apartment No:</span> {apartment}
        </p>
        <p>
          <span className="font-semibold">Rent (Original):</span> ৳{baseRent}
        </p>
        {selectedCoupon && (
          <>
            <p>
              <span className="font-semibold">Coupon Applied:</span>{" "}
              {selectedCoupon.code} - {selectedCoupon.percentage}%
            </p>
            <p>
              <span className="font-semibold">Discount:</span> -৳
              {discountAmount}
            </p>
          </>
        )}
        <p className="font-bold text-lg text-[#5C5470]">
          Final Amount: ৳{discountedRent}
        </p>
      </div>

      {/* month and coupons */}
      <div className="flex justify-start my-3.5">
        {/* month */}
        <div className="dropdown dropdown-bottom  dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            {selectedMonth}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {months.map((month) => (
              <li key={month}>
                <button onClick={() => handleSelect(month)}>{month}</button>
              </li>
            ))}
          </ul>
        </div>
        {/* coupon */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            {selectedCoupon
              ? `${selectedCoupon.code} - ${selectedCoupon.percentage}%`
              : "Select Coupon ⬇️"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {coupons.map((coupon) => (
              <li key={coupon._id.$oid || coupon._id}>
                <button onClick={() => handleCoupon(coupon)}>
                  {coupon.code} - {coupon.percentage}%
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Remove coupon button */}
        {selectedCoupon && (
          <button
            onClick={removeCoupon}
            className="btn btn-warning mt-2"
            type="button"
          >
            Remove Coupon
          </button>
        )}
      </div>
      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        <div className="p-4 border rounded-md mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay ৳{discountedRent}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {transactionId && (
          <p className="text-green-600 mt-2">
            Your transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
