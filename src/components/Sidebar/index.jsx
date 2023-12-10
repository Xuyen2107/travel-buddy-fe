import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DarkMode, Diversity1, Home, Logout, Settings } from "@mui/icons-material";
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SwitchControl from "../Switch";
import useAuth from "../../hooks/authHook";

const Sidebar = () => {
   const { handelLogout } = useAuth();
   const { userLogin } = useSelector((state) => state.auth);

   const getIcon = (component) => {
      switch (component) {
         case "Home":
            return <Home />;
         case "Diversity1":
            return <Diversity1 />;
         case "Settings":
            return <Settings />;
         case "DarkMode":
            return <DarkMode />;
         case "Logout":
            return <Logout />;
         case "AccountBox":
            return <Avatar sx={{ width: "30px", height: "30px", border: "1px solid" }} src={userLogin.avatar} alt="avatar" />;
         default:
            break;
      }
   };

   const SidebarItems = ({ text, component, href, onclick }) => {
      return (
         <ListItem disablePadding sx={{ whiteSpace: "nowrap" }}>
            <ListItemButton component={Link} to={href} onClick={onclick}>
               <ListItemIcon>{getIcon(component)}</ListItemIcon>
               <ListItemText primary={text} />
            </ListItemButton>
         </ListItem>
      );
   };

   return (
      <Box sx={{ width: "100%", maxWidth: "max-content" }}>
         <nav aria-label="main mailbox folders">
            <List>
               <SidebarItems text={userLogin.fullName} component="AccountBox" href={`profile/${userLogin._id}`} />
               <SidebarItems text="Trang chủ" component="Home" href="/" />
               <SidebarItems text="Bạn bè" component="Diversity1" />
               <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <SidebarItems text="Cài đặt" component="Settings" />
                  <SidebarItems text="Đăng xuất" component="Logout" onclick={handelLogout} />
               </Box>
               <Divider />
               <ListItem>
                  <ListItemText primary="Chế độ tối" />
                  <SwitchControl />
               </ListItem>
            </List>
         </nav>
      </Box>
   );
};

Sidebar.propTypes = {
   text: PropTypes.string,
   component: PropTypes.string,
   href: PropTypes.string,
   onclick: PropTypes.func,
};

export default Sidebar;
