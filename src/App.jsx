import { useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
import useAuth from "./hooks/authHook";
import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navigate from "./routes/Route";
import { darkTheme, lightTheme } from "./theme";
import ScreenComment from "./components/ScreenComment";
import SearchForm from "./components/SearchForm";
import Item from "./pages/item";

const App = () => {
   const { loading } = useSelector((state) => state.auth);
   const { fetchDataUseLogin } = useAuth();
   const darkMode = useSelector((state) => state.theme.darkMode);
   const theme = darkMode === "dark" ? darkTheme : lightTheme;

   useEffect(() => {
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
               {/* <Item /> */}
            </ThemeProvider>
         )}
      </>
   );
};

export default App;
