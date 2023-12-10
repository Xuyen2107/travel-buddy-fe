import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Drawer } from "@mui/material";
import { ArrowBack, ChatBubble, Group, Home, Menu, Notifications, Search } from "@mui/icons-material";
import Sidebar from "../Sidebar";
import SearchForm from "../SearchForm";
import AccountMenu from "../AccountMenu";
import { BoxFlexBetween } from "../../styles";
import { useCrudApi } from "../../hooks";
import { notifyAPI } from "../../apis";
import Notify from "../Notify";

const Navbar = () => {
   const NavbarMobile = () => {
      const [show, setShow] = useState(false);
      const [state, setState] = useState({ left: false });
      const [activeIcon, setActiveIcon] = useState("home");

      const toggleDrawer = (open) => (event) => {
         if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
         }

         setState({ left: open });
      };

      const handleIconClick = (iconName) => {
         setActiveIcon(iconName);
      };

      return (
         <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Toolbar sx={{ flexDirection: show ? "" : "column" }}>
               {show ? (
                  <Box sx={{ display: "flex", width: "100%" }}>
                     <IconButton onClick={() => setShow(false)}>
                        <ArrowBack />
                     </IconButton>
                     <SearchForm />
                  </Box>
               ) : (
                  <>
                     <BoxFlexBetween sx={{ justifyContent: "space-between", gap: "4px", width: "100%" }}>
                        <IconButton onClick={toggleDrawer(true)}>
                           <Menu />
                        </IconButton>
                        <Typography variant="h5" noWrap component={Link} to="/" color="blue" sx={{ fontWeight: "bold" }}>
                           Travel Buddy
                        </Typography>
                        <IconButton onClick={() => setShow(true)}>
                           <Search />
                        </IconButton>
                     </BoxFlexBetween>
                     <BoxFlexBetween sx={{ gap: "10px", width: "100%", justifyContent: "space-between", p: "10px" }}>
                        <IconButton
                           disableRipple
                           sx={{ p: 0, "&:hover": { bgcolor: "none" }, color: activeIcon === "home" && "blue" }}
                           onClick={() => handleIconClick("home")}
                           component={Link}
                           to={`/`}
                        >
                           <Home />
                        </IconButton>
                        <IconButton
                           disableRipple
                           sx={{ p: 0, "&:hover": { bgcolor: "none" }, color: activeIcon === "group" && "blue" }}
                           onClick={() => handleIconClick("group")}
                        >
                           <Group />
                        </IconButton>
                        <IconButton
                           disableRipple
                           sx={{ p: 0, "&:hover": { bgcolor: "none" }, color: activeIcon === "chat" && "blue" }}
                           onClick={() => handleIconClick("chat")}
                        >
                           <Badge badgeContent={4} color="error">
                              <ChatBubble />
                           </Badge>
                        </IconButton>
                        <Notify />
                     </BoxFlexBetween>
                     <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
                        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                           <Sidebar />
                        </Box>
                     </Drawer>
                  </>
               )}
            </Toolbar>
         </Box>
      );
   };

   return (
      <AppBar position="sticky" sx={{ bgcolor: "background.paper" }}>
         <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Toolbar sx={{ flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between" }}>
               <BoxFlexBetween sx={{ gap: "10px" }}>
                  <Typography variant="h5" noWrap component={Link} to="/" color="blue" sx={{ fontWeight: "bold" }}>
                     Travel Buddy
                  </Typography>
                  <Box width="300px">
                     <SearchForm />
                  </Box>
               </BoxFlexBetween>
               <BoxFlexBetween gap="30px">
                  <IconButton disableRipple sx={{ p: 0, "&:hover": { bgcolor: "none" } }}>
                     <Badge badgeContent={4} color="error">
                        <ChatBubble />
                     </Badge>
                  </IconButton>
                  <Notify />
                  <AccountMenu />
               </BoxFlexBetween>
            </Toolbar>
         </Box>
         <NavbarMobile />
      </AppBar>
   );
};

export default Navbar;
