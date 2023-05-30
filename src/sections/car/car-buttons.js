import {
  IconButton,
  Typography,
  Box,
  Fade,
  Tabs,
  Tab,
  Switch,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
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
  toggledEnteriorCarStatus,
  toggledIsHotspot,
} from "../../redux/car-slice";
import { exitFullscreen } from "../../utils/fullscreen";
import HotspotIcon from "../../components/icon/hotspot-icon";
import IconLabelButton from "../../components/button/Icon-label-button";
import CancelIcon from "../../components/icon/cancel-icon";
import WarrantyIcon from "../../components/icon/warranty-icon";
import OverviewIcon from "../../components/icon/overview-icon";

const RightRoot = styled("div")(({}) => ({
  top: "8rem",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  right: "2rem",
  height: "20%",
  justifyContent: "space-around",
}));

const topStyle = {
  width: "30rem",
  opacity: 0.9,
  bgcolor: "#1E1E1E",
  position: "fixed",
  top: 10,
  borderRadius: 1,
  ".css-2he6n-MuiButtonBase-root-MuiTab-root.Mui-selected": {
    color: "white !important",
  },
  ".css-1wf8b0h-MuiTabs-flexContainer": {
    justifyContent: "space-around",
  },
};

const bottomStyle = {
  width: "30rem",
  opacity: 0.9,
  bgcolor: "#B0CDFF",
  position: "fixed",
  bottom: 10,
  borderRadius: 1,
  ".css-2he6n-MuiButtonBase-root-MuiTab-root.Mui-selected": {
    color: "#1862E3",
  },
  ".css-1wf8b0h-MuiTabs-flexContainer": {
    justifyContent: "space-around",
  },
  ".css-2he6n-MuiButtonBase-root-MuiTab-root+.css-2he6n-MuiButtonBase-root-MuiTab-root":
    {
      color: "#5794FF",
    },
};

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
  const { carTabIndex } = useSelector((state) => state.car);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleClose = () => {
    dispatch(toggledCarStatus("main"));
    exitFullscreen();
  };

  const leftButtons = (
    <>
      <Box sx={carTabIndex === 1 ? interior : exterior}>
        {carTabIndex === 2 ? (
          <IconButton onClick={() => dispatch(toggledCarTabIndex(0))}>
            <ArrowBackRoundedIcon fontSize="large" />
          </IconButton>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                borderRadius: 10,
                height: "2rem",
                alignItems: "center",
                background: "gray",
                opacity: 0.9,
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
                size="small"
                color="secondary"
                onChange={() => dispatch(toggledIsHotspot())}
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
                  background: open ? "#0085FF" : "",
                  borderRadius: 10,
                  height: "2rem",
                  marginTop: 1,
                }}
                onMouseOut={() => setOpen(false)}
              >
                <IconLabelButton icon={<InfoOutlinedIcon />} title="info" />
                {open && (
                  <Typography color={theme.palette.secondary.main} mr={1}>
                    2018 ford
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </>
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
      <RightRoot>
        <Fab
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
          <Box>
            <Box display={"block"} mb={1}>
              <Fab
                icon={<WarrantyIcon color="secondary" />}
                onClick={handleChange}
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
            <Box display={"block"} mb={1}>
              <Fab
                icon={<OverviewIcon color="secondary" />}
                onClick={handleChange}
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
      </RightRoot>
    </>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const show = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const carTab = (
    <Box sx={carTabIndex === 1 ? topStyle : bottomStyle}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        centered
        sx={{
          ".MuiTabs-flexContainer": {
            display: "flex",
            justifyContent: "space-around",
          },
        }}
      >
        <Tab label="Exterior" />
        <Tab
          label="Interior"
          icon={
            show ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <KeyboardArrowDownRoundedIcon />
            )
          }
          iconPosition="end"
          onClick={handleClick}
        />
        <Tab label="Gallery" />
        <Tab label="Walk Around" />
      </Tabs>
    </Box>
  );

  const handleMenu = (data) => {
    dispatch(toggledEnteriorCarStatus(undefined));
    setTimeout(() => {
      dispatch(toggledEnteriorCarStatus(data));
    }, 100);
    handleCloseMenu();
  };

  return (
    <>
      {leftButtons}
      {carTabIndex !== 2 && rightButtons}
      {carTab}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={show}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          className="interior-front-image"
          id="interior-front-image"
          onClick={() => handleMenu("front")}
        >
          Push Start
        </MenuItem>
        <MenuItem id="interior-back-image" onClick={() => handleMenu("back")}>
          See Back Seat
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>See Center Console</MenuItem>
      </Menu>
    </>
  );
};

export default CarButtons;
