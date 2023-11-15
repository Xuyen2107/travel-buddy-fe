import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import FlexBetween from "../BoxFlexBetween";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import Friend from "../Friend";

const images = [
   "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
   "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg",
];

const Post = () => {
   const { palette } = useTheme();
   const isLiked = true;
   return (
      <Box width={500} bgcolor={palette.background.paper}>
         <Friend
            avatarUrl="https://res.cloudinary.com/dcgytjpvn/image/upload/v1699729127/Travel_Buddy/bdxpefesaywy653wxx8n.jpg"
            name="Pham Hoang Xuyen"
            // isFriendListWidget
         />
         <Carousel
            animation="slide"
            indicators={true}
            timeout={500}
            navButtonsAlwaysVisible={true}
            fullHeightHover={false}
            sx={{
               flexGrow: 1,
               margin: "auto",
               mt: 5,
            }}
         >
            {images.map((imageUrl, i) => (
               <Item key={i} imageUrl={imageUrl} />
            ))}
         </Carousel>
         <FlexBetween mt="0.25rem" width="100%">
            <FlexBetween gap="1rem">
               <FlexBetween gap="0.3rem">
                  <IconButton>{isLiked ? <FavoriteOutlined sx={{ color: "red" }} /> : <FavoriteBorderOutlined />}</IconButton>
                  <Typography>1</Typography>
               </FlexBetween>

               <FlexBetween gap="0.3rem">
                  <IconButton>
                     <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>1</Typography>
               </FlexBetween>
            </FlexBetween>

            <IconButton>
               <ShareOutlined />
            </IconButton>
         </FlexBetween>
      </Box>
   );
};

function Item({ imageUrl }) {
   return (
      <Paper
         sx={{
            position: "relative",
            height: "500px",
            overflow: "hidden",
         }}
         elevation={10}
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
   );
}

export default Post;
