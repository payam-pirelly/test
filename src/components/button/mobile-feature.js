import { Box, Switch, Typography, useTheme } from "@mui/material";
import React from "react";
import Fab from "./fab";
import SettingIcon from "../icon/setting-icon.js";
import { styled } from "@mui/material/styles";
import HotspotIcon from "../icon/hotspot-icon";

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

const MobileFeatureStyle = styled(Box)(({}) => ({
  top: "1rem",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  left: "0rem",
  justifyContent: "space-around",
  zIndex: 1,
}));

export default function MobileFeature() {
  const theme = useTheme();

  return (
    <MobileFeatureStyle>
      <HotSpotButtonStyle
        sx={{
          background: (theme) => theme.palette.primary.main,
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
        <Switch checked={false} size="small" color="secondary" />
      </HotSpotButtonStyle>
      <Fab
        style={{ top: 10, width: 30, height: 30 }}
        color={"primary"}
        icon={<SettingIcon fontSize="smaller" />}
      />
    </MobileFeatureStyle>
  );
}
