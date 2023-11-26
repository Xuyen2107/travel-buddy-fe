import PropTypes from "prop-types";
import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const PostImage = ({ images }) => {
   return (
      <Box width="100%">
         {images.length > 1 ? (
            <Carousel animation="slide" indicators={true} navButtonsAlwaysVisible={true} fullHeightHover={false} autoPlay={false}>
               {images.map((imageUrl, idx) => (
                  <Box
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
                  </Box>
               ))}
            </Carousel>
         ) : (
            <Box
               sx={{
                  position: "relative",
                  height: "300px",
                  overflow: "hidden",
                  mb: "8px",
               }}
            >
               <img
                  src={images[0]}
                  alt="item"
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                  }}
               />
            </Box>
         )}
      </Box>
   );
};

PostImage.propTypes = {
   images: PropTypes.array,
};

export default PostImage;
