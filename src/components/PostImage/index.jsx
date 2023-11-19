import PropTypes from "prop-types";
import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PostImage = ({ images }) => {
   return (
      <Box width="100%">
         {images && (
            <Carousel animation="slide" indicators={true} navButtonsAlwaysVisible={true} fullHeightHover={false} autoPlay={false}>
               {images.map((imageUrl, idx) => (
                  <Paper
                     key={idx}
                     sx={{
                        position: "relative",
                        height: "300px",
                        overflow: "hidden",
                     }}
                  >
                     <img
                        src={imageUrl}
                        alt="item"
                        style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "cover",
                        }}
                     />
                  </Paper>
               ))}
            </Carousel>
         )}
      </Box>
   );
};

PostImage.propTypes = {
   images: PropTypes.array,
};

export default PostImage;
