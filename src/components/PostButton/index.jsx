import PropTypes from "prop-types";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import FlexBetween from "../BoxFlexBetween";

const PostBottom = ({ isLiked, likeNumber, commentNumber }) => {
   return (
      <FlexBetween width="100%">
         <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
               <IconButton>{isLiked ? <FavoriteOutlined sx={{ color: "red" }} /> : <FavoriteBorderOutlined />}</IconButton>
               {likeNumber > 0 && <Typography>{likeNumber}</Typography>}
            </FlexBetween>
            <FlexBetween gap="0.3rem">
               <IconButton>
                  <ChatBubbleOutlineOutlined />
               </IconButton>
               {commentNumber > 0 && <Typography>{commentNumber}</Typography>}
            </FlexBetween>
         </FlexBetween>
         <IconButton>
            <ShareOutlined />
         </IconButton>
      </FlexBetween>
   );
};

PostBottom.propTypes = {
   isLiked: PropTypes.bool,
   likeNumber: PropTypes.number,
   commentNumber: PropTypes.number,
};

export default PostBottom;
