import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Box, Button, CircularProgress, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import TimeAgo from "../TimeAgo";
import { BoxFlexBetween } from "../../styles";
import ScreenReplyComment from "../ScreenReplyComment";
import { useCrudApi } from "../../hooks";
import { replyCommentAPI } from "../../apis";
import CommentForm from "../FromComment";
import Grid from "@mui/material/Unstable_Grid2";

const ScreenComment = ({ comment }) => {
   //================================================================
   const [anchorEl, setAnchorEl] = useState(null);
   const [showFormComment, setShowFormComment] = useState(false);
   const [page, setPage] = useState(1);
   const [number, setNumber] = useState(0);
   const [replyComment, setReplyComment] = useState([]);
   const [update, setUpdate] = useState(false);
   //================================================================
   const inputRef = useRef(null);
   const open = Boolean(anchorEl);
   const { data: dataReply, loading: loadingReply, fetchData: fetchDataReply } = useCrudApi(replyCommentAPI.getCommentsById);
   //================================================================
   useEffect(() => {
      fetchDataReply(comment._id, page, 5);
   }, []);

   useEffect(() => {
      if (showFormComment === true) {
         handleInputRef();
      }
   }, [showFormComment]);

   useEffect(() => {
      if (dataReply) {
         const data = dataReply.docs;
         setReplyComment((replyComment) => [...replyComment, ...data]);
      }
   }, [dataReply]);

   useEffect(() => {
      if (replyComment.length > 0) {
         const dataNumber = dataReply.totalDocs;
         setNumber(dataNumber - replyComment.length);
      }
   }, [replyComment]);

   useEffect(() => {
      if (page > 1) {
         fetchDataReply(comment._id, page, 5);
      }
   }, [page]);
   //================================================================
   const handleClose = () => setAnchorEl(null);
   const handleCountPage = () => setPage((page) => page + 1);
   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleShowFormComment = () => setShowFormComment((showFormComment) => !showFormComment);
   const handleInputRef = () => {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
   };

   return (
      <Box>
         {update === true ? (
            <CommentForm
               typeSubmit="updateComment"
               commentContent={comment.commentContent}
               // onProcessDone={async () => {
               //    setAllComments([]);
               //    await fetchDataComment(vacationId, 1, 10);
               // }}
            />
         ) : (
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: "10px", mb: "5px" }}>
               <Avatar
                  src={comment?.author?.avatar}
                  component={Link}
                  to={`/profile/${comment?.author?._id}`}
                  sx={{ flexShrink: 0, width: "40px", height: "40px" }}
               />
               <Box>
                  <Box sx={{ bgcolor: "background.input", p: "8px", borderRadius: "18px" }}>
                     <BoxFlexBetween sx={{ gap: "10px" }}>
                        <Typography
                           variant="caption"
                           component={Link}
                           to={`/profile/${comment?.author?._id}`}
                           sx={{ fontWeight: "600", color: "text.primary" }}
                        >
                           {comment?.author?.fullName}
                        </Typography>
                        <IconButton onClick={handleClick} disableRipple sx={{ padding: 0 }}>
                           <MoreHorizIcon />
                        </IconButton>
                     </BoxFlexBetween>

                     <Typography variant="body2">{comment?.commentContent}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px", ml: "10px" }}>
                     <Typography variant="caption">
                        <TimeAgo date={comment?.createdAt} />
                     </Typography>
                     <Typography
                        onClick={handleShowFormComment}
                        variant="caption"
                        sx={{ cursor: "pointer", lineHeight: 1.1, "&:hover": { borderBottom: "1px solid" } }}
                     >
                        Trả lời
                     </Typography>
                  </Box>
               </Box>
               <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                  sx={{ "& .MuiMenu-list": { p: 0 } }}
               >
                  <MenuItem onClick={handleClose} sx={{ fontSize: "14px" }}>
                     Xóa bình luận
                  </MenuItem>
                  <MenuItem
                     onClick={() => {
                        handleClose;
                        setUpdate(true);
                     }}
                     sx={{ fontSize: "14px" }}
                  >
                     Chỉnh sửa bình luận
                  </MenuItem>
               </Menu>
            </Box>
         )}
         <Box sx={{ ml: "50px" }}>
            <Grid container spacing={0}>
               {replyComment.length > 0 &&
                  replyComment.map((item) => (
                     <Grid xs={12} key={item._id}>
                        <ScreenReplyComment comment={item} onclick={handleShowFormComment} />{" "}
                     </Grid>
                  ))}
               {loadingReply === true && (
                  <Grid xs={12}>
                     <CircularProgress disableShrink size="20px" />
                  </Grid>
               )}
               {number > 0 && (
                  <Button onClick={handleCountPage} variant="text" disableRipple sx={{ p: 0 }}>
                     Xem thêm {number} bình luận
                  </Button>
               )}
               {showFormComment === true && (
                  <Grid xs={12}>
                     <CommentForm
                        typeSubmit="createReply"
                        inputRef={inputRef}
                        commentId={comment._id}
                        onProcessDone={() => fetchDataReply(comment._id, page, 5)}
                     />
                  </Grid>
               )}
            </Grid>
         </Box>
      </Box>
   );
};

ScreenComment.propTypes = {
   comment: PropTypes.object.isRequired,
};

export default ScreenComment;
