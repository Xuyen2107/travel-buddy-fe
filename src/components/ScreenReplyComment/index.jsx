import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import TimeAgo from "../TimeAgo";
import { BoxFlexBetween } from "../../styles";

const ScreenReplyComment = ({ comment, onclick }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClose = () => setAnchorEl(null);
   const handleClick = (event) => setAnchorEl(event.currentTarget);

   return (
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
         <Avatar
            src={comment?.author?.avatar}
            component={Link}
            to={`/profile/${comment?.author?._id}`}
            sx={{ flexShrink: 0, width: "40px", height: "40px" }}
         />{" "}
         <Box>
            <Box sx={{ bgcolor: "background.input", p: "8px", borderRadius: "18px" }}>
               <BoxFlexBetween sx={{ gap: "10px" }}>
                  <Typography
                     component={Link}
                     to={`/profile/${comment?.author?._id}`}
                     variant="caption"
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
               <Typography onClick={onclick} variant="caption" sx={{ cursor: "pointer", lineHeight: 1.1, "&:hover": { borderBottom: "1px solid" } }}>
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
         </Menu>
      </Box>
   );
};

ScreenReplyComment.propTypes = {
   comment: PropTypes.object.isRequired,
};

export default ScreenReplyComment;
