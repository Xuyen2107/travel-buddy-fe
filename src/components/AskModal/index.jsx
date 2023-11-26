import { Button, Modal, Typography } from "@mui/material";
import { BoxFlexBetween, PaperCenter } from "../../styles";
import PropTypes from "prop-types";

const AskModal = ({ title, continueTitle, open, onClose, onClickCloseAll }) => {
   return (
      <Modal open={open} onClose={onClose}>
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
            <Typography variant="h6">{title}</Typography>
            <BoxFlexBetween sx={{ gap: "20px" }}>
               <Button variant="outlined" onClick={onClickCloseAll} sx={{ textTransform: "none" }}>
                  Thoát
               </Button>
               <Button variant="contained" onClick={onClose} sx={{ textTransform: "none" }}>
                  {continueTitle}
               </Button>
            </BoxFlexBetween>
         </PaperCenter>
      </Modal>
   );
};

AskModal.propTypes = {
   title: PropTypes.string.isRequired,
   continueTitle: PropTypes.string.isRequired,
   open: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onClickCloseAll: PropTypes.func.isRequired,
};

export default AskModal;
