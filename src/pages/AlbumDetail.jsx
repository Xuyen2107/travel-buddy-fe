import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Avatar, IconButton } from "@mui/material";
import { albumAPI } from "../services/api.js";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AlbumDetails = ({ albumId }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Gọi API khi component được mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Sử dụng Axios để gọi API
      const response = await albumAPI.getAllByUser();
      console.log("🚀 ~ file: AlbumDetail.jsx:17 ~ fetchData ~ response:", response.data.docs);

      // Lấy dữ liệu từ response và cập nhật state
      setAlbums(response.data.docs);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error fetching data:", error);
    }
  };

  if (!albums || albums.length === 0) return <div>Loading albums...</div>;

  return (
    <Container>
       {albums.map((album) => (
        <Card key={album?._id} sx={{ marginBottom: '16px' }}>
          <Box sx={{ width:"200px", height:'200px',overflow: 'hidden' , margin: "auto" }}>
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              image={album?.images[0]} // Assuming the first image in the array
              alt={album?.nameAlbum} 
              sx={{ objectFit: "cover", borderRadius: '50%'}}
            />
          </Box>
          <CardContent>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Avatar src={album?.author?.avatar} alt="Author Avatar" />
              <Typography variant="h6" sx={{ marginLeft: '8px' }}>
                {album?.author?.fullName}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box> */}
            <Typography variant="h5" component="div" textAlign={"center"}>
              {album?.nameAlbum}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {album?.vacation}
            </Typography>
            <Grid container spacing={2}>
              {album?.images.map((image, index) => (
                <Grid item xs={6} key={index}>
                  <img src={image} alt={album.nameAlbum} style={{ width: '100%', borderRadius: '8px',  height: "200px" }} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default AlbumDetails;