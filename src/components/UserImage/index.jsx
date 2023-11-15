import { Box } from "@mui/material";
import PropTypes from "prop-types";

const UserImage = ({ avatarUrl, size = "60px" }) => {
   return (
      <Box
         width={size}
         height={size}
         sx={{
            borderRadius: "50%",
            overflow: "hidden",
         }}
      >
         <img
            style={{
               objectFit: "cover",
               width: "100%",
               height: "100%",
            }}
            alt="user"
            src={avatarUrl}
         />
      </Box>
   );
};

UserImage.propTypes = {
   avatarUrl: PropTypes.string,
   size: PropTypes.string,
};

export default UserImage;
