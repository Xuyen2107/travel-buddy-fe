import { useState } from "react";
import { Avatar, Box, Button, CardActions, CardContent, CardHeader, Divider, IconButton, Menu, MenuItem, Modal, Typography } from "@mui/material";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { BoxColumn, BoxFlexBetween, PaperCenter } from "../../styles/index";
import PostImage from "../PostImage";
import { useNavigate } from "react-router-dom";

const Post = ({ post, commentNumber, onClick }) => {
   const [expanded, setExpanded] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [openModal, setOpenModal] = useState(false);
   const [confirmOpen, setConfirmOpen] = useState(false);
   const open = Boolean(anchorEl);
   const navigate = useNavigate();
   const MAX_CHARACTERS = 100;
   const { userLogin } = useSelector((state) => state.auth);
   const isLength = post?.content.length > MAX_CHARACTERS;
   const isLiked = post.likes.includes(userLogin?._id);
   const likeNumber = post?.likes.length;

   const toggleExpanded = () => setExpanded(true);
   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleClose = () => setAnchorEl(null);

   const handleOpenModal = () => setOpenModal(true);
   const handleCloseModal = () => setConfirmOpen(true);
   const handleConfirmClose = () => setConfirmOpen(close);
   const handleCloseAllModal = () => {
      setOpenModal(false);
      setConfirmOpen(false);
   };

   const milestone = post?.vacation?.milestones?.find((x) => x?._id === post?.milestone);

   return (
      <BoxColumn sx={{ gap: "0", padding: "0", boxShadow: 4, width: "500px", borderRadius: "10px" }}>
         <CardHeader
            sx={{ width: "100%" }}
            avatar={
               <Avatar
                  onClick={() => {
                     navigate(`/profile/${post?.author?._id}`);
                  }}
                  sx={{ width: "50px", height: "50px", border: "1px solid", cursor: "pointer" }}
                  src={post?.author?.avatar}
                  alt="avatar"
               />
            }
            action={
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
                     <MenuItem onClick={handleClose}>Xóa bài viết</MenuItem>
                  </Menu>
               </>
            }
            title={
               <Typography
                  onClick={() => {
                     navigate(`/profile/${post?.author?._id}`);
                  }}
                  sx={{ fontSize: "20px", fontWeight: "500", cursor: "pointer" }}
               >
                  {post?.author?.fullName}
               </Typography>
            }
            subheader="September 14, 2016"
         />

         <CardContent sx={{ pt: "0", width: "100%" }}>
            <Typography fontWeight="600" variant="body1">
               Kì nghỉ:{" "}
               <Typography
                  variant="body2"
                  component="label"
                  sx={{
                     cursor: "pointer",
                     borderBottom: "1px solid",
                  }}
               >
                  {post?.vacation?.title}
               </Typography>
            </Typography>
            <Typography fontWeight="600" variant="body1">
               Cột mốc hành trình:{" "}
               <Typography
                  variant="body2"
                  component="label"
                  sx={{
                     cursor: "pointer",
                     borderBottom: "1px solid",
                  }}
               >
                  {milestone?.time}
                  {" - "}
                  {milestone?.description}
               </Typography>
            </Typography>
            <Typography variant="body1">
               {isLength && expanded ? `${post?.content.slice(0, MAX_CHARACTERS)}...` : post?.content}

               {isLength && !expanded && (
                  <Box
                     component="label"
                     onClick={toggleExpanded}
                     sx={{
                        cursor: "pointer",
                        borderBottom: "1px solid",
                        fontWeight: "500 ",
                     }}
                  >
                     Xem thêm
                  </Box>
               )}
            </Typography>
         </CardContent>
         <PostImage images={post?.images} />
         <Divider sx={{ width: "100%" }} />
         <CardActions
            sx={{
               width: "100%",
               justifyContent: "space-between",
               pt: "0",
               pb: "0",
            }}
         >
            <BoxFlexBetween gap="0.3rem">
               <IconButton onClick={onClick}>{isLiked ? <FavoriteOutlined sx={{ color: "red" }} /> : <FavoriteBorderOutlined />}</IconButton>
               {likeNumber > 0 && <Typography>{likeNumber}</Typography>}
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
         <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <PaperCenter>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
               </Typography>
               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
               </Typography>
            </PaperCenter>
         </Modal>
         <Modal open={confirmOpen} onClose={handleConfirmClose}>
            <PaperCenter sx={{ width: "300px", p: "20px" }}>
               <Typography variant="h6">Bạn đang chỉnh sửa bài viết?</Typography>
               <Button onClick={handleCloseAllModal}>Thoát</Button>
               <Button onClick={handleConfirmClose}>Tiếp tục chỉnh sửa</Button>
            </PaperCenter>
         </Modal>
      </BoxColumn>
   );
};

Post.propTypes = {
   post: PropTypes.object.isRequired,
   onClick: PropTypes.func.isRequired,
};

export default Post;
