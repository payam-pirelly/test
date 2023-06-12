import React from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

const HotSpotStyle = styled("svg")(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "fixed",
  pointerEvents: "none",
  top: 0,
  left: 0,
  zIndex: -1,
}));

export default function LineTo({
  firstHotSpotPosition,
  secondHotSpotPosition,
  reload,
}) {
  const theme = useTheme();
  if (reload)
    return (
      <HotSpotStyle>
        <line
          x1={secondHotSpotPosition?.x}
          y1={secondHotSpotPosition?.y}
          x2={firstHotSpotPosition?.x}
          y2={firstHotSpotPosition?.y}
          stroke={theme.palette.secondary.main}
        >
          <animate
            attributeName="x1"
            attributeType="XML"
            from={firstHotSpotPosition?.x}
            to={secondHotSpotPosition?.x}
            dur="0.5s"
          />
          <animate
            attributeName="y1"
            attributeType="XML"
            from={firstHotSpotPosition?.y}
            to={secondHotSpotPosition?.y}
            dur="0.5s"
          />
        </line>
      </HotSpotStyle>
    );
}

LineTo.propTypes = {
  firstHotSpotPosition: PropTypes.object.isRequired,
  secondHotSpotPosition: PropTypes.object.isRequired,
};
