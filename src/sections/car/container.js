import { Grid } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Main from "./main";
import CarOut from "./car-out";
import { toggledFullScreen } from "../../redux/car-slice";
import ShowWindowDimensions from "../../utils/resize";
import { enterFullScreen } from "../../utils/fullscreen";

export default function Container() {
  const { carStatus } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const { height, width } = ShowWindowDimensions();

  const handleOnClick = () => {
    // var fullscreenId = document.getElementById("fullscreen");
    enterFullScreen(document.documentElement);
    dispatch(toggledFullScreen(true));
  };

  const renderContent = useMemo(() => {
    switch (carStatus) {
      case "main":
        return <Main onClick={handleOnClick} />;
      case "carOut":
        return <CarOut />;
      default:
        return <>loading!!!</>;
    }
  }, [carStatus]);

  return (
    <>
      <Box
        id="fullscreen"
        component="main"
        height={height}
        width={width}
        display={"flex"}
      >
        <Grid container justifyContent={"center"}>
          {renderContent}
        </Grid>
      </Box>
    </>
  );
}
