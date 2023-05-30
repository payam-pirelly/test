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

  const handleClickCarIn = () => {
    dispatch(toggledCarStatus("carOut"));
    onClick();
  };

  return (
    <>
      <Box
        component="main"
        display={"flex"}
        alignItems={"center"}
        sx={{
          flexGrow: 1,
        }}
      >
        <MUIContainer maxWidth={"100%"}>
          <Grid container sx={{ flex: "1 1 auto" }} justifyContent={"center"}>
            <Grid
              item
              xs={8}
              maxHeight={height}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card sx={{ boxShadow: "none !important", paddingTop: 1 }}>
                <Box
                  style={{
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={imagePath}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "auto",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                    alt="image"
                    width={width * 0.6}
                    height={height}
                    loading="lazy"
                  />

                  <Box position="absolute" top={"55%"} left={"35%"} zIndex={1}>
                    <IconButton onClick={handleClick}>
                      <img
                        src="/view360.svg"
                        alt="view360.svg"
                        width={width * 0.2}
                        height="auto"
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
    </>
  );
}
