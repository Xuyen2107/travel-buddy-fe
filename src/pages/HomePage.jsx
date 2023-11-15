import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Add from "./Add"
import AlbumPost from "./AlbumPost.jsx";

const HomePage = () => {
   return (
      <>
      <Box >
         <Navbar />
         <Box  sx={{ display: "flex"}}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <AlbumPost />
                </Box>
         </Box>
       
         <Add />
      </Box>
  
   </>
   );
};

export default HomePage;
