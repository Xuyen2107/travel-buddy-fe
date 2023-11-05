import { useState, useEffect } from "react";
import Post from "/src/components/Post/index";
import { Box } from "@mui/material";
import axios from "axios";

const Feed = () => {
   const [images, setImages] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get("http://localhost:3001/api/v1/post?page=3", {
               headers: {
                  "x-access-token":
                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQwZWEwNjM3NzEzNzA3N2UzNWFhYjkiLCJpYXQiOjE2OTkyMDg1MDAsImV4cCI6MTY5OTQ2NzcwMH0.okB44efg67cY_7r-D1HoRZ4KOZh4aPM0NDBiqEqsqtE",
               },
            });

            setImages(response.data.data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchData();
   }, []);
   console.log(images);
   return (
      <Box flex={4} p={2}>
         {images?.map((image) => image.images.map((item) => <Post key={image.id} imageUrl={item} />))}
      </Box>
   );
};
export default Feed;
