import { Avatar, Box, Button, Typography } from "@mui/material";

const ScreenComment = () => {
   return (
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
         <Avatar sx={{ flexShrink: 0, width: "40px", height: "40px" }} />
         <Box>
            <Box sx={{ bgcolor: "background.input", p: "10px", borderRadius: "20px" }}>
               <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  Phạm Hoàng Xuyên
               </Typography>
               <Typography variant="body1" sx={{ fontWeight: "400" }}>
                  Content
               </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", ml: "10px" }}>
               <Typography variant="caption">time</Typography>
               <Typography variant="caption">
                  <Button disableRipple  variant="text" sx={{ padding: 0, textTransform: "none", fontSize: "0.75rem" }}>
                     Phản hồi
                  </Button>
               </Typography>
            </Box>
         </Box>
      </Box>
   );
};

export default ScreenComment;
