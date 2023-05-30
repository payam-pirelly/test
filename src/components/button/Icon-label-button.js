import * as React from "react";
import { useTheme, Button } from "@mui/material";

export default function IconLabelButton({ icon, title }) {
  const theme = useTheme();
  return (
    <Button
      sx={{
        color: theme.palette.secondary.main,
      }}
      startIcon={icon}
    >
      {title}
    </Button>
  );
}
