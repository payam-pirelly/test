import { SvgIcon } from "@mui/material";
import React from "react";

export default function LeftIcon({ ...props }) {
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
        fill="url(#paint0_linear_153_1025)"
      />
      <path
        d="M27.6093 31.7922L20.8843 25.0672C20.684 24.8668 20.5714 24.5951 20.5714 24.3117C20.5714 24.0283 20.684 23.7566 20.8843 23.5562L27.6093 16.8312L27.6093 31.7922Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_153_1025"
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
