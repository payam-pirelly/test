import * as React from "react";
import { Box, Accordion as MuiAccordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CarIcon from "../icon/car-icon";

export default function Accordion() {
  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box mr={1}>
          <CarIcon />
        </Box>
        <Typography variant="subtitle1" gutterBottom fontWeight={"600"}>
          Currancy Coverage
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          30 day money back malesuada lacus ex, sit amet blandit leo lobortis
          eget.
        </Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
}
