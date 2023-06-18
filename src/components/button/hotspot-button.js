import React from "react";
import { styled } from "@mui/material/styles";
import HotspotIcon from "../icon/hotspot-icon";
import { Box, Switch, Typography, useTheme } from "@mui/material";

const HotSpotButtonStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: theme.spacing(2),
  height: "2.938rem",
  width: "10.875rem",
  alignItems: "center",
  opacity: 0.9,
  justifyContent: "space-evenly",
  [theme.breakpoints.down("sm")]: {
    height: "1.938rem",
    width: "7.875rem",
  },
}));

export default function HotspotButton({ index, checked, onChange }) {
  const theme = useTheme();

  return (
    <HotSpotButtonStyle
      sx={{
        background: (theme) =>
          index === 0
            ? theme.palette.primary.main
            : theme.palette.primary.darkest,
      }}
    >
      <HotspotIcon
        style={{
          fontSize: "small",
          marginLeft: 1,
        }}
      />
      <Typography
        sx={{
          [theme.breakpoints.down("sm")]: {
            fontSize: ".7rem ",
          },
        }}
        color={theme.palette.secondary.main}
        ml={-1}
      >
        Hotspot
      </Typography>
      <Switch
        checked={checked}
        size="small"
        color="secondary"
        onChange={onChange}
      />
    </HotSpotButtonStyle>
  );
}
