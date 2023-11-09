import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
   return (
      <Box>
         <Navbar />
         <Box>
            <Sidebar />
         </Box>
      </Box>
   );
};

export default HomePage;
