import {
  IconButton,
  Typography,
  Box,
  Fade,
  Tabs as MuiTabs,
  Tab,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Switch,
} from "@mui/material";

import React, { useRef } from "react";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import Fab from "../../components/button/fab";
import {
  toggledCarStatus,
  toggledInteriorCarStatus,
  carHotSpotEnableSet,
} from "../../redux/car-slice";
import { exitFullscreen } from "../../utils/fullscreen";
import WarrantyIcon from "../../components/icon/warranty-icon";
import CardHistory from "../../components/card/card-history";
import CardWarranty from "../../components/card/card-warranty";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HistoryIcon from "../../components/icon/history-icon";
import { isMobile } from "react-device-detect";
import HotspotButton from "../../components/button/hotspot-button";
import MobileFeature from "../../components/button/mobile-feature";
import SettingIcon from "../../components/icon/setting-icon.js";
import HotspotIcon from "../../components/icon/hotspot-icon";

const WebFeature = styled("div")(({}) => ({
  top: "8rem",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  right: "2rem",
  justifyContent: "space-around",
}));

const LeftButtonStyle = styled(Box)(({}) => ({
  bottom: "2rem",
  position: "absolute",
  left: "2rem",
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

const MobileFeatureStyle = styled(Box)(({}) => ({
  top: "1rem",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  left: "0rem",
  justifyContent: "space-around",
  zIndex: 1,
}));

const HotSpotButtonStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: theme.spacing(2),
  height: "2.938rem",
  width: "10.875rem",
  alignItems: "center",
  opacity: 0.9,
  justifyContent: "space-evenly",
}));

const CarButtons = ({ value, handleTabChange }) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [mobileFeatureChecked, setMobileFeatureChecked] = useState(false);
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

  const handleChangeMobileFeature = () => {
    setMobileFeatureChecked((prev) => !prev);
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

  function convertPixelsToRem() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize) * 3;
  }

  const handleWarranty = (status) => {
    setOpenWarranty(status);
  };

  const handleHistory = (status) => {
    setOpenHistory(status);
  };

  const leftButtons = (
    <LeftButtonStyle>
      {carTabIndex !== 1 && (
        <>
          {isMobile ? (
            <>
              <MobileFeatureStyle>
                <Fab
                  color={"primary"}
                  icon={
                    !mobileFeatureChecked ? (
                      <SettingIcon fontSize="small" />
                    ) : (
                      <CloseRoundedIcon color="secondary" />
                    )
                  }
                  onClick={handleChangeMobileFeature}
                />
                <Fade in={mobileFeatureChecked}>
                  <Box>
                    <Box
                      display={"block"}
                      sx={{
                        position: "absolute",
                        left: "3rem",
                        top: "1rem",
                      }}
                    >
                      <Fab
                        color={"primary"}
                        icon={<WarrantyIcon color="secondary" />}
                        onClick={() => setOpenWarranty(true)}
                      />
                      <Typography
                        sx={{ color: "black", fontSize: "xx-small", mt: 1 }}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        warranty
                      </Typography>
                    </Box>
                    <Box display={"block"} mt={1.5}>
                      <Fab
                        color={"primary"}
                        icon={<HistoryIcon color="secondary" />}
                        onClick={() => setOpenHistory(true)}
                      />
                      <Typography
                        sx={{ color: "black", fontSize: "xx-small", mt: 1 }}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        HISTORY
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              </MobileFeatureStyle>
            </>
          ) : (
            <Box
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              mb={1}
            >
              {!open ? (
                <Box
                  sx={{
                    display: "flex",
                    height: "2.938rem",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    ml: 2,
                  }}
                >
                  <InfoOutlinedIcon color="secondary" fontSize="small" />
                  <Typography color={theme.palette.secondary.main} ml={1}>
                    Info
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    borderRadius: (theme) => theme.spacing(2),
                    height: "2.938rem",
                    width: "auto",
                    alignItems: "center",
                    background: (theme) => theme.palette.primary.main,
                    opacity: 0.9,
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box display={"flex"} alignItems={"center"}>
                    <InfoOutlinedIcon color="secondary" fontSize="small" />
                    <Typography color={theme.palette.secondary.main} ml={1}>
                      Info
                    </Typography>
                  </Box>
                  <Typography
                    color={theme.palette.secondary.main}
                    fontWeight={600}
                  >
                    ford 2017
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </>
      )}
      <HotSpotButtonStyle
        sx={{
          background: (theme) =>
            carTabIndex === 0
              ? theme.palette.primary.main
              : theme.palette.primary.darkest,
        }}
      >
        <HotspotIcon
          style={{
            fontSize: "small",
            fill: "red",
          }}
        />
        <Typography color={theme.palette.secondary.main} ml={-1}>
          Hotspot
        </Typography>
        <Switch
          checked={carHotSpotEnable}
          size="small"
          color="secondary"
          onChange={handleChangeHotspot}
        />
      </HotSpotButtonStyle>
    </LeftButtonStyle>
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
        <IconButton onClick={handleClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      {!isMobile && (
        <WebFeature>
          <Fab
            color={"primary"}
            icon={
              !checked ? (
                <ExpandMoreRoundedIcon color="secondary" />
              ) : (
                <ExpandLessRoundedIcon color="secondary" />
              )
            }
            onClick={handleChange}
          />
          <Fade in={checked}>
            <Box>
              <Box display={"block"} my={3}>
                <Fab
                  color={"primary"}
                  icon={<WarrantyIcon color="secondary" />}
                  onClick={() => setOpenWarranty(true)}
                />
                <Typography
                  sx={{ color: "black", fontSize: "xx-small", mt: 1 }}
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
                  icon={<HistoryIcon color="secondary" />}
                  onClick={() => setOpenHistory(true)}
                />
                <Typography
                  sx={{ color: "black", fontSize: "xx-small", mt: 1 }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  HISTORY
                </Typography>
              </Box>
            </Box>
          </Fade>
        </WebFeature>
      )}
    </>
  );

  const carTab = (
    <Tabs
      value={value}
      onChange={handleTabChange}
      centered
      ref={ref}
      sx={{ top: 10, borderRadius: theme.spacing(2) }}
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

  const mobileTab = (
    <Tabs
      value={value}
      onChange={handleTabChange}
      centered
      ref={ref}
      sx={
        (carTabIndex === 1 ? { top: 10 } : { bottom: 10 },
        { borderRadius: (theme) => theme.spacing(2) })
      }
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
      {carTabIndex !== 2 && leftButtons}
      {(carTabIndex === 0 || carTabIndex === 3) && rightButtons}
      {isMobile ? mobileTab : carTab}
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
