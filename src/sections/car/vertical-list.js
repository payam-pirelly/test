import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toggledCarStatus, toggledCarTabIndex } from "../../redux/car-slice";
import ShowWindowDimensions from "../../utils/resize";
import { isMobile } from "react-device-detect";

const imagePath = "https://fastly-production.24c.in/webin/360/output_1.jpeg";

var myArr = Array(isMobile ? 3 : 4)
  .join()
  .split(",")
  .map(
    function (a) {
      return this.i++;
    },
    { i: 1 }
  );

export default function VerticalList({ onClick }) {
  const items = myArr;
  const dispatch = useDispatch();
  const { width } = ShowWindowDimensions();

  const handleClickCarIn = () => {
    dispatch(toggledCarStatus("carOut"));
    dispatch(toggledCarTabIndex(1));
    onClick();
  };

  const handleClickCarGallery = () => {
    dispatch(toggledCarStatus("carOut"));
    dispatch(toggledCarTabIndex(2));
    onClick();
  };

  return (
    <ImageList
      sx={{
        width: "auto",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box position="absolute" left="5%" top="50%" zIndex={1}>
        <IconButton onClick={handleClickCarIn}>
          <img
            src="/interior360.svg"
            alt="interior.svg"
            width={width * 0.09}
            height="auto"
          />
        </IconButton>
      </Box>
      {items.map((item) => (
        <Button
          key={item.toString()}
          onClick={() => {
            if (item === 1) handleClickCarIn();
            else handleClickCarGallery();
          }}
        >
          <ImageListItem key={item} sx={{ display: "block" }}>
            <img
              src={imagePath}
              srcSet={imagePath}
              alt={item}
              loading="lazy"
              style={{ borderRadius: 10 }}
            />
          </ImageListItem>
        </Button>
      ))}
      <Box position="absolute" right="10%" top="40%" zIndex={1}>
        <Typography variant="h5" gutterBottom color={"white"}>
          +{items?.length}
        </Typography>
      </Box>
    </ImageList>
  );
}
