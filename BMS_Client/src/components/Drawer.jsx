import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import SortDropdown from "./SortDropdown";
import CustomRangeSlider from "./CustomSlider";

const Drawer = () => {

    const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (order) => {
    setSortOrder(order);
    // apply your sorting logic here
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex justify-end">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn bg-[#5C5470] drawer-button mt-1.5 mr-6 text-white text-lg work-sans"
        >
          <FaFilter />
          Filter
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <h1 className="pacifico-regular md:text-xl lg:text-3xl text-[#5C5470]">
            Heaven Craft
          </h1>

          <div className="mt-2">
            {/* sorting dropdown */}
            <SortDropdown onSortChange={handleSortChange} />

            {/* Range Slider */}
            <div className="mt-8">
              <CustomRangeSlider />
            </div>

            {/* checkbox */}
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-auto border p-4 mt-3">
              <legend className="fieldset-legend text-base text-[#5C5470] work-sans">
                Availability
              </legend>
              <label className="label work-sans">
                <input type="checkbox" defaultChecked className="checkbox" />
                All
              </label>
              <label className="label work-sans">
                <input type="checkbox " className="checkbox" />
                Available
              </label>
              <label className="label work-sans">
                <input type="checkbox" className="checkbox" />
                Rented out
              </label>
            </fieldset>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
