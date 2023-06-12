import * as React from "react";
import { Box, Card as Muicard, useTheme } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Backdrop } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Fab from "../button/fab";

export default function CardHistory({ open, onClose }) {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Muicard
        sx={{
          minWidth: 545,
          background: (theme) => theme.palette.primary.light,
        }}
      >
        <CardHeader
          avatar={<Typography variant="h5">History</Typography>}
          action={
            <Fab
              sx={{
                backgroundColor: theme.palette.secondary.darkest,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.darkest,
                },
              }}
              icon={<CloseRoundedIcon />}
              onClick={onClose}
            />
          }
        />
        <Box
          sx={{
            "& img": {
              borderRadius: (theme) => theme.spacing(3),
            },
          }}
        >
          <CardMedia
            sx={{
              borderRadius: (theme) => theme.spacing(1),
              padding: 1,
            }}
            component="img"
            height="194"
            image="/autocheck.jpg"
            alt="Paella dish"
          />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            this is test
          </Typography>
        </CardContent>
      </Muicard>
    </Backdrop>
  );
}
