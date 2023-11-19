import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateButton from "../components/CreateButton/index.jsx";
import Post from "../components/Post";

const HomePage = () => {
   return (
      <>
         <Box>
            <Navbar />
            <Box sx={{ display: "flex" }}>
               <Sidebar />
               <Box>
                  <CreateButton />
                  <Post />
               </Box>

               <Box flex={1}></Box>
            </Box>
         </Box>
      </>
   );
};

export default HomePage;
