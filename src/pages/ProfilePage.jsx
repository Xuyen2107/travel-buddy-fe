import { Box, CircularProgress, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import ProfileTop from "../components/ProfileTop";
import ListFriend from "../components/ListFriend";
import InfoUser from "../components/Info";
import { BoxColumn } from "../styles/index";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Login } from "@mui/icons-material";
import usePost from "../hooks/usePost";
import { useEffect } from "react";
import Post from "../components/ScreenPost/index1";

const ProfilePage = () => {
   const { userId } = useParams();
   const location = useLocation();
   const { dataPostUser, fetchDataPostUser } = usePost();
   const {
      userProfile,
      friend,
      friends,
      profileLoading,
      friendsLoading,
      profileError,
      friendError,
      friendsError,
      handleChangeImage,
      handleUpdateUser,
      handleSendFriend,
      handleAcceptFriend,
      handleRemoveFriend,
   } = useUser(userId);

   useEffect(() => {
      fetchDataPostUser(userId);
   }, [userId]);

   if (profileLoading || friendsLoading) {
      return (
         <>
            <Navbar />
            <Box
               sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <CircularProgress />
            </Box>
         </>
      );
   }

   if (profileError || friendError || friendsError) {
      <Box>
         <Navbar />
         <Typography variant="h1">Có lỗi xảy ra</Typography>
      </Box>;
   }

   return (
      <Box>
         <Navbar />
         <ProfileTop
            userProfile={userProfile}
            friend={friend}
            userId={userId}
            onChange={handleChangeImage}
            handleUpdateUser={handleUpdateUser}
            handleSendFriend={handleSendFriend}
            handleAcceptFriend={handleAcceptFriend}
            handleRemoveFriend={handleRemoveFriend}
         />
         <Box
            sx={{
               width: "60rem",
               display: "flex",
               justifyContent: "space-between",
               gap: "30px",
               margin: " 20px auto 0 auto",
            }}
         >
            <BoxColumn gap={4}>
               <InfoUser userProfile={userProfile} />
               <ListFriend friends={friends} />
            </BoxColumn>
            <BoxColumn gap={3}>{dataPostUser && dataPostUser.map((item) => <Post key={item?._id} post={item} />)}</BoxColumn>
         </Box>
      </Box>
   );
};

export default ProfilePage;
