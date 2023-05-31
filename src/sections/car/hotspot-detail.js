import { Backdrop, Box, Button } from "@mui/material";
import React, { useState } from "react";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";

import CloseIcon from "@mui/icons-material/Close";
import HotSpotCardDetail from "./hotspot-card-detail";
import Fab from "../../components/button/fab";
import LineTo from "./lineto";

export default function HotspotDetail({ open, handleClose }) {
  const [status, setStatus] = useState(1);

  const handleClick = () => {
    setStatus(2);
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      // onClick={handleClose}
    >
      <Box
        sx={{
          position: "absolute",
          left: "55%",
          top: "40%",
          display: "grid",
          gap: 1,
        }}
      >
        <Fab
          color={"secondary"}
          icon={<CloseIcon className="D" />}
          onClick={() => {
            setStatus(1);
            handleClose();
          }}
          sx={{
            position: "absolute",
            left: "-5rem",
            top: 40,
            color: "white",
          }}
        />
        {status === 1 ? (
          <>
            <Button
              sx={{
                background: "#1E1E1E",
              }}
              onClick={handleClick}
              variant="contained"
              size="small"
              endIcon={<NorthEastRoundedIcon />}
            >
              Bluetooth Technology
            </Button>
            <Button
              sx={{
                background: "#1E1E1E",
              }}
              onClick={handleClick}
              variant="contained"
              size="small"
              endIcon={<NorthEastRoundedIcon />}
            >
              Lane Departure Warning
            </Button>
            <Button
              sx={{
                background: "#1E1E1E",
              }}
              onClick={handleClick}
              variant="contained"
              size="small"
              endIcon={<NorthEastRoundedIcon />}
            >
              Heated Steering Wheel
            </Button>
          </>
        ) : (
          <>
            <HotSpotCardDetail
              onClose={() => {
                setStatus(1);
                handleClose();
              }}
            />
            <LineTo
              from="C"
              to="D"
              borderColor={"#1862E3"}
              // borderStyle={"dashed"}
              delay={10}
            />
          </>
        )}
      </Box>
    </Backdrop>
  );
}
