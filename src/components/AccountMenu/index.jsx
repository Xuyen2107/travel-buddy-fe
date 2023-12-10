import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Settings, Logout } from "@mui/icons-material";
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from "@mui/material";
import useAuth from "../../hooks/authHook";

const AccountMenu = () => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const { handelLogout } = useAuth();
   const { userLogin } = useSelector((state) => state.auth);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <React.Fragment>
         <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", position: "relative" }}>
            <Tooltip>
               <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
               >
                  <Avatar src={userLogin?.avatar} sx={{ width: 36, height: 36 }}></Avatar>
               </IconButton>
            </Tooltip>
         </Box>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
               elevation: 0,
               sx: {
                  cursor: "pointer",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
               },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
         >
            <MenuItem onClick={handleClose} component={Link} to={`/profile/${userLogin?._id}`}>
               <Avatar src={userLogin?.avatar} /> {userLogin?.fullName}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Settings fontSize="small" />
               </ListItemIcon>
               Cài đặt
            </MenuItem>
            <MenuItem
               onClick={() => {
                  handelLogout();
                  handleClose();
               }}
            >
               <ListItemIcon>
                  <Logout fontSize="small" />
               </ListItemIcon>
               Đăng xuất
            </MenuItem>
         </Menu>
      </React.Fragment>
   );
};

export default AccountMenu;
