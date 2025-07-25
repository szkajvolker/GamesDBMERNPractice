import React from "react";

const Loading = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-green-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span
        className="
    !absolute !-m-px !h-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Loading...
      </span>
    </div>
  );
};

export default Loading;
