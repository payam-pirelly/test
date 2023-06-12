import { Card, CardContent, Grid, IconButton } from "@mui/material";
import React from "react";
import { Box, Container as MUIContainer } from "@mui/system";
import { useDispatch } from "react-redux";
import CarVerticalList from "./car-vertical-list";
import { toggledCarStatus } from "../../redux/car-slice";
import ShowWindowDimensions from "../../utils/resize";

const imagePath = "https://fastly-production.24c.in/webin/360/output_1.jpeg";

export default function Main({ onClick }) {
  const { height, width } = ShowWindowDimensions();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggledCarStatus("carOut"));
    onClick();
  };

  return (
    <Box display={"flex"} alignItems={"center"} overflow={"hidden"}>
      <MUIContainer maxWidth={"100%"}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={8}>
            <Card sx={{ boxShadow: "none" }}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <img
                  src={imagePath}
                  style={{
                    maxHeight: height,
                    width: "100%",
                    borderRadius: 10,
                  }}
                  alt="image"
                  loading="lazy"
                />
                <Box position="absolute" top={"50%"} left={"35%"}>
                  <IconButton onClick={handleClick} sx={{ padding: 0 }}>
                    <img
                      src="/view360.svg"
                      alt="view360.svg"
                      width={width * 0.2}
                    />
                  </IconButton>
                </Box>
              </Box>
              <CardContent sx={{ padding: 0 }}>
                <CarVerticalList onClick={onClick} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MUIContainer>
    </Box>
  );
}
