import { Backdrop, Box, Button, Fade, IconButton } from "@mui/material";
import React from "react";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";

import { styled } from "@mui/material/styles";
import HotspotCard from "./hotspot-card";
import { useDispatch, useSelector } from "react-redux";
import {
  carHotSpotCardOpenToggled,
  toggledFirstHotSpotPosition,
  carHotSpotEnableSet,
  toggledSecondHotSpotPosition,
  carHotSpotCardStatusSet,
} from "../../redux/car-slice";
import CloseIcon from "../../components/icon/close-icon";

const PButton = styled(Button)(({ theme }) => ({
  background: "#1E1E1E",
  "&:hover": {
    background: "#1E1E1E !important",
  },
}));

export default function HotspotDetail() {
  const {
    carHotSpotCardStatus,
    secondHotSpotPosition,
    carHotSpotCardOpen,
    carHotSpotPositions,
    currentCarHotSpotIndex,
  } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(carHotSpotCardStatusSet(2));
  };

  const handleClose = () => {
    dispatch(toggledFirstHotSpotPosition({ undefined }));
    dispatch(toggledSecondHotSpotPosition({ undefined }));
    dispatch(carHotSpotCardOpenToggled());
    dispatch(carHotSpotEnableSet(true));
  };

  const getHotSpotClosePosition = () => {
    const value = carHotSpotPositions?.find(
      (car) => car?.id === currentCarHotSpotIndex
    );
    return value;
  };

  const tooltip = (
    <Fade in={true}>
      <Box
        sx={{
          position: "absolute",
          left: secondHotSpotPosition?.x + 30,
          top: secondHotSpotPosition?.y - 30,
          display: "grid",
          gap: 1,
        }}
      >
        <PButton
          onClick={handleClick}
          variant="contained"
          size="small"
          endIcon={<NorthEastRoundedIcon />}
        >
          Bluetooth Technology
        </PButton>
        <PButton
          onClick={handleClick}
          variant="contained"
          size="small"
          endIcon={<NorthEastRoundedIcon />}
        >
          Lane Departure Warning
        </PButton>
        <PButton
          onClick={handleClick}
          variant="contained"
          size="small"
          endIcon={<NorthEastRoundedIcon />}
        >
          Heated Steering Wheel
        </PButton>
      </Box>
    </Fade>
  );

  const handleContent = () => {
    switch (carHotSpotCardStatus) {
      case 1:
        return tooltip;
      case 2:
        return (
          <HotspotCard
            onClose={handleClose}
            closePosition={getHotSpotClosePosition()}
          />
        );
      default:
        break;
    }
  };

  const handleClosePosition = () => {
    return (
      <IconButton
        sx={{
          zIndex: (theme) => theme.zIndex.tooltip,
          position: "absolute",
          left: getHotSpotClosePosition()?.x,
          top: getHotSpotClosePosition()?.y,
          padding: 0,
        }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    );
  };

  if (carHotSpotCardOpen)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        // onClick={handleClose}
      >
        {handleClosePosition()}
        {handleContent()}
      </Backdrop>
    );
}
