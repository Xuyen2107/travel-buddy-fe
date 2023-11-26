import { useEffect, useState } from "react";
import { Card, CardActionArea, Menu, CardContent, MenuItem, Typography, IconButton, Avatar, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { albumAPI } from "../services/api.js";
import Post from "../components/Post/index.jsx";

const AlbumPost = () => {
   const [data, setData] = useState(null);
   const [anchorEl, setAnchorEl] = useState(null);

   useEffect(() => {
      // Gọi API khi component được mount
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         // Sử dụng Axios để gọi API
         const response = await albumAPI.getAll();
         

         // Lấy dữ liệu từ response và cập nhật state
         setData(response.data.docs);
      } catch (error) {
         // Xử lý lỗi nếu có
         console.error("Error fetching data:", error);
      }
   };

   const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleUpdate = async (albumId) => {
      try {
         const response = await albumAPI.update(albumId);
         console.log("Update response:", response);
         fetchData();
      } catch (error) {
         console.error("Error updating album:", error);
      }
      handleMenuClose();
   };

   const handleDelete = async (albumId) => {
      try {
         const response = await albumAPI.remove(albumId);
         console.log("Delete response:", response);
         fetchData();
      } catch (error) {
         console.error("Error deleting album:", error);
      }
      handleMenuClose();
   };
   return (
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
         {data?.map((albumData) => (
            <Card key={albumData?.id} sx={{ marginBottom: "8px", border: "1px solid #000" }}>
               <CardActionArea>
                  <Box sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid #000", padding: "12px" }}>
                     <Avatar src={albumData?.author?.avatar} alt="Author Avatar" />
                     <Box sx={{ marginLeft: "12px" }}>
                        <Typography variant="h6">{albumData?.author?.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                           {albumData?.isPublic}
                        </Typography>
                     </Box>
                     <IconButton sx={{ marginLeft: "auto" }} onClick={handleMenuClick}>
                        <MoreVertIcon />
                     </IconButton>
                     <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleUpdate(albumData.id)}>Update</MenuItem>
                        <MenuItem onClick={() => handleDelete(albumData.id)}>Delete</MenuItem>
                     </Menu>
                  </Box>
                  <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                        {albumData?.nameAlbum}
                     </Typography>
                     <Typography variant="subtitle1">Vacation: {albumData.vacation}</Typography>
                     {/* Add more details as needed */}
                  </CardContent>
               </CardActionArea>

               <CardActionArea>
                  <Post images={albumData.images} />
               </CardActionArea>
            </Card>
         ))}
      </Box>
   );
};

export default AlbumPost;
