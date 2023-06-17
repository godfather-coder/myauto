import React from "react";

const Wheel = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6.3"
        stroke="#9CA2AA"
        stroke-width="1.4"
      ></circle>
      <circle
        cx="8"
        cy="8"
        r="1.3"
        stroke="#9CA2AA"
        stroke-width="1.4"
      ></circle>
      <path
        d="M12 8a4 4 0 0 0-8 0"
        stroke="#9CA2AA"
        stroke-width="1.4"
        stroke-linecap="round"
      ></path>
      <path
        d="m9 7 1.5-1.5"
        stroke="#9CA2AA"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};

export default Wheel;
