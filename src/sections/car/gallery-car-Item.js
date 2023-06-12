import * as React from "react";
import {
  Backdrop,
  Card,
  CardHeader,
  CardMedia,
  Fab,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useMemo } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { toggledCarIndex } from "../../redux/car-slice";

export default function GalleryCarItem({ open, onClose }) {
  const { carIndex } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const handleClick = (num) => {
    let value = carIndex;
    value += num;
    dispatch(toggledCarIndex(value));
  };

  const image = useMemo(
    () => (
      <>
        <IconButton sx={{ position: "absolute", right: 0, top: 0 }}>
          <div>salam</div>
        </IconButton>
      </>
    ),
    [carIndex]
  );

  const src = `images/${carIndex}.jpg`;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <IconButton
        edge="end"
        sx={{ position: "absolute", top: "50%", left: 10, color: "white" }}
        onClick={() => handleClick(-1)}
      >
        <ArrowBackIosNewRoundedIcon />
      </IconButton>
      <Card sx={{ width: "50%", background: "transparent" }}>
        <CardHeader
          action={
            <Fab
              sx={{
                background: (theme) => theme.palette.secondary.light,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.darkest,
                },
                color: "white",
                marginBottom: "-7rem",
              }}
              onClick={onClose}
            >
              <CloseRoundedIcon />
            </Fab>
          }
        />
        <CardMedia
          sx={{ margin: "auto", width: "100%", borderRadius: 1 }}
          component="img"
          image={carIndex}
          alt="Paella dish"
        />
      </Card>
      <IconButton
        edge="start"
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          color: "white",
        }}
        onClick={() => handleClick(+1)}
      >
        <ArrowForwardIosRoundedIcon />
      </IconButton>
    </Backdrop>
  );
}
