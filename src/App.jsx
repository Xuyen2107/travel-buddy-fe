import { useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
import useAuth from "./hooks/authHook";
import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navigate from "./routes/Route";
import { darkTheme, lightTheme } from "./theme";
import { cc } from "./firebase.js";

const App = () => {
   const { loading } = useSelector((state) => state.auth);
   const { fetchDataUseLogin } = useAuth();
   const darkMode = useSelector((state) => state.theme.darkMode);
   const theme = darkMode === "dark" ? darkTheme : lightTheme;

   useEffect(() => {
      cc();
      fetchDataUseLogin();
   }, []);

   return (
      <>
         {loading === true ? (
            <Loading />
         ) : (
            <ThemeProvider theme={theme}>
               <CssBaseline />
               <Navigate />
            </ThemeProvider>
         )}
      </>
   );
};

export default App;
