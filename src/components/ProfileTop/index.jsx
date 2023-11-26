import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SendIcon from "@mui/icons-material/Send";
import UploadButton from "../UploadButton";
import FlexBetween from "../BoxFlexBetween";
import TabDefault from "../Tab";
import EditProfile from "../EditProfile";
import PropTypes from "prop-types";

const ProfileTop = ({ userProfile, friend, onChange, handleUpdateUser, handleSendFriend, handleAcceptFriend, handleRemoveFriend }) => {
   const { userLogin } = useSelector((state) => state.auth);
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");
   const isLoggedInUser = userProfile?._id === userLogin?._id;
   const sender = userLogin?._id === friend?.sender;

   return (
      <>
         {userProfile && (
            <Box bgcolor="background.paper">
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
                           src={userProfile?.avatar}
                           alt="avatar"
                        />
                     </Box>
                     {isLoggedInUser && <UploadButton onChange={onChange} isIconButton />}
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
                        {userProfile?.fullName}
                     </Typography>
                     {isLoggedInUser ? (
                        <EditProfile handleUpdateUser={handleUpdateUser} />
                     ) : (
                        <>
                           {friend === null ? (
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
                                 {friend?.status === 2 ? (
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
                  <TabDefault userId={userProfile?._id} />
               </Box>
            </Box>
         )}
      </>
   );
};

ProfileTop.propTypes = {
   userProfile: PropTypes.object.isRequired,
   friend: PropTypes.object.isRequired,
   onChange: PropTypes.func.isRequired,
   handleUpdateUser: PropTypes.func.isRequired,
   handleSendFriend: PropTypes.func.isRequired,
   handleAcceptFriend: PropTypes.func.isRequired,
   handleRemoveFriend: PropTypes.func.isRequired,
};

export default ProfileTop;
