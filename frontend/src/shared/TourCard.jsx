import React from "react";

const PackageCard = ({ tour, onBook }) => {
  const { photo, title, city, address, distance, price, maxGroupSize, desc } = tour;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white h-[420px] flex flex-col border border-sky-100 font-poppins">
      <img className="w-full h-40 object-cover" src={photo} alt={title} />
      <div className="px-6 py-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-sky-700 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-1">{city} | {address}</p>
          <p className="text-gray-500 text-xs mb-2">Distance: {distance} km | Max Group: {maxGroupSize}</p>
          <p className="text-gray-700 text-base mb-2">{desc.length > 80 ? desc.substring(0, 80) + "..." : desc}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-semibold text-sky-600">Rs. {price}</span>
          {onBook && (
            <button
              className="ml-2 px-4 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded text-sm font-semibold transition"
              onClick={onBook}
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
