import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ProfileTop from "../components/ProfileTop";

const ProfilePage = () => {
   return (
      <Box>
         <Navbar />
         <Box>
            <ProfileTop />
         </Box>
      </Box>
   );
};

export default ProfilePage;
