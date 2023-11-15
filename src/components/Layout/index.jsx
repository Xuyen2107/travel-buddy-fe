import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import Navigate from "../../routes/Route";
import { darkTheme, lightTheme } from "../../theme";

const Layout = () => {
   const darkMode = useSelector((state) => state.theme.darkMode);
   const theme = darkMode === "dark" ? darkTheme : lightTheme;

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Navigate />
      </ThemeProvider>
   );
};

export default Layout;
