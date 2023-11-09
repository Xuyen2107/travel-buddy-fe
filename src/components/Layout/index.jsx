import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navigate from "../../routes/Route";

const Layout = () => {
   const darkMode = useSelector((state) => state.theme.darkMode);

   const darkTheme = createTheme({
      palette: {
         mode: darkMode,
      },
   });

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Navigate />
      </ThemeProvider>
   );
};

export default Layout;
