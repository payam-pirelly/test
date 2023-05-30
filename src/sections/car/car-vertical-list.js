import { IconButton, ImageList, ImageListItem } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toggledCarStatus, toggledCarTabIndex } from "../../redux/car-slice";

const imagePath = "https://fastly-production.24c.in/webin/360/output_1.jpeg";

export default function CarVerticalList({ onClick }) {
  const items = [1, 2, 3, 4];
  const dispatch = useDispatch();

  const handleClickCarIn = () => {
    dispatch(toggledCarStatus("carOut"));
    dispatch(toggledCarTabIndex(1));
    onClick();
  };

  return (
    <ImageList sx={{ width: "auto", display: "flex", position: "relative", overflow: "hidden" }}>
      {items.map((item) => (
        <ImageListItem key={item} sx={{ display: "block" }}>
          <img
            src={imagePath}
            srcSet={imagePath}
            alt={item}
            loading="lazy"
            style={{ borderRadius: 10 }}
          />
        </ImageListItem>
      ))}
      <Box position="absolute" left="5%" top="50%" zIndex={1}>
        <IconButton onClick={handleClickCarIn}>
          <img src="/interior360.svg" alt="interior.svg" width="auto" height="auto" />
        </IconButton>
      </Box>
    </ImageList>
  );
}
