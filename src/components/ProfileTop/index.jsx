import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SendIcon from "@mui/icons-material/Send";
import UploadButton from "../UploadButton";
import FlexBetween from "../BoxFlexBetween";
import TabDefault from "../Tab";
import EditProfile from "../EditProfile";

const ProfileTop = () => {
   const navigate = useNavigate();
   const loggedInUserID = useSelector((state) => state.auth.user?._id);
   const userID = useParams();
   const isLoggedInUser = true;
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");
   const isFriend = true;

   return (
      <>
         <Box
            maxWidth="60rem"
            height={isNonMobileScreens ? "30rem" : "35rem"}
            margin="auto"
            borderRadius={"0 0 10px 10px"}
            sx={{
               boxShadow: "0 0 5px 1px",
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
                     src="https://cafefcdn.com/zoom/600_315/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg"
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
                  Pham Hoang Xuyen
               </Typography>
               {isLoggedInUser ? (
                  <EditProfile />
               ) : (
                  <>
                     {!isFriend ? (
                        <Button variant="contained">
                           <FlexBetween gap="0.25rem">
                              <PersonAddIcon />
                              <Typography sx={{ textTransform: "capitalize" }}>Kết bạn</Typography>
                           </FlexBetween>
                        </Button>
                     ) : (
                        <FlexBetween gap="1rem">
                           <Button variant="outlined">
                              <FlexBetween gap="0.25rem">
                                 <PersonRemoveIcon />
                                 <Typography sx={{ textTransform: "capitalize" }}>Hủy kết bạn</Typography>
                              </FlexBetween>
                           </Button>
                           <Button variant="contained" endIcon={<SendIcon />}>
                              {isNonMobileScreens ? "Gửi tin nhắn" : ""}
                           </Button>
                        </FlexBetween>
                     )}
                  </>
               )}
            </Box>
            <TabDefault />
         </Box>
      </>
   );
};

export default ProfileTop;
