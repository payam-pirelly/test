import { Box, IconButton, Tooltip } from "@mui/material";
import React360Viewer from "./360-viewer";
import { useSelector } from "react-redux";
import { useRef } from "react";
import ShowWindowDimensions from "../../utils/resize";

const basePath = "https://fastly-production.24c.in/webin/360";

export default function ThreeSixtyView() {
  const ref = useRef();
  const cars = useSelector((state) => state.car?.car);
  const { isHotspot } = useSelector((state) => state.car);

  const { width } = ShowWindowDimensions();

  return (
    <React360Viewer
      width={width}
      amount={75}
      imagePath={basePath}
      fileName="output_{index}.jpeg"
      boxShadow
      spinReverse
      // autoplay
      buttonClass="light"
      isHotspot={isHotspot}
    />
  );
}
