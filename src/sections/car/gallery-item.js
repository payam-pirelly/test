import * as React from "react";
import {
  Backdrop,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { showCarItemSet } from "../../redux/car-slice";
import Fab from "../../components/button/fab";
import { isMobile } from "react-device-detect";
import ShowWindowDimensions from "../../utils/resize";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function GalleryItem() {
  const { showCarItem, gallery } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { width, height } = ShowWindowDimensions();

  const handleClickNext = () => {
    const index = gallery?.findIndex((car) => car.img === showCarItem);
    if (index < gallery?.length - 1)
      dispatch(showCarItemSet(gallery[index + 1].img));
    else dispatch(showCarItemSet(gallery[0].img));
  };

  const handleClickBack = () => {
    const index = gallery?.findIndex((car) => car.img === showCarItem);
    if (index === 0) dispatch(showCarItemSet(gallery[gallery?.length - 1].img));
    else dispatch(showCarItemSet(gallery[index - 1].img));
  };

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: isMobile ? "white" : "transparent",
      }}
      open={Boolean(showCarItem)}
    >
      {isMobile ? (
        <>
          <IconButton
            onClick={() => dispatch(showCarItemSet(undefined))}
            sx={{
              position: "absolute",
              left: (theme) => theme.spacing(2),
              top: (theme) => theme.spacing(1),
              color: "black",
            }}
          >
            <ArrowBackRoundedIcon fontSize="large" />
          </IconButton>
          <Fab
            sx={{
              backgroundColor: theme.palette.secondary.darkest,
              color: "white",
              "&:hover": {
                backgroundColor: theme.palette.secondary.darkest,
              },
              marginRight: 1,
            }}
            icon={<ArrowBackIosNewRoundedIcon />}
            onClick={handleClickBack}
          />
        </>
      ) : (
        <IconButton
          edge="end"
          sx={{ position: "absolute", top: "50%", left: 10, color: "white" }}
          onClick={handleClickBack}
        >
          <ArrowBackIosNewRoundedIcon
            sx={{
              fontSize: (theme) => theme.spacing(10),
            }}
          />
        </IconButton>
      )}

      <Card
        sx={{
          padding: isMobile ? 0 : 2,
          width: width > height ? height : width,
          background: "transparent",
        }}
      >
        <CardHeader
          sx={{
            marginBottom: (theme) => theme.spacing(-7),
          }}
          action={
            <>
              {!isMobile && (
                <Fab
                  color={theme.palette.primary.lightest}
                  icon={<CloseRoundedIcon />}
                  onClick={() => dispatch(showCarItemSet(undefined))}
                />
              )}
            </>
          }
        />
        <CardMedia
          sx={{ margin: "auto", width: "100%", borderRadius: 1 }}
          component="img"
          image={showCarItem}
          alt="Paella dish"
        />
      </Card>
      {isMobile ? (
        <Fab
          sx={{
            backgroundColor: theme.palette.secondary.darkest,
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.secondary.darkest,
            },
            marginLeft: 1,
          }}
          icon={<ArrowForwardIosRoundedIcon />}
          onClick={handleClickNext}
        />
      ) : (
        <IconButton
          edge="start"
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            color: "white",
          }}
          onClick={handleClickNext}
        >
          <ArrowForwardIosRoundedIcon
            sx={{
              fontSize: (theme) => theme.spacing(10),
            }}
          />
        </IconButton>
      )}
    </Backdrop>
  );
}
