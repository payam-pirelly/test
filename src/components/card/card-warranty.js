import * as React from "react";
import { Box, Card as Muicard, useTheme } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Backdrop } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Fab from "../button/fab";
import Accordion from "../accordion/accordion";

export default function CardWarranty({ open, onClose }) {
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
          title="Warranty"
          subheader="this is test."
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
            display: "flex",
            m: 1,
            p: 1,
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          <Accordion />
        </Box>
        <Box
          sx={{
            display: "flex",
            m: 1,
            p: 1,
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          <Accordion />
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
