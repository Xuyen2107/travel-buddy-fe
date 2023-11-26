import { Avatar, Box, Button, CardActions, CardHeader, CardMedia, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
import { BoxColumn, BoxFlexBetween, ButtonRadius, TypographyWrap } from "../../styles";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ScreenVacation = ({ vacation, commentNumber, handleOpenModal, handleRemoveVacation, handleCreatePost, handleLikeVacation }) => {
   const { userLogin } = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleClose = () => setAnchorEl(null);
   const isLiked = vacation?.likes?.includes(userLogin?._id);
   const isUserLogin = userLogin?._id === vacation?.author?._id;
   
   return (
      <BoxColumn
         sx={{
            bgcolor: "background.paper",
            boxShadow: 4,
            width: "600px",
            borderRadius: "10px",
            gap: "10px",
            p: "10px",
         }}
      >
         <CardHeader
            sx={{ width: "100%", p: 0 }}
            avatar={
               <Avatar
                  onClick={() => {
                     navigate(`/profile/${vacation?.author?._id}`);
                  }}
                  sx={{ width: "50px", height: "50px", border: "1px solid", cursor: "pointer" }}
                  src={vacation?.author?.avatar}
                  alt="avatar"
               />
            }
            action={
               isUserLogin && (
                  <>
                     <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                     </IconButton>
                     <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ p: 0 }}>
                        <MenuItem
                           onClick={() => {
                              handleClose();
                              handleOpenModal();
                           }}
                        >
                           Chỉnh sửa bài viết
                        </MenuItem>
                        <MenuItem
                           onClick={() => {
                              handleClose();
                              handleRemoveVacation();
                           }}
                        >
                           Xóa bài viết
                        </MenuItem>
                     </Menu>
                  </>
               )
            }
            title={
               <Typography
                  onClick={() => {
                     navigate(`/profile/${vacation?.author?._id}`);
                  }}
                  variant="h6"
                  sx={{ cursor: "pointer", width: "max-content" }}
               >
                  {vacation?.author?.fullName}
               </Typography>
            }
            subheader="September 14, 2016"
         />
         <Box sx={{ display: "flex", width: "100%", gap: "10px", alignItems: "flex-start" }}>
            <CardMedia
               component="img"
               image={vacation?.avatarVacation}
               alt="Ảnh"
               sx={{
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
               }}
            />

            <Box sx={{ width: "100%" }}>
               <BoxFlexBetween gap={1}>
                  <Typography variant="body1" fontWeight={500}>
                     Kì nghỉ:
                  </Typography>
                  <TypographyWrap variant="body1"> {vacation?.title}</TypographyWrap>
               </BoxFlexBetween>
               <BoxFlexBetween gap={1}>
                  <Typography variant="body1" fontWeight={500}>
                     Mô tả:
                  </Typography>
                  <Typography variant="body1" sx={{ flexWrap: "wrap" }}>
                     {vacation?.description}
                  </Typography>
               </BoxFlexBetween>
               <BoxFlexBetween gap={1}>
                  <Typography variant="body1" fontWeight={500}>
                     Thời gian:
                  </Typography>
                  <Typography variant="body1">
                     {vacation?.startDay}
                     {" - "}
                     {vacation?.endDay}
                  </Typography>
               </BoxFlexBetween>

               <BoxFlexBetween sx={{ alignItems: "flex-start", gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, flexShrink: 0 }}>
                     Lịch trình:
                  </Typography>
                  <BoxColumn>
                     {vacation?.milestones?.slice(0, 2).map((item) => (
                        <BoxFlexBetween key={item._id} gap={1}>
                           <TypographyWrap variant="body1">
                              {item?.time}
                              {": "}
                              {item?.description}{" "}
                           </TypographyWrap>
                           <ButtonRadius key={item._id} onClick={handleCreatePost} startIcon={<PostAddIcon />} sx={{ p: 0 }} />
                        </BoxFlexBetween>
                     ))}
                     {vacation?.milestones?.length > 2 && <Typography>...</Typography>}
                  </BoxColumn>
               </BoxFlexBetween>
               <BoxFlexBetween gap={1}>
                  <Typography variant="body1" fontWeight={500}>
                     Số lượng người tham gia:
                  </Typography>
                  <Typography>{vacation?.listUsers?.length}</Typography>
               </BoxFlexBetween>

               <Button
                  variant="text"
                  sx={{
                     textTransform: "none",
                     p: 0,
                  }}
               >
                  <Button
                     onClick={() => {
                        navigate(`/vacation/${vacation?._id}`);
                     }}
                     variant="text"
                     sx={{ textTransform: "none", p: 0 }}
                  >
                     Xem chi tiết...
                  </Button>
               </Button>
            </Box>
         </Box>
         <CardActions
            sx={{
               width: "100%",
               justifyContent: "space-between",
               pt: "0",
               pb: "0",
            }}
         >
            <BoxFlexBetween gap="0.3rem">
               <IconButton onClick={() => handleLikeVacation(vacation?._id)}>
                  {isLiked ? <FavoriteOutlined sx={{ color: "red" }} /> : <FavoriteBorderOutlined />}
               </IconButton>
               {vacation?.likes.length > 0 && <Typography>{vacation?.likes?.length}</Typography>}
            </BoxFlexBetween>
            <BoxFlexBetween gap="0.3rem">
               <IconButton>
                  <ChatBubbleOutlineOutlined />
               </IconButton>
               {commentNumber > 0 && <Typography>{commentNumber}</Typography>}
            </BoxFlexBetween>
            <IconButton aria-label="share">
               <ShareIcon />
            </IconButton>
         </CardActions>
      </BoxColumn>
   );
};

ScreenVacation.propTypes = {
   vacation: PropTypes.object.isRequired,
   handleLikeClick: PropTypes.func.isRequired,
   handleOpenModal: PropTypes.func.isRequired,
   handleRemoveVacation: PropTypes.func.isRequired,
};

export default ScreenVacation;
