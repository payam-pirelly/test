import { Grid } from "@mui/material";
import React from "react";
import { Box, Container as MUIContainer } from "@mui/system";
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

  const handleOnClick = () => {
    var fullscreenId = document.getElementById("fullscreen");
    // enterFullScreen(fullscreenId);
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

  const { height } = ShowWindowDimensions();
  return (
    <>
      <Box
        id="fullscreen"
        component="main"
        height={height}
        display={"flex"}
        alignItems={"center"}
        sx={{
          flexGrow: 1,
        }}
      >
        <MUIContainer maxWidth={"100%"} sx={{ height: "100%", width: "100%" }}>
          <Grid
            container
            sx={{ flex: "1 1 auto", height: "100%" }}
            justifyContent={"center"}
          >
            {renderContent}
          </Grid>
        </MUIContainer>
      </Box>
    </>
  );
}
