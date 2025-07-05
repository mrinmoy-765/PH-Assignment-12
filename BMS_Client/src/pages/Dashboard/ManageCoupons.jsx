import React from "react";
import useAxiosecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ManageCoupons = () => {
  const AxioSecure = useAxiosecure();

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

    AxioSecure.post("/generate-coupon", couponData)
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
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
