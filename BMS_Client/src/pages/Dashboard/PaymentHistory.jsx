import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history/${user.uid}`);
      return res.data;
    },
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Payment History", 14, 15);

    const tableColumn = ["#", "Name", "Amount (৳)", "Transaction ID", "Date"];
    const tableRows = payments.map((p, index) => [
      index + 1,
      p.name,
      p.Amount,
      p.transactionId,
      new Date(p.date).toLocaleString(),
    ]);

    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 9 },
    });

    doc.save("payment_history.pdf");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="overflow-x-auto mt-12 work-sans text-[#5C5470] ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Payment History</h2>
        <button
          onClick={generatePDF}
          className="btn btn-sm bg-[#5C5470] text-white hover:bg-[#40394a]"
        >
          Download PDF
        </button>
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Name</th>
            <th>Rent (৳)</th>
            <th>Coupon Code - Percentage</th>
            <th>Amount Paid (৳)</th>
            <th>Rent Paid off</th>
            <th>Transaction ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr className="text-center" key={payment._id}>
              <td>{index + 1}</td>
              <td>{payment.name}</td>
              <td>{payment.Rent}</td>
              <td>
                {payment.Coupon.code}-{payment.Coupon.percentage}%
              </td>
              <td>{payment.Amount_Paid}</td>
              <td>{payment.Rent_Month}</td>
              <td className="text-xs break-all">{payment.transactionId}</td>
              <td>{new Date(payment.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
