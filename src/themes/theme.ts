import { createTheme } from "@mui/material/styles";
import { brown, amber } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: brown[700],
    },
    secondary: {
      main: amber[50],
    },
  },
});
