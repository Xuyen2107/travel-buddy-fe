import { useState, useEffect } from "react";

import {
   Box,
   Fab,
   Tooltip,
   Modal,
   styled,
   Typography,
   TextField,
   ButtonGroup,
   Button,
   Avatar,
   FormControl,
   InputLabel,
   NativeSelect,
   Divider,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { authAPI, albumAPI } from "../services/api";
import AlbumPost from "./AlbumPost";
import UploadButton from "../components/UploadButton";

const Add = () => {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [error, setError] = useState(null);
   const [selectedImages, setSelectedImages] = useState([]);
   const [postData, setPostData] = useState("");
   const [userInfo, setUserInfo] = useState(null);
   const [isPublic, setIsPublic] = useState("Công khai");
   const [postSuccess, setPostSuccess] = useState(false);
   const [albumData, setAlbumData] = useState(null);
   const [newPost, setNewPost] = useState(null);

   const handleFileChange = (e) => {
      const files = e.target.files;
      setSelectedImages(Array.from(files));
   };

   const handlePost = async () => {
      const formData = new FormData();
      formData.append("data", postData);

      // Thêm tất cả các tệp tin đã chọn vào FormData
      selectedImages.forEach((file, index) => {
         formData.append(`file${index + 1}`, file);
      });

      try {
         const response = await albumAPI.create(formData);
         setAlbumData(response.data);
         setPostSuccess(true);
         setNewPost(response.data);
         handleClose();
      } catch (error) {
         console.error("Lỗi khi đăng bài:", error);

         if (error.response && error.response.data) {
            setError(error.response.data.message);
         } else {
            setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
         }
      }
   };

   useEffect(() => {
      const dataPost = async () => {
         try {
            const response = await albumAPI.create();

            setPostData(response.data);
         } catch (error) {
            console.error("Lỗi khi người dùng đăng bài:", error);
         }
      };

      dataPost();
   }, []);

   useEffect(() => {
      // Gọi API để lấy thông tin người dùng khi component được tạo
      const fetchUserInfo = async () => {
         try {
            const response = await authAPI.authInfo();

            setUserInfo(response.data);
            setIsPublic(response.data.isPublic || "Công khai");
         } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
         }
      };

      fetchUserInfo();
   }, []);

   const StyledModal = styled(Modal)({
      display: "grid",
      placeItems: "center",
   });

   const StyledBox = {
      width: 460,
      padding: 5,
      borderRadius: 5,
      bgcolor: "background.default",
   };

   const UserBox = styled(Box)({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
   });

   const SelectContainer = styled(Box)({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
   });

   const StyledFab = styled(Fab)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" && "#fff",
      color: theme.palette.mode === "dark" && theme.palette.secondary.main,
      "&:hover": {
         backgroundColor: theme.palette.mode === "dark" && "darkgray",
         color: theme.palette.mode === "dark" && theme.palette.primary.contrastText,
      },
   }));

   return (
      <>
         {postSuccess ? (
            <AlbumPost albumData={albumData} />
         ) : (
            <>
               <Tooltip
                  sx={{
                     position: "fixed",
                     bottom: 20,
                     left: { xs: "calc(50% - 25px)", md: 20 },
                  }}
               >
                  <StyledFab onClick={handleOpen} color="primary">
                     <AddIcon />
                  </StyledFab>
               </Tooltip>
               <StyledModal open={open} onClose={handleClose}>
                  <Box sx={StyledBox}>
                     <Typography variant="h6" color="gray" textAlign="center" mb={2}>
                        Create Post
                     </Typography>
                     <Divider sx={{ margin: "20px" }} />
                     <UserBox>
                        {userInfo && <Avatar src={userInfo.avatar}></Avatar>}
                        {userInfo && (
                           <SelectContainer>
                              <Typography sx={{ marginBottom: "8px" }}>{userInfo.fullName}</Typography>
                              <FormControl sx={{ width: "120px" }}>
                                 {/* <InputLabel variant="standard">Public</InputLabel> */}
                                 <NativeSelect
                                    id="isPublic"
                                    sx={{ fontSize: "12px" }}
                                    value={isPublic}
                                    label="Privacy"
                                    onChange={(e) => setIsPublic(e.target.value)}
                                 >
                                    <option value="Công khai">Công khai</option>
                                    <option value="Một mình tôi">Một mình tôi</option>
                                 </NativeSelect>
                              </FormControl>
                           </SelectContainer>
                        )}
                     </UserBox>

                     <TextField
                        fullWidth
                        required
                        name="vacation"
                        type="text"
                        label="Vacation"
                        // value={}
                        // onChange={}
                        // onKeyDown={}
                        error={Boolean(error)}
                        helperText={error ? "Vacation is Required" : ""}
                        sx={{ marginTop: "12px" }}
                     />

                     <TextField
                        fullWidth
                        required
                        name="nameAlbum"
                        type="text"
                        label="nameAlbum"
                        // value={}
                        // onChange={}
                        // onKeyDown={}
                        error={Boolean(error)}
                        helperText={error ? "nameAlbum is Required" : ""}
                        sx={{ marginTop: "12px" }}
                     />
                     <TextField
                        fullWidth
                        id={userInfo ? userInfo._id.$oid : ""}
                        label={`Share Your Experience `}
                        variant="filled"
                        multiline
                        rows={3}
                        // onChange={}
                     />

                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           width: "100%",
                        }}
                     >
                        <UploadButton isImageButton handleFileChange={handleFileChange} />
                        <UploadButton isVideoButton />
                     </Box>

                     {error && (
                        <Typography variant="body2" color="error" gutterBottom>
                           {error}
                        </Typography>
                     )}
                     <Box>
                        <ul style={{ display: "flex" }}>
                           {selectedImages.map((selectedFile, index) => (
                              <li key={index} style={{ listStyle: "none", paddingLeft: "8px" }}>
                                 <img
                                    style={{ height: "80px", width: "75px" }}
                                    src={URL.createObjectURL(selectedFile)}
                                    alt={`Selected Image ${index}`}
                                 />
                              </li>
                           ))}
                        </ul>
                     </Box>

                     <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                        <Button onClick={handlePost} variant="contained">
                           Post
                        </Button>
                     </ButtonGroup>
                  </Box>
               </StyledModal>
            </>
         )}
      </>
   );
};
export default Add;
