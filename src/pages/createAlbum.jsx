import React, { useState } from "react";
import { Container, Typography, FormControl, InputLabel, Input, Button, IconButton, Grid, Card, CardMedia,Select, MenuItem  } from "@mui/material";
import { Delete } from "@mui/icons-material";
import UploadButton from "../components/UploadButton/index.jsx";
import { albumAPI } from "../services/api.js";

const CreateAlbum = () => {
  const [album, setAlbum] = useState({
    nameAlbum: "",
    vacation: "",
    privacy: "public",
    createdAt: new Date(),
    images: [],
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    // Use FileReader to read and display images
    const promises = filesArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve({ image: e.target.result, file });
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((images) => {
      setAlbum({
        ...album,
        images: [...album.images, ...images],
      });
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...album.images];
    updatedImages.splice(index, 1);
    setAlbum({
      ...album,
      images: updatedImages,
    });
  };

  const handlePrivacyChange = (e) => {
    const privacyValue = e.target.value;
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      privacy: privacyValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await albumAPI.create({ ...album, images: album.images.map((img) => img.file) });

      alert("Album được tạo thành công!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        Tạo album
      </Typography>
      <form onSubmit={handleSubmit}>

      <FormControl  variant="standard"fullWidth sx={{ mb: 2 }}>
  <InputLabel htmlFor="privacy">Quyền riêng tư</InputLabel>
  <Select
    id="privacy"
    value={album.privacy}
    onChange={handlePrivacyChange}
  >
    <MenuItem value="public">Công khai</MenuItem>
    <MenuItem value="private">Một mình tôi</MenuItem>
  </Select>
</FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
        
          <InputLabel htmlFor="album-name">Tên album</InputLabel>
          <Input
            id="album-name"
            value={album.nameAlbum}
            onChange={(e) => setAlbum({ ...album, nameAlbum: e.target.value })}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="vacation">Kỳ nghỉ</InputLabel>
          <Input
            id="vacation"
            value={album.vacation}
            onChange={(e) => setAlbum({ ...album, vacation: e.target.value })}
          />
        </FormControl>

       
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="images"></InputLabel>
          <UploadButton handleFileChange={handleFileChange} /> 
        </FormControl>

        <Grid container spacing={2}>
          {album.images.map((image, index) => (
            <Grid item xs={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt={`Image ${index + 1}`}
                  src={image.image}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    padding: "4px",
                    zIndex: 1,
                  }}
                >
                  <Delete color="error" />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>


        <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Tạo
        </Button>
      </form>
    </Container>
  );
};

export default CreateAlbum;
