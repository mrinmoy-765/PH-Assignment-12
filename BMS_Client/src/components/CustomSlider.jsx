import { useState, useEffect } from "react";

const CustomRangeSlider = ({ initialValue, onSlide }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  return (
    <div className="w-full px-4 py-2">
      <label className="block mb-4 text-[#5C5470] font-semibold work-sans">
        Rent Limit: <span className="text-xl">{value}</span>
      </label>
      <input
        type="range"
        min="0"
        max="27000"
        value={value} // use internal state
        onChange={handleChange} // update value on drag
        onMouseUp={() => onSlide(value)} // trigger on release
        onTouchEnd={() => onSlide(value)} // trigger on release (mobile)
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-[#5C5470] to-[#DBD8E3]"
        style={{
          backgroundSize: `${(value / 27000) * 100}% 100%`,
          backgroundRepeat: "no-repeat",
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 9999px;
          background: #5c5470;
          border: 3px solid white;
          margin-top: -11px; /* center the thumb */
          transition: 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #40394a;
        }
        input[type="range"]::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 9999px;
          background: #5c5470;
          border: 3px solid white;
          transition: 0.2s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #40394a;
        }
      `}</style>
    </div>
  );
};

export default CustomRangeSlider;
