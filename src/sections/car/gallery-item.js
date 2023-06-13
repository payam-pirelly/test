import * as React from "react";
import {
  Backdrop,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { showCarIndexSet } from "../../redux/car-slice";
import Fab from "../../components/button/fab";

export default function GalleryItem() {
  const { showCarIndex } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const handleClick = (num) => {
    let value = showCarIndex;
    value += num;
    dispatch(showCarIndexSet(value));
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={Boolean(showCarIndex)}
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
          sx={{
            marginBottom: (theme) => theme.spacing(-7),
          }}
          action={
            <Fab
              color={"primary"}
              icon={<CloseRoundedIcon />}
              onClick={() => dispatch(showCarIndexSet(undefined))}
            />
          }
        />
        <CardMedia
          sx={{ margin: "auto", width: "100%", borderRadius: 1 }}
          component="img"
          image={showCarIndex}
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
