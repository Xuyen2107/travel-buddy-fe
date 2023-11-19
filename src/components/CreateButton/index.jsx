import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { PaperCenter } from "../../styles/PaperCenter";
import CreatePost from "../CreatePost";
import { ButtonRadius } from "../../styles/ButtonRadius";

const CreateButton = () => {
   const [open, setOpen] = useState(false);
   const [confirmOpen, setConfirmOpen] = useState(false);

   const handleOpen = () => setOpen(true);

   const handleConfirmOpen = () => setConfirmOpen(true);
   const handleConfirmClose = () => setConfirmOpen(false);

   const handleConfirm = () => {
      setConfirmOpen(false);
      setOpen(false);
   };

   return (
      <Box>
         <Button onClick={handleOpen}>Open modal</Button>
         <Modal open={open} onClose={handleConfirmOpen}>
            <PaperCenter sx={{ width: "500px", p: "10px" }}>
               <ButtonRadius
                  onClick={handleConfirmOpen}
                  startIcon={<CloseIcon />}
                  sx={{
                     top: 0,
                     right: 0,
                  }}
               />
               <CreatePost />
            </PaperCenter>
         </Modal>
         <Modal open={confirmOpen} onClose={handleConfirmClose}>
            <PaperCenter sx={{ width: "300px", p: "20px" }}>
               <Typography variant="h6">Bạn đang tạo bài viết?</Typography>
               <Button onClick={handleConfirm}>Thoát</Button>
               <Button onClick={handleConfirmClose}>Tiếp tục chỉnh sửa</Button>
            </PaperCenter>
         </Modal>
      </Box>
   );
};

export default CreateButton;
