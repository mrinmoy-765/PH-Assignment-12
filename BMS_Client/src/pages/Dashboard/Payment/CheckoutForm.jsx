import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAgreement from "../../../hooks/useAgreement";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const { data: agreements = [] } = useAgreement();
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

  useEffect(() => {
    if (rent > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: rent })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [rent, axiosSecure]);

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
          Amount: rent,
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
          <span className="font-semibold">Rent Amount:</span> ৳{rent}
        </p>
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
          Pay ৳{rent}
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
