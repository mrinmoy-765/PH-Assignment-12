import { FaFilter } from "react-icons/fa";
import SortDropdown from "./SortDropdown";
import CustomRangeSlider from "./CustomSlider";
import SearchBar from "./SearchBar";
import SortCheckBox from "./sortCheckBox";

const Drawer = ({ onSortChange, onSearch, onCheckBoxClick }) => {
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
            <SortDropdown onSortChange={onSortChange} />

            {/* Search Bar */}
            <div className="mt-10">
              <div className="mt-10">
                <SearchBar onSearch={onSearch} />
              </div>
            </div>

            {/* Range Slider */}
            <div className="mt-8">
              <CustomRangeSlider />
            </div>

            {/* checkbox */}
            <SortCheckBox onCheckBoxClick={onCheckBoxClick} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
