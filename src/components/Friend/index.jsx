import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton, Menu, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import FlexBetween from "../BoxFlexBetween";
import UserImage from "../UserImage";
import { useDispatch, useSelector } from "react-redux";
import { postAPI, userAPI } from "../../services/api";
import { setFriendProfileUser, setFriendUser } from "../../redux/authSlice";

const Friend = ({ name, avatarUrl, postId, friendId, isFriendListWidget = false }) => {
   const [isDeleteMenuOpen, setDeleteMenuOpen] = useState(null);
   const isNonMobileScreen = useMediaQuery("(min-width: 1050px)");
   const { palette } = useTheme();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const profileId = useParams().userId;
   const { _id, friends } = useSelector((state) => state.auth.user);
   const isFriend = friends.find((friend) => friend === profileId);
   const isUser = _id === profileId;

   const addRemoveFriend = async () => {
      try {
         const response = await userAPI.addRemoveFriend(profileId);
         const { user, friend } = response.data;
         dispatch(setFriendUser(user));
         dispatch(setFriendProfileUser(friend));
      } catch (error) {
         console.log(error);
      }
   };

   const deletePost = async () => {
      try {
         await postAPI.remove(postId);
         dispatch(deletePost(postId));
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <FlexBetween>
         <FlexBetween gap="1rem">
            <UserImage avatarUrl={avatarUrl} size="55px" />
            <Box
               onClick={() => {
                  navigate(`/profile/${friendId}`);
               }}
            >
               <Typography
                  variant="h5"
                  fontWeight="500"
                  sx={{
                     "&:hover": {
                        cursor: "pointer",
                     },
                  }}
               >
                  {name}
               </Typography>
               {/* <Typography fontSize="0.75rem">1 giờ trước</Typography> */}
            </Box>
         </FlexBetween>
         {isUser ? (
            <>
               {!isFriendListWidget && (
                  <Box>
                     <IconButton onClick={(e) => setDeleteMenuOpen(e.currentTarget)}>
                        {isNonMobileScreen ? <MoreHorizIcon fontSize="large" /> : <MoreHorizIcon fontSize="medium" />}
                     </IconButton>
                     <Menu
                        id="delete-menu"
                        anchorEl={isDeleteMenuOpen}
                        open={Boolean(isDeleteMenuOpen)}
                        onClose={() => setDeleteMenuOpen(null)}
                        MenuListProps={{
                           "aria-labelledby": "basic-button",
                        }}
                     >
                        <MenuItem onClick={deletePost}>Xóa bài viết</MenuItem>
                     </Menu>
                  </Box>
               )}
            </>
         ) : (
            <IconButton sx={{ p: "0.6rem" }} onClick={addRemoveFriend}>
               {isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
            </IconButton>
         )}
      </FlexBetween>
   );
};

export default Friend;
