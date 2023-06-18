import { Button, Card, CardContent, Grid, IconButton } from "@mui/material";
import React, { useRef } from "react";
import { Box, Container as MUIContainer } from "@mui/system";
import { useDispatch } from "react-redux";
import VerticalList from "./vertical-list";
import { toggledCarStatus, toggledCarTabIndex } from "../../redux/car-slice";
import ShowWindowDimensions from "../../utils/resize";
import Exterior360 from "./exterior-360";
import MobileFeature from "../../components/button/mobile-feature";

export default function MobileMain({ onClick }) {
  const { width } = ShowWindowDimensions();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggledCarStatus("carOut"));
    onClick();
    dispatch(toggledCarTabIndex(0));
  };

  const handleClickCarIn = () => {
    dispatch(toggledCarStatus("carOut"));
    onClick();
    dispatch(toggledCarTabIndex(1));
  };

  const ref = useRef();

  const clientWidth = ref?.current?.clientWidth;

  return (
    <Box display={"flex"} alignItems={"center"} overflow={"hidden"}>
      <MUIContainer maxWidth={"100%"}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: "none" }}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <MobileFeature />
                <Exterior360 />
                <Box position="absolute" bottom={"1%"} right={"1%"}>
                  <IconButton onClick={handleClick} sx={{ padding: 0 }}>
                    <img
                      src="images/360-powered-by-pirelly.svg"
                      alt="view360.svg"
                      width={width * 0.2}
                    />
                  </IconButton>
                </Box>
                <Box
                  ref={ref}
                  position={"absolute"}
                  bottom={0}
                  left={width / 2 - clientWidth / 2}
                  sx={{
                    lineHeight: "1rem",
                    background: (theme) => theme.palette.primary.darkest,
                    borderRadius: "20px",
                  }}
                >
                  <Button
                    onClick={handleClick}
                    sx={{ fontSize: "xx-small", background: "#1E1E1E59" }}
                    color="secondary"
                  >
                    Exterior
                  </Button>
                  <Button
                    onClick={handleClickCarIn}
                    sx={{ fontSize: "xx-small", background: "#1E1E1E59" }}
                    color="secondary"
                  >
                    Interior
                  </Button>
                </Box>
              </Box>
              <CardContent sx={{ padding: 0 }}>
                <VerticalList onClick={onClick} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MUIContainer>
    </Box>
  );
}
