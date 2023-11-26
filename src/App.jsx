import { useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
import AuthHook from "./hooks/authHook";
import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navigate from "./routes/Route";
import { darkTheme, lightTheme } from "./theme";

const App = () => {
   const { loading } = useSelector((state) => state.auth);
   const { fetchDataUseLogin } = AuthHook();
   const darkMode = useSelector((state) => state.theme.darkMode);
   const theme = darkMode === "dark" ? darkTheme : lightTheme;

   useEffect(() => {
      fetchDataUseLogin();
   }, []);

   return (
      <>
         {loading ? (
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
