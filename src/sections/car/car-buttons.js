import {
  IconButton,
  Typography,
  Box,
  Fade,
  Tabs as MuiTabs,
  Tab,
  Switch,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

import React, { useRef } from "react";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import Fab from "../../components/button/fab";
import {
  toggledCarStatus,
  toggledCarTabIndex,
  toggledInteriorCarStatus,
  carHotSpotEnableSet,
} from "../../redux/car-slice";
import { exitFullscreen } from "../../utils/fullscreen";
import HotspotIcon from "../../components/icon/hotspot-icon";
import IconLabelButton from "../../components/button/Icon-label-button";
import CancelIcon from "../../components/icon/cancel-icon";
import WarrantyIcon from "../../components/icon/warranty-icon";
import OverviewIcon from "../../components/icon/overview-icon";
import CardHistory from "../../components/card/card-history";
import CardWarranty from "../../components/card/card-warranty";

const RightButtons = styled("div")(({}) => ({
  top: "8rem",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  right: "2rem",
  justifyContent: "space-around",
}));

const Tabs = styled(MuiTabs)(({ theme }) => ({
  background: theme.palette.primary.darkest,
  ".MuiTabs-flexContainer": {
    display: "flex",
    justifyContent: "space-around",
  },
  opacity: 0.9,
  position: "fixed",
  borderRadius: theme.spacing(1),
  ".css-1wf8b0h-MuiTabs-flexContainer": {
    justifyContent: "space-around",
  },
}));

const interior = {
  bottom: "2rem",
  position: "absolute",
  left: "2rem",
};

const exterior = {
  top: "2rem",
  position: "absolute",
  left: "2rem",
};

const CarButtons = ({ value, handleTabChange }) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const { carTabIndex, carHotSpotEnable } = useSelector((state) => state.car);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openWarranty, setOpenWarranty] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef();
  const offsetLeft = ref?.current?.offsetLeft;

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleClose = () => {
    dispatch(toggledCarStatus("main"));
    exitFullscreen();
  };

  const handleClick = () => {
    if (show) {
      setShow(false);
      return;
    } else setShow(true);
  };

  const handleCloseMenu = () => {
    setShow(false);
  };

  const handleMenu = (data) => {
    dispatch(toggledInteriorCarStatus(undefined));
    setTimeout(() => {
      dispatch(toggledInteriorCarStatus(data));
    }, 100);
    handleCloseMenu();
  };

  const handleChangeHotspot = () => {
    if (carHotSpotEnable) dispatch(carHotSpotEnableSet(false));
    else dispatch(carHotSpotEnableSet(true));
  };

  const leftButtons = (
    <Box sx={carTabIndex === 1 ? interior : exterior}>
      {carTabIndex !== 2 && (
        <>
          <Box
            sx={{
              display: "flex",
              borderRadius: (theme) => theme.spacing(1),
              height: "2rem",
              width: "10rem",
              alignItems: "center",
              background: (theme) =>
                carTabIndex === 0
                  ? theme.palette.primary.main
                  : theme.palette.primary.darkest,
              opacity: 0.9,
              justifyContent: "space-around",
            }}
          >
            <HotspotIcon
              style={{
                margin: "0 6px",
                fontSize: "small",
                fill: "red",
              }}
            />
            <Typography color={theme.palette.secondary.main}>
              Hotspot
            </Typography>
            <Switch
              checked={carHotSpotEnable}
              size="small"
              color="secondary"
              onChange={handleChangeHotspot}
            />
          </Box>
          {carTabIndex !== 1 && (
            <Box
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              component={"div"}
              sx={{
                opacity: 0.9,
                display: "flex",
                alignItems: "center",
                background: open
                  ? (theme) => theme.palette.primary.main
                  : "transparent",
                borderRadius: (theme) => theme.spacing(1),
                height: "2rem",
                marginTop: 1,
              }}
              onMouseOut={() => setOpen(false)}
            >
              <IconLabelButton icon={<InfoOutlinedIcon />} title="info" />
              {open && (
                <Typography
                  sx={{ fontWeight: "bold" }}
                  color={theme.palette.secondary.main}
                  mr={1}
                >
                  2018 ford
                </Typography>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );

  const rightButtons = (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "3rem",
          right: "2rem",
        }}
      >
        <IconButton onClick={handleClose} aria-label="close">
          <CancelIcon fontSize="large" />
        </IconButton>
      </Box>
      <RightButtons>
        <Fab
          color={"primary"}
          icon={
            checked ? (
              <ExpandMoreRoundedIcon color="secondary" />
            ) : (
              <ExpandLessRoundedIcon color="secondary" />
            )
          }
          onClick={handleChange}
        />
        <Fade in={checked}>
          <Box my={1}>
            <Box display={"block"}>
              <Fab
                color={"primary"}
                icon={<WarrantyIcon color="secondary" />}
                onClick={() => setOpenWarranty(true)}
              />
              <Typography
                sx={{ color: "black", fontSize: "xx-small" }}
                variant="caption"
                display="block"
                gutterBottom
              >
                warranty
              </Typography>
            </Box>
            <Box display={"block"}>
              <Fab
                color={"primary"}
                icon={<OverviewIcon color="secondary" />}
                onClick={() => setOpenHistory(true)}
              />
              <Typography
                sx={{ color: "black", fontSize: "xx-small" }}
                variant="caption"
                display="block"
                gutterBottom
              >
                HISTORY
              </Typography>
            </Box>
          </Box>
        </Fade>
      </RightButtons>
    </>
  );

  function convertPixelsToRem() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize) * 3;
  }

  const carTab = (
    <Tabs
      value={value}
      onChange={handleTabChange}
      centered
      ref={ref}
      sx={carTabIndex === 1 ? { top: 10 } : { bottom: 10 }}
    >
      <Tab
        label="Exterior"
        sx={{ color: value === 0 ? "white !important" : "gray" }}
      />
      <Tab
        label="Interior"
        icon={
          <Box
            onClick={handleClick}
            sx={{ color: value === 1 ? "white !important" : "gray" }}
          >
            {show ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <KeyboardArrowDownRoundedIcon />
            )}
          </Box>
        }
        iconPosition="end"
        sx={{ color: value === 1 ? "white !important" : "gray" }}
      />
      <Tab
        label="Gallery"
        sx={{ color: value === 2 ? "white !important" : "gray " }}
      />
      <Tab
        label="Walk Around"
        sx={{ color: value === 3 ? "white !important" : "gray " }}
      />
    </Tabs>
  );

  const list = (
    <Box
      sx={{
        position: "absolute",
        left: offsetLeft + convertPixelsToRem(),
        top: "5rem",
        opacity: 0.9,
        borderRadius: (theme) => theme.spacing(1),
        width: "15rem",
        maxWidth: 360,
        bgcolor: (theme) => theme.palette.primary.darkest,
      }}
    >
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem
            sx={{ color: "white" }}
            disablePadding
            onClick={() => handleMenu("front")}
          >
            <ListItemButton>
              <ListItemText primary="See Center Console" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            sx={{ color: "white" }}
            disablePadding
            onClick={() => handleMenu("back")}
          >
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="See Back Seat" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ color: "white" }} disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Push Start" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );

  return (
    <>
      {leftButtons}
      {(carTabIndex === 0 || carTabIndex === 3) && rightButtons}
      {carTab}
      {show && list}
      <CardWarranty
        open={openWarranty}
        onClose={() => setOpenWarranty(false)}
      />
      <CardHistory open={openHistory} onClose={() => setOpenHistory(false)} />
    </>
  );
};

export default CarButtons;
