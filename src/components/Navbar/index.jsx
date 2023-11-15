import { styled } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, useTheme, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SwitchControl from "../Switch";
import AccountMenu from "../AccountMenu";
import { Link } from "react-router-dom";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: "primary",
   "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
         width: "20ch",
      },
   },
}));

const Navbar = () => {
   const { palette } = useTheme();
   return (
      <AppBar
         position="sticky"
         sx={{
            bgcolor: palette.background.paper,
         }}
      >
         <Toolbar>
            <Typography
               variant="h5"
               noWrap
               component={Link}
               to="/"
               color="blue"
               sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
               }}
            >
               Travel Buddy
            </Typography>
            <Box
               component="form"
               position="relative"
               sx={{
                  ml: "20px",
                  border: palette.mode === "dark" ? "1px solid #fff" : "1px solid #000",
                  borderRadius: "20px",
               }}
               onSubmit={(e) => e.preventDefault()}
            >
               <StyledInputBase type="text" placeholder="Search…" inputProps={{ "aria-label": "search" }} />
               <IconButton sx={{ position: "absolute", left: 0 }} type="submit">
                  <SearchIcon />
               </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: "center" }} />
            <Box sx={{ display: "flex", gap: "10px" }}>
               <SwitchControl />
               {/* <IconButton size="medium" aria-label="show 4 new mails">
                  <Badge badgeContent={1} color="error">
                     <ChatBubbleIcon />
                  </Badge>
               </IconButton>
               <IconButton size="medium" aria-label="show 17 new notifications">
                  <Badge badgeContent={1} color="error">
                     <NotificationsIcon />
                  </Badge>
               </IconButton> */}
               <AccountMenu />
            </Box>
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
