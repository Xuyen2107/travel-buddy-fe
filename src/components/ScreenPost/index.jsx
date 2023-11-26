import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { postAPI } from "../../services/api";
import PostTop from "../PostTop";
import PostContent from "../PostContent";
import PostImage from "../PostImage";
import PostBottom from "../PostButton";
import { BoxColumn } from "../../styles/index";

const Post = () => {
   const [posts, setPosts] = useState();
   console.log(posts);

   useEffect(() => {
      fetchDataPosts();
   }, []);

   const fetchDataPosts = async () => {
      try {
         const response = await postAPI.getAll();
         setPosts(response.data);
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
         }}
      >
         {posts &&
            posts.map((item, idx) => (
               <BoxColumn key={idx} width={500} boxShadow={4}>
                  <PostTop avatarUrl={item?.author?.avatar} name={item?.author?.fullName} time="1 phút trước" />
                  <PostContent content={item?.content} index={idx} />
                  <PostImage images={item?.images} />
                  <PostBottom />
               </BoxColumn>
            ))}
      </Box>
   );
};

export default Post;
