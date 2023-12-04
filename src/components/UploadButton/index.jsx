import { PhotoCamera } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../../styles";
import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uploadAvatar } from "../../redux/authSlice";
import { useCrudApi } from "../../hooks";
import { userAPI } from "../../apis";
import PropTypes from "prop-types";

const UploadButton = ({ isIconButton, isCoverProfileBtn }) => {
   const dispatch = useDispatch();

   const isNonMobileScreens = useMediaQuery("(min-width: 767px)");

   const { data: dataUpload, loading: loadingUpload, fetchData: fetchDataUpload } = useCrudApi(userAPI.uploadAvatar);

   useEffect(() => {
      if (dataUpload) {
         dispatch(uploadAvatar(dataUpload));
      }
   }, [dataUpload]);

   const handleChangeImage = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      await fetchDataUpload(formData);
   };

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
               {loadingUpload ? (
                  <CircularProgress size="20px" color="secondary" />
               ) : (
                  <>
                     <PhotoCamera sx={{ fontSize: "20px" }} />
                     <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChangeImage} />
                  </>
               )}
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
      </>
   );
};

UploadButton.propTypes = {
   isIconButton: PropTypes.bool,
   isCoverProfileBtn: PropTypes.bool,
};

export default UploadButton;
