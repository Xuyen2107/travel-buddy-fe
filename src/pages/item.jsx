import { Box } from "@mui/material";
import React from "react";

const Item = () => {
   return (
      <Box sx={{ display: "flex", overflow: "hidden", maxHeight: "100vh" }}>
         <Box sx={{ bgcolor: "red", width: "100%", height: "1000px", overflowY: "auto", maxHeight: "100vh" }}>
            {/* Nội dung có thể cuộn */}
            {Array.from({ length: 200 }).map((_, index) => (
               <div key={index}>Item {index + 1}</div>
            ))}
         </Box>
         <Box sx={{ bgcolor: "blue", width: "100%", height: "1000px", overflowY: "auto", maxHeight: "100vh" }}>
            {/* Nội dung có thể cuộn */}
            {Array.from({ length: 200 }).map((_, index) => (
               <div key={index}>Item {index + 1}</div>
            ))}
         </Box>
      </Box>
   );
};

export default Item;
