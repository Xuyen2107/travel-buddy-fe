import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
   palette: {
      mode: "light",
      background: {
         default: "#F0F2F5",
         paper: "#fff",
         input: "#F0F2F5",
      },
   },
});

export const darkTheme = createTheme({
   palette: {
      mode: "dark",
      background: {
         default: "#18191A",
         paper: "#242526",
         input: "#3A3B3C",
      },
   },
});
