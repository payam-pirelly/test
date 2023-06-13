import { Card, CardContent, Grid, IconButton } from "@mui/material";
import React from "react";
import { Box, Container as MUIContainer } from "@mui/system";
import { useDispatch } from "react-redux";
import VerticalList from "./vertical-list";
import { toggledCarStatus } from "../../redux/car-slice";
import ShowWindowDimensions from "../../utils/resize";
import { useWidth } from "../../utils/useWidth";

const imagePath = "https://fastly-production.24c.in/webin/360/output_1.jpeg";

export default function Main({ onClick }) {
  const { height, width } = ShowWindowDimensions();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggledCarStatus("carOut"));
    onClick();
  };

  const currentBreakpoint = useWidth();

  const handleBreakPoint = () => {
    switch (currentBreakpoint) {
      case "xl":
        return 8;
      case "lg":
        return 8;
      case "md":
        return 12;
      case "sm":
        return 12;
      case "xs":
        return 12;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   const query = ref(db, "Tests");
  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();
  //     if (snapshot.exists()) {
  //       Object.values(data).map((project) => {
  //         setProjects((projects) => [...projects, project]);
  //       });
  //     }
  //   });
  // }, []);

  return (
    <Box display={"flex"} alignItems={"center"} overflow={"hidden"}>
      <MUIContainer maxWidth={"100%"}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={handleBreakPoint()}>
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
                <VerticalList onClick={onClick} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MUIContainer>
    </Box>
  );
}
