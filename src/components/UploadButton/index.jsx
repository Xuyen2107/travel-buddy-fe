import { Button, styled, useMediaQuery } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { authAPI } from "../../services/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

const VisuallyHiddenInput = styled("input")({
   clip: "rect(0 0 0 0)",
   clipPath: "inset(50%)",
   height: 1,
   overflow: "hidden",
   position: "absolute",
   bottom: 0,
   left: 0,
   whiteSpace: "nowrap",
   width: 1,
});

const UploadButton = ({ isIconButton = false, isCoverProfileBtn = false }) => {
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");
   const dispatch = useDispatch();

   const uploadAvatar = async (avatar) => {
      try {
         const accessToken = localStorage.getItem("accessToken") !== null ? JSON.parse(localStorage.getItem("accessToken")) : null;
         await authAPI.uploadAvatar(avatar);
         const response = await authAPI.authInfo();
         dispatch(loginSuccess(response.data.userInfo));
      } catch (error) {
         console.log(error);
      }
   };

   const handleChange = (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      uploadAvatar(formData);
   };

   return (
      <>
         {isIconButton && (
            <Button
               component="label"
               variant="contained"
               sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  minWidth: "initial",
                  padding: "6px",
                  borderRadius: "50%",
                  "& .MuiButton-startIcon": {
                     margin: 0,
                  },
               }}
            >
               <PhotoCamera sx={{ fontSize: "20px" }} />
               <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChange} />
            </Button>
         )}

         {isCoverProfileBtn &&
            (isNonMobileScreens ? (
               <Button
                  variant="contained"
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "10px",
                     textTransform: "none",
                     position: "absolute",
                     top: isNonMobileScreens ? "none" : "10px",
                     bottom: isNonMobileScreens ? "-18px" : "none",
                     right: "10px",
                  }}
                  component="label"
               >
                  Chọn ảnh bìa <PhotoCamera sx={{ fontSize: "20px" }} />
                  <VisuallyHiddenInput type="file" accept="image/*" />
               </Button>
            ) : (
               <Button
                  component="label"
                  variant="contained"
                  sx={{
                     position: "absolute",
                     bottom: -10,
                     right: 10,
                     minWidth: "initial",
                     padding: "6px",
                     borderRadius: "50%",
                     "& .MuiButton-startIcon": {
                        margin: 0,
                     },
                  }}
               >
                  <PhotoCamera sx={{ fontSize: "20px" }} />
                  <VisuallyHiddenInput type="file" accept="image/*" />
               </Button>
            ))}
      </>
   );
};

export default UploadButton;
