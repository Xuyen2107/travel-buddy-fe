import PropTypes from "prop-types";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BoxFlexBetween, PaperCenter } from "../../styles/index";
import { ButtonRadius } from "../../styles/index";

const OpenModal = ({ type, children, confirmOpenModal, openModal, handleConfirmOpen, handleConfirmClose, handleCloseAllModal }) => {
   return (
      <Box>
         <Modal open={openModal} onClose={handleConfirmOpen}>
            <PaperCenter sx={{ width: "600px" }}>
               <Paper
                  sx={{
                     borderRadius: "10px 10px 0 0",
                     p: "5px 0",
                     width: "100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <Typography variant="h6">
                     {type === "createPost" && "Tạo bài viết"}
                     {type === "updatePost" && "Cập nhật bài viết"}
                     {type === "createVacation" && "Tạo kì nghỉ"}
                     {type === "updateVacation" && "Cập nhật kì nghỉ"}
                  </Typography>
                  <ButtonRadius onClick={handleConfirmOpen} startIcon={<CloseIcon />} sx={{ position: "absolute", right: 10, padding: 0 }} />
               </Paper>
               {children}
            </PaperCenter>
         </Modal>
         <Modal open={confirmOpenModal} onClose={handleConfirmClose}>
            <PaperCenter
               sx={{
                  width: "maxContent",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  p: "12px",
               }}
            >
               <Typography variant="h6">
                  {type === "createPost" && "Bạn đang tạo bài viết"}
                  {type === "updatePost" && "Bạn đang cập nhật bài viết"}
                  {type === "createVacation" && "Bạn đang tạo kì nghỉ"}
                  {type === "updateVacation" && "Bạn đang cập nhật kì nghỉ"}
               </Typography>
               <BoxFlexBetween sx={{ gap: "20px" }}>
                  <Button variant="outlined" onClick={handleCloseAllModal} sx={{ textTransform: "none" }}>
                     Thoát
                  </Button>
                  <Button variant="contained" onClick={handleConfirmClose} sx={{ textTransform: "none" }}>
                     {type === "createPost" && "Tiếp tục tạo"}
                     {type === "updatePost" && "Tiếp tục cập nhật"}
                     {type === "createVacation" && "Tiếp tục tạo"}
                     {type === "updateVacation" && "Tiếp tục cập nhật"}
                  </Button>
               </BoxFlexBetween>
            </PaperCenter>
         </Modal>
      </Box>
   );
};

OpenModal.propTypes = {
   openModal: PropTypes.bool.isRequired,
   confirmOpenModal: PropTypes.bool.isRequired,
   title: PropTypes.string.isRequired,
   confirmTitle: PropTypes.string.isRequired,
   continueTitle: PropTypes.string.isRequired,
   handleConfirmOpen: PropTypes.func.isRequired,
   handleConfirmClose: PropTypes.func.isRequired,
   handleCloseAllModal: PropTypes.func.isRequired,
};

export default OpenModal;

// {
//    createVacation && <CreateVacationForm create handleCloseModal={handleCloseAllModal} />;
// }
// {
//    updateVacation && <CreateVacationForm update vacation={dataVacation} handleCloseModal={handleCloseAllModal} />;
// }
// {
//    createPost && <CreatePost vacation={dataVacation} closeModal={handleCloseAllModal} />;
// }
