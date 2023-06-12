import { SvgIcon } from "@mui/material";
import React from "react";

export default function RightIcon({ ...props }) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <circle
        cx="24"
        cy="24"
        r="24"
        transform="matrix(1 0 0 -1 0 48)"
        fill="url(#paint0_linear_153_1027)"
      />
      <path
        d="M20.5714 31.7922L27.2964 25.0672C27.4967 24.8668 27.6093 24.5951 27.6093 24.3117C27.6093 24.0283 27.4967 23.7566 27.2964 23.5562L20.5714 16.8312L20.5714 31.7922Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_153_1027"
          x1="24"
          y1="0"
          x2="24"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1862E3" />
          <stop offset="1" stopColor="#0085FF" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}
