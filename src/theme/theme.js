import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      lightest: "#F5F7FF",
      light: "#EBEEFE",
      main: "#E1F0FF",
      dark: "#E1F0FF", //hover
      darkest: "#312E81",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lightest: "#F5F7FF",
      light: "#EBEEFE",
      main: "#1862E3",
      dark: "#1862E3", //hover
      darkest: "#312E81",
      contrastText: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
