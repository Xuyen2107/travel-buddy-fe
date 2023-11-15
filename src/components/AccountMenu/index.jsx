import * as React from "react";
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const AccountMenu = () => {
   const user = useSelector((state) => state.auth.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem("accessToken");
      handleClose();
      navigate("/");
   };

   return (
      <React.Fragment>
         <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", position: "relative" }}>
            <Tooltip>
               <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
               >
                  <Avatar src={user?.avatar} sx={{ width: 40, height: 40 }}></Avatar>
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
                  "& .MuiAvatar-root": {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                  },
               },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
         >
            <MenuItem onClick={handleClose} component={Link} to={`/profile/${user._id}`}>
               <Avatar src={user?.avatar} /> {user?.fullName}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Settings fontSize="small" />
               </ListItemIcon>
               Cài đặt
            </MenuItem>
            <MenuItem onClick={handleLogout}>
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
