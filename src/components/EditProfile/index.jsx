import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FlexBetween from "../BoxFlexBetween";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "1px solid",
   boxShadow: 24,
   p: 4,
   height: "200vh",
};

const EditProfile = () => {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <Box>
         <Button variant="outlined" onClick={handleOpen}>
            <FlexBetween gap="0.25rem">
               <EditIcon />
               <Typography sx={{ textTransform: "capitalize" }}>Chỉnh sửa trang cá nhân</Typography>
            </FlexBetween>
         </Button>
         <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box
               sx={{
                  maxHeight: "100vh",
                  overflow: "hidden",
                  overflowY: "auto",
                  width: "100%",
               }}
            >
               <Box sx={style}>
                  <Button
                     onClick={handleClose}
                     component="label"
                     variant="contained"
                     sx={{
                        position: "absolute",
                        top: -12,
                        right: -12,
                        minWidth: "initial",
                        padding: "6px",
                        borderRadius: "50%",
                        "& .MuiButton-startIcon": {
                           margin: 0,
                        },
                     }}
                  >
                     <ClearIcon sx={{ fontSize: "20px" }} />
                  </Button>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                     Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                     Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
               </Box>
            </Box>
         </Modal>
      </Box>
   );
};

export default EditProfile;
