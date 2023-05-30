import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "../../components/button/fab";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function HotSpotCardDetail({ onClose }) {
  const ref = React.useRef();
  console.log(ref)

  const card = (
    <React.Fragment>
      <CardContent ref={ref}>
        <IconButton
          sx={{ position: "absolute", right: 0, color: "white" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="div" className="C">
          this is a test
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <Box
        position={"absolute"}
        mt={1}
        width={ref?.current?.clientWidth}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Fab icon={<ArrowLeftIcon />} />
        <Box marginX={1}>2/11</Box>
        <Fab icon={<ArrowRightIcon />} />
      </Box>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ background: "#1E1E1E", color: "white" }}>
        {card}
      </Card>
    </Box>
  );
}
