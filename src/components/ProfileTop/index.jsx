import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SendIcon from "@mui/icons-material/Send";
import UploadButton from "../UploadButton";
import FlexBetween from "../BoxFlexBetween";
import TabDefault from "../Tab";
import EditProfile from "../EditProfile";
import { useEffect, useState } from "react";
import { userAPI } from "../../services/api";
import { uploadFinish } from "../../redux/authSlice";

const ProfileTop = () => {
   const [profile, setProfile] = useState(null);
   const [friend, setFriend] = useState(null);
   const { palette } = useTheme();
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");
   const userId = useParams().userId;
   const { user, upload } = useSelector((state) => state.auth);
   const isLoggedInUser = userId === user._id;
   const sender = user._id === friend?.sender;
   const dispatch = useDispatch();

   useEffect(() => {
      if (userId) {
         fetchDataUser();
         fetchDataFriend();
      }

      if (upload) {
         fetchDataUser;
         dispatch(uploadFinish());
      }
   }, [userId, upload]);

   const fetchDataUser = async () => {
      try {
         const response = await userAPI.getSingle(userId);
         setProfile(response.data);
      } catch (error) {
         console.error(error);
         setProfile(null);
      }
   };

   const fetchDataFriend = async () => {
      try {
         const response = await userAPI.getSingleFriend(userId);
         setFriend(response.data);
      } catch (error) {
         console.error(error);
         setFriend(null);
      }
   };

   const handleRemoveFriend = async () => {
      try {
         await userAPI.removeFriend(userId);
         await fetchDataFriend();
      } catch (error) {
         console.error(error);
      }
   };

   const handleSendFriend = async () => {
      try {
         await userAPI.sendFriend(userId);
         await fetchDataFriend();
      } catch (error) {
         console.error(error);
      }
   };

   const handleAcceptFriend = async () => {
      try {
         await userAPI.acceptFriend(userId);
         await fetchDataFriend();
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         {profile && (
            <Box bgcolor={palette.background.paper}>
               <Box
                  maxWidth="60rem"
                  height={isNonMobileScreens ? "30rem" : "35rem"}
                  margin="auto"
                  sx={{
                     display: "grid",
                     gridTemplateColumns: isNonMobileScreens ? "170px 1fr" : "1fr",
                     gridTemplateRows: isNonMobileScreens ? "55% 35% 10%" : "40% 25% 25% 10%",
                     gridTemplateAreas: isNonMobileScreens
                        ? `
          "cover cover"
          "picture info"
          "bottom bottom"
          `
                        : `
          "cover"
          "picture"
          "info" 
          "bottom"
          `,
                  }}
               >
                  <Box
                     sx={{
                        gridArea: "cover",
                        position: "relative",
                     }}
                  >
                     <img
                        width="100%"
                        height="110%"
                        style={{
                           objectFit: "cover",
                           borderRadius: "0 0 10px 10px",
                        }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/1200px-Golden_tabby_and_white_kitten_n01.jpg"
                        alt="background"
                     />
                     {isLoggedInUser && <UploadButton isCoverProfileBtn />}
                  </Box>
                  <Box
                     sx={{
                        gridArea: "picture",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        width: isNonMobileScreens ? "150px" : "150px",
                        height: isNonMobileScreens ? "150px" : "150px",
                        justifySelf: "center",
                     }}
                  >
                     <Box width="100%" height="100%">
                        <img
                           style={{
                              objectFit: "cover",
                              borderRadius: "50%",
                              boxShadow: "0px 0px 5px",
                           }}
                           width="100%"
                           height="100%"
                           border="2px solid"
                           src={profile?.avatar}
                           alt="avatar"
                        />
                     </Box>
                     {isLoggedInUser && <UploadButton isIconButton />}
                  </Box>
                  <Box
                     sx={{
                        gridArea: "info",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: isNonMobileScreens ? "flex-start" : "center",
                        flexDirection: "column",
                        paddingLeft: isNonMobileScreens ? "1rem" : "0",
                        paddingTop: isNonMobileScreens ? "2rem" : "0",
                     }}
                  >
                     <Typography
                        whiteSpace="nowrap"
                        variant="h2"
                        fontWeight="bold"
                        mb="1rem"
                        sx={{
                           fontSize: isNonMobileScreens ? "2rem" : "1.8rem",
                        }}
                     >
                        {profile?.fullName}
                     </Typography>
                     {isLoggedInUser ? (
                        <EditProfile />
                     ) : (
                        <>
                           {!friend ? (
                              <Button
                                 variant="contained"
                                 startIcon={<PersonAddAlt1Icon />}
                                 sx={{
                                    textTransform: "inherit",
                                 }}
                                 onClick={handleSendFriend}
                              >
                                 Kết bạn
                              </Button>
                           ) : (
                              <FlexBetween gap="1rem">
                                 {friend?.status === 1 ? (
                                    <>
                                       <Button
                                          variant="contained"
                                          startIcon={<PersonRemoveIcon />}
                                          sx={{
                                             textTransform: "inherit",
                                          }}
                                          onClick={handleRemoveFriend}
                                       >
                                          Hủy kết bạn
                                       </Button>

                                       <Button
                                          variant="outlined"
                                          endIcon={<SendIcon />}
                                          sx={{
                                             textTransform: "inherit",
                                          }}
                                       >
                                          Gửi tin nhắn
                                       </Button>
                                    </>
                                 ) : (
                                    <>
                                       {sender ? (
                                          <>
                                             <Button
                                                variant="contained"
                                                startIcon={<PersonRemoveIcon />}
                                                sx={{
                                                   textTransform: "inherit",
                                                }}
                                                onClick={handleRemoveFriend}
                                             >
                                                Xóa lời mời
                                             </Button>
                                          </>
                                       ) : (
                                          <>
                                             <Button
                                                variant="contained"
                                                startIcon={<PersonAddAlt1Icon />}
                                                sx={{
                                                   textTransform: "inherit",
                                                }}
                                                onClick={handleAcceptFriend}
                                             >
                                                Chấp nhận lời mời
                                             </Button>

                                             <Button
                                                variant="outlined"
                                                startIcon={<PersonRemoveIcon />}
                                                sx={{
                                                   textTransform: "inherit",
                                                }}
                                                onClick={handleRemoveFriend}
                                             >
                                                Xóa lời mời
                                             </Button>
                                          </>
                                       )}
                                    </>
                                 )}
                              </FlexBetween>
                           )}
                        </>
                     )}
                  </Box>
                  <TabDefault userId={userId} />
               </Box>
            </Box>
         )}
      </>
   );
};

export default ProfileTop;
