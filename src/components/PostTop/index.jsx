import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, FormControl, Menu, MenuItem, Modal, Paper, Select, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlexBetween from "../BoxFlexBetween";
import UserImage from "../UserImage";

const PostTop = ({ avatarUrl, time, name, handleRemove, select = false, control = false, onChange, value }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openModal, setOpenModal] = useState(false);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleEditPost = () => {
      setOpenModal(true);
      handleClose();
   };

   const handleRemovePost = async () => {
      handleClose();
      handleRemove && (await handleRemove());
   };

   const handleModalClose = () => {
      setOpenModal(false);
   };

   return (
      <FlexBetween width="100%">
         <FlexBetween
            sx={{
               gap: "10px",
            }}
         >
            <UserImage size="45px" avatarUrl={avatarUrl} />
            <Box>
               <Typography
                  variant="h6"
                  sx={{
                     fontSize: "16px",
                  }}
               >
                  {name}
               </Typography>
               {time && <Typography sx={{ fontSize: "12px" }}>{time}</Typography>}
               {select && (
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                     <Select
                        name="isPublic"
                        onChange={onChange}
                        value={value}
                        sx={{
                           fontSize: "14px",
                           height: "20px",
                        }}
                     >
                        <MenuItem value={1} sx={{ fontSize: "14px" }}>
                           Công khai
                        </MenuItem>
                        <MenuItem value={2} sx={{ fontSize: "14px" }}>
                           Bạn bè
                        </MenuItem>
                        <MenuItem value={3} sx={{ fontSize: "14px" }}>
                           Chỉ mình tôi
                        </MenuItem>
                     </Select>
                  </FormControl>
               )}
            </Box>
         </FlexBetween>
         {control && (
            <Box>
               <Button
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<MoreHorizIcon />}
                  color="primary"
                  sx={{
                     borderRadius: "50%",
                     "& .MuiButton-endIcon": {
                        margin: 0,
                     },
                     "&.MuiButtonBase-root": {
                        minWidth: 0,
                        p: "8px",
                     },
                  }}
               />

               <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                     "aria-labelledby": "basic-button",
                  }}
               >
                  <MenuItem onClick={handleEditPost}>Chỉnh sửa</MenuItem>
                  <MenuItem onClick={handleRemovePost}>Xóa bài viết</MenuItem>
               </Menu>
            </Box>
         )}
         <Modal open={openModal} onClose={handleModalClose}>
            <Paper
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
               }}
            >
               Chỉnh sửa ở đây
            </Paper>
         </Modal>
      </FlexBetween>
   );
};

PostTop.propTypes = {
   avatarUrl: PropTypes.string.isRequired,
   time: PropTypes.string,
   name: PropTypes.string.isRequired,
   handleRemove: PropTypes.func,
   select: PropTypes.bool,
   control: PropTypes.bool,
   onChange: PropTypes.func,
   value: PropTypes.number,
};

export default PostTop;
