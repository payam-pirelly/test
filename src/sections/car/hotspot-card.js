import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Fade, IconButton } from "@mui/material";
import Fab from "../../components/button/fab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  carHotSpotReloadToggled,
  currentCarHotSpotIndexSet,
  toggledFirstHotSpotPosition,
} from "../../redux/car-slice";
import LineTo from "../../components/react-line/line-to";
import LeftIcon from "../../components/icon/left-icon";
import RightIcon from "../../components/icon/right-icon";

export default function HotspotCard({ onClose, closePosition }) {
  const {
    firstHotSpotPosition,
    secondHotSpotPosition,
    carHotSpotPositions,
    currentCarHotSpotIndex,
    carHotSpotReload,
  } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  useEffect(() => {
    const getHotSpotId = document?.getElementById("hotSpotId");
    const { top, left } = getHotSpotId?.getBoundingClientRect();
    dispatch(toggledFirstHotSpotPosition({ x: left, y: top }));
  }, []);

  const handleClickIncrease = () => {
    dispatch(currentCarHotSpotIndexSet("increase"));
    dispatch(carHotSpotReloadToggled());
    setTimeout(() => {
      dispatch(carHotSpotReloadToggled());
    }, 100);
  };

  const handleClickDecrease = () => {
    dispatch(currentCarHotSpotIndexSet("decrease"));
    dispatch(carHotSpotReloadToggled());
    setTimeout(() => {
      dispatch(carHotSpotReloadToggled());
    }, 100);
  };

  const handleFindIndex = () => {
    let index = carHotSpotPositions?.findIndex(
      (car) => car?.id === currentCarHotSpotIndex
    );
    return ++index;
  };

  return (
    <>
      <Fade in={true}>
        <Box
          sx={{
            position: "absolute",
            left: "10%",
            top: "30%",
          }}
        >
          <Card
            sx={{
              opacity: "0.9",
              background: (theme) => theme.palette.primary.darkest,
              color: "white",
              maxWidth: 345,
            }}
          >
            <CardHeader
              action={
                <Fab
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.darkest,
                    color: "white",
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.darkest,
                    },
                  }}
                  icon={
                    <Box component="div" id="hotSpotId">
                      <CloseRoundedIcon />
                    </Box>
                  }
                  onClick={onClose}
                />
              }
            />
            <CardMedia
              sx={{
                borderRadius: (theme) => theme.spacing(2),
                padding: 1,
              }}
              component="img"
              height="190"
              image="/images/motor.jpg"
              alt="motor"
            />
            <CardContent>
              <Typography variant="h6" textAlign={"center"}>
                Test
              </Typography>
              <Typography variant="body2">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
          </Card>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box>
              <IconButton color="secondary" onClick={handleClickDecrease}>
                <LeftIcon />
              </IconButton>
            </Box>
            <Box>
              {carHotSpotPositions?.length}/{handleFindIndex()}
            </Box>
            <Box>
              <IconButton color="secondary" onClick={handleClickIncrease}>
                <RightIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Fade>
      <LineTo
        secondHotSpotPosition={closePosition}
        firstHotSpotPosition={firstHotSpotPosition}
        reload={carHotSpotReload}
      />
    </>
  );
}
