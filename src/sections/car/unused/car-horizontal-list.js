import * as React from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showCarIndexSet } from "../../../redux/car-slice";

export default function CarHorizontalList() {
  const cars = useSelector((state) => state.car?.car);
  const { showCarIndex } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const handleOnClick = (data) => {
    dispatch(showCarIndexSet(data));
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
              border: showCarIndex === image?.image ? "3px double #32a1ce" : "none",
              width: 300,
            }}
          />
          <ImageListItemBar title={image.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
