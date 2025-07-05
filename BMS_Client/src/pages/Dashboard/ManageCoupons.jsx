import React from "react";
import useAxiosecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const AxiosSecure = useAxiosecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const couponData = {
      code: data.code,
      percentage: data.percentage,
      description: data.description,
      available: "true",
    };

    // console.log(couponData);

    AxiosSecure.post("/generate-coupon", couponData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Coupon Generated Successfully");
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to generate Coupon");
      });
  };

  // Fetch all coupons
  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/get-coupons");
      return res.data;
    },
  });

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the coupon.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await AxiosSecure.delete(`/delete-coupon/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Coupon has been removed.", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) return <p>Loading coupons...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleToggleAvailability = async (id, currentValue) => {
    try {
      const res = await AxiosSecure.patch(`/coupon-availability/${id}`, {
        available: !currentValue,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Coupon availability changed.", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Could not update status.", "error");
    }
  };

  return (
    <div>
      {/* Modal */}
      <div className="flex justify-between lg:justify-end md:justify-end mr-15">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn bg-[#5C5470] text-white work-sans text-base"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          + New Coupon
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-[#5C5470] lora">
              Generate a Coupon
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 mt-3.5 open-sans text-[#5C5470]"
            >
              {/* Coupon Code */}
              <div className="space-y-1">
                <label
                  htmlFor="code"
                  className="block font-medium text-sm text-gray-700"
                >
                  Coupon Code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="Enter Coupon Code"
                  {...register("code", { required: "Coupon Code is required" })}
                  className="input input-bordered w-full"
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>

              {/* Coupon Percentage */}
              <div className="space-y-1">
                <label
                  htmlFor="percentage"
                  className="block font-medium text-sm text-gray-700"
                >
                  Coupon Percentage
                </label>
                <input
                  id="percentage"
                  type="number"
                  placeholder="Enter Coupon Percentage"
                  {...register("percentage", {
                    required: "Coupon percentage is required",
                    min: { value: 1, message: "Minimum is 1%" },
                    max: { value: 100, message: "Maximum is 100%" },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.percentage && (
                  <p className="text-sm text-red-500">
                    {errors.percentage.message}
                  </p>
                )}
              </div>

              {/* Coupon Description */}
              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="block font-medium text-sm text-gray-700"
                >
                  Coupon Description
                </label>
                <input
                  id="description"
                  type="text"
                  placeholder="Enter Coupon Description"
                  {...register("description", {
                    required: "Coupon description is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn py-4 text-white open-sans bg-[#5C5470] w-full"
              >
                Generate
              </button>
            </form>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6 work-sans text-[#5C5470]">
        <table className="table table-zebra">
          <thead className="text-[#5b5174]">
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Description</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.description}</td>
                <td>{coupon.percentage}%</td>
                <td>
                  <button
                    onClick={() =>
                      handleToggleAvailability(coupon._id, coupon.available)
                    }
                    className={`btn btn-xs text-white ${
                      coupon.available
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {coupon.available ? "Available" : "Discontinued"}
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-xs btn-error text-white"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
