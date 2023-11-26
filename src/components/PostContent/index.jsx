import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const PostContent = ({ content, index }) => {
   const [expanded, setExpanded] = useState(false);

   const toggleExpanded = () => {
      setExpanded(!expanded);
   };

   return (
      <Box
         component="p"
         sx={{
            fontSize: "16px",
            width: "100%",
         }}
      >
         <Typography
            variant="body2"
            color="textSecondary"
            noWrap={!expanded}
            sx={{
               overflow: "hidden",
               textOverflow: "ellipsis",
               display: "-webkit-box",
               WebkitBoxOrient: "vertical",
               WebkitLineClamp: expanded ? "unset" : 2,
            }}
         >
            {content}
         </Typography>
         {!expanded && (
            <Button onClick={toggleExpanded} size="small">
               Xem thêm
            </Button>
         )}
      </Box>
   );
};

PostContent.propTypes = {
   content: PropTypes.string.isRequired,
   index: PropTypes.number.isRequired,
};

export default PostContent;
