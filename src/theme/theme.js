import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      lightest: "#C2C0BF",
      light: "#D4D4D5",
      main: "#E1F0FF",
      dark: "#E1F0FF", //hover
      darkest: "#1E1E1E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lightest: "#F5F7FF",
      light: "#79797A",
      main: "#1862E3",
      dark: "#1862E3", //hover
      darkest: "#79797A",
      contrastText: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
  },
});

theme.typography.h6 = {
  [theme.breakpoints.up("xs")]: {
    // fontSize: "1rem",
  },
};

export default theme;
