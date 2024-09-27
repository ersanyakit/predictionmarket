import React from "react";

export const Energy = ({ height, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11.984"
    height={height}
    viewBox="0 0 11.984 21">
    <path
      id="bolt_FILL0_wght400_GRAD0_opsz48"
      d="M18.106,27a.617.617,0,0,1-.5-.2.6.6,0,0,1-.117-.525l1.079-7.5H14.315a.488.488,0,0,1-.467-.292.563.563,0,0,1,0-.554L20.76,6.379a.779.779,0,0,1,.292-.263A.817.817,0,0,1,21.46,6a.617.617,0,0,1,.5.2.6.6,0,0,1,.117.525L20.994,14.2h4.2a.518.518,0,0,1,.481.292.541.541,0,0,1,.015.554L18.806,26.621a.779.779,0,0,1-.292.262.817.817,0,0,1-.408.117Z"
      transform="translate(-13.775 -6)"
      fill={color}
    />
  </svg>
);

export const Search = () => (
  <svg
    aria-hidden="true"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);
