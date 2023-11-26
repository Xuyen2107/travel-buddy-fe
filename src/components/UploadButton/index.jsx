import { Button, styled, useMediaQuery, useTheme } from "@mui/material";
import { PhotoCamera, Image, VideoCameraBack } from "@mui/icons-material";
import { authAPI, userAPI } from "../../services/api";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";

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

const UploadButton = ({
   userId,
   isIconButton = false,
   isCoverProfileBtn = false,
   isImageButton = false,
   isVideoButton = false,
   handleFileChange,
   onChange,
}) => {
   // const handleChangeImage = (e) => {
   //    if (handleFileChange) {
   //       handleFileChange(e);
   //    }
   //    // Xử lý thêm nếu cần
   // };
   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");

   return (
      <>
         {isIconButton && (
            <Button
               component="label"
               variant="contained"
               sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  minWidth: "initial",
                  padding: "10px",
                  borderRadius: "50%",
                  "& .MuiButton-startIcon": {
                     margin: 0,
                  },
               }}
            >
               <PhotoCamera sx={{ fontSize: "20px" }} />
               <VisuallyHiddenInput type="file" accept="image/*" onChange={onChange} />
            </Button>
         )}

         {isCoverProfileBtn && (
            <Button
               variant="contained"
               endIcon={<PhotoCamera />}
               sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "none",
                  position: "absolute",
                  bottom: isNonMobileScreens ? -18 : -12,
                  right: "10px",
                  "& .MuiButton-endIcon": {
                     margin: isNonMobileScreens ? "" : 0,
                  },
               }}
               component="label"
            >
               {isNonMobileScreens && "Chọn ảnh bìa"}
               <VisuallyHiddenInput type="file" accept="image/*" />
            </Button>
         )}

         {handleFileChange && (
            <Button
               component="label"
               variant="success"
               sx={{
                  padding: "10px",
                  "& .MuiButton-startIcon": {
                     margin: 0,
                  },
               }}
            >
               <PhotoCamera sx={{ fontSize: "20px", marginRight: "10px" }} /> Chọn ảnh hoặc video
               <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChangeImage} />
            </Button>
         )}
      </>
   );
};

export default UploadButton;
