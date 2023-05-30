import React from "react";

import { useDispatch, useSelector } from "react-redux";
import ShowWindowDimensions from "../../../utils/resize";
import { toggledCarIndex } from "../../../redux/car-slice";

const CarItem = () => {
  //Selector
  const { carIndex } = useSelector((state) => state.car);
  const cars = useSelector((state) => state.car?.car);

  const { width, height } = ShowWindowDimensions();
  const dispatch = useDispatch();

  const handleClick = (num) => {
    const data = carIndex + num;
    if (data === 0) return;
    else if (data === cars?.length) return;
    else dispatch(toggledCarIndex(data));
  };

  return (
    <>
      {/* <IconButton
        disabled={carIndex === 1}
        edge="end"
        sx={{ position: "absolute", top: "50%", left: 0, color: "white" }}
        onClick={() => handleClick(-1)}
      >
        <ArrowBackRoundedIcon />
      </IconButton> */}
      <Image
        alt="image"
        priority
        src={`images/${carIndex}.jpg`}
        style={{
          objectFit: "contain",
          height: "auto",
          maxHeight: height,
          borderRadius: 10,
          overflow: "hidden",
        }}
        width={width}
        height={height}
      />
      {/* <IconButton
        disabled={carIndex === cars?.length}
        edge="start"
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          color: "white",
        }}
        onClick={() => handleClick(+1)}
      >
        <ArrowForwardRoundedIcon />
      </IconButton> */}
    </>
  );
};

export default CarItem;
