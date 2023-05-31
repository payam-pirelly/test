import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      lightest: "#F5F7FF",
      light: "#EBEEFE",
      main: "#EAF1FD",
      dark: "#EAF1FD", //hover
      darkest: "#312E81",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lightest: "#F5F7FF",
      light: "#EBEEFE",
      main: "#07A4FC",
      dark: "#07A4FC", //hover
      darkest: "#312E81",
      contrastText: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
