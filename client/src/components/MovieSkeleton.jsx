import React from "react";

const MovieSkeleton = ({ width }) => {
  return (
    <div
      className={`w-[${width}px] h-full flex-shrink-0 bg-gray-700 rounded-xl shadow animate-pulse overflow-hidden`}
      style={{ minWidth: width }}
    >
      <div className={`w-full h-[200px] bg-gray-800 rounded-xl`} />
      <div className="mt-2 h-4 w-3/4 bg-gray-800 rounded" />
      <div className="mt-1 h-3 w-1/2 bg-gray-800 rounded" />
    </div>
  );
};

export default MovieSkeleton;
