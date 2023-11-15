import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ProfileTop from "../components/ProfileTop";
import Post from "../components/Post";
import ListFriend from "../components/ListFriend";

const ProfilePage = () => {
   return (
      <Box>
         <Navbar />
         <ProfileTop />
         <Box
            sx={{
               width: "60rem",
               display: "flex",
               justifyContent: "space-between",
               gap: "30px",
               margin: " 20px auto 0 auto",
            }}
         >
            <Box>
               <ListFriend />
            </Box>
            {/* <Box>
               <Post />
            </Box> */}
         </Box>
      </Box>
   );
};

export default ProfilePage;
