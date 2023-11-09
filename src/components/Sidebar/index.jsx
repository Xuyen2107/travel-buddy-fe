import { AccountBox, Article, Diversity1, Group, Home, Settings, Storefront } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
   const getIcon = (component) => {
      switch (component) {
         case "Home":
            return <Home />;
         case "Article":
            return <Article />;
         case "Group":
            return <Group />;
         case "Storefront":
            return <Storefront />;
         case "Diversity1":
            return <Diversity1 />;
         case "Settings":
            return <Settings />;
         case "AccountBox":
            return <AccountBox />;
         default:
            break;
      }
   };

   const SidebarItems = ({ text, component, href }) => {
      return (
         <ListItem disablePadding>
            <ListItemButton component={Link} to={href}>
               <ListItemIcon>{getIcon(component)}</ListItemIcon>
               <ListItemText primary={text} />
            </ListItemButton>
         </ListItem>
      );
   };

   return (
      <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
         <Box sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper", position: "sticky", top: 64 }}>
            <nav aria-label="main mailbox folders">
               <List>
                  <SidebarItems text="Home" component="Home" href="/" />
                  <SidebarItems text="Pages" component="Article" href="/page" />
                  <SidebarItems text="Groups" component="Group" href="/group" />
                  <SidebarItems text="Marketplace" component="Storefront" href="/marketplace" />
                  <SidebarItems text="Friends" component="Diversity1" href="/friends" />
                  <SidebarItems text="Settings" component="Settings" href="/setting" />
                  <SidebarItems text="Profile" component="AccountBox" href="/profile" />
               </List>
            </nav>
         </Box>
      </Box>
   );
};
export default Sidebar;
