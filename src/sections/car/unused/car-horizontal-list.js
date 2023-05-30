import * as React from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggledCarIndex } from "../../../redux/car-slice";

export default function CarHorizontalList() {
  const cars = useSelector((state) => state.car?.car);
  const { carIndex } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const handleOnClick = (data) => {
    dispatch(toggledCarIndex(data));
  };

  return (
    <ImageList
      sx={{
        display: "grid",
        flexDirection: "column",
        // gridTemplateColumns: "repeat(1, 1fr)",
      }}
    >
      {cars?.map((image, id) => (
        <ImageListItem
          onClick={() => handleOnClick(image?.image)}
          key={id}
          sx={{
            cursor: "pointer",
          }}
        >
          <img
            src={`/images/${image?.image}.jpg`}
            style={{
              borderRadius: 10,
              border: carIndex === image?.image ? "3px double #32a1ce" : "none",
              width: 300,
            }}
          />
          <ImageListItemBar title={image.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
