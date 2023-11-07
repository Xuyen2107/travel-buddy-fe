// import Header from "../Header/Header";
import Navigate from "../../routes/Route";
// import "./layout.module.css";

// const Layout = () => {
//    return (
//       <div className="layout">
//          <Header />
//          <Route />
//       </div>
//    );
// };

// export default Layout;

import { useState } from "react";
import Navbar from "../Navbar/index";
import Sidebar from "../Sidebar/index";
import Feed from "../Feed/index";
import Rightbar from "../Rightbar/index";
import Add from "../Add/index";
import { Container, Box, CssBaseline, Stack, createTheme, ThemeProvider } from "@mui/material";

export default function App() {
   const [mode, setMode] = useState("light");

   const darkTheme = createTheme({
      palette: {
         mode,
         primary: {
            main: "#1976D2",
            contrastText: "#f0f2f5",
         },
         secondary: {
            main: "#000000",
         },
      },
   });

   return (
      <ThemeProvider theme={darkTheme}>
         <Box>
            <CssBaseline />
            <Navbar />
            <Container maxWidth="xl">
               <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                  <Sidebar mode={mode} setMode={setMode} />
                  <Navigate />
                  <Rightbar />
               </Stack>
               <Add />
            </Container>
         </Box>
      </ThemeProvider>
   );
}
